import { motion, AnimatePresence } from "framer-motion";

export type Phase = "circle" | "orbit";

const ease = [0.22, 1, 0.36, 1] as const;

const planets = [
  {
    size: 14,
    radius: 130,
    duration: 8,
    delay: 0,
    color: "var(--accent)",
    opacity: 0.3,
  },
  {
    size: 10,
    radius: 160,
    duration: 12,
    delay: 0.3,
    color: "var(--accent-2)",
    opacity: 0.45,
  },
  {
    size: 18,
    radius: 195,
    duration: 16,
    delay: 0.6,
    color: "var(--accent)",
    opacity: 0.5,
  },
  {
    size: 8,
    radius: 230,
    duration: 10,
    delay: 0.9,
    color: "var(--accent-2)",
    opacity: 0.4,
  },
  {
    size: 12,
    radius: 265,
    duration: 14,
    delay: 1.2,
    color: "var(--accent)",
    opacity: 0.48,
  },
];
export function MorphRing({
  phase,
  setPhase,
}: {
  phase: Phase;
  setPhase: (p: Phase) => void;
}) {
  const isOrbit = phase === "orbit";

  const toggle = () => {
    setPhase(isOrbit ? "circle" : "orbit");
  };

  return (
    <div className="relative hidden lg:flex items-center justify-center h-120 w-full">
      {/* الدايرة الرئيسية */}
      <motion.button
        type="button"
        onClick={toggle}
        className="relative cursor-pointer flex items-center justify-center overflow-visible group z-10"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0.6, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 200,
          height: 200,
          // borderRadius: 9999,
          borderRadius: "50%",
          borderWidth: 2,
          borderColor: "var(--accent)",
          boxShadow:
            "0 0 40px var(--accent-glow), inset 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent)",
          background: "color-mix(in srgb, var(--accent) 6%, transparent)",
        }}
        transition={{ duration: 0.4, ease }}
        aria-label={
          isOrbit ? "Click to close planets" : "Click to expand planets"
        }
      >
        {/* inner Rings (Appears when in circle phase)*/}
        <AnimatePresence>
          {!isOrbit && (
            <motion.div
              key="ring-details"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* small Fixed Planets */}
              {[
                { top: "2%", left: "72%", size: 56, opacity: 0.22 },
                { top: "78%", left: "8%", size: 44, opacity: 0.18 },
                { top: "12%", left: "8%", size: 28, opacity: 0.15 },
                { top: "68%", left: "78%", size: 36, opacity: 0.2 },
                { top: "88%", left: "48%", size: 22, opacity: 0.14 },
                { top: "38%", left: "92%", size: 18, opacity: 0.12 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    top: s.top,
                    left: s.left,
                    width: s.size,
                    height: s.size,
                    borderColor: "var(--accent)",
                    opacity: s.opacity,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [s.opacity, s.opacity + 0.08, s.opacity],
                  }}
                  transition={{
                    duration: 5 + i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* outer Rotating Ring */}
              <motion.div
                className="absolute border-2"
                style={{
                  inset: 24,
                  borderColor: "var(--accent)",
                  // borderRadius: "inherit",
                  borderRadius: "50%",
                  boxShadow:
                    "0 0 40px var(--accent-glow), inset 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent)",
                  }}
                />
              </motion.div>

              <div
                className="absolute inset-12.5 rounded-full border opacity-40"
                style={{ borderColor: "var(--accent-2)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="relative z-10 font-semibold gradient-text text-3xl">
          {isOrbit ? "Explore" : "Welcome"}
        </span>

        {/* "Click me" */}
        {!isOrbit && (
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[14px] tracking-widest uppercase text-(--text-secondary) opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Click me
          </span>
        )}
      </motion.button>

      {/* ========== Rotating Planets ========== */}
      <AnimatePresence>
        {isOrbit &&
          planets.map((planet, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: planet.radius * 2,
                height: planet.radius * 2,
                top: "50%",
                left: "50%",
                marginTop: -planet.radius,
                marginLeft: -planet.radius,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.5, ease },
                rotate: {
                  duration: planet.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: planet.delay,
                },
              }}
            >
              {/* the Planet */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: planet.size,
                  height: planet.size,
                  top: 0,
                  left: "50%",
                  marginLeft: -planet.size / 2,
                  background: planet.color,
                  boxShadow: `0 0 12px ${planet.color}`,
                  opacity: planet.opacity,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
