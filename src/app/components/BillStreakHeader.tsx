import { Flame } from "lucide-react";
import { motion } from "motion/react";
import type { CheckInResponse } from "../checkIn/types";
import { getBillStreakMessage } from "../checkIn/billStreakMessage";
import BillMascot from "./BillMascot";

type BillStreakHeaderProps = {
  checkIn: CheckInResponse;
  checkInStreak: number;
  streakBroken: boolean;
};

export default function BillStreakHeader({
  checkIn,
  checkInStreak,
  streakBroken,
}: BillStreakHeaderProps) {
  const message = getBillStreakMessage(checkInStreak, streakBroken);

  return (
    <div className="flex items-end gap-4 w-full">
      <div className={`relative shrink-0 ${message ? "pt-12" : ""}`}>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 w-max max-w-[11rem]"
          >
            <div className="relative bg-[#161922] border border-[rgba(237,232,223,0.12)] rounded-lg px-3 py-2 shadow-lg shadow-black/20">
              <p className="text-xs text-[#EDE8DF] leading-snug text-center font-sans">{message}</p>
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-[#161922] border-r border-b border-[rgba(237,232,223,0.12)]"
                aria-hidden
              />
            </div>
          </motion.div>
        )}

        <BillMascot
          happiness={checkIn.happiness}
          stress={checkIn.stress}
          compact
          showName={false}
          className="!mx-0"
        />
      </div>

      <div className="flex-1 min-w-0 pb-2">
        <div className="rounded-lg border border-[rgba(237,232,223,0.1)] bg-[#161922] px-4 py-3.5">
          <p className="text-[10px] uppercase tracking-wider text-[#9a948a] font-medium font-sans mb-1">
            Day Streak
          </p>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#C4A882] shrink-0" aria-hidden />
            <p className="font-heading text-3xl text-[#EDE8DF] leading-none tabular-nums">
              {checkInStreak}
            </p>
            <span className="text-sm text-[#9a948a] font-sans self-end pb-0.5">
              {checkInStreak === 1 ? "day" : "days"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
