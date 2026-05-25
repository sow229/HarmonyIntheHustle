import { useState } from "react";
import { useNavigate } from "react-router";
import { Battery, Brain, Zap, TrendingUp, Sparkles, ArrowLeft, Sun, Coffee, CloudRain } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "motion/react";
import { useCheckInApp } from "../checkIn/CheckInContext";

type Mood = "great" | "okay" | "struggling";

const moods: {
  id: Mood;
  title: string;
  subtitle: string;
  icon: typeof Sun;
  gradient: string;
  border: string;
  iconWrap: string;
}[] = [
  {
    id: "great",
    title: "Feeling Great",
    subtitle: "Energized and ready to build",
    icon: Sun,
    gradient: "from-[#6B9080]/25 to-[#5C7568]/12",
    border: "border-[#6B9080]/30 hover:border-[#6B9080]/50",
    iconWrap: "from-[#6B9080]/35 to-[#5C7568]/20 text-[#A8C4B8]",
  },
  {
    id: "okay",
    title: "Doing Okay",
    subtitle: "Getting through the day",
    icon: Coffee,
    gradient: "from-[#C4A882]/18 to-[#A8B5A0]/10",
    border: "border-[#C4A882]/28 hover:border-[#C4A882]/45",
    iconWrap: "from-[#C4A882]/30 to-[#A8B5A0]/15 text-[#E8DFD0]",
  },
  {
    id: "struggling",
    title: "Struggling",
    subtitle: "Need some support today",
    icon: CloudRain,
    gradient: "from-[#9B8B7E]/22 to-[#7A6B62]/12",
    border: "border-[#9B8B7E]/32 hover:border-[#9B8B7E]/48",
    iconWrap: "from-[#9B8B7E]/35 to-[#7A6B62]/20 text-[#D4C9BE]",
  },
];

