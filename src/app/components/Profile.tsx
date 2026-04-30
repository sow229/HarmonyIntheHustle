import { useState } from "react";
import { Trophy, Activity, Radio, Users, Calendar, TrendingUp, Award, Settings, X, Sun, Moon, CheckCircle2, Link2 } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export default function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(true);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const { theme, setTheme } = useTheme();
  const activityHistory = [
    { date: "Feb 19", type: "Signal Post", description: "Shared thoughts on hiring challenges" },
    { date: "Feb 18", type: "Founder Match", description: "Connected with Alex Chen" },
    { date: "Feb 17", type: "Insight", description: "Completed sleep analysis" },
    { date: "Feb 16", type: "Signal Post", description: "Discussed burnout prevention" },
  ];

  const stats = [
    { label: "Signal Posts", value: "24", icon: Radio },
    { label: "Connections", value: "12", icon: Users },
    { label: "Insights Viewed", value: "89", icon: Activity },
    { label: "Days Active", value: "37", icon: Calendar },
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F0F14] via-[#0F0F14] to-[#1A0F1E] dark:bg-gradient-to-b dark:from-[#0F0F14] dark:via-[#0F0F14] dark:to-[#1A0F1E] bg-white text-gray-900 dark:text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        {/* User Card */}
        <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-2xl font-bold">
              SC
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Steve Chen</h2>
              <p className="text-sm text-white/50 mb-2">steve@startup.com</p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-white/10 border border-white/20 rounded-md">
                  SaaS
                </span>
                <span className="text-xs px-2 py-1 bg-white/10 border border-white/20 rounded-md">
                  Pre-seed
                </span>
              </div>
            </div>
          </div>

          {/* Founder Score */}
          <div className="bg-[#141419] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Founder Score</p>
                  <p className="font-bold text-2xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                    87
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-1">
                  <span className="text-xs font-semibold text-emerald-400">Performing</span>
                </div>
                <p className="text-xs text-white/50">+3 this week</p>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
          Activity Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#1A1A25] border border-white/10 rounded-xl p-4">
                <Icon className="w-5 h-5 text-white/40 mb-3" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          This Week's Progress
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Focus Score</span>
              <span className="text-sm font-semibold">92/100</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Recovery Score</span>
              <span className="text-sm font-semibold">84/100</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[84%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Consistency</span>
              <span className="text-sm font-semibold">89%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[89%] bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
          Recent Activity
        </h3>
        <div className="space-y-2">
          {activityHistory.map((activity, index) => (
            <div
              key={index}
              className="bg-[#1A1A25] border border-white/10 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                {activity.type === "Signal Post" && <Radio className="w-4 h-4 text-[#3B82F6]" />}
                {activity.type === "Founder Match" && <Users className="w-4 h-4 text-[#8B5CF6]" />}
                {activity.type === "Insight" && <Activity className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{activity.type}</p>
                  <span className="text-xs text-white/40">{activity.date}</span>
                </div>
                <p className="text-xs text-white/60">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#8B5CF6]" />
          <h3 className="font-semibold">Achievements</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center mb-2">
              <Radio className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-white/60 text-center">Active Sharer</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center mb-2">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-white/60 text-center">Connector</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-white/60 text-center">Consistent</span>
          </div>

          <div className="flex flex-col items-center opacity-40">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-white/30" />
            </div>
            <span className="text-[10px] text-white/40 text-center">Top 10%</span>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-[#0F0F14] w-full max-h-[85vh] rounded-t-3xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-lg">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Gamification Settings */}
              <div>
                <h4 className="text-sm font-semibold text-white/70 dark:text-white/70 text-gray-700 mb-4">Gamification</h4>
                <div className="space-y-4">
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h4 className="text-sm font-semibold text-white/70 dark:text-white/70 text-gray-700 mb-4">Integrations</h4>
                <div className="space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !googleCalendarConnected && setGoogleCalendarConnected(true)}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      googleCalendarConnected
                        ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30"
                        : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 dark:border-white/10 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className={`w-5 h-5 ${googleCalendarConnected ? 'text-emerald-500' : 'text-white/40 dark:text-white/40 text-gray-500'}`} />
                        <div>
                          <p className="font-semibold mb-0.5">Google Calendar</p>
                          <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">
                            {googleCalendarConnected ? 'Connected' : 'Tap to connect'}
                          </p>
                        </div>
                      </div>
                      {googleCalendarConnected && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    </div>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !linkedInConnected && setLinkedInConnected(true)}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      linkedInConnected
                        ? "bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30"
                        : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 dark:border-white/10 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Link2 className={`w-5 h-5 ${linkedInConnected ? 'text-[#0A66C2]' : 'text-white/40 dark:text-white/40 text-gray-500'}`} />
                        <div>
                          <p className="font-semibold mb-0.5">LinkedIn</p>
                          <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">
                            {linkedInConnected ? 'Connected' : 'Tap to connect'}
                          </p>
                        </div>
                      </div>
                      {linkedInConnected && <CheckCircle2 className="w-5 h-5 text-[#0A66C2]" />}
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h4 className="text-sm font-semibold text-white/70 dark:text-white/70 text-gray-700 mb-4">Privacy</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Anonymous Posting</p>
                      <p className="text-sm text-white/50">Always post anonymously on Signal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Show Location</p>
                      <p className="text-sm text-white/50">Display your city on posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="text-sm font-semibold text-white/70 mb-4">Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Daily Check-in Reminder</p>
                      <p className="text-sm text-white/50">9:00 AM daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Founder Match Updates</p>
                      <p className="text-sm text-white/50">New compatible founders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Signal Interactions</p>
                      <p className="text-sm text-white/50">Comments and upvotes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#1A1A25]">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}