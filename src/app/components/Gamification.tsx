import { useState } from "react";
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  Award, 
  Star,
  Crown,
  Flame,
  Users,
  CheckCircle2,
  Lock,
  ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: typeof Trophy;
  points: number;
  unlocked: boolean;
  progress?: number;
  total?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface LeaderboardUser {
  rank: number;
  name: string;
  photo: string;
  points: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

export default function Gamification() {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "leaderboard">("overview");

  const userLevel = 12;
  const userPoints = 2847;
  const pointsToNextLevel = 3000;
  const currentStreak = 14;
  const longestStreak = 28;

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first daily check-in",
      icon: CheckCircle2,
      points: 50,
      unlocked: true,
      rarity: "common"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: Flame,
      points: 100,
      unlocked: true,
      rarity: "common"
    },
    {
      id: 3,
      title: "Social Butterfly",
      description: "Make 5 founder connections",
      icon: Users,
      points: 150,
      unlocked: true,
      progress: 5,
      total: 5,
      rarity: "rare"
    },
    {
      id: 4,
      title: "Rising Star",
      description: "Reach level 10",
      icon: Star,
      points: 200,
      unlocked: true,
      rarity: "rare"
    },
    {
      id: 5,
      title: "Mentor Match",
      description: "Connect with your first mentor",
      icon: Award,
      points: 250,
      unlocked: false,
      progress: 0,
      total: 1,
      rarity: "epic"
    },
    {
      id: 6,
      title: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: Crown,
      points: 500,
      unlocked: false,
      progress: 14,
      total: 30,
      rarity: "epic"
    },
    {
      id: 7,
      title: "Community Leader",
      description: "Get 100 upvotes on Signal",
      icon: TrendingUp,
      points: 300,
      unlocked: false,
      progress: 42,
      total: 100,
      rarity: "epic"
    },
    {
      id: 8,
      title: "Legendary Founder",
      description: "Reach level 50",
      icon: Trophy,
      points: 1000,
      unlocked: false,
      progress: 12,
      total: 50,
      rarity: "legendary"
    }
  ];

  const leaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      name: "Alex Chen",
      photo: "professional asian entrepreneur startup",
      points: 5420,
      level: 18,
      streak: 42
    },
    {
      rank: 2,
      name: "Maya Rodriguez",
      photo: "professional latina woman tech founder",
      points: 4892,
      level: 16,
      streak: 35
    },
    {
      rank: 3,
      name: "Jordan Williams",
      photo: "professional black entrepreneur ceo",
      points: 4156,
      level: 15,
      streak: 28
    },
    {
      rank: 4,
      name: "You",
      photo: "professional entrepreneur founder",
      points: 2847,
      level: 12,
      streak: 14,
      isCurrentUser: true
    },
    {
      rank: 5,
      name: "Sarah Kim",
      photo: "professional asian woman startup founder",
      points: 2634,
      level: 11,
      streak: 21
    }
  ];

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common": return "text-white/60 border-white/20 bg-white/5";
      case "rare": return "text-[#8A9B8F] border-[#6B9080]/30 bg-[#6B9080]/10";
      case "epic": return "text-[#C4A882] border-[#C4A882]/30 bg-[#C4A882]/10";
      case "legendary": return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    }
  };

  return (
    <div className="min-h-full bg-[#0F1117] text-[#EDE8DF] px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-3xl tracking-tight mb-2 text-[#EDE8DF]">Level Up</h1>
        <p className="text-sm text-white/50">Track your founder journey</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#161922] border border-white/10 rounded-xl p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-[#6B9080] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "achievements"
              ? "bg-[#6B9080] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "leaderboard"
              ? "bg-[#6B9080] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Leaderboard
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="bg-gradient-to-br from-[#161922] to-[#12151D] border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-white/50 mb-1">Current Level</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#6B9080] to-[#5C7568] bg-clip-text text-transparent">
                    {userLevel}
                  </span>
                  <span className="text-lg text-white/40">/ 50</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#6B9080] to-[#5C7568] flex items-center justify-center">
                <Zap className="w-8 h-8 fill-white" />
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Progress to Level {userLevel + 1}</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6B9080] to-[#5C7568] rounded-full transition-all duration-500"
                  style={{ width: `${(userPoints / pointsToNextLevel) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-white/40 mt-2">
              {Math.round((userPoints / pointsToNextLevel) * 100)}% complete
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#161922] border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-3">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-2xl font-bold mb-1">{currentStreak}</p>
              <p className="text-xs text-white/50">Day Streak</p>
              <p className="text-xs text-emerald-400 mt-1">+{currentStreak * 10} FounderBucks</p>
            </div>

            <div className="bg-[#161922] border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-[#5C7568]/10 flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5 text-[#5C7568]" />
              </div>
              <p className="text-2xl font-bold mb-1">{achievements.filter(a => a.unlocked).length}</p>
              <p className="text-xs text-white/50">Achievements</p>
              <p className="text-xs text-white/40 mt-1">of {achievements.length}</p>
            </div>

            <div className="bg-[#161922] border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-[#6B9080]/10 flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-[#6B9080]" />
              </div>
              <p className="text-2xl font-bold mb-1">{userPoints}</p>
              <p className="text-xs text-white/50">Total FounderBucks</p>
              <p className="text-xs text-white/40 mt-1">All time</p>
            </div>

            <div className="bg-[#161922] border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-2xl font-bold mb-1">#{leaderboard.find(u => u.isCurrentUser)?.rank}</p>
              <p className="text-xs text-white/50">Rank</p>
              <p className="text-xs text-emerald-400 mt-1">Top 10%</p>
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`border rounded-xl p-4 ${getRarityColor(achievement.rarity)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-0.5">{achievement.title}</h4>
                        <p className="text-xs text-white/60">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">+{achievement.points}</p>
                        <p className="text-xs text-white/40">FounderBucks</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const isLocked = !achievement.unlocked;
            
            return (
              <div
                key={achievement.id}
                className={`border rounded-xl p-5 transition-all ${
                  isLocked 
                    ? "bg-white/5 border-white/10 opacity-60" 
                    : `${getRarityColor(achievement.rarity)}`
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isLocked ? "bg-white/5" : "bg-white/10"
                    }`}>
                      {isLocked ? (
                        <Lock className="w-7 h-7 text-white/40" />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>
                    {!isLocked && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center border-2 border-[#0F1117]">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <div className="text-right">
                        <p className="font-bold text-sm">+{achievement.points}</p>
                        <p className="text-xs text-white/40">FounderBucks</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 mb-2">{achievement.description}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${
                      getRarityColor(achievement.rarity)
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>

                {/* Progress Bar for locked achievements */}
                {isLocked && achievement.progress !== undefined && achievement.total !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-white/50">Progress</span>
                      <span className="font-medium">
                        {achievement.progress} / {achievement.total}
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#6B9080] to-[#5C7568] rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`border rounded-xl p-4 transition-all ${
                user.isCurrentUser
                  ? "bg-gradient-to-br from-[#6B9080]/10 to-[#5C7568]/10 border-[#6B9080]/30"
                  : "bg-[#161922] border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 text-center">
                  {user.rank <= 3 ? (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      user.rank === 1 
                        ? "bg-amber-500/20 text-amber-400" 
                        : user.rank === 2 
                        ? "bg-gray-400/20 text-gray-300"
                        : "bg-orange-500/20 text-orange-400"
                    }`}>
                      <Crown className="w-5 h-5" />
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-white/40">#{user.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 flex-shrink-0">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/200x200/?${user.photo}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{user.name}</p>
                    {user.isCurrentUser && (
                      <span className="px-2 py-0.5 bg-[#6B9080] rounded text-xs font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span>Level {user.level}</span>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-xl font-bold">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-white/40">FounderBucks</p>
                </div>
              </div>
            </div>
          ))}

          {/* View Full Leaderboard */}
          <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
            View Full Leaderboard
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}