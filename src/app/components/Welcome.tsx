import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useUserProfile } from "../user/UserProfileContext";
import BillMascot from "./BillMascot";

export default function Welcome() {
  const navigate = useNavigate();
  const { setDisplayName } = useUserProfile();
  const [name, setName] = useState("");

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setDisplayName(trimmed);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#0F1117] via-[#0F1117] to-[#12151D] text-[#EDE8DF] overflow-hidden app-texture">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#6B9080]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5C7568]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-12 max-w-md mx-auto w-full">
        <div className="flex justify-center mb-8">
          <BillMascot happiness={62} stress={32} compact showName={false} />
        </div>

        <h1 className="font-heading text-3xl tracking-tight text-center mb-2">
          Welcome to Equil
        </h1>
        <p className="text-sm text-[#9a948a] text-center mb-10 font-sans leading-relaxed">
          A calm space to check in, connect, and grow as a founder.
        </p>

        <label htmlFor="display-name" className="block font-heading text-xl text-[#EDE8DF] mb-3">
          What should we call you?
        </label>
        <input
          id="display-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          placeholder="Your first name"
          autoComplete="given-name"
          autoFocus
          className="w-full rounded-lg bg-[#161922] border border-[rgba(237,232,223,0.1)] px-4 py-3.5 text-[#EDE8DF] placeholder:text-[#9a948a]/55 focus:outline-none focus:ring-2 focus:ring-[#6B9080]/45 font-sans mb-8"
        />

        <motion.button
          type="button"
          disabled={!name.trim()}
          whileTap={name.trim() ? { scale: 0.98 } : undefined}
          onClick={handleContinue}
          className="w-full bg-[#6B9080] hover:bg-[#5C7568] disabled:bg-[#6B9080]/40 disabled:text-[#0F1117]/60 text-[#0F1117] font-semibold py-4 rounded-lg transition-colors font-sans"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}
