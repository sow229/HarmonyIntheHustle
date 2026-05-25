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
      color: "from-[#6B9080] to-[#4F6D5F]",
      iconBg: "bg-[#6B9080]/10",
      iconColor: "text-[#6B9080]",
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
      color: "from-[#5C7568] to-[#4A5E52]",
      iconBg: "bg-[#5C7568]/10",
      iconColor: "text-[#5C7568]",
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
    <div className="min-h-full bg-[#0F1117] text-[#EDE8DF] px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Founder Tiers</h1>
        <p className="text-[#9a948a]">Build consistency, unlock opportunities</p>
      </div>

      {/* Current Progress */}
      <div className="bg-gradient-to-br from-[#453D36] to-[#332C26] border border-white/10 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#9a948a] mb-1">Your Progress</p>
            <h2 className="text-2xl font-bold">68% to Operator</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9a948a] mb-1">Days at Builder</p>
            <p className="text-2xl font-bold text-[#6B9080]">38</p>
          </div>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[68%] bg-gradient-to-r from-[#6B9080] to-[#5C7568] rounded-full" />
        </div>
      </div>

      {/* Tier Cards */}
      <div className="space-y-6">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          
          return (
            <div
              key={tier.name}
              className={`relative bg-[#453D36] border rounded-lg p-6 transition-all ${
                tier.current
                  ? "border-[#6B9080] shadow-lg shadow-[#6B9080]/20"
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
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center relative`}>
                    <Icon className="w-8 h-8" />
                    {tier.unlocked && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#453D36]">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      {tier.current && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#6B9080]/20 text-[#6B9080] rounded-full border border-[#6B9080]/30">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#9a948a]">Level {tier.level}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-3">
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
                      <span className={`text-sm ${tier.unlocked ? "text-[#c9c2b8]" : "text-[#9a948a]"}`}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlocks */}
              {tier.unlocks && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs font-semibold text-[#5C7568] uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Unlocks
                  </p>
                  <div className="space-y-2">
                    {tier.unlocks.map((unlock, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5C7568]" />
                        <span className="text-sm text-[#c9c2b8]">{unlock}</span>
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
