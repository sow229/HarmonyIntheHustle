import type { CheckInResponse, MoodContext, SurfacesFeature } from "./types";

/** Deterministic “anonymous” cohort size from response shape */
function similarFoundersCount(response: CheckInResponse): number {
  const { mood, energy, stress, focus } = response;
  const bucket =
    mood.charCodeAt(0) * 7 +
    Math.floor(stress / 12) * 11 +
    Math.floor(energy / 15) * 5 +
    Math.floor(focus / 10) * 3;
  return 21 + (Math.abs(bucket) % 47);
}

function pickFeature(response: CheckInResponse): SurfacesFeature {
  const { mood, energy, stress, focus, progress } = response;

  const heavyStress = stress >= 62;
  const frustration = stress >= 70 || progress < 38;
  const isolation = mood === "struggling" && stress >= 48;
  const momentum = mood === "great" && energy >= 58 && stress < 48;
  const ridingHigh = mood === "great" && energy >= 52 && stress < 55 && focus >= 50;
  const uncertain =
    focus <= 44 ||
    (mood === "okay" && focus <= 52) ||
    (mood === "great" && stress >= 52 && focus < 50);
  const seekingGuidance =
    (mood === "struggling" && stress < 55) ||
    (mood === "okay" && stress >= 38 && stress < 64 && focus <= 56);

  if (heavyStress || frustration || isolation) return "forum";
  if (momentum || ridingHigh) return "gamification";
  if (uncertain || seekingGuidance) return "mentorship";
  if (mood === "struggling") return "forum";
  if (mood === "great") return "gamification";
  return "mentorship";
}

function copyFor(
  response: CheckInResponse,
  feature: SurfacesFeature,
): Pick<MoodContext, "personalizedMessage" | "vibeLabel"> {
  const { mood, energy, stress, focus, progress } = response;

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
  if (mood === "great" && energy >= 65 && stress < 45) {
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
  if (focus < 45 && progress >= 50) {
    return {
      personalizedMessage: "Foggy focus with real progress underneath—classic founder brain. Breathe, then choose one thread.",
      vibeLabel: "Today's vibe: scattered but shipping",
    };
  }
  if (feature === "mentorship") {
    return {
      personalizedMessage: "Big decisions love good questions. You don't have to white-knuckle this solo.",
      vibeLabel: "Today's vibe: curious, looking for signal",
    };
  }
  if (feature === "gamification") {
    return {
      personalizedMessage: "You're in a good pocket—let's turn it into a streak you can see.",
      vibeLabel: "Today's vibe: dialed in, ready for a challenge",
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
