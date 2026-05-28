import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import FounderSignalEnhanced from "./components/FounderSignalEnhanced";
import UnifiedMentorMatch from "./components/UnifiedMentorMatch";
import Events from "./components/Events";
import Profile from "./components/Profile";
import DailyCheckin from "./components/DailyCheckin";
import ActivityLog from "./components/ActivityLog";
import Welcome from "./components/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "welcome", Component: Welcome },
      { path: "check-in", Component: DailyCheckin },
      { path: "activity-log", Component: ActivityLog },
      { path: "signal", Component: FounderSignalEnhanced },
      { path: "match", Component: UnifiedMentorMatch },
      { path: "events", Component: Events },
      { path: "profile", Component: Profile },
    ],
  },
]);
