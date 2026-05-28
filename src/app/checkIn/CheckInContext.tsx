import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ActivityCategory, ActivityLog, CheckInMood, CheckInResponse } from "./types";

const LS_STREAK = "ff-activity-checkin-streak";
const LS_LAST_COMPLETED_DAY = "ff-last-complete-day";
const LS_CHECKINS_BY_DAY = "ff-checkins-by-day";
const LS_ACTIVITY_LOGS = "ff-activity-logs";
const SS_STREAK_BROKEN = "ff-streak-broken-today";

type CheckInsByDay = Record<string, CheckInResponse>;

function readStreakBrokenToday(): boolean {
  return sessionStorage.getItem(SS_STREAK_BROKEN) === "1";
}

function readCheckInsByDay(): CheckInsByDay {
  try {
    const raw = localStorage.getItem(LS_CHECKINS_BY_DAY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const normalized: CheckInsByDay = {};
    for (const [day, value] of Object.entries(parsed)) {
      if (
        value &&
        typeof value === "object" &&
        typeof (value as Record<string, unknown>).happiness === "number" &&
        typeof (value as Record<string, unknown>).stress === "number"
      ) {
        const entry = value as Record<string, unknown>;
        normalized[day] = {
          happiness: entry.happiness as number,
          stress: entry.stress as number,
          mood: entry.mood as CheckInMood,
          ...(typeof entry.note === "string" ? { note: entry.note } : {}),
        };
      }
    }
    return normalized;
  } catch {
    return {};
  }
}

function readActivityLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem(LS_ACTIVITY_LOGS);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is ActivityLog => {
      if (!entry || typeof entry !== "object") return false;
      const record = entry as Record<string, unknown>;
      return (
        typeof record.id === "string" &&
        typeof record.category === "string" &&
        typeof record.timestamp === "string" &&
        typeof record.day === "string"
      );
    });
  } catch {
    return [];
  }
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
  latestCheckIn: CheckInResponse | null;
  checkInsByDay: Record<string, CheckInResponse>;
  activityLogs: ActivityLog[];
  todayActivityLogs: ActivityLog[];
  completeCheckIn: (response: CheckInResponse) => void;
  logActivity: (category: ActivityCategory, note?: string) => void;
  clearLatestCheckIn: () => void;
  restoreTodayCheckIn: () => void;
  hasCheckedInToday: boolean;
  hasLoggedActivityToday: boolean;
  isTodayComplete: boolean;
  totalDaysLogged: number;
  streakBrokenToday: boolean;
};

const CheckInAppContext = createContext<CheckInAppContextValue | null>(null);

export function CheckInProvider({ children }: { children: ReactNode }) {
  const [checkInStreak, setCheckInStreak] = useState(() => {
    const n = Number(localStorage.getItem(LS_STREAK));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  });
  const [checkInsByDay, setCheckInsByDay] = useState<CheckInsByDay>(readCheckInsByDay);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(readActivityLogs);
  const [streakBrokenToday, setStreakBrokenToday] = useState(readStreakBrokenToday);

  const today = toYMD();
  const latestCheckIn = checkInsByDay[today] ?? null;
  const todayActivityLogs = activityLogs.filter((log) => log.day === today);
  const hasCheckedInToday = Boolean(latestCheckIn);
  const hasLoggedActivityToday = todayActivityLogs.length > 0;
  const isTodayComplete = hasCheckedInToday && hasLoggedActivityToday;
  const totalDaysLogged = new Set(activityLogs.map((log) => log.day)).size;

  useEffect(() => {
    localStorage.setItem(LS_STREAK, String(checkInStreak));
  }, [checkInStreak]);

  useEffect(() => {
    localStorage.setItem(LS_CHECKINS_BY_DAY, JSON.stringify(checkInsByDay));
  }, [checkInsByDay]);

  useEffect(() => {
    localStorage.setItem(LS_ACTIVITY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    const lastCompleteDay = localStorage.getItem(LS_LAST_COMPLETED_DAY);
    const todayDay = toYMD();
    const yesterdayDay = yesterdayYMD();
    if (lastCompleteDay && lastCompleteDay !== todayDay && lastCompleteDay !== yesterdayDay) {
      setCheckInStreak(0);
    }
  }, []);

  const resolveStreakForDay = useCallback((day: string) => {
    const prevCompleteDay = localStorage.getItem(LS_LAST_COMPLETED_DAY);
    if (prevCompleteDay === day) return;

    if (!prevCompleteDay) {
      setCheckInStreak(1);
      setStreakBrokenToday(false);
      sessionStorage.removeItem(SS_STREAK_BROKEN);
    } else if (prevCompleteDay === yesterdayYMD()) {
      setCheckInStreak((s) => Math.max(1, s + 1));
      setStreakBrokenToday(false);
      sessionStorage.removeItem(SS_STREAK_BROKEN);
    } else {
      setCheckInStreak(1);
      setStreakBrokenToday(true);
      sessionStorage.setItem(SS_STREAK_BROKEN, "1");
    }

    localStorage.setItem(LS_LAST_COMPLETED_DAY, day);
  }, []);

  const completeCheckIn = useCallback(
    (response: CheckInResponse) => {
      const day = toYMD();
      setCheckInsByDay((prev) => ({ ...prev, [day]: response }));
      if (activityLogs.some((log) => log.day === day)) {
        resolveStreakForDay(day);
      }
    },
    [activityLogs, resolveStreakForDay],
  );

  const logActivity = useCallback(
    (category: ActivityCategory, note?: string) => {
      const day = toYMD();
      const log: ActivityLog = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        category,
        timestamp: new Date().toISOString(),
        day,
        ...(note?.trim() ? { note: note.trim() } : {}),
      };
      setActivityLogs((prev) => [log, ...prev]);

      if (checkInsByDay[day]) {
        resolveStreakForDay(day);
      }
    },
    [checkInsByDay, resolveStreakForDay],
  );

  const clearLatestCheckIn = useCallback(() => {
    // no-op: today's check-in remains persisted for dashboard and timeline
  }, []);

  const restoreTodayCheckIn = useCallback(() => {
    // no-op: today's check-in is always derived from persisted state
  }, []);

  const value = useMemo(
    () => ({
      checkInStreak,
      latestCheckIn,
      checkInsByDay,
      activityLogs,
      todayActivityLogs,
      completeCheckIn,
      logActivity,
      clearLatestCheckIn,
      restoreTodayCheckIn,
      hasCheckedInToday,
      hasLoggedActivityToday,
      isTodayComplete,
      totalDaysLogged,
      streakBrokenToday: isTodayComplete && streakBrokenToday,
    }),
    [
      checkInStreak,
      latestCheckIn,
      checkInsByDay,
      activityLogs,
      todayActivityLogs,
      completeCheckIn,
      logActivity,
      clearLatestCheckIn,
      restoreTodayCheckIn,
      hasCheckedInToday,
      hasLoggedActivityToday,
      isTodayComplete,
      totalDaysLogged,
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
