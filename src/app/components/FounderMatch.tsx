import { Sparkles, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FounderMatch {
  id: number;
  name: string;
  photo: string;
  stage: string;
  industry: string;
  location: string;
  matchScore: number;
  bio: string;
}

export default function FounderMatch() {
  const matches: FounderMatch[] = [
    {
      id: 1,
      name: "Alex Chen",
      photo: "https://images.unsplash.com/photo-1759930683448-f1c556af0015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRlY2glMjBlbnRyZXByZW5ldXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNTM4OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stage: "Seed",
      industry: "AI/ML",
      location: "San Francisco",
      matchScore: 94,
      bio: "Building autonomous agents for enterprise workflows"
    },
    {
      id: 2,
      name: "Sarah Martinez",
      photo: "https://images.unsplash.com/photo-1706565029883-0a40ce90389d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdGFydHVwJTIwZm91bmRlciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTUzODk1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      stage: "Pre-seed",
      industry: "SaaS",
      location: "New York",
      matchScore: 92,
      bio: "Developer tools for modern engineering teams"
    },
    {
      id: 3,
      name: "Michael Park",
      photo: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBlbnRyZXByZW5ldXIlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE1Mzg5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stage: "Revenue",
      industry: "FinTech",
      location: "Austin",
      matchScore: 89,
      bio: "Building payment infrastructure for emerging markets"
    },
    {
      id: 4,
      name: "Jessica Wong",
      photo: "https://images.unsplash.com/photo-1573497491306-c8a68afac6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZW50cmVwcmVuZXVyJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNTM4OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stage: "MVP",
      industry: "HealthTech",
      location: "Los Angeles",
      matchScore: 87,
      bio: "Mental health support platform for distributed teams"
    }
  ];

  return (
    <div className="min-h-full bg-[#0F0F14] text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Founder Match</h1>
        <p className="text-sm text-white/50">Founders aligned with your stage and goals</p>
      </div>

      {/* Match Quality Banner */}
      <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-[#8B5CF6]/20 rounded-2xl p-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div>
            <h3 className="font-semibold mb-0.5">High-Quality Matches</h3>
            <p className="text-xs text-white/50">Based on stage, industry, and goals</p>
          </div>
        </div>
      </div>

      {/* Founder Cards */}
      <div className="space-y-4">
        {matches.map((founder) => (
          <div
            key={founder.id}
            className="bg-[#1A1A25] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            {/* Founder Header */}
            <div className="flex items-start gap-4 mb-4">
              <ImageWithFallback
                src={founder.photo}
                alt={founder.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{founder.name}</h3>
                  <div className="px-2.5 py-1 bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/30 rounded-lg">
                    <span className="text-xs font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                      {founder.matchScore}% match
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                    {founder.stage}
                  </span>
                  <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                    {founder.industry}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <MapPin className="w-3 h-3" />
                  {founder.location}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {founder.bio}
            </p>

            {/* Connect Button */}
            <button className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] rounded-xl font-semibold transition-all">
              Connect
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-white/40">
          Matches refresh daily based on your activity and profile
        </p>
      </div>
    </div>
  );
}
