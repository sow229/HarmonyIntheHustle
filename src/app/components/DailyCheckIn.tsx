import { useState } from "react";
import { X, Smile, Meh, Frown, Zap, Check } from "lucide-react";
import { Slider } from "./ui/slider";

interface DailyCheckInProps {
  onClose: () => void;
}

export default function DailyCheckIn({ onClose }: DailyCheckInProps) {
  const [step, setStep] = useState<"mood" | "energy" | "goals" | "complete">("mood");
  const [mood, setMood] = useState<"great" | "okay" | "struggling" | null>(null);
  const [energy, setEnergy] = useState([70]);
  const [goals, setGoals] = useState({
    product: false,
    fundraising: false,
    hiring: false,
    networking: false,
  });

  const xpReward = 50;

  const handleMoodSelect = (selectedMood: typeof mood) => {
    setMood(selectedMood);
    setTimeout(() => setStep("energy"), 300);
  };

  const handleEnergyNext = () => {
    setStep("goals");
  };

  const handleComplete = () => {
    setStep("complete");
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-[#0F0F14] w-full max-h-[85vh] rounded-t-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-lg">Daily Check-in</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2 mb-4">
            <div className={`flex-1 h-1 rounded-full transition-all ${
              step === "mood" || step === "energy" || step === "goals" || step === "complete"
                ? "bg-[#3B82F6]"
                : "bg-white/10"
            }`} />
            <div className={`flex-1 h-1 rounded-full transition-all ${
              step === "energy" || step === "goals" || step === "complete"
                ? "bg-[#3B82F6]"
                : "bg-white/10"
            }`} />
            <div className={`flex-1 h-1 rounded-full transition-all ${
              step === "goals" || step === "complete"
                ? "bg-[#3B82F6]"
                : "bg-white/10"
            }`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Mood Step */}
          {step === "mood" && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl font-bold mb-2">How are you feeling today?</h4>
              <p className="text-sm text-white/50 mb-8">
                Help us understand your current state
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleMoodSelect("great")}
                  className={`w-full p-5 rounded-2xl border-2 transition-all ${
                    mood === "great"
                      ? "bg-emerald-500/10 border-emerald-500/50"
                      : "bg-white/5 border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Smile className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold mb-1">Feeling Great</p>
                      <p className="text-xs text-white/50">Energized and ready to build</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleMoodSelect("okay")}
                  className={`w-full p-5 rounded-2xl border-2 transition-all ${
                    mood === "okay"
                      ? "bg-amber-500/10 border-amber-500/50"
                      : "bg-white/5 border-white/10 hover:border-amber-500/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Meh className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold mb-1">Doing Okay</p>
                      <p className="text-xs text-white/50">Getting through the day</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleMoodSelect("struggling")}
                  className={`w-full p-5 rounded-2xl border-2 transition-all ${
                    mood === "struggling"
                      ? "bg-red-500/10 border-red-500/50"
                      : "bg-white/5 border-white/10 hover:border-red-500/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <Frown className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold mb-1">Struggling</p>
                      <p className="text-xs text-white/50">Need some support today</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Energy Step */}
          {step === "energy" && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl font-bold mb-2">What's your energy level?</h4>
              <p className="text-sm text-white/50 mb-8">
                Track your daily energy patterns
              </p>

              <div className="mb-8">
                <div className="text-center mb-6">
                  <p className="text-6xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                    {energy[0]}%
                  </p>
                  <p className="text-sm text-white/40 mt-2">
                    {energy[0] >= 80 ? "High Energy" : energy[0] >= 50 ? "Moderate Energy" : "Low Energy"}
                  </p>
                </div>

                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <button
                onClick={handleEnergyNext}
                className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl font-semibold transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Goals Step */}
          {step === "goals" && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl font-bold mb-2">Today's focus areas</h4>
              <p className="text-sm text-white/50 mb-8">
                What are you working on today?
              </p>

              <div className="space-y-3 mb-8">
                {Object.entries({
                  product: "Product Development",
                  fundraising: "Fundraising",
                  hiring: "Hiring & Team",
                  networking: "Networking",
                }).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      setGoals({ ...goals, [key]: !goals[key as keyof typeof goals] })
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      goals[key as keyof typeof goals]
                        ? "bg-[#3B82F6]/10 border-[#3B82F6]/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-medium">{label}</span>
                    {goals[key as keyof typeof goals] && (
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                disabled={!Object.values(goals).some((v) => v)}
                className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-white/5 disabled:text-white/30 rounded-xl font-semibold transition-colors"
              >
                Complete Check-in
              </button>
            </div>
          )}

          {/* Complete Step */}
          {step === "complete" && (
            <div className="animate-in fade-in duration-300 text-center py-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 fill-white" />
              </div>
              
              <h4 className="text-2xl font-bold mb-2">Check-in Complete!</h4>
              <p className="text-white/50 mb-6">
                Great job staying consistent
              </p>

              <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-[#3B82F6]/20 rounded-2xl p-6">
                <p className="text-sm text-white/50 mb-2">FounderBucks Earned</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  +{xpReward}
                </p>
              </div>

              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-sm text-emerald-400">
                  🔥 14-day streak maintained!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}