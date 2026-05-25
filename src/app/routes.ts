import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import FounderSignalEnhanced from "./components/FounderSignalEnhanced";
import UnifiedMentorMatch from "./components/UnifiedMentorMatch";
import Gamification from "./components/Gamification";
import Profile from "./components/Profile";
import DailyCheckin from "./components/DailyCheckin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "check-in", Component: DailyCheckin },
      { path: "signal", Component: FounderSignalEnhanced },
      { path: "match", Component: UnifiedMentorMatch },
      { path: "gamification", Component: Gamification },
      { path: "profile", Component: Profile },
    ],
  },
]);
