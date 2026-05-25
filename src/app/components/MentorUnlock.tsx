import { Lock, Calendar, Crown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function MentorUnlock() {
  const mentors = [
    {
      name: "Sarah Chen",
      title: "Former VP of Product",
      company: "Stripe",
      image: "https://images.unsplash.com/photo-1706565029883-0a40ce90389d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB0ZWNoJTIwc3RhcnR1cCUyMGZvdW5kZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNTM3OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      tier: "Builder"
    },
    {
      name: "Marcus Johnson",
      title: "Founder & CEO",
      company: "TechFlow (Acq. by Google)",
      image: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lbnRvciUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NzE1Mzc5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      tier: "Builder"
    },
    {
      name: "Priya Patel",
      title: "Partner",
      company: "Sequoia Capital",
      image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNTM3OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: false,
      tier: "Operator"
    },
    {
      name: "David Martinez",
      title: "Head of Growth",
      company: "Notion",
      image: "https://images.unsplash.com/photo-1733925457822-64c3e048fa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3RhcnR1cCUyMGVudHJlcHJlbmV1ciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE1Mzc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: false,
      tier: "Operator"
    },
    {
      name: "Alexandra Wong",
      title: "Former CTO",
      company: "Linear",
      image: "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYnVzaW5lc3MlMjBleGVjdXRpdmUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE1Mzc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: false,
      tier: "Operator"
    },
    {
      name: "James Anderson",
      title: "General Partner",
      company: "Andreessen Horowitz",
      image: "https://images.unsplash.com/photo-1695668543977-8dd5ad3b0694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5kdXN0cnklMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE1Mzc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: false,
      tier: "Operator"
    }
  ];

  const unlockedMentors = mentors.filter(m => m.unlocked);
  const lockedMentors = mentors.filter(m => !m.unlocked);

  return (
    <div className="min-h-full bg-[#0F1117] text-[#EDE8DF] px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mentors</h1>
        <p className="text-[#9a948a]">Learn from the best in Silicon Valley</p>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-br from-[#453D36] to-[#332C26] border border-white/10 rounded-lg p-5 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#5C7568]/20 flex items-center justify-center">
            <Crown className="w-5 h-5 text-[#5C7568]" />
          </div>
          <div>
            <p className="text-xs text-[#9a948a]">Unlock More Mentors</p>
            <p className="font-semibold">Reach Operator Tier (32% away)</p>
          </div>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[68%] bg-gradient-to-r from-[#6B9080] to-[#5C7568] rounded-full" />
        </div>
      </div>

      {/* Unlocked Mentors */}
      {unlockedMentors.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-4">
            Available Now
          </h2>
          <div className="space-y-3">
            {unlockedMentors.map((mentor) => (
              <button
                key={mentor.name}
                className="w-full bg-[#453D36] border border-white/10 rounded-lg p-4 hover:border-[#6B9080]/50 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#453D36]">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-[#9a948a] mb-2">{mentor.title}</p>
                    <p className="text-xs text-[#EDE8DF]/40">{mentor.company}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="px-3 py-1.5 bg-[#6B9080] rounded-lg flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">Book</span>
                    </div>
                    <span className="text-[10px] text-[#EDE8DF]/40">{mentor.tier} tier</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Locked Mentors */}
      {lockedMentors.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-4">
            Unlock at Operator Tier
          </h2>
          <div className="space-y-3">
            {lockedMentors.map((mentor) => (
              <div
                key={mentor.name}
                className="w-full bg-[#453D36] border border-white/5 rounded-lg p-4 opacity-60"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-xl object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#EDE8DF]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-[#9a948a] mb-2">{mentor.title}</p>
                    <p className="text-xs text-[#EDE8DF]/40">{mentor.company}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="px-3 py-1.5 bg-white/5 rounded-lg flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#EDE8DF]/30" />
                      <span className="text-xs font-semibold text-[#EDE8DF]/40">Locked</span>
                    </div>
                    <span className="text-[10px] text-[#EDE8DF]/40">{mentor.tier} tier</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
