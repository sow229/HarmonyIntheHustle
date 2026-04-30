import { Moon, Calendar, Activity, TrendingUp, Zap, Brain, AlertCircle, Link2, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useState } from "react";
import { motion } from "motion/react";

export default function HealthInsights() {
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(true);
  const [linkedInConnected, setLinkedInConnected] = useState(false);

  // Mock data for sleep trend
  const sleepData = [
    { id: "sleep-mon", day: "Mon", hours: 6.2 },
    { id: "sleep-tue", day: "Tue", hours: 7.1 },
    { id: "sleep-wed", day: "Wed", hours: 6.8 },
    { id: "sleep-thu", day: "Thu", hours: 7.5 },
    { id: "sleep-fri", day: "Fri", hours: 7.8 },
    { id: "sleep-sat", day: "Sat", hours: 8.2 },
    { id: "sleep-sun", day: "Sun", hours: 7.9 }
  ];

  // Mock data for performance trend
  const performanceData = [
    { id: "perf-mon", day: "Mon", score: 78 },
    { id: "perf-tue", day: "Tue", score: 82 },
    { id: "perf-wed", day: "Wed", score: 79 },
    { id: "perf-thu", day: "Thu", score: 85 },
    { id: "perf-fri", day: "Fri", score: 88 },
    { id: "perf-sat", day: "Sat", score: 91 },
    { id: "perf-sun", day: "Sun", score: 87 }
  ];

  const insights = [
    {
      icon: Moon,
      title: "Sleep & Focus Correlation",
      description: "Sleep recovery improved consistency by 21%",
      trend: "+21%",
      positive: true,
      color: "from-[#3B82F6] to-[#2563EB]",
      iconBg: "bg-[#3B82F6]/10",
      iconColor: "text-[#3B82F6]"
    },
    {
      icon: Calendar,
      title: "Meeting Load Impact",
      description: "High meeting load correlated with lower focus score",
      trend: "-12pts",
      positive: false,
      color: "from-orange-500 to-red-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500"
    },
    {
      icon: Zap,
      title: "Peak Performance Window",
      description: "Your focus peaks between 9-11am on weekdays",
      trend: "92 avg",
      positive: true,
      color: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F0F14] via-[#0F0F14] to-[#0F1A14] dark:bg-gradient-to-b dark:from-[#0F0F14] dark:via-[#0F0F14] dark:to-[#0F1A14] bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 text-gray-900 dark:text-white px-6 pt-14 pb-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 dark:from-emerald-500/20 dark:to-cyan-500/20 from-emerald-300/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-tr from-[#3B82F6]/20 to-[#8B5CF6]/20 dark:from-[#3B82F6]/20 dark:to-[#8B5CF6]/20 from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-emerald-500 via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
          Health Insights
        </h1>
        <p className="text-sm text-white/50 dark:text-white/50 text-gray-600">Health & performance analytics</p>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.03, y: -2 }}
          onClick={() => !googleCalendarConnected && setGoogleCalendarConnected(true)}
          className={`p-4 rounded-xl border transition-all relative overflow-hidden ${
            googleCalendarConnected
              ? "bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-emerald-50 to-emerald-100 border-emerald-500/30 dark:border-emerald-500/30 border-emerald-400/50 shadow-lg shadow-emerald-500/20"
              : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 dark:border-white/10 border-gray-200 hover:border-[#3B82F6]/30 dark:hover:border-[#3B82F6]/30 hover:border-blue-400/40 hover:shadow-md"
          }`}
        >
          {googleCalendarConnected && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 dark:from-emerald-500/10 dark:via-transparent dark:to-emerald-500/10 from-emerald-400/20 via-transparent to-emerald-400/20"
            />
          )}
          <div className="flex items-center gap-2 mb-2">
            <Calendar className={`w-4 h-4 ${googleCalendarConnected ? 'text-emerald-500' : 'text-white/40 dark:text-white/40 text-gray-500'}`} />
            {googleCalendarConnected && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />}
          </div>
          <p className="text-xs font-semibold mb-1">Google Calendar</p>
          <p className="text-[10px] text-white/40 dark:text-white/40 text-gray-500">
            {googleCalendarConnected ? 'Connected' : 'Tap to connect'}
          </p>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.03, y: -2 }}
          onClick={() => !linkedInConnected && setLinkedInConnected(true)}
          className={`p-4 rounded-xl border transition-all relative overflow-hidden ${
            linkedInConnected
              ? "bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-blue-50 to-blue-100 border-[#0A66C2]/30 dark:border-[#0A66C2]/30 border-blue-500/50 shadow-lg shadow-blue-500/20"
              : "bg-white/5 dark:bg-white/5 bg-gray-100 border-white/10 dark:border-white/10 border-gray-200 hover:border-[#0A66C2]/30 dark:hover:border-[#0A66C2]/30 hover:border-blue-400/40 hover:shadow-md"
          }`}
        >
          {linkedInConnected && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/10 via-transparent to-[#0A66C2]/10 dark:from-[#0A66C2]/10 dark:via-transparent dark:to-[#0A66C2]/10 from-blue-500/20 via-transparent to-blue-500/20"
            />
          )}
          <div className="flex items-center gap-2 mb-2">
            <Link2 className={`w-4 h-4 ${linkedInConnected ? 'text-[#0A66C2]' : 'text-white/40 dark:text-white/40 text-gray-500'}`} />
            {linkedInConnected && <CheckCircle2 className="w-3 h-3 text-[#0A66C2] ml-auto" />}
          </div>
          <p className="text-xs font-semibold mb-1">LinkedIn</p>
          <p className="text-[10px] text-white/40 dark:text-white/40 text-gray-500">
            {linkedInConnected ? 'Connected' : 'Tap to connect'}
          </p>
        </motion.button>
      </div>

      {/* Sleep Trend Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
        }}
        className="bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-blue-50 to-cyan-50 border border-white/10 dark:border-white/10 border-blue-200/50 rounded-2xl p-5 mb-4 shadow-lg shadow-[#3B82F6]/10 dark:shadow-[#3B82F6]/10 shadow-blue-500/20 relative z-10 hover:border-[#3B82F6]/40 dark:hover:border-[#3B82F6]/40 hover:border-blue-400/60 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/20 flex items-center justify-center">
              <Moon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <h3 className="font-semibold">Sleep Duration</h3>
              <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">Last 7 days</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">7.4h</p>
            <p className="text-xs text-emerald-400">+18% vs last week</p>
          </div>
        </div>

        <div className="h-32 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepData}>
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="#ffffff20"
                tick={{ fill: '#ffffff40', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#ffffff20"
                tick={{ fill: '#ffffff40', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={[5, 9]}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#sleepGradient)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Meeting Load Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
        }}
        className="bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-purple-50 to-indigo-50 border border-white/10 dark:border-white/10 border-purple-200/50 rounded-2xl p-5 mb-4 shadow-lg shadow-[#8B5CF6]/10 dark:shadow-[#8B5CF6]/10 shadow-purple-500/20 relative z-10 hover:border-[#8B5CF6]/40 dark:hover:border-[#8B5CF6]/40 hover:border-purple-400/60 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-semibold">Meeting Load</h3>
              <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">From Google Calendar</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">18h</p>
            <p className="text-xs text-orange-400">+3h vs last week</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">1-on-1s</span>
            <span className="font-semibold">8h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">Team meetings</span>
            <span className="font-semibold">6h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">External calls</span>
            <span className="font-semibold">4h</span>
          </div>
        </div>
      </motion.div>

      {/* Stress & Recovery Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)"
        }}
        className="bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-emerald-50 to-green-50 border border-white/10 dark:border-white/10 border-emerald-200/50 rounded-2xl p-5 mb-4 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/10 shadow-emerald-500/20 relative z-10 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:border-emerald-400/60 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold">Recovery Score</h3>
              <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">Based on HRV & sleep</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">84</p>
            <p className="text-xs text-emerald-400">Good</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-white/50 dark:text-white/50 text-gray-600 mb-1">HRV</p>
            <p className="text-lg font-bold">62ms</p>
          </div>
          <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-white/50 dark:text-white/50 text-gray-600 mb-1">Resting HR</p>
            <p className="text-lg font-bold">58 bpm</p>
          </div>
          <div className="bg-white/5 dark:bg-white/5 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-white/50 dark:text-white/50 text-gray-600 mb-1">Deep Sleep</p>
            <p className="text-lg font-bold">1.8h</p>
          </div>
        </div>
      </motion.div>

      {/* Performance Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
        }}
        className="bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border border-white/10 dark:border-white/10 border-purple-200/50 rounded-2xl p-5 mb-6 shadow-lg shadow-[#8B5CF6]/10 dark:shadow-[#8B5CF6]/10 shadow-purple-500/20 relative z-10 hover:border-[#8B5CF6]/40 dark:hover:border-[#8B5CF6]/40 hover:border-purple-400/60 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-semibold">Weekly Performance</h3>
              <p className="text-xs text-white/50 dark:text-white/50 text-gray-600">Overall health score</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">87</p>
            <p className="text-xs text-emerald-400">+3 this week</p>
          </div>
        </div>

        <div className="h-32 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <defs>
                <linearGradient id="performanceGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="#ffffff20"
                tick={{ fill: '#ffffff40', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#ffffff20"
                tick={{ fill: '#ffffff40', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={[70, 95]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#performanceGradient)"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Key Insights */}
      <div>
        <h3 className="text-xs font-semibold text-white/50 dark:text-white/50 text-gray-600 uppercase tracking-wide mb-4">
          Key Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  x: 5,
                  boxShadow: insight.positive
                    ? "0 10px 30px -5px rgba(16, 185, 129, 0.3)"
                    : "0 10px 30px -5px rgba(249, 115, 22, 0.3)"
                }}
                className={`bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] ${
                  insight.positive
                    ? "from-emerald-50 to-green-50 border-white/10 dark:border-white/10 border-emerald-200/50"
                    : "from-orange-50 to-red-50 border-orange-500/20 dark:border-orange-500/20 border-orange-300/50"
                } border rounded-xl p-4 transition-all relative overflow-hidden group`}
              >
                {insight.positive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${insight.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${insight.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          insight.positive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-orange-500/10 text-orange-400"
                        }`}
                      >
                        {insight.trend}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 dark:text-white/60 text-gray-700 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        className="mt-6 bg-gradient-to-br from-[#1A1A25] to-[#151520] dark:from-[#1A1A25] dark:to-[#151520] from-blue-50 to-cyan-50 border border-white/10 dark:border-white/10 border-blue-200/50 rounded-2xl p-5 relative z-10 shadow-lg shadow-[#3B82F6]/10 dark:shadow-[#3B82F6]/10 shadow-blue-500/20 hover:border-[#3B82F6]/30 dark:hover:border-[#3B82F6]/30 hover:border-blue-400/50 transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="font-semibold">Connected Integrations</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">Apple Health</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">Google Calendar</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 dark:text-white/60 text-gray-600">Whoop / Oura</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />
          </div>
          {linkedInConnected && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60 dark:text-white/60 text-gray-600">LinkedIn</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="w-2 h-2 rounded-full bg-[#0A66C2] shadow-lg shadow-[#0A66C2]/50"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
