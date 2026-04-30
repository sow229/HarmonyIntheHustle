import { Outlet } from "react-router";
import Navigation from "./Navigation";
import { motion } from "motion/react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#0F0A14] to-[#0A0A0F] dark:bg-gradient-to-br dark:from-[#0A0A0F] dark:via-[#0F0A14] dark:to-[#0A0A0F] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/30 to-[#8B5CF6]/30 dark:from-[#3B82F6]/30 dark:to-[#8B5CF6]/30 from-blue-400/40 to-purple-400/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [180, 0, 180],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-[#EC4899]/30 to-[#8B5CF6]/30 dark:from-[#EC4899]/30 dark:to-[#8B5CF6]/30 from-pink-400/40 to-purple-400/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [-30, 30, -30],
          x: [-20, 20, -20],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-[#06B6D4]/20 to-[#3B82F6]/20 dark:from-[#06B6D4]/20 dark:to-[#3B82F6]/20 from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* iPhone 15 Pro frame */}
      <div className="w-[393px] h-[852px] bg-[#0F0F14] dark:bg-[#0F0F14] bg-white rounded-[3rem] border-[8px] border-[#1A1A20] dark:border-[#1A1A20] border-gray-300/50 shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/20 shadow-purple-900/50 overflow-hidden flex flex-col relative z-10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#0A0A0F] dark:bg-[#0A0A0F] bg-gray-200 rounded-b-3xl z-50 shadow-lg shadow-black/20 dark:shadow-black/20 shadow-gray-400/30" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
}
