import type { CheckInResponse, MoodContext, SurfacesFeature } from "./types";

/** Deterministic “anonymous” cohort size from response shape */
function similarFoundersCount(response: CheckInResponse): number {
  const { mood, happiness, stress } = response;
  const bucket =
    mood.charCodeAt(0) * 7 +
    Math.floor(stress / 12) * 11 +
    Math.floor(happiness / 15) * 5;
  return 21 + (Math.abs(bucket) % 47);
}

function pickFeature(response: CheckInResponse): SurfacesFeature {
  const { mood, happiness, stress } = response;

  const heavyStress = stress >= 62;
  const frustration = stress >= 70 || happiness < 38;
  const isolation = mood === "struggling" && stress >= 48;
  const momentum = mood === "great" && happiness >= 58 && stress < 48;
  const ridingHigh = mood === "great" && happiness >= 52 && stress < 55;
  const uncertain =
    happiness <= 44 ||
    (mood === "okay" && happiness <= 52) ||
    (mood === "great" && stress >= 52 && happiness < 58);
  const seekingGuidance =
    (mood === "struggling" && stress < 55) ||
    (mood === "okay" && stress >= 38 && stress < 64 && happiness <= 56);

  if (heavyStress || frustration || isolation) return "forum";
  if (momentum || ridingHigh) return "events";
  if (uncertain || seekingGuidance) return "mentorship";
  if (mood === "struggling") return "forum";
  if (mood === "great") return "events";
  return "mentorship";
}

function copyFor(
  response: CheckInResponse,
  feature: SurfacesFeature,
): Pick<MoodContext, "personalizedMessage" | "vibeLabel"> {
  const { mood, happiness, stress } = response;

  if (stress >= 68) {
    return {
      personalizedMessage: "Sounds like today's been heavy. You're not alone.",
      vibeLabel: "Today's vibe: overwhelmed but pushing",
    };
  }
  if (stress >= 55 && mood !== "great") {
    return {
      personalizedMessage: "When stress stacks up, naming it is half the battle. We're glad you did.",
      vibeLabel: "Today's vibe: stretched thin, still here",
    };
  }
  if (mood === "struggling" && feature === "forum") {
    return {
      personalizedMessage: "Thanks for being honest—that takes courage. Others have felt this too.",
      vibeLabel: "Today's vibe: lonely in the grind, not alone in the room",
    };
  }
  if (mood === "struggling" && feature === "mentorship") {
    return {
      personalizedMessage: "It's okay not to have the map yet. A nudge in the right direction can help.",
      vibeLabel: "Today's vibe: unsure, open to guidance",
    };
  }
  if (mood === "okay") {
    return {
      personalizedMessage: "Middle days matter. Small steps still move the company forward.",
      vibeLabel: "Today's vibe: steady, getting through",
    };
  }
  if (mood === "great" && happiness >= 65 && stress < 45) {
    return {
      personalizedMessage: "That momentum you're carrying? Worth protecting. Keep riding it.",
      vibeLabel: "Today's vibe: sharp, energized, building",
    };
  }
  if (mood === "great") {
    return {
      personalizedMessage: "Love the energy. Channel it into one win today—you've earned it.",
      vibeLabel: "Today's vibe: confident, forward motion",
    };
  }
  if (feature === "mentorship") {
    return {
      personalizedMessage: "Big decisions love good questions. You don't have to white-knuckle this solo.",
      vibeLabel: "Today's vibe: curious, looking for signal",
    };
  }
  if (feature === "events") {
    return {
      personalizedMessage: "You're in a good pocket—perfect energy to show up IRL with other founders.",
      vibeLabel: "Today's vibe: dialed in, ready to connect",
    };
  }
  return {
    personalizedMessage: "Whatever today threw at you, you still checked in. That counts.",
    vibeLabel: "Today's vibe: human, honest, in progress",
  };
}

/**
 * Maps raw check-in sliders + mood into UI copy, vibe label, surfaced feature, and cohort stat.
 */
export function getMoodContext(response: CheckInResponse): MoodContext {
  const feature = pickFeature(response);
  const { personalizedMessage, vibeLabel } = copyFor(response, feature);
  return {
    personalizedMessage,
    vibeLabel,
    feature,
    similarFoundersCount: similarFoundersCount(response),
  };
}
