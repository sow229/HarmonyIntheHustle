import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { motion } from "motion/react";
import { useCheckInApp } from "../checkIn/CheckInContext";
import { buildCheckInResponse } from "../checkIn/deriveMood";
import BillMascot from "./BillMascot";

const todayLabel = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function CheckInSlider({
  label,
  value,
  onChange,
  gradient,
}: {
  label: string;
  value: number[];
  onChange: (v: number[]) => void;
  gradient: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-[#EDE8DF] font-sans">{label}</label>
        <span className="text-sm text-[#9a948a] tabular-nums font-sans">{value[0]}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={onChange}
        max={100}
        step={1}
      >
        <Slider.Track className="bg-[#232833] relative grow rounded-full h-1.5">
          <Slider.Range className={`absolute bg-gradient-to-r ${gradient} h-full rounded-full`} />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-[#EDE8DF] shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-[#6B9080]/50 cursor-grab active:cursor-grabbing"
          aria-label={label}
        />
      </Slider.Root>
    </div>
  );
}

export default function DailyCheckin() {
  const navigate = useNavigate();
  const { completeCheckIn } = useCheckInApp();
  const [happiness, setHappiness] = useState([55]);
  const [stress, setStress] = useState([40]);
  const [energy, setEnergy] = useState([65]);
  const [note, setNote] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    setCelebrating(true);

    const response = buildCheckInResponse(happiness[0], stress[0], note);

    window.setTimeout(() => {
      completeCheckIn(response);
      navigate("/", { replace: true });
    }, 1100);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] overflow-hidden app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#6B9080]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5C7568]/6 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center px-4 pb-2 shrink-0 pt-[max(3.75rem,calc(env(safe-area-inset-top)+2.35rem))]">
        <button
          type="button"
          onClick={() => !submitting && navigate("/")}
          disabled={submitting}
          className="p-2.5 rounded-md bg-[#161922]/80 border border-[rgba(237,232,223,0.08)] hover:bg-[#1c212b] transition-colors disabled:opacity-40"
          aria-label="Close check-in"
        >
          <ArrowLeft className="w-5 h-5 text-[#EDE8DF]" />
        </button>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8">
        <div className="max-w-md mx-auto flex flex-col min-h-full">
          <div className="flex flex-col items-center pt-2 pb-6">
            <BillMascot
              happiness={happiness[0]}
              stress={stress[0]}
              energy={energy[0]}
              celebrating={celebrating}
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl sm:text-[1.75rem] tracking-tight text-[#EDE8DF]">
              How are you doing today?
            </h1>
            <p className="text-sm text-[#9a948a] mt-2 font-sans">{todayLabel}</p>
          </div>

          <div className="space-y-8 mb-8">
            <CheckInSlider
              label="Happiness"
              value={happiness}
              onChange={setHappiness}
              gradient="from-[#6B9080] to-[#8A9B8F]"
            />
            <CheckInSlider
              label="Stress Level"
              value={stress}
              onChange={setStress}
              gradient="from-[#C4A882] to-[#9B8B7E]"
            />
            <CheckInSlider
              label="Energy"
              value={energy}
              onChange={setEnergy}
              gradient="from-[#4F6D5F] to-[#6B9080]"
            />
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={submitting}
            placeholder="Anything on your mind today? (optional)"
            rows={3}
            className="w-full resize-none rounded-lg bg-[#161922]/60 border border-[rgba(237,232,223,0.08)] px-4 py-3.5 text-sm text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-1 focus:ring-[#6B9080]/40 font-sans disabled:opacity-50"
          />

          <div className="mt-auto pt-8">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              whileTap={submitting ? undefined : { scale: 0.98 }}
              className="w-full bg-[#6B9080] hover:bg-[#5C7568] disabled:bg-[#6B9080]/70 text-[#0F1117] font-semibold py-4 rounded-lg transition-colors font-sans"
            >
              {submitting ? "Nice work…" : "Check In"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
