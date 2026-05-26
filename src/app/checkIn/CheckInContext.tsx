import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildCheckInResponse } from "./deriveMood";
import type { CheckInMood, CheckInResponse } from "./types";

const LS_STREAK = "ff-checkin-streak";
const LS_LAST_DAY = "ff-last-checkin-day";
const SS_TODAY_CHECKIN = "ff-today-checkin-response";
const SS_STREAK_BROKEN = "ff-streak-broken-today";

function readStreakBrokenToday(): boolean {
  return sessionStorage.getItem(SS_STREAK_BROKEN) === "1";
}

function readTodayCheckIn(): CheckInResponse | null {
  if (localStorage.getItem(LS_LAST_DAY) !== toYMD()) return null;
  try {
    const raw = sessionStorage.getItem(SS_TODAY_CHECKIN);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed.happiness === "number" && typeof parsed.stress === "number") {
      return {
        happiness: parsed.happiness,
        stress: parsed.stress,
        mood: parsed.mood as CheckInMood,
        ...(typeof parsed.note === "string" ? { note: parsed.note } : {}),
      };
    }
    // Legacy payloads used energy / focus / progress
    if (typeof parsed.energy === "number" && typeof parsed.stress === "number") {
      return buildCheckInResponse(parsed.energy, parsed.stress);
    }
    return null;
  } catch {
    return null;
  }
}

export function hasCheckedInToday() {
  return localStorage.getItem(LS_LAST_DAY) === toYMD();
}

function toYMD(d = new Date()) {
  return d.toLocaleDateString("en-CA");
}

function yesterdayYMD() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("en-CA");
}

type CheckInAppContextValue = {
  checkInStreak: number;
  /** Last completed check-in; cleared when leaving the home screen */
  latestCheckIn: CheckInResponse | null;
  completeCheckIn: (response: CheckInResponse) => void;
  clearLatestCheckIn: () => void;
  restoreTodayCheckIn: () => void;
  hasCheckedInToday: boolean;
  /** True when today's check-in restarted a streak after missing a day */
  streakBrokenToday: boolean;
};

const CheckInAppContext = createContext<CheckInAppContextValue | null>(null);

export function CheckInProvider({ children }: { children: ReactNode }) {
  const [checkInStreak, setCheckInStreak] = useState(() => {
    const n = Number(localStorage.getItem(LS_STREAK));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  });
  const [latestCheckIn, setLatestCheckIn] = useState<CheckInResponse | null>(readTodayCheckIn);
  const [streakBrokenToday, setStreakBrokenToday] = useState(readStreakBrokenToday);
  const checkedInToday = hasCheckedInToday();

  useEffect(() => {
    localStorage.setItem(LS_STREAK, String(checkInStreak));
  }, [checkInStreak]);

  const completeCheckIn = useCallback((response: CheckInResponse) => {
    const today = toYMD();
    const prevDay = localStorage.getItem(LS_LAST_DAY);

    setLatestCheckIn(response);
    sessionStorage.setItem(SS_TODAY_CHECKIN, JSON.stringify(response));

    if (prevDay !== today) {
      if (!prevDay) {
        setCheckInStreak(1);
        setStreakBrokenToday(false);
        sessionStorage.removeItem(SS_STREAK_BROKEN);
      } else if (prevDay === yesterdayYMD()) {
        setCheckInStreak((s) => Math.max(1, s + 1));
        setStreakBrokenToday(false);
        sessionStorage.removeItem(SS_STREAK_BROKEN);
      } else {
        setCheckInStreak(1);
        setStreakBrokenToday(true);
        sessionStorage.setItem(SS_STREAK_BROKEN, "1");
      }
      localStorage.setItem(LS_LAST_DAY, today);
    }
  }, []);

  const clearLatestCheckIn = useCallback(() => {
    setLatestCheckIn(null);
  }, []);

  const restoreTodayCheckIn = useCallback(() => {
    setLatestCheckIn(readTodayCheckIn());
  }, []);

  const value = useMemo(
    () => ({
      checkInStreak,
      latestCheckIn,
      completeCheckIn,
      clearLatestCheckIn,
      restoreTodayCheckIn,
      hasCheckedInToday: checkedInToday,
      streakBrokenToday: checkedInToday && streakBrokenToday,
    }),
    [
      checkInStreak,
      latestCheckIn,
      completeCheckIn,
      clearLatestCheckIn,
      restoreTodayCheckIn,
      checkedInToday,
      streakBrokenToday,
    ],
  );

  return <CheckInAppContext.Provider value={value}>{children}</CheckInAppContext.Provider>;
}

export function useCheckInApp() {
  const ctx = useContext(CheckInAppContext);
  if (!ctx) {
    throw new Error("useCheckInApp must be used within CheckInProvider");
  }
  return ctx;
}