export default function DailyCheckin() {
  const navigate = useNavigate();
  const { completeCheckIn } = useCheckInApp();
  const [step, setStep] = useState<"mood" | "metrics">("mood");
  const [mood, setMood] = useState<Mood | null>(null);
  const [energy, setEnergy] = useState([70]);
  const [stress, setStress] = useState([40]);
  const [focus, setFocus] = useState([80]);
  const [progress, setProgress] = useState([65]);

  const handleSubmit = () => {
    if (!mood) return;
    completeCheckIn({
      mood,
      energy: energy[0],
      stress: stress[0],
      focus: focus[0],
      progress: progress[0],
    });
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const metrics = [
    {
      icon: Battery,
      label: "Energy Level",
      value: energy,
      setValue: setEnergy,
      color: "from-[#6B9080] to-[#5C7568]",
      iconBg: "bg-[#6B9080]/15",
      iconColor: "text-[#6B9080]",
    },
    {
      icon: Brain,
      label: "Stress Level",
      value: stress,
      setValue: setStress,
      color: "from-[#C4A882] to-[#9B8B7E]",
      iconBg: "bg-[#C4A882]/15",
      iconColor: "text-[#C4A882]",
    },
    {
      icon: Zap,
      label: "Focus Level",
      value: focus,
      setValue: setFocus,
      color: "from-[#8A9B8F] to-[#6B9080]",
      iconBg: "bg-[#8A9B8F]/15",
      iconColor: "text-[#8A9B8F]",
    },
    {
      icon: TrendingUp,
      label: "Progress Made Today",
      value: progress,
      setValue: setProgress,
      color: "from-[#5C7568] to-[#4F6D5F]",
      iconBg: "bg-[#5C7568]/15",
      iconColor: "text-[#5C7568]",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] overflow-hidden app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-[#6B9080]/10 rounded-full blur-3xl"
          initial={false}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5C7568]/8 rounded-full blur-3xl"
          initial={false}
        />
      </div>

      <header className="relative z-10 flex items-center gap-3 px-4 pb-2 shrink-0 pt-[max(3.75rem,calc(env(safe-area-inset-top)+2.35rem))]">
        <button
          type="button"
          onClick={() => (step === "metrics" ? setStep("mood") : navigate("/"))}
          className="p-2.5 rounded-md bg-[#161922] border border-[rgba(237,232,223,0.1)] hover:bg-[#1c212b] transition-colors"
          aria-label={step === "metrics" ? "Back" : "Close check-in"}
        >
          <ArrowLeft className="w-5 h-5 text-[#EDE8DF]" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#9a948a] font-medium uppercase tracking-wider font-sans">Daily check-in</p>
          <p className="text-sm text-[#EDE8DF] truncate font-sans">
            {step === "mood" ? "Step 1 of 2" : "Step 2 of 2"}
          </p>
        </div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8">
        <AnimatePresence mode="wait">
          {step === "mood" ? (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="max-w-md mx-auto pt-4"
            >
              <h1 className="font-heading text-2xl sm:text-3xl tracking-tight mb-2">How are you today?</h1>
              <p className="text-[#9a948a] mb-8 font-sans">Tap the option that fits best right now.</p>

              <div className="space-y-3">
                {moods.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.button
                      key={m.id}
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMood(m.id);
                        setStep("metrics");
                      }}
                      className={`w-full text-left rounded-lg border p-5 transition-all bg-gradient-to-br ${m.gradient} ${m.border}`}
                    >
                      <motion.div className="flex items-start gap-4" initial={false}>
                        <div
                          className={`w-12 h-12 rounded-md bg-gradient-to-br ${m.iconWrap} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-[#EDE8DF] font-sans">{m.title}</p>
                          <p className="text-[#9a948a] text-sm mt-1 leading-snug font-sans">{m.subtitle}</p>
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="max-w-md mx-auto pt-2 pb-4"
            >
              <div className="mb-8">
                <h1 className="font-heading text-2xl sm:text-3xl tracking-tight mb-2">Daily Check-in</h1>
                {mood && (
                  <p className="text-sm text-[#9a948a] mb-1 font-sans">
                    {moods.find((x) => x.id === mood)?.title} ·{" "}
                    {moods.find((x) => x.id === mood)?.subtitle}
                  </p>
                )}
                <p className="text-[#9a948a] font-sans">Tune the sliders to match how you feel.</p>
              </div>

              <div className="bg-[#161922] border border-[rgba(237,232,223,0.1)] rounded-lg p-5 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#9a948a] mb-1 font-sans">Today</p>
                    <p className="text-lg font-semibold font-sans">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-[#6B9080] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#0F1117]" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="bg-[#161922] border border-[rgba(237,232,223,0.1)] rounded-lg p-5"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <motion.div
                          className={`w-10 h-10 rounded-md ${metric.iconBg} flex items-center justify-center`}
                          initial={false}
                        >
                          <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                        </motion.div>
                        <div className="flex-1">
                          <p className="font-semibold font-sans">{metric.label}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                          >
                            {metric.value[0]}
                          </span>
                          <span className="text-[#9a948a]/60 text-sm font-sans">/100</span>
                        </div>
                      </div>

                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={metric.value}
                        onValueChange={metric.setValue}
                        max={100}
                        step={1}
                      >
                        <Slider.Track className="bg-[#232833] relative grow rounded-full h-2">
                          <Slider.Range className={`absolute bg-gradient-to-r ${metric.color} h-full rounded-full`} />
                        </Slider.Track>
                        <Slider.Thumb
                          className="block w-5 h-5 bg-[#EDE8DF] shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-[#6B9080]/50 cursor-grab active:cursor-grabbing"
                          aria-label={metric.label}
                        />
                      </Slider.Root>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#6B9080] hover:bg-[#5C7568] text-[#0F1117] font-semibold py-4 rounded-lg transition-colors shadow-lg shadow-black/20 font-sans"
              >
                Complete Check-in
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#9a948a] font-sans">
                  Check-in takes less than 30 seconds · Builds your streak
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
