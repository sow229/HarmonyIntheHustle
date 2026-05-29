import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Plus, Users, X } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = ["Professional", "Recharge"] as const;

type EventCategory = (typeof CATEGORIES)[number];

type FounderEvent = {
  id: string;
  name: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  category: EventCategory;
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
    category: "Recharge",
  },
  {
    id: "2",
    name: "AI Night: Build & Chill",
    tagline: "Ship a small demo, swap notes, no pitch decks",
    date: "Fri, May 30",
    time: "6:30 PM",
    location: "SoMa Founders Hub",
    attendeeCount: 28,
    category: "Professional",
  },
  {
    id: "4",
    name: "Fundraising Story Workshop",
    tagline: "Tighten your narrative with operators who've raised",
    date: "Wed, Jun 4",
    time: "5:00 PM",
    location: "Online · Zoom",
    attendeeCount: 34,
    category: "Professional",
  },
  {
    id: "5",
    name: "Bay Area Founder Mixer",
    tagline: "Meet builders across stages in one room",
    date: "Thu, Jun 5",
    time: "6:00 PM",
    location: "The Battery, SF",
    attendeeCount: 56,
    category: "Professional",
  },
  {
    id: "7",
    name: "LLM Evals Office Hours",
    tagline: "Bring your traces—leave with a better eval harness",
    date: "Sat, Jun 7",
    time: "10:00 AM",
    location: "Mission Workspace",
    attendeeCount: 19,
    category: "Professional",
  },
  {
    id: "8",
    name: "First-Time Founder Breakfast",
    tagline: "Ask the messy questions before your coffee gets cold",
    date: "Fri, Jun 6",
    time: "8:00 AM",
    location: "Hayes Valley",
    attendeeCount: 14,
    category: "Recharge",
  },
  {
    id: "9",
    name: "Sunrise Group Yoga",
    tagline: "Stretch it out and reset before the inbox opens",
    date: "Wed, Jun 11",
    time: "7:30 AM",
    location: "Dolores Park, SF",
    attendeeCount: 16,
    category: "Recharge",
  },
  {
    id: "10",
    name: "Founder Gym Meetup",
    tagline: "Lift together, no pitch—just reps and good company",
    date: "Thu, Jun 12",
    time: "6:00 PM",
    location: "Equinox, SoMa",
    attendeeCount: 11,
    category: "Recharge",
  },
  {
    id: "11",
    name: "Guided Breathwork & Meditation",
    tagline: "Wind down and decompress with a calm, founder-friendly session",
    date: "Sun, Jun 15",
    time: "5:30 PM",
    location: "The Assembly, SF",
    attendeeCount: 22,
    category: "Recharge",
  },
];

const EMPTY_FORM = {
  name: "",
  tagline: "",
  date: "",
  time: "",
  location: "",
  category: "Professional" as EventCategory,
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("Professional");
  const [rsvpIds, setRsvpIds] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<FounderEvent[]>(MOCK_EVENTS);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredEvents = useMemo(
    () => events.filter((e) => e.category === activeCategory),
    [events, activeCategory],
  );

  const toggleRsvp = (id: string) => {
    setRsvpIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canSubmit = form.name.trim() && form.date.trim() && form.time.trim() && form.location.trim();

  const handleCreate = () => {
    if (!canSubmit) return;
    const newEvent: FounderEvent = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      tagline: form.tagline.trim() || "Hosted by a fellow founder",
      date: form.date.trim(),
      time: form.time.trim(),
      location: form.location.trim(),
      attendeeCount: 1,
      category: form.category,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setRsvpIds((prev) => new Set(prev).add(newEvent.id));
    setActiveCategory(form.category);
    setForm(EMPTY_FORM);
    setShowCreate(false);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] flex flex-col app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#6B9080]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-[#5C7568]/8 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 px-6 pt-14 pb-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-[#EDE8DF]">Events</h1>
            <p className="text-sm text-[#9a948a] mt-1 font-sans">
              Meet founders IRL—runs, workshops, and nights out
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCreate(true)}
            className="shrink-0 mt-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#6B9080] hover:bg-[#5C7568] text-[#0F1117] text-sm font-semibold transition-colors font-sans"
          >
            <Plus className="w-4 h-4" aria-hidden />
            Create
          </motion.button>
        </div>
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

      {showCreate && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-[#0F1117] w-full max-h-[85%] rounded-t-3xl overflow-hidden flex flex-col border-t border-[rgba(237,232,223,0.1)]"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
              <h3 className="font-heading text-xl text-[#EDE8DF]">Create Event</h3>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close create event"
              >
                <X className="w-5 h-5 text-[#EDE8DF]" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                  Event name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Founder Coffee Walk"
                  className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/45 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                  Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                  placeholder="A short, inviting description"
                  className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/45 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                    Date
                  </label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    placeholder="Thu, Jun 19"
                    className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/45 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                    Time
                  </label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    placeholder="6:00 PM"
                    className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/45 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Crissy Field, SF"
                  className="w-full rounded-lg bg-[#161922] border border-white/10 px-4 py-3 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/45 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9a948a] uppercase tracking-wide mb-2 font-sans">
                  Category
                </label>
                <div className="flex gap-2">
                  {CATEGORIES.map((category) => {
                    const isActive = form.category === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, category }))}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors font-sans border ${
                          isActive
                            ? "bg-[#6B9080] text-[#0F1117] border-[#6B9080]"
                            : "bg-[#161922] text-[#9a948a] border-white/10 hover:border-[#6B9080]/40 hover:text-[#EDE8DF]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#161922] shrink-0">
              <button
                type="button"
                onClick={handleCreate}
                disabled={!canSubmit}
                className="w-full py-3.5 rounded-lg bg-[#6B9080] hover:bg-[#5C7568] disabled:bg-[#6B9080]/40 disabled:text-[#0F1117]/60 text-[#0F1117] font-semibold transition-colors font-sans"
              >
                Create Event
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
