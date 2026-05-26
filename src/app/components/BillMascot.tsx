import { motion } from "motion/react";

type BillMascotProps = {
  happiness: number;
  stress: number;
  celebrating?: boolean;
  /** Smaller home-screen variant */
  compact?: boolean;
  showName?: boolean;
  className?: string;
};

/**
 * Bill — porcupine mascot. Expression blends from happiness & stress sliders.
 */
export default function BillMascot({
  happiness,
  stress,
  celebrating = false,
  compact = false,
  showName = true,
  className = "",
}: BillMascotProps) {
  const smile = (happiness - 50) / 50;
  const tension = (stress - 40) / 60;
  const browLift = Math.max(0, tension) * 6;
  const eyeSquint = Math.min(0.35, Math.max(0, tension * 0.4 - smile * 0.1));
  const mouthCurve = celebrating ? 14 : 4 + smile * 10 - tension * 8;
  const cheekGlow = celebrating ? 0.45 : Math.max(0, smile * 0.35);

  const quillTilt = celebrating ? -18 : smile * 8 - tension * 14;
  const bodyBounce = celebrating ? [0, -10, -4, 0] : 0;
  const bodyRotate = celebrating ? [0, -4, 4, -2, 0] : 0;

  const quills = Array.from({ length: 11 }, (_, i) => {
    const angle = -100 + i * 20 + quillTilt;
    const rad = (angle * Math.PI) / 180;
    const len = 22 + (celebrating ? 4 : 0) + smile * 3;
    return {
      x2: 60 + Math.cos(rad) * len,
      y2: 52 + Math.sin(rad) * len,
      delay: celebrating ? i * 0.04 : 0,
    };
  });

  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      animate={{ y: bodyBounce, rotate: bodyRotate }}
      transition={
        celebrating
          ? { duration: 0.85, ease: "easeOut" }
          : { duration: 0.35, ease: "easeOut" }
      }
      aria-hidden
    >
      {celebrating && (
        <>
          <motion.span
            className="absolute -top-1 left-4 text-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], y: [-4, -18] }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute top-2 right-2 text-sm text-[#C4A882]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.7], y: [-2, -14] }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            ✦
          </motion.span>
        </>
      )}

      <svg
        viewBox="0 0 120 120"
        className={compact ? "w-20 h-20" : "w-28 h-28 sm:w-32 sm:h-32"}
        fill="none"
      >
        {/* Soft glow */}
        <ellipse cx="60" cy="68" rx="34" ry="30" fill="#6B9080" fillOpacity={0.12 + cheekGlow * 0.15} />

        {/* Quills */}
        {quills.map((q, i) => (
          <motion.line
            key={i}
            x1="60"
            y1="54"
            x2={q.x2}
            y2={q.y2}
            stroke="#8A9B8F"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={
              celebrating
                ? {
                    x2: [q.x2, q.x2 + (i % 2 === 0 ? 3 : -3), q.x2],
                    y2: [q.y2, q.y2 - 5, q.y2],
                  }
                : { x2: q.x2, y2: q.y2 }
            }
            transition={
              celebrating
                ? { duration: 0.45, delay: q.delay, repeat: 1, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          />
        ))}

        {/* Body */}
        <ellipse cx="60" cy="72" rx="28" ry="26" fill="#5C7568" />
        <ellipse cx="60" cy="74" rx="22" ry="20" fill="#6B9080" />

        {/* Belly */}
        <ellipse cx="60" cy="78" rx="14" ry="12" fill="#A8C4B8" fillOpacity="0.35" />

        {/* Feet */}
        <ellipse cx="48" cy="94" rx="7" ry="4" fill="#4F6D5F" />
        <ellipse cx="72" cy="94" rx="7" ry="4" fill="#4F6D5F" />

        {/* Face */}
        <ellipse cx="60" cy="66" rx="20" ry="18" fill="#7A9B8F" />

        {/* Cheeks when happy */}
        {(smile > 0.15 || celebrating) && (
          <>
            <circle cx="48" cy="70" r="4" fill="#C4A882" fillOpacity={0.25 + cheekGlow * 0.35} />
            <circle cx="72" cy="70" r="4" fill="#C4A882" fillOpacity={0.25 + cheekGlow * 0.35} />
          </>
        )}

        {/* Eyebrows — lift with stress */}
        <motion.path
          d={`M46 ${58 - browLift} Q52 ${54 - browLift - tension * 4} 56 ${58 - browLift}`}
          stroke="#3d4f48"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ d: `M46 ${58 - browLift} Q52 ${54 - browLift - tension * 4} 56 ${58 - browLift}` }}
          transition={{ duration: 0.25 }}
        />
        <motion.path
          d={`M64 ${58 - browLift} Q70 ${54 - browLift - tension * 4} 74 ${58 - browLift}`}
          stroke="#3d4f48"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ d: `M64 ${58 - browLift} Q70 ${54 - browLift - tension * 4} 74 ${58 - browLift}` }}
          transition={{ duration: 0.25 }}
        />

        {/* Eyes */}
        <motion.ellipse
          cx="52"
          cy="64"
          rx="3.5"
          ry={3.5 - eyeSquint * 2}
          fill="#1a221e"
          animate={{ ry: 3.5 - eyeSquint * 2 }}
          transition={{ duration: 0.25 }}
        />
        <motion.ellipse
          cx="68"
          cy="64"
          rx="3.5"
          ry={3.5 - eyeSquint * 2}
          fill="#1a221e"
          animate={{ ry: 3.5 - eyeSquint * 2 }}
          transition={{ duration: 0.25 }}
        />
        {smile > 0.35 && !celebrating && (
          <>
            <circle cx="53" cy="63" r="1" fill="#EDE8DF" fillOpacity="0.7" />
            <circle cx="69" cy="63" r="1" fill="#EDE8DF" fillOpacity="0.7" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="60" cy="70" rx="3" ry="2.5" fill="#4F6D5F" />

        {/* Mouth */}
        <motion.path
          fill="none"
          stroke="#3d4f48"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d:
              mouthCurve > 6
                ? `M52 74 Q60 ${74 + mouthCurve} 68 74`
                : mouthCurve < 2
                  ? `M54 76 Q60 ${76 - Math.abs(mouthCurve)} 66 76`
                  : `M54 75 L66 75`,
          }}
          transition={{ duration: 0.25 }}
        />

        {/* Stress sweat drop */}
        {tension > 0.35 && !celebrating && (
          <motion.path
            d="M78 58 Q80 64 78 68"
            stroke="#8A9B8F"
            strokeWidth="1.5"
            fill="#8A9B8F"
            fillOpacity="0.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </svg>

      {showName && (
        <p className="text-center text-[10px] uppercase tracking-widest text-[#9a948a]/70 mt-1 font-sans">
          Bill
        </p>
      )}
    </motion.div>
  );
}
