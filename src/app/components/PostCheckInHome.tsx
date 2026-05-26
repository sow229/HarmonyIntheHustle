import { motion } from "motion/react";
import { ArrowRight, CalendarDays, GraduationCap, Radio } from "lucide-react";
import type { CheckInResponse, MoodContext, SurfacesFeature } from "../checkIn/types";
import BillStreakHeader from "./BillStreakHeader";

type PostCheckInHomeProps = {
  firstName: string;
  moodContext: MoodContext;
  latestCheckIn: CheckInResponse;
  checkInStreak: number;
  streakBroken: boolean;
  onPrimaryCta: () => void;
};

function featureMeta(feature: SurfacesFeature): {
  title: string;
  description: string;
  cta: string;
  icon: typeof Radio;
  accent: string;
} {
  switch (feature) {
    case "forum":
      return {
        title: "Anonymous founder forum",
        description:
          "Share what's on your mind without your name attached—founders who get it are listening.",
        cta: "Open Signal",
        icon: Radio,
        accent: "from-[#6B9080]/20 to-[#5C7568]/10 border-[#6B9080]/25",
      };
    case "mentorship":
      return {
        title: "Mentor match",
        description: "Get a second brain from someone who's been through the maze before you.",
        cta: "Browse mentor matches",
        icon: GraduationCap,
        accent: "from-[#6B9080]/25 to-[#4F6D5F]/15 border-[#6B9080]/30",
      };
    case "events":
      return {
        title: "Founder events near you",
        description: "Runs, workshops, and AI nights—show up and meet builders in person.",
        cta: "Browse events",
        icon: CalendarDays,
        accent: "from-[#C4A882]/20 to-[#6B9080]/10 border-[#C4A882]/30",
      };
  }
}

export default function PostCheckInHome({
  firstName,
  moodContext,
  latestCheckIn,
  checkInStreak,
  streakBroken,
  onPrimaryCta,
}: PostCheckInHomeProps) {
  const { personalizedMessage, vibeLabel, feature, similarFoundersCount } = moodContext;
  const meta = featureMeta(feature);
  const Icon = meta.icon;

  return (
    <div className="relative z-10 w-full max-w-md mx-auto flex flex-col flex-1 min-h-0 text-left pt-8 pb-10 gap-6">
      <div>
        <p className="text-sm text-[#9a948a] mb-1 font-sans">Welcome back,</p>
        <p className="font-heading text-3xl gradient-heading">{firstName}</p>
      </div>

      <BillStreakHeader
        checkIn={latestCheckIn}
        checkInStreak={checkInStreak}
        streakBroken={streakBroken}
      />

      <p className="text-lg text-[#EDE8DF] leading-snug font-sans">{personalizedMessage}</p>

      <p className="text-[#9a948a] text-sm leading-relaxed border-l-2 border-[#6B9080]/40 pl-3 font-sans">
        {vibeLabel}
      </p>

      <p className="text-xs text-[#9a948a]/80 font-sans">
        {similarFoundersCount} other founders checked in feeling similarly today
      </p>

      <div className={`rounded-lg border p-5 bg-gradient-to-br ${meta.accent} shadow-lg shadow-black/20`}>
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-md bg-[#232833] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#6B9080]" aria-hidden />
          </div>
          <div>
            <h3 className="font-heading text-base text-[#EDE8DF] leading-tight">{meta.title}</h3>
            <p className="text-sm text-[#9a948a] mt-1.5 leading-snug font-sans">{meta.description}</p>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPrimaryCta}
        className="w-full px-6 py-4 rounded-lg font-semibold text-lg bg-[#6B9080] hover:bg-[#5C7568] text-[#0F1117] shadow-lg shadow-black/25 flex items-center justify-center gap-2 font-sans transition-colors"
      >
        {meta.cta}
        <ArrowRight className="w-5 h-5" aria-hidden />
      </motion.button>

      <motion.div className="flex-1 min-h-6" aria-hidden initial={false} />

      <p className="text-center text-xs text-[#9a948a]/60 shrink-0 font-sans">
        Your next daily check-in unlocks tomorrow.
      </p>
    </div>
  );
}
