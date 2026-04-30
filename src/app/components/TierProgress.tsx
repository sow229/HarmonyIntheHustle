import { Sparkles, Rocket, Crown, Check, Lock } from "lucide-react";

export default function TierProgress() {
  const tiers = [
    {
      name: "Explorer",
      icon: Sparkles,
      level: 1,
      color: "from-slate-500 to-slate-600",
      iconBg: "bg-slate-500/10",
      iconColor: "text-slate-400",
      unlocked: true,
      current: false,
      requirements: [
        "Complete 5 daily check-ins",
        "Set up your profile",
        "Define your startup goals"
      ]
    },
    {
      name: "Builder",
      icon: Rocket,
      level: 2,
      color: "from-[#3B82F6] to-[#2563EB]",
      iconBg: "bg-[#3B82F6]/10",
      iconColor: "text-[#3B82F6]",
      unlocked: true,
      current: true,
      requirements: [
        "30-day check-in streak",
        "Consistency score above 75",
        "Complete 3 focus sessions"
      ]
    },
    {
      name: "Operator",
      icon: Crown,
      level: 3,
      color: "from-[#8B5CF6] to-[#7C3AED]",
      iconBg: "bg-[#8B5CF6]/10",
      iconColor: "text-[#8B5CF6]",
      unlocked: false,
      current: false,
      requirements: [
        "90-day check-in streak",
        "All scores above 85",
        "Builder tier for 60 days"
      ],
      unlocks: [
        "Access to Series A investors",
        "Premium mentor sessions",
        "Exclusive founder network",
        "Priority event access"
      ]
    }
  ];

  return (
    <div className="min-h-full bg-[#0F0F14] text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Founder Tiers</h1>
        <p className="text-white/50">Build consistency, unlock opportunities</p>
      </div>

      {/* Current Progress */}
      <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-white/50 mb-1">Your Progress</p>
            <h2 className="text-2xl font-bold">68% to Operator</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50 mb-1">Days at Builder</p>
            <p className="text-2xl font-bold text-[#3B82F6]">38</p>
          </div>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[68%] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full" />
        </div>
      </div>

      {/* Tier Cards */}
      <div className="space-y-6">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          
          return (
            <div
              key={tier.name}
              className={`relative bg-[#1A1A25] border rounded-2xl p-6 transition-all ${
                tier.current
                  ? "border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20"
                  : tier.unlocked
                  ? "border-white/10"
                  : "border-white/5 opacity-60"
              }`}
            >
              {/* Connector Line */}
              {index < tiers.length - 1 && (
                <div className="absolute left-11 top-full w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent" />
              )}
              
              {/* Tier Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center relative`}>
                    <Icon className="w-8 h-8" />
                    {tier.unlocked && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#1A1A25]">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      {tier.current && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#3B82F6]/20 text-[#3B82F6] rounded-full border border-[#3B82F6]/30">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">Level {tier.level}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">
                  {tier.unlocked ? "Completed" : "Requirements"}
                </p>
                <div className="space-y-2">
                  {tier.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        tier.unlocked ? "bg-emerald-500/20" : "bg-white/5"
                      }`}>
                        {tier.unlocked ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                        )}
                      </div>
                      <span className={`text-sm ${tier.unlocked ? "text-white/70" : "text-white/50"}`}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlocks */}
              {tier.unlocks && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Unlocks
                  </p>
                  <div className="space-y-2">
                    {tier.unlocks.map((unlock, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                        <span className="text-sm text-white/70">{unlock}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
