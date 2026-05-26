export type CheckInMood = "great" | "okay" | "struggling";

/** Payload from the daily check-in form */
export type CheckInResponse = {
  happiness: number;
  stress: number;
  mood: CheckInMood;
  note?: string;
};

export type SurfacesFeature = "forum" | "mentorship" | "events";

export type MoodContext = {
  personalizedMessage: string;
  vibeLabel: string;
  feature: SurfacesFeature;
  similarFoundersCount: number;
};
