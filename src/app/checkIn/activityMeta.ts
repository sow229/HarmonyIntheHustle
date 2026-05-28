import type { ActivityCategory } from "./types";

export const activityCategories: Array<{ id: ActivityCategory; label: string; emoji: string }> = [
  { id: "workout", label: "Workout", emoji: "💪" },
  { id: "run", label: "Run", emoji: "🏃" },
  { id: "meditation", label: "Meditation", emoji: "🧘" },
  { id: "deep-work", label: "Deep Work", emoji: "🧠" },
  { id: "coffee-chat", label: "Coffee Chat", emoji: "☕" },
  { id: "reading", label: "Reading", emoji: "📚" },
  { id: "rest", label: "Rest", emoji: "🛌" },
  { id: "other", label: "Other", emoji: "✨" },
];

export function getActivityMeta(category: ActivityCategory) {
  return activityCategories.find((item) => item.id === category) ?? activityCategories[activityCategories.length - 1];
}
