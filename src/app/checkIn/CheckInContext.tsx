import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CheckInResponse } from "./types";

const LS_BUCKS = "ff-founder-bucks";
const LS_STREAK = "ff-checkin-streak";
const LS_LAST_DAY = "ff-last-checkin-day";

export const CHECKIN_FOUNDERBUCKS_REWARD = 10;

function toYMD(d = new Date()) {
  return d.toLocaleDateString("en-CA");
}

function yesterdayYMD() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("en-CA");
}

type CheckInAppContextValue = {
  founderBucks: number;
  checkInStreak: number;
  /** Last completed check-in; cleared when leaving the home screen */
  latestCheckIn: CheckInResponse | null;
  /** Non-null briefly after submit to show reward toast */
  lastEarnedBucks: number | null;
  completeCheckIn: (response: CheckInResponse) => void;
  consumeBucksToast: () => void;
  clearLatestCheckIn: () => void;
};

const CheckInAppContext = createContext<CheckInAppContextValue | null>(null);

export function CheckInProvider({ children }: { children: ReactNode }) {
  const [founderBucks, setFounderBucks] = useState(() => {
    const n = Number(localStorage.getItem(LS_BUCKS));
    return Number.isFinite(n) && n >= 0 ? n : 240;
  });
  const [checkInStreak, setCheckInStreak] = useState(() => {
    const n = Number(localStorage.getItem(LS_STREAK));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  });
  const [latestCheckIn, setLatestCheckIn] = useState<CheckInResponse | null>(null);
  const [lastEarnedBucks, setLastEarnedBucks] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(LS_BUCKS, String(founderBucks));
  }, [founderBucks]);

  useEffect(() => {
    localStorage.setItem(LS_STREAK, String(checkInStreak));
  }, [checkInStreak]);

  const completeCheckIn = useCallback((response: CheckInResponse) => {
    const today = toYMD();
    const prevDay = localStorage.getItem(LS_LAST_DAY);

    setFounderBucks((b) => b + CHECKIN_FOUNDERBUCKS_REWARD);
    setLastEarnedBucks(CHECKIN_FOUNDERBUCKS_REWARD);
    setLatestCheckIn(response);

    if (prevDay !== today) {
      if (!prevDay) {
        setCheckInStreak(1);
      } else if (prevDay === yesterdayYMD()) {
        setCheckInStreak((s) => Math.max(1, s + 1));
      } else {
        setCheckInStreak(1);
      }
      localStorage.setItem(LS_LAST_DAY, today);
    }
  }, []);

  const consumeBucksToast = useCallback(() => {
    setLastEarnedBucks(null);
  }, []);

  const clearLatestCheckIn = useCallback(() => {
    setLatestCheckIn(null);
  }, []);

  const value = useMemo(
    () => ({
      founderBucks,
      checkInStreak,
      latestCheckIn,
      lastEarnedBucks,
      completeCheckIn,
      consumeBucksToast,
      clearLatestCheckIn,
    }),
    [
      founderBucks,
      checkInStreak,
      latestCheckIn,
      lastEarnedBucks,
      completeCheckIn,
      consumeBucksToast,
      clearLatestCheckIn,
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
