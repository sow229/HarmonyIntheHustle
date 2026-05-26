import type { CheckInMood, CheckInResponse } from "./types";

/** Maps happiness + stress sliders to a mood bucket for post-check-in routing. */
export function deriveMood(happiness: number, stress: number): CheckInMood {
  if (happiness >= 65 && stress < 45) return "great";
  if (happiness < 40 || stress >= 65) return "struggling";
  return "okay";
}

export function buildCheckInResponse(
  happiness: number,
  stress: number,
  note?: string,
): CheckInResponse {
  return {
    happiness,
    stress,
    mood: deriveMood(happiness, stress),
    ...(note?.trim() ? { note: note.trim() } : {}),
  };
}
