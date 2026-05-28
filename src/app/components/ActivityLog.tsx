import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { activityCategories } from "../checkIn/activityMeta";
import type { ActivityCategory } from "../checkIn/types";
import { useCheckInApp } from "../checkIn/CheckInContext";

const todayLabel = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function ActivityLog() {
  const navigate = useNavigate();
  const { logActivity } = useCheckInApp();
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!selectedCategory || submitting) return;
    setSubmitting(true);
    logActivity(selectedCategory, note);
    window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 350);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] overflow-hidden app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#6B9080]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5C7568]/6 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center px-4 pb-2 shrink-0 pt-[max(3.75rem,calc(env(safe-area-inset-top)+2.35rem))]">
        <button
          type="button"
          onClick={() => !submitting && navigate("/")}
          disabled={submitting}
          className="p-2.5 rounded-md bg-[#161922]/80 border border-[rgba(237,232,223,0.08)] hover:bg-[#1c212b] transition-colors disabled:opacity-40"
          aria-label="Close activity logger"
        >
          <ArrowLeft className="w-5 h-5 text-[#EDE8DF]" />
        </button>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8">
        <div className="max-w-md mx-auto flex flex-col min-h-full">
          <div className="text-center mb-7 pt-2">
            <h1 className="font-heading text-2xl sm:text-[1.75rem] tracking-tight text-[#EDE8DF]">
              Log an activity
            </h1>
            <p className="text-sm text-[#9a948a] mt-2 font-sans">{todayLabel}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-7">
            {activityCategories.map((item) => {
              const active = selectedCategory === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`rounded-lg border px-3 py-3.5 text-sm font-medium font-sans transition-colors text-left ${
                    active
                      ? "bg-[#6B9080]/20 border-[#6B9080]/70 text-[#EDE8DF]"
                      : "bg-[#161922]/70 border-[rgba(237,232,223,0.1)] text-[#c9c3ba] hover:bg-[#1a1f2a]"
                  }`}
                >
                  <span className="mr-1.5" aria-hidden>
                    {item.emoji}
                  </span>
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {selectedCategory && (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={submitting}
              placeholder="Add a note (optional)"
              rows={3}
              className="w-full resize-none rounded-lg bg-[#161922]/60 border border-[rgba(237,232,223,0.08)] px-4 py-3.5 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/40 font-sans disabled:opacity-50"
            />
          )}

          <div className="mt-auto pt-8">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedCategory || submitting}
              whileTap={!selectedCategory || submitting ? undefined : { scale: 0.98 }}
              className="w-full bg-[#6B9080] hover:bg-[#5C7568] disabled:bg-[#6B9080]/50 disabled:text-[#0F1117]/50 text-[#0F1117] font-semibold py-4 rounded-lg transition-colors font-sans"
            >
              {submitting ? "Logging..." : "Log It"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
