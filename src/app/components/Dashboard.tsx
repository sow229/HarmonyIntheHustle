import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import DailyCheckIn from "./DailyCheckIn";
import { motion } from "motion/react";

export default function Dashboard() {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F14] via-[#0F0F14] to-[#1A0F1E] text-white px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-[#EC4899]/20 to-[#8B5CF6]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-bl from-[#06B6D4]/20 to-[#3B82F6]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl mb-3 text-white/60">{greeting},</h1>
          <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent mb-16">
            Steve
          </h2>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCheckIn(true)}
          className="w-full px-8 py-6 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#3B82F6]/40"
        >
          <CheckCircle2 className="w-7 h-7" />
          Check-in
        </motion.button>
      </div>

      {/* Daily Check-in Modal */}
      {showCheckIn && <DailyCheckIn onClose={() => setShowCheckIn(false)} />}
    </div>
  );
}