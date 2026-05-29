import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useCheckInApp } from "../checkIn/CheckInContext";
import { getMoodContext } from "../checkIn/getMoodContext";
import type { SurfacesFeature } from "../checkIn/types";
import { useUserProfile } from "../user/UserProfileContext";
import PostCheckInHome from "./PostCheckInHome";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName } = useUserProfile();
  const {
    checkInStreak,
    latestCheckIn,
    restoreTodayCheckIn,
    hasLoggedActivityToday,
    checkInsByDay,
    activityLogs,
  } =
    useCheckInApp();

  const greeting = "Good Morning";

  useEffect(() => {
    if (location.pathname === "/") {
      restoreTodayCheckIn();
    }
  }, [location.pathname, restoreTodayCheckIn]);

  const postContext = latestCheckIn ? getMoodContext(latestCheckIn) : null;

  const activityDays = new Set(activityLogs.map((log) => log.day));
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const streakWeek = Array.from({ length: 7 }, (_, idx) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + idx);
    const day = date.toLocaleDateString("en-CA");
    return {
      day,
      label: date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
      completed: Boolean(checkInsByDay[day] && activityDays.has(day)),
    };
  });

  const handleFeatureOpen = (feature: SurfacesFeature) => {
    if (feature === "forum") navigate("/signal");
    else if (feature === "mentorship") navigate("/match");
    else navigate("/events");
  };

  return (
    <div className="min-h-full bg-[#0D1A2A] text-[#EDE8DF] px-6 flex flex-col relative overflow-hidden app-texture">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={false}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-[#5BBFA0]/14 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5BBFA0]/10 rounded-full blur-3xl"
        />
      </motion.div>

      {latestCheckIn && postContext ? (
        <div className="relative z-10 flex-1 overflow-y-auto min-h-0 flex flex-col pt-8 pb-4">
          <PostCheckInHome
            firstName={firstName}
            latestCheckIn={latestCheckIn}
            checkInStreak={checkInStreak}
            hasLoggedActivityToday={hasLoggedActivityToday}
            streakWeek={streakWeek}
            onLogActivity={() => navigate("/activity-log")}
            onOpenFeature={handleFeatureOpen}
          />
        </div>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-md w-full mx-auto pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl mb-3 text-[#9a948a]">{greeting},</h1>
            <h2 className="font-heading text-5xl tracking-tight gradient-heading mb-16">{firstName}</h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate("/check-in")}
            className="w-full px-8 py-5 bg-[#6B9080] hover:bg-[#5C7568] rounded-lg font-semibold text-lg text-[#0F1117] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-black/25 font-sans"
          >
            <CheckCircle2 className="w-7 h-7" />
            Check-in
          </motion.button>
        </div>
      )}
    </div>
  );
}
