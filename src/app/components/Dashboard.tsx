import { useEffect } from "react";
import { CheckCircle2, Coins } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useCheckInApp } from "../checkIn/CheckInContext";
import { getMoodContext } from "../checkIn/getMoodContext";
import PostCheckInHome from "./PostCheckInHome";

const FIRST_NAME = "Steve";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    founderBucks,
    checkInStreak,
    latestCheckIn,
    lastEarnedBucks,
    consumeBucksToast,
    clearLatestCheckIn,
  } = useCheckInApp();

  const greeting = "Good Morning";

  useEffect(() => {
    return () => {
      clearLatestCheckIn();
    };
  }, [clearLatestCheckIn]);

  useEffect(() => {
    if (lastEarnedBucks == null) return;
    const t = window.setTimeout(() => consumeBucksToast(), 4200);
    return () => window.clearTimeout(t);
  }, [lastEarnedBucks, consumeBucksToast]);

  const postContext = latestCheckIn ? getMoodContext(latestCheckIn) : null;

  const primaryPath =
    postContext?.feature === "forum"
      ? "/signal"
      : postContext?.feature === "mentorship"
        ? "/match"
        : "/gamification";

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] px-6 flex flex-col relative overflow-hidden app-texture">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={false}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-[#6B9080]/12 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5C7568]/10 rounded-full blur-3xl"
        />
      </motion.div>

      {latestCheckIn && (
        <div className="relative z-20 shrink-0 pt-8 max-w-md w-full mx-auto space-y-2 mb-3">
          <motion.div
            className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(237,232,223,0.1)] bg-[#161922] px-4 py-3"
            initial={false}
          >
            <div className="flex items-center gap-2 min-w-0">
              <motion.div className="w-9 h-9 rounded-md bg-[#6B9080]/20 flex items-center justify-center shrink-0" initial={false}>
                <Coins className="w-5 h-5 text-[#C4A882]" aria-hidden />
              </motion.div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-[#9a948a] font-medium font-sans">
                  FounderBucks
                </p>
                <p className="text-xl font-semibold text-[#EDE8DF] tabular-nums leading-tight font-sans">
                  {founderBucks.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {lastEarnedBucks != null && (
              <motion.div
                key="bucks-toast"
                initial={{ opacity: 0, y: -12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="rounded-lg border border-[#6B9080]/35 bg-[#6B9080]/12 px-4 py-2.5 text-center"
              >
                <p className="text-sm font-semibold text-[#A8C4B8] font-sans">
                  +{lastEarnedBucks} FounderBucks earned!
                </p>
                <p className="text-[11px] text-[#9a948a] mt-0.5 font-sans">Thanks for checking in today.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {latestCheckIn && postContext ? (
        <div className="relative z-10 flex-1 overflow-y-auto min-h-0 flex flex-col pt-8 pb-4">
          <PostCheckInHome
            firstName={FIRST_NAME}
            moodContext={postContext}
            checkInStreak={checkInStreak}
            onPrimaryCta={() => navigate(primaryPath)}
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
            <h2 className="font-heading text-5xl tracking-tight gradient-heading mb-16">{FIRST_NAME}</h2>
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
