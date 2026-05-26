import { Navigate, Outlet, useLocation } from "react-router";
import Navigation from "./Navigation";
import { motion } from "motion/react";
import { useUserProfile } from "../user/UserProfileContext";

export default function Layout() {
  const location = useLocation();
  const { hasDisplayName } = useUserProfile();
  const isWelcome = location.pathname === "/welcome";
  const hideNav =
    isWelcome ||
    location.pathname === "/check-in" ||
    location.pathname.endsWith("/check-in");

  let content = <Outlet />;
  if (!hasDisplayName && !isWelcome) {
    content = <Navigate to="/welcome" replace />;
  } else if (hasDisplayName && isWelcome) {
    content = <Navigate to="/" replace />;
  }

  return (
    <motion.div
      className="min-h-screen bg-[#0a0c10] flex items-center justify-center py-8 px-4 relative overflow-hidden app-texture"
      initial={false}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-[#6B9080]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-[#5C7568]/12 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        className="w-[393px] h-[852px] bg-[#0F1117] rounded-[1.75rem] border-[6px] border-[#232833] shadow-2xl shadow-black/50 overflow-hidden flex flex-col relative z-10 app-texture"
        initial={false}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#0a0c10] rounded-b-xl z-50"
          initial={false}
        />

        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col bg-[#0F1117]">
          {content}
        </div>

        {!hideNav && <Navigation />}
      </motion.div>
    </motion.div>
  );
}
