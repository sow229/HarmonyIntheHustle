import { Moon, Calendar, Activity, TrendingUp, Zap, Brain, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function FounderInsights() {
  // Mock data for sleep trend
  const sleepData = [
    { day: "Mon", hours: 6.2 },
    { day: "Tue", hours: 7.1 },
    { day: "Wed", hours: 6.8 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 7.8 },
    { day: "Sat", hours: 8.2 },
    { day: "Sun", hours: 7.9 }
  ];

  // Mock data for performance trend
  const performanceData = [
    { day: "Mon", score: 78 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 79 },
    { day: "Thu", score: 85 },
    { day: "Fri", score: 88 },
    { day: "Sat", score: 91 },
    { day: "Sun", score: 87 }
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
    <div className="min-h-full bg-[#0F0F14] text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Founder Insights</h1>
        <p className="text-sm text-white/50">Health & performance analytics</p>
      </div>

      {/* Sleep Trend Card */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
              <Moon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <h3 className="font-semibold">Sleep Duration</h3>
              <p className="text-xs text-white/50">Last 7 days</p>
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
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Meeting Load Card */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-semibold">Meeting Load</h3>
              <p className="text-xs text-white/50">This week</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">18h</p>
            <p className="text-xs text-orange-400">+3h vs last week</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">1-on-1s</span>
            <span className="font-semibold">8h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Team meetings</span>
            <span className="font-semibold">6h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">External calls</span>
            <span className="font-semibold">4h</span>
          </div>
        </div>
      </div>

      {/* Stress & Recovery Card */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold">Recovery Score</h3>
              <p className="text-xs text-white/50">Based on HRV & sleep</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">84</p>
            <p className="text-xs text-emerald-400">Good</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/50 mb-1">HRV</p>
            <p className="text-lg font-bold">62ms</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/50 mb-1">Resting HR</p>
            <p className="text-lg font-bold">58 bpm</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/50 mb-1">Deep Sleep</p>
            <p className="text-lg font-bold">1.8h</p>
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-semibold">Weekly Performance</h3>
              <p className="text-xs text-white/50">Founder Score trend</p>
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
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
          Key Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className={`bg-[#1A1A25] border rounded-xl p-4 ${
                  insight.positive ? "border-white/10" : "border-orange-500/20"
                }`}
              >
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
                    <p className="text-xs text-white/60 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Status */}
      <div className="mt-6 bg-gradient-to-br from-[#1A1A25] to-[#151520] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="font-semibold">Connected Integrations</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Apple Health</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Google Calendar</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Whoop / Oura</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
