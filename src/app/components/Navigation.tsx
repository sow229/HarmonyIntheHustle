import { Link, useLocation } from "react-router";
import { Home, Radio, CalendarDays, User, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const SAGE = "#6B9080";
const SAGE_MUTED = "#8A9B8F";
const SAGE_DEEP = "#5C7568";
const WARM_GOLD = "#C4A882";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home", color: SAGE },
    { path: "/signal", icon: Radio, label: "Signal", color: SAGE_MUTED },
    { path: "/match", icon: GraduationCap, label: "Match", color: SAGE_DEEP },
    { path: "/events", icon: CalendarDays, label: "Events", color: WARM_GOLD },
    { path: "/profile", icon: User, label: "Profile", color: SAGE },
  ];

  return (
    <nav className="bg-[#161922] border-t border-[rgba(237,232,223,0.1)] px-4 py-3 pb-6 relative shrink-0">
      <motion.div className="flex items-center justify-between relative z-10" initial={false}>
        {navItems.map(({ path, icon: Icon, label, color }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-1.5 px-2 py-1 relative"
            >
              <motion.div whileTap={{ scale: 0.9 }} className="relative" initial={false}>
                <Icon
                  className={`w-6 h-6 ${active ? "" : "text-[#9a948a]"}`}
                  style={active ? { color } : undefined}
                />
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={false}
                  />
                )}
              </motion.div>
              <span
                className={`text-[11px] font-medium ${active ? "font-semibold" : "text-[#9a948a]"}`}
                style={active ? { color } : undefined}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
