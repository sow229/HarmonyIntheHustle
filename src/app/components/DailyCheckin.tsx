import { useState } from "react";
import { useNavigate } from "react-router";
import { Battery, Brain, Zap, TrendingUp, Sparkles } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

export default function DailyCheckin() {
  const navigate = useNavigate();
  const [energy, setEnergy] = useState([70]);
  const [stress, setStress] = useState([40]);
  const [focus, setFocus] = useState([80]);
  const [progress, setProgress] = useState([65]);

  const handleSubmit = () => {
    // Simulate check-in completion
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
      color: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500"
    },
    {
      icon: Brain,
      label: "Stress Level",
      value: stress,
      setValue: setStress,
      color: "from-orange-500 to-red-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500"
    },
    {
      icon: Zap,
      label: "Focus Level",
      value: focus,
      setValue: setFocus,
      color: "from-[#3B82F6] to-[#2563EB]",
      iconBg: "bg-[#3B82F6]/10",
      iconColor: "text-[#3B82F6]"
    },
    {
      icon: TrendingUp,
      label: "Progress Made Today",
      value: progress,
      setValue: setProgress,
      color: "from-[#8B5CF6] to-[#7C3AED]",
      iconBg: "bg-[#8B5CF6]/10",
      iconColor: "text-[#8B5CF6]"
    }
  ];

  return (
    <div className="min-h-full bg-[#0F0F14] text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Daily Check-in</h1>
        <p className="text-white/50">How are you feeling today?</p>
      </div>

      {/* Date Banner */}
      <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/50 mb-1">Today</p>
            <p className="text-lg font-semibold">Thursday, Feb 19, 2026</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-[#1A1A25] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{metric.label}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value[0]}
                  </span>
                  <span className="text-white/30 text-sm">/100</span>
                </div>
              </div>

              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={metric.value}
                onValueChange={metric.setValue}
                max={100}
                step={1}
              >
                <Slider.Track className="bg-white/10 relative grow rounded-full h-2">
                  <Slider.Range className={`absolute bg-gradient-to-r ${metric.color} h-full rounded-full`} />
                </Slider.Track>
                <Slider.Thumb
                  className={`block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-grab active:cursor-grabbing`}
                  aria-label={metric.label}
                />
              </Slider.Root>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-[#3B82F6]/20"
      >
        Complete Check-in
      </button>

      {/* Quick Stats */}
      <div className="mt-6 text-center">
        <p className="text-sm text-white/50">
          Check-in takes less than 30 seconds • Builds your streak
        </p>
      </div>
    </div>
  );
}
