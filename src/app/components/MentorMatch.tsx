import { useState } from "react";
import { GraduationCap, Star, TrendingUp, Zap, Check, X, MessageCircle, ChevronRight, Filter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Mentor {
  id: number;
  name: string;
  photo: string;
  title: string;
  company: string;
  expertise: string[];
  matchScore: number;
  experience: string;
  exits: number;
  fundsRaised: string;
  availability: "High" | "Medium" | "Low";
  responseRate: number;
  mentees: number;
  bio: string;
}

export default function MentorMatch() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "available" | "top">("all");

  const mentors: Mentor[] = [
    {
      id: 1,
      name: "Sarah Chen",
      photo: "professional asian woman entrepreneur",
      title: "3x Founder & Angel Investor",
      company: "Ex-Stripe, Founder @ FinFlow",
      expertise: ["SaaS", "B2B", "Product-Led Growth"],
      matchScore: 94,
      experience: "15 years",
      exits: 2,
      fundsRaised: "$45M",
      availability: "High",
      responseRate: 92,
      mentees: 12,
      bio: "Scaled FinFlow from $0 to $10M ARR. Focus on helping early-stage SaaS founders navigate product-market fit."
    },
    {
      id: 2,
      name: "Marcus Thompson",
      photo: "professional black male tech executive",
      title: "Former VP Product",
      company: "Ex-Notion, Founder @ TaskHub",
      expertise: ["Consumer", "AI/ML", "Growth"],
      matchScore: 89,
      experience: "12 years",
      exits: 1,
      fundsRaised: "$32M",
      availability: "Medium",
      responseRate: 88,
      mentees: 8,
      bio: "Built products used by 50M+ users. Passionate about consumer AI and product thinking."
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      photo: "professional latina woman ceo",
      title: "Serial Entrepreneur",
      company: "Ex-Airbnb, Founder @ SpaceOS",
      expertise: ["Marketplace", "Operations", "Fundraising"],
      matchScore: 86,
      experience: "10 years",
      exits: 1,
      fundsRaised: "$28M",
      availability: "Low",
      responseRate: 75,
      mentees: 15,
      bio: "Expert in two-sided marketplaces and operational excellence. Raised from top-tier VCs."
    },
    {
      id: 4,
      name: "David Park",
      photo: "professional asian male startup founder",
      title: "YC Alum & Advisor",
      company: "Ex-Google, Founder @ DevKit",
      expertise: ["Developer Tools", "B2B SaaS", "GTM"],
      matchScore: 91,
      experience: "14 years",
      exits: 2,
      fundsRaised: "$50M",
      availability: "High",
      responseRate: 94,
      mentees: 10,
      bio: "Built and sold two developer-focused companies. Love helping technical founders with go-to-market."
    }
  ];

  const currentMentor = mentors[currentIndex];

  const handlePass = () => {
    if (currentIndex < mentors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleConnect = () => {
    // Handle connection logic
    if (currentIndex < mentors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-full bg-[#0F1117] text-[#EDE8DF] px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Mentor Match</h1>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-[#9a948a]" />
          </button>
        </div>
        <p className="text-sm text-[#9a948a]">Connect with experienced founders</p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-[#6B9080] text-[#EDE8DF]"
              : "bg-white/5 text-[#9a948a] hover:bg-white/10"
          }`}
        >
          All Mentors
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filter === "available"
              ? "bg-[#6B9080] text-[#EDE8DF]"
              : "bg-white/5 text-[#9a948a] hover:bg-white/10"
          }`}
        >
          Available Now
        </button>
        <button
          onClick={() => setFilter("top")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            filter === "top"
              ? "bg-[#6B9080] text-[#EDE8DF]"
              : "bg-white/5 text-[#9a948a] hover:bg-white/10"
          }`}
        >
          Top Rated
        </button>
      </div>

      {/* Mentor Card */}
      <div className="bg-gradient-to-br from-[#161922] to-[#12151D] border border-white/10 rounded-xl overflow-hidden mb-6">
        {/* Photo */}
        <div className="relative h-80 bg-gradient-to-b from-white/5 to-transparent">
          <ImageWithFallback
            src={`https://source.unsplash.com/800x1000/?${currentMentor.photo}`}
            alt={currentMentor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151D] via-transparent to-transparent" />
          
          {/* Match Score Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-[#6B9080] rounded-full flex items-center gap-2">
            <Zap className="w-4 h-4 fill-white" />
            <span className="text-sm font-bold">{currentMentor.matchScore}% Match</span>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              currentMentor.availability === "High" 
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : currentMentor.availability === "Medium"
                ? "bg-[#6B9080]/20 border border-[#6B9080]/30 text-[#A8C4B8]"
                : "bg-red-500/20 border border-red-500/30 text-red-400"
            }`}>
              {currentMentor.availability} Availability
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1">{currentMentor.name}</h2>
            <p className="text-[#9a948a] text-sm mb-2">{currentMentor.title}</p>
            <p className="text-[#EDE8DF]/40 text-xs">{currentMentor.company}</p>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentMentor.expertise.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-[#6B9080]/10 border border-[#6B9080]/20 rounded-lg text-xs font-medium text-[#6B9080]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <GraduationCap className="w-3 h-3 text-[#EDE8DF]/40" />
                <p className="text-lg font-bold">{currentMentor.exits}</p>
              </div>
              <p className="text-xs text-[#EDE8DF]/40">Exits</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-[#EDE8DF]/40" />
                <p className="text-lg font-bold">{currentMentor.fundsRaised}</p>
              </div>
              <p className="text-xs text-[#EDE8DF]/40">Raised</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-3 h-3 text-[#EDE8DF]/40" />
                <p className="text-lg font-bold">{currentMentor.responseRate}%</p>
              </div>
              <p className="text-xs text-[#EDE8DF]/40">Response</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <p className="text-sm text-[#c9c2b8] leading-relaxed">{currentMentor.bio}</p>
          </div>

          {/* Experience Info */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/5 rounded-xl">
            <span className="text-xs text-[#9a948a]">{currentMentor.experience} experience</span>
            <span className="text-xs text-[#9a948a]">Mentoring {currentMentor.mentees} founders</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePass}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-lg transition-all flex items-center justify-center gap-3 group"
        >
          <X className="w-6 h-6 text-[#EDE8DF]/40 group-hover:text-red-400 transition-colors" />
          <span className="font-semibold text-[#9a948a] group-hover:text-[#EDE8DF] transition-colors">Pass</span>
        </button>
        <button
          onClick={handleConnect}
          className="flex-1 py-4 bg-gradient-to-r from-[#6B9080] to-[#5C7568] hover:from-[#4F6D5F] hover:to-[#4A5E52] rounded-lg transition-all flex items-center justify-center gap-3 group shadow-lg shadow-[#6B9080]/20"
        >
          <Check className="w-6 h-6" />
          <span className="font-semibold">Connect</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="text-center mb-6">
        <p className="text-xs text-[#EDE8DF]/40">
          {currentIndex + 1} of {mentors.length}
        </p>
        <div className="flex gap-1 justify-center mt-2">
          {mentors.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex 
                  ? "w-8 bg-[#6B9080]" 
                  : idx < currentIndex
                  ? "w-4 bg-emerald-500/50"
                  : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* My Connections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-[#9a948a] uppercase tracking-wide font-sans">
            My Mentor Connections
          </h3>
          <button className="text-xs font-semibold text-[#6B9080] hover:text-[#4F6D5F] flex items-center gap-1">
            View All
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mentors.slice(0, 2).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#161922] border border-white/10 rounded-xl p-4 hover:border-[#6B9080]/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/200x200/?${mentor.photo}`}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{mentor.name}</p>
                  <p className="text-xs text-[#9a948a] truncate">{mentor.title}</p>
                </div>
                <button className="p-2 bg-[#6B9080]/10 hover:bg-[#6B9080]/20 rounded-lg transition-colors flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#6B9080]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
