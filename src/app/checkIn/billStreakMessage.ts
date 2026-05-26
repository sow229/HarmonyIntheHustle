/** Bill's speech bubble copy for streak milestones; null when there's nothing to say. */
export function getBillStreakMessage(
  streak: number,
  streakBroken: boolean,
): string | null {
  if (streakBroken) return "Let's get back on track.";
  if (streak >= 30) return "One month strong.";
  if (streak === 7) return "We're on a roll 🦔";
  return null;
}
