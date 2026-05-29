import { useState } from "react";
import { GraduationCap, Star, TrendingUp, Zap, Check, X, MessageCircle, ChevronRight, Filter, Users, Sparkles, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

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

export default function UnifiedMentorMatch() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "available" | "top">("all");
  const [activeTab, setActiveTab] = useState<"mentors" | "founders">("mentors");
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [showConnectAnimation, setShowConnectAnimation] = useState(false);

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

  const founders: FounderMatch[] = [
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

  const currentMentor = mentors[currentIndex];

  const handlePass = () => {
    setSwipeDirection("left");
    setTimeout(() => {
      if (currentIndex < mentors.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      setSwipeDirection(null);
    }, 300);
  };

  const handleConnect = () => {
    setShowConnectAnimation(true);
    setTimeout(() => {
      setSwipeDirection("right");
      setTimeout(() => {
        if (currentIndex < mentors.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        setSwipeDirection(null);
        setShowConnectAnimation(false);
      }, 300);
    }, 800);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] px-6 pt-14 pb-6 app-texture">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#6B9080] via-[#5C7568] to-[#8A9B8F] bg-clip-text text-transparent">
            Mentor Match
          </h1>
          <button className="p-2 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-white/60 dark:text-white/60 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-white/50 dark:text-white/50 text-gray-600">Connect with mentors and fellow founders</p>
      </div>

      {/* Tab Selector */}
      <div className="bg-white/5 dark:bg-white/5 bg-gray-100 rounded-xl p-1 mb-6 flex gap-1">
        <button
          onClick={() => setActiveTab("mentors")}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === "mentors"
              ? "bg-gradient-to-r from-[#6B9080] to-[#5C7568] text-white shadow-lg shadow-[#6B9080]/20"
              : "text-white/60 dark:text-white/60 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Experienced Mentors
          </div>
        </button>
        <button
          onClick={() => setActiveTab("founders")}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === "founders"
              ? "bg-gradient-to-r from-[#6B9080] to-[#5C7568] text-white shadow-lg shadow-[#6B9080]/20"
              : "text-white/60 dark:text-white/60 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Fellow Founders
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "mentors" ? (
          <motion.div
            key="mentors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Filter Pills */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === "all"
                    ? "bg-[#6B9080] text-white shadow-lg shadow-[#6B9080]/30"
                    : "bg-white/5 dark:bg-white/5 bg-gray-100 text-white/60 dark:text-white/60 text-gray-600 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200"
                }`}
              >
                All Mentors
              </button>
              <button
                onClick={() => setFilter("available")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === "available"
                    ? "bg-[#6B9080] text-white shadow-lg shadow-[#6B9080]/30"
                    : "bg-white/5 dark:bg-white/5 bg-gray-100 text-white/60 dark:text-white/60 text-gray-600 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200"
                }`}
              >
                Available Now
              </button>
              <button
                onClick={() => setFilter("top")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === "top"
                    ? "bg-[#6B9080] text-white shadow-lg shadow-[#6B9080]/30"
                    : "bg-white/5 dark:bg-white/5 bg-gray-100 text-white/60 dark:text-white/60 text-gray-600 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200"
                }`}
              >
                Top Rated
              </button>
            </div>

            {/* Mentor Card */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={
                swipeDirection === "left"
                  ? { x: -500, opacity: 0, rotate: -20 }
                  : swipeDirection === "right"
                  ? { x: 500, opacity: 0, rotate: 20 }
                  : showConnectAnimation
                  ? { scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }
                  : { scale: 1, opacity: 1, x: 0, rotate: 0 }
              }
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#161922] to-[#12151D] border border-[rgba(237,232,223,0.1)] rounded-xl overflow-hidden mb-6 shadow-2xl shadow-black/20 relative"
            >
              {/* Happy Animation Overlay */}
              <AnimatePresence>
                {showConnectAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 z-10 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.6 }}
                      className="text-8xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Photo */}
              <div className="relative h-80 bg-gradient-to-b from-white/5 to-transparent">
                <ImageWithFallback
                  src={`https://source.unsplash.com/800x1000/?${currentMentor.photo}`}
                  alt={currentMentor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151D] via-transparent to-transparent" />

                {/* Match Score Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#6B9080] to-[#5C7568] rounded-full flex items-center gap-2 shadow-lg shadow-[#6B9080]/50"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span className="text-sm font-bold">{currentMentor.matchScore}% Match</span>
                </motion.div>

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                    currentMentor.availability === "High"
                      ? "bg-white/20 border border-white/30 text-white"
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
                  <p className="text-white/60 dark:text-white/60 text-gray-600 text-sm mb-2">{currentMentor.title}</p>
                  <p className="text-white/40 dark:text-white/40 text-gray-500 text-xs">{currentMentor.company}</p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentMentor.expertise.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#6B9080]/10 to-[#5C7568]/10 border border-[#6B9080]/20 rounded-lg text-xs font-medium text-[#6B9080]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <GraduationCap className="w-3 h-3 text-white/40 dark:text-white/40 text-gray-400" />
                      <p className="text-lg font-bold">{currentMentor.exits}</p>
                    </div>
                    <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">Exits</p>
                  </div>
                  <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-white/40 dark:text-white/40 text-gray-400" />
                      <p className="text-lg font-bold">{currentMentor.fundsRaised}</p>
                    </div>
                    <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">Raised</p>
                  </div>
                  <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-white/40 dark:text-white/40 text-gray-400" />
                      <p className="text-lg font-bold">{currentMentor.responseRate}%</p>
                    </div>
                    <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">Response</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-sm text-white/70 dark:text-white/70 text-gray-700 leading-relaxed">{currentMentor.bio}</p>
                </div>

                {/* Experience Info */}
                <div className="flex items-center justify-between mb-6 p-3 bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl">
                  <span className="text-xs text-white/50 dark:text-white/50 text-gray-600">{currentMentor.experience} experience</span>
                  <span className="text-xs text-white/50 dark:text-white/50 text-gray-600">Mentoring {currentMentor.mentees} founders</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePass}
                className="flex-1 py-4 bg-white/5 dark:bg-white/5 bg-gray-100 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200 border border-white/10 dark:border-white/10 border-gray-200 hover:border-red-500/30 rounded-lg transition-all flex items-center justify-center gap-3 group"
              >
                <X className="w-6 h-6 text-white/40 dark:text-white/40 text-gray-500 group-hover:text-red-400 transition-colors" />
                <span className="font-semibold text-white/60 dark:text-white/60 text-gray-700 group-hover:text-white dark:group-hover:text-white group-hover:text-gray-900 transition-colors">Pass</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleConnect}
                className="flex-1 py-4 bg-gradient-to-r from-[#6B9080] to-[#5C7568] hover:from-[#4F6D5F] hover:to-[#4A5E52] rounded-lg transition-all flex items-center justify-center gap-3 group shadow-lg shadow-[#6B9080]/30"
              >
                <Check className="w-6 h-6" />
                <span className="font-semibold">Connect</span>
              </motion.button>
            </div>

            {/* Progress Indicator */}
            <div className="text-center mb-6">
              <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">
                {currentIndex + 1} of {mentors.length}
              </p>
              <div className="flex gap-1 justify-center mt-2">
                {mentors.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-gradient-to-r from-[#6B9080] to-[#5C7568]"
                        : idx < currentIndex
                        ? "w-4 bg-emerald-500/50"
                        : "w-4 bg-white/10 dark:bg-white/10 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* My Connections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-white/50 dark:text-white/50 text-gray-600 uppercase tracking-wide font-sans">
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
                    className="bg-[#161922] dark:bg-[#161922] bg-gray-100 border border-white/10 dark:border-white/10 border-gray-200 rounded-xl p-4 hover:border-[#6B9080]/50 transition-all cursor-pointer"
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
                        <p className="text-xs text-white/50 dark:text-white/50 text-gray-600 truncate">{mentor.title}</p>
                      </div>
                      <button className="p-2 bg-[#6B9080]/10 hover:bg-[#6B9080]/20 rounded-lg transition-colors flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-[#6B9080]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="founders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Match Quality Banner */}
            <div className="bg-gradient-to-br from-[#161922] to-[#12151D] border border-[#6B9080]/20 rounded-lg p-5 mb-8 shadow-lg shadow-black/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C7568]/20 to-[#8A9B8F]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#5C7568]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">High-Quality Matches</h3>
                  <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">Based on stage, industry, and goals</p>
                </div>
              </div>
            </div>

            {/* Founder Cards */}
            <div className="space-y-4">
              {founders.map((founder, idx) => (
                <motion.div
                  key={founder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#161922] dark:bg-[#161922] bg-gray-50 border border-white/10 dark:border-white/10 border-gray-200 rounded-lg p-6 hover:border-[#5C7568]/50 hover:shadow-lg hover:shadow-[#5C7568]/10 transition-all"
                >
                  {/* Founder Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <ImageWithFallback
                      src={founder.photo}
                      alt={founder.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{founder.name}</h3>
                        <div className="px-2.5 py-1 bg-gradient-to-r from-[#6B9080]/20 to-[#5C7568]/20 border border-[#6B9080]/30 rounded-lg">
                          <span className="text-xs font-bold bg-gradient-to-r from-[#6B9080] to-[#5C7568] bg-clip-text text-transparent">
                            {founder.matchScore}% match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-white/5 dark:bg-white/5 bg-gray-100 border border-white/10 dark:border-white/10 border-gray-200 rounded-md">
                          {founder.stage}
                        </span>
                        <span className="text-xs px-2 py-1 bg-white/5 dark:bg-white/5 bg-gray-100 border border-white/10 dark:border-white/10 border-gray-200 rounded-md">
                          {founder.industry}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-white/50 dark:text-white/50 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {founder.location}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-white/70 dark:text-white/70 text-gray-700 mb-4 leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Connect Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#6B9080] to-[#4F6D5F] hover:from-[#4F6D5F] hover:to-[#405A4F] rounded-xl font-semibold transition-all shadow-lg shadow-[#6B9080]/30"
                  >
                    Connect
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">
                Matches refresh daily based on your activity and profile
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}