import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  "All",
  "Coffee Chats",
  "Workshops",
  "Founder Runs",
  "AI Nights",
  "Networking",
] as const;

type EventCategory = (typeof CATEGORIES)[number];

type FounderEvent = {
  id: string;
  name: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  category: Exclude<EventCategory, "All">;
};

const MOCK_EVENTS: FounderEvent[] = [
  {
    id: "1",
    name: "SF Founders Run",
    tagline: "Clear your head with fellow founders",
    date: "Thu, May 29",
    time: "7:00 AM",
    location: "Crissy Field, SF",
    attendeeCount: 12,
    category: "Founder Runs",
  },
  {
    id: "2",
    name: "AI Night: Build & Chill",
    tagline: "Ship a small demo, swap notes, no pitch decks",
    date: "Fri, May 30",
    time: "6:30 PM",
    location: "SoMa Founders Hub",
    attendeeCount: 28,
    category: "AI Nights",
  },
  {
    id: "3",
    name: "Tuesday Coffee & Capital",
    tagline: "Low-key chats over pour-overs, zero agenda",
    date: "Tue, Jun 3",
    time: "8:30 AM",
    location: "Sightglass Coffee, SF",
    attendeeCount: 9,
    category: "Coffee Chats",
  },
  {
    id: "4",
    name: "Fundraising Story Workshop",
    tagline: "Tighten your narrative with operators who've raised",
    date: "Wed, Jun 4",
    time: "5:00 PM",
    location: "Online · Zoom",
    attendeeCount: 34,
    category: "Workshops",
  },
  {
    id: "5",
    name: "Bay Area Founder Mixer",
    tagline: "Meet builders across stages in one room",
    date: "Thu, Jun 5",
    time: "6:00 PM",
    location: "The Battery, SF",
    attendeeCount: 56,
    category: "Networking",
  },
  {
    id: "6",
    name: "Sunset Run + Debrief",
    tagline: "3 miles, then cold brew and honest updates",
    date: "Mon, Jun 9",
    time: "6:15 PM",
    location: "Embarcadero Trail",
    attendeeCount: 8,
    category: "Founder Runs",
  },
  {
    id: "7",
    name: "LLM Evals Office Hours",
    tagline: "Bring your traces—leave with a better eval harness",
    date: "Sat, Jun 7",
    time: "10:00 AM",
    location: "Mission Workspace",
    attendeeCount: 19,
    category: "AI Nights",
  },
  {
    id: "8",
    name: "First-Time Founder Breakfast",
    tagline: "Ask the messy questions before your coffee gets cold",
    date: "Fri, Jun 6",
    time: "8:00 AM",
    location: "Hayes Valley",
    attendeeCount: 14,
    category: "Coffee Chats",
  },
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [rsvpIds, setRsvpIds] = useState<Set<string>>(new Set());

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return MOCK_EVENTS;
    return MOCK_EVENTS.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  const toggleRsvp = (id: string) => {
    setRsvpIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] flex flex-col app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#6B9080]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-[#5C7568]/8 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 px-6 pt-14 pb-4 shrink-0">
        <h1 className="font-heading text-3xl tracking-tight text-[#EDE8DF]">Events</h1>
        <p className="text-sm text-[#9a948a] mt-1 font-sans">
          Meet founders IRL—runs, workshops, and nights out
        </p>
      </header>

      <div className="relative z-10 shrink-0 pb-4">
        <div
          className="flex gap-2 overflow-x-auto px-6 pb-1 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors font-sans border ${
                  isActive
                    ? "bg-[#6B9080] text-[#0F1117] border-[#6B9080]"
                    : "bg-[#161922] text-[#9a948a] border-[rgba(237,232,223,0.1)] hover:border-[#6B9080]/40 hover:text-[#EDE8DF]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8">
        <div className="space-y-4 max-w-md mx-auto">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-[#9a948a] py-12 font-sans">
              No events in this category yet. Check back soon.
            </p>
          ) : (
            filteredEvents.map((event, i) => {
              const isRsvped = rsvpIds.has(event.id);
              const displayCount = event.attendeeCount + (isRsvped ? 1 : 0);

              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="bg-[#161922] border border-[rgba(237,232,223,0.1)] rounded-lg p-5 shadow-lg shadow-black/15"
                >
                  <p className="text-[10px] uppercase tracking-wider text-[#6B9080] font-medium mb-2 font-sans">
                    {event.category}
                  </p>

                  <h2 className="font-heading text-xl text-[#EDE8DF] leading-tight">{event.name}</h2>
                  <p className="text-sm text-[#9a948a] mt-1.5 font-sans">{event.tagline}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#EDE8DF]/90 font-sans">
                      <Calendar className="w-4 h-4 text-[#6B9080] shrink-0" aria-hidden />
                      <span>
                        {event.date} · {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9a948a] font-sans">
                      <MapPin className="w-4 h-4 text-[#6B9080] shrink-0" aria-hidden />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9a948a] font-sans">
                      <Users className="w-4 h-4 text-[#6B9080] shrink-0" aria-hidden />
                      <span>
                        <span className="text-[#EDE8DF] font-medium">{displayCount}</span> going
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-[#9a948a]/80 font-sans">
                      <Clock className="w-3.5 h-3.5" aria-hidden />
                      RSVP to save your spot
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleRsvp(event.id)}
                      className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors font-sans ${
                        isRsvped
                          ? "bg-[#232833] text-[#A8C4B8] border border-[#6B9080]/40"
                          : "bg-[#6B9080] hover:bg-[#5C7568] text-[#0F1117]"
                      }`}
                    >
                      {isRsvped ? "Going ✓" : "RSVP"}
                    </motion.button>
                  </div>
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
