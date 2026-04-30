import { Link, useLocation } from "react-router";
import { Home, Radio, Trophy, Activity, User, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home", color: "#00d4ff" },
    { path: "/signal", icon: Radio, label: "Signal", color: "#00ff9f" },
    { path: "/match", icon: GraduationCap, label: "Match", color: "#ff6b9d" },
    { path: "/gamification", icon: Trophy, label: "Level", color: "#ffeb3b" },
    { path: "/profile", icon: User, label: "Profile", color: "#d946ef" },
  ];

  return (
    <nav className="bg-[#1a1a1a] dark:bg-[#1a1a1a] bg-white border-t border-[#2a2a2a] dark:border-[#2a2a2a] border-gray-200 px-4 py-3 pb-6 relative">
      <div className="flex items-center justify-between relative z-10">
        {navItems.map(({ path, icon: Icon, label, color }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1.5 px-2 py-1 relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon
                  className={`w-6 h-6 ${
                    active
                      ? ""
                      : "text-[#b3b3b3] dark:text-[#b3b3b3] text-[#5a5a5a]"
                  }`}
                  style={active ? { color: color, filter: `drop-shadow(0 0 4px ${color})` } : {}}
                />
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[11px] font-medium ${
                  active
                    ? "font-bold"
                    : "text-[#b3b3b3] dark:text-[#b3b3b3] text-[#5a5a5a]"
                }`}
                style={active ? { color: color, textShadow: `0 0 8px ${color}` } : {}}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}