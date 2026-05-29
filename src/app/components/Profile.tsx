import { useEffect, useState } from "react";
import { Calendar, Settings, X, CheckCircle2, Link2 } from "lucide-react";
import { Switch } from "./ui/switch";
import { motion } from "motion/react";
import { useCheckInApp } from "../checkIn/CheckInContext";
import { useUserProfile } from "../user/UserProfileContext";
import { getActivityMeta } from "../checkIn/activityMeta";
import type { CheckInResponse } from "../checkIn/types";

function moodDot(checkIn?: CheckInResponse) {
  if (!checkIn) return "bg-[#7e7a73]";
  if (checkIn.stress >= 70) return "bg-[#C96B6B]";
  if (checkIn.happiness >= 65 && checkIn.stress < 50) return "bg-[#6B9080]";
  return "bg-[#C4A882]";
}

function formatDayLabel(day: string) {
  const date = new Date(`${day}T00:00:00`);
  if (Number.isNaN(date.getTime())) return day;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(true);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const { checkInStreak, totalDaysLogged, activityLogs, checkInsByDay } = useCheckInApp();
  const { displayName, initials, setDisplayName } = useUserProfile();

  useEffect(() => {
    if (showSettings) {
      setNameDraft(displayName);
    }
  }, [showSettings, displayName]);
  const activityRows = Object.entries(
    activityLogs.reduce<Record<string, typeof activityLogs>>((acc, log) => {
      acc[log.day] = acc[log.day] ? [...acc[log.day], log] : [log];
      return acc;
    }, {}),
  ).sort(([a], [b]) => (a > b ? -1 : 1));

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] dark:bg-gradient-to-b dark:from-[#0F1117] dark:via-[#0F1117] dark:to-[#12151D] bg-white text-gray-900 dark:text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-3xl tracking-tight text-[#EDE8DF]">Profile</h1>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        {/* User Card */}
        <div className="bg-gradient-to-br from-[#161922] to-[#12151D] border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#6B9080] to-[#5C7568] flex items-center justify-center text-2xl font-bold text-[#0F1117]">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{displayName}</h2>
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
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#161922] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 mb-2">🦔 Current Streak</p>
            <p className="text-2xl font-bold text-[#EDE8DF]">{checkInStreak}</p>
          </div>
          <div className="bg-[#161922] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 mb-2">📅 Total Days Logged</p>
            <p className="text-2xl font-bold text-[#EDE8DF]">{totalDaysLogged}</p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4 font-sans">
          Activity Timeline
        </h3>
        {activityRows.length === 0 ? (
          <div className="bg-[#161922] border border-white/10 rounded-xl p-4">
            <p className="text-sm text-[#9a948a]">No activities logged yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activityRows.map(([day, logs]) => (
              <div
                key={day}
                className="bg-[#161922] border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-sm font-medium text-[#EDE8DF]">{formatDayLabel(day)}</p>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${moodDot(checkInsByDay[day])}`}
                    aria-label="Mood indicator"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {logs
                    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
                    .map((log) => {
                      const meta = getActivityMeta(log.category);
                      const title = log.note ? `${meta.label}: ${log.note}` : meta.label;
                      return (
                        <span
                          key={log.id}
                          title={title}
                          className="text-xs rounded-full px-2.5 py-1 bg-[#0F1117] border border-white/10 text-[#cfd8d2]"
                        >
                          {meta.emoji} {meta.label}
                        </span>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-[#0F1117] w-full max-h-[85vh] rounded-t-3xl overflow-hidden flex flex-col">
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
              <div>
                <h4 className="text-sm font-semibold text-white/70 mb-4">Your name</h4>
                <label htmlFor="settings-display-name" className="sr-only">
                  Display name
                </label>
                <input
                  id="settings-display-name"
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-[#EDE8DF] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#6B9080]/45 font-sans"
                />
                <p className="text-xs text-white/40 mt-2 font-sans">
                  Used on your home screen and across the app.
                </p>
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
                        ? "bg-gradient-to-br from-[#6B9080]/10 to-[#5C7568]/10 border-[#6B9080]/30"
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
            <div className="p-6 border-t border-white/10 bg-[#161922]">
              <button
                type="button"
                onClick={() => {
                  if (nameDraft.trim()) {
                    setDisplayName(nameDraft);
                    setShowSettings(false);
                  }
                }}
                disabled={!nameDraft.trim()}
                className="w-full py-3 bg-[#6B9080] hover:bg-[#4F6D5F] disabled:opacity-50 rounded-xl font-semibold transition-colors"
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