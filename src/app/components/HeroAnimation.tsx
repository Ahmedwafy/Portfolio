import { motion, AnimatePresence } from "framer-motion";

export type Phase = "circle" | "horizontal" | "vertical" | "overlay";

const satellites = [
  { top: "2%", left: "72%", size: 56, opacity: 0.22, delay: 0 },
  { top: "78%", left: "8%", size: 44, opacity: 0.18, delay: 0.4 },
  { top: "12%", left: "8%", size: 28, opacity: 0.15, delay: 0.8 },
  { top: "68%", left: "78%", size: 36, opacity: 0.2, delay: 1.2 },
  { top: "88%", left: "48%", size: 22, opacity: 0.14, delay: 0.6 },
  { top: "38%", left: "92%", size: 18, opacity: 0.12, delay: 1.5 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function MorphRing({
  phase,
  setPhase,
}: {
  phase: Phase;
  setPhase: (p: Phase) => void;
}) {
  const next = () => {
    if (phase === "circle") setPhase("horizontal");
    else if (phase === "horizontal") setPhase("vertical");
    else if (phase === "vertical") setPhase("overlay");
    else setPhase("circle");
  };

  const isOverlay = phase === "overlay";
  const showRingDetails = phase === "circle";

  return (
    <>
      {/* Right morph control */}
      <div className="relative hidden lg:flex items-center justify-center h-120 w-full">
        <AnimatePresence mode="popLayout">
          {!isOverlay && (
            <motion.button
              key="morph-btn"
              layoutId="morph-shape"
              type="button"
              onClick={next}
              className="relative cursor-pointer flex items-center justify-center overflow-visible group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0.6, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                borderWidth: 2,
                borderColor: "var(--accent)",
                boxShadow:
                  "0 0 40px var(--accent-glow), inset 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent)",
                background: "color-mix(in srgb, var(--accent) 6%, transparent)",
                width:
                  phase === "circle" ? 200 : phase === "horizontal" ? 520 : 110,
                height:
                  phase === "circle" ? 200 : phase === "horizontal" ? 110 : 420,
                borderRadius: 9999,
              }}
              transition={{
                layout: { duration: 0.75, ease },
                width: { duration: 0.75, ease },
                height: { duration: 0.75, ease },
                opacity: { duration: 0.35 },
                scale: { duration: 0.4, ease },
              }}
              aria-label="Click to expand"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ borderRadius: "inherit" }}
              >
                {showRingDetails &&
                  satellites.map((s, i) => (
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
                        delay: s.delay,
                      }}
                    />
                  ))}

                <div
                  className="absolute inset-0 border opacity-30"
                  style={{
                    borderColor: "var(--accent)",
                    borderWidth: 1,
                    borderRadius: "inherit",
                  }}
                />

                <motion.div
                  className="absolute border-2"
                  style={{
                    inset: showRingDetails ? 24 : 8,
                    borderColor: "var(--accent)",
                    borderRadius: "inherit",
                    boxShadow:
                      "0 0 40px var(--accent-glow), inset 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent)",
                  }}
                  animate={showRingDetails ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    showRingDetails
                      ? { duration: 28, repeat: Infinity, ease: "linear" }
                      : { duration: 0.35 }
                  }
                >
                  {showRingDetails && (
                    <span
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 12px var(--accent)",
                      }}
                    />
                  )}
                </motion.div>

                {showRingDetails && (
                  <div
                    className="absolute inset-12.5 rounded-full border opacity-40"
                    style={{ borderColor: "var(--accent-2)" }}
                  />
                )}
              </div>

              <span
                className={`relative z-10 font-semibold gradient-text ${
                  phase === "circle"
                    ? "text-3xl"
                    : phase === "horizontal"
                      ? "text-sm tracking-[0.25em] uppercase"
                      : "text-xs tracking-widest uppercase"
                }`}
                style={
                  phase === "vertical"
                    ? {
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }
                    : undefined
                }
              >
                {phase === "circle"
                  ? "Welcome"
                  : phase === "horizontal"
                    ? "Click again"
                    : "Open"}
              </span>

              {phase === "circle" && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[14px] tracking-widest uppercase text-(--text-secondary) opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Click me
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOverlay && (
          <>
            <motion.div
              key="overlay-frame"
              layoutId="morph-shape"
              className="absolute z-20 pointer-events-none"
              style={{
                left: 550,
                right: 0,
                top: 0,
                bottom: 0,
                borderWidth: 2,
                borderColor: "var(--accent)",
                borderRadius: 28,
                boxShadow:
                  "0 0 60px var(--accent-glow), inset 0 0 80px color-mix(in srgb, var(--accent) 8%, transparent)",
                background: "color-mix(in srgb, var(--accent) 5%, transparent)",
              }}
              transition={{
                layout: { duration: 0.8, ease },
              }}
            />

            <motion.button
              key="close-btn"
              type="button"
              onClick={() => setPhase("circle")}
              className="absolute z-30 top-4 right-4 text-xs text-(--text-secondary) hover:text-(--accent) transition-colors px-3 py-1.5 rounded-full border border-(--border) bg-(--bg-primary)/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: 0.25 }}
              aria-label="Close frame"
            >
              Close ✕
            </motion.button>

            <motion.div
              key="typewriter"
              className="absolute z-30 hidden lg:flex flex-col justify-center"
              style={{
                left: "calc(50% + 1.5rem)",
                right: "max(2rem, calc(50% - 38rem))",
                top: "5rem",
                bottom: "2rem",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 8,
                transition: { duration: 0.25 },
              }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
