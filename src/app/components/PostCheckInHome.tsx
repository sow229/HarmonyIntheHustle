import { motion } from "motion/react";
import { CalendarDays, GraduationCap, Radio } from "lucide-react";
import type { CheckInResponse, SurfacesFeature } from "../checkIn/types";
import BillMascot from "./BillMascot";

type PostCheckInHomeProps = {
  firstName: string;
  latestCheckIn: CheckInResponse;
  checkInStreak: number;
  hasLoggedActivityToday: boolean;
  streakWeek: Array<{ label: string; completed: boolean; day: string }>;
  onLogActivity: () => void;
  onOpenFeature: (feature: SurfacesFeature) => void;
};

export default function PostCheckInHome({
  firstName,
  latestCheckIn,
  checkInStreak,
  hasLoggedActivityToday,
  streakWeek,
  onLogActivity,
  onOpenFeature,
}: PostCheckInHomeProps) {
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const featureItems: Array<{ feature: SurfacesFeature; label: string; icon: typeof Radio }> = [
    { feature: "forum", label: "Forum", icon: Radio },
    { feature: "mentorship", label: "Mentors", icon: GraduationCap },
    { feature: "events", label: "Events", icon: CalendarDays },
  ];

  return (
    <div className="relative z-10 w-full max-w-md mx-auto flex flex-col flex-1 min-h-0 text-left pt-8 pb-10 gap-6">
      <div>
        <p className="font-heading text-4xl text-[#EDE8DF] tracking-tight">Hey {firstName}</p>
        <p className="text-sm text-[#7A9BB5] mt-1 font-sans">{todayLabel}</p>
      </div>

      <div className="flex flex-col items-center text-center py-1">
        <BillMascot
          happiness={hasLoggedActivityToday ? Math.min(100, latestCheckIn.happiness + 12) : latestCheckIn.happiness}
          stress={hasLoggedActivityToday ? Math.max(0, latestCheckIn.stress - 8) : latestCheckIn.stress}
          celebrating={hasLoggedActivityToday}
          showName={false}
          className="scale-125"
        />

        {!hasLoggedActivityToday && (
          <p className="text-sm text-[#7A9BB5] mt-4 font-sans">
            Log an activity to lock in your streak
          </p>
        )}

        <div className="flex items-center gap-3 mt-4">
          {streakWeek.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2">
              <div
                className={`w-3.5 h-3.5 rounded-full border ${
                  item.completed
                    ? "bg-[#5BBFA0] border-[#5BBFA0]"
                    : "bg-transparent border-[#7A9BB5]/45"
                }`}
                aria-label={`${item.label} ${item.completed ? "completed" : "missed"}`}
              />
              <span className="text-[10px] text-[#7A9BB5] font-sans">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="font-heading text-4xl text-[#5BBFA0] mt-5">
          {checkInStreak} day streak
        </p>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onLogActivity}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-lg border transition-colors font-sans ${
          hasLoggedActivityToday
            ? "bg-[#5BBFA0]/12 border-[#5BBFA0]/30 text-[#95cfc0]"
            : "bg-[#5BBFA0] hover:bg-[#4fa88d] border-[#5BBFA0] text-[#0D1A2A]"
        }`}
      >
        {hasLoggedActivityToday ? "Activity Logged" : "+ Log Activity"}
      </motion.button>

      <div className="h-px bg-[#7A9BB5]/25" />

      <div className="grid grid-cols-3 gap-3">
        {featureItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.feature}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenFeature(item.feature)}
              className="rounded-lg border px-3 py-4 flex flex-col items-center gap-2 transition-colors bg-white/5 border-white/10 hover:bg-white/10"
            >
              <Icon className="w-5 h-5 text-[#7A9BB5]" aria-hidden />
              <span className="text-xs font-sans text-[#7A9BB5]">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
