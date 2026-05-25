export type CheckInMood = "great" | "okay" | "struggling";

/** Payload from the daily check-in form */
export type CheckInResponse = {
  mood: CheckInMood;
  energy: number;
  stress: number;
  focus: number;
  progress: number;
};

export type SurfacesFeature = "forum" | "mentorship" | "gamification";

export type MoodContext = {
  personalizedMessage: string;
  vibeLabel: string;
  feature: SurfacesFeature;
  similarFoundersCount: number;
};
