"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { type Phase } from "./HeroAnimation";
import herobg2 from "../../../public/herobg2.jpg";
import herobg5 from "../../../public/herobg5.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function Hero() {
  const [phase] = useState<Phase>("circle");
  const isOverlay = phase === "overlay";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // parallax: BG moves slower
  // const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  // const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="home"
      className="min-h-screen pt-16 flex items-center relative overflow-hidden"
      ref={sectionRef}
    >
      {/* <Image
        src={cube}
        alt="enter-Cube"
        className="opacity-30 absolute scale-30"
      /> */}

      {/* Glow - Deep layer */}
      <motion.div
        className="absolute -top-32 -right-32 w-175 h-175 rounded-full pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.55,
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-150 h-150 rounded-full pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 22%, transparent) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.45,
        }}
      />
      {/* Glow - middle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-100 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.35,
        }}
      />

      {/* Astronaut */}
      <div className="absolute inset-0 z-0">
        <Image
          src={herobg5}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div>

      {/* Space */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={herobg6}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div> */}

      {/* Space 2 */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={herobg7}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div> */}

      {/* Stars */}
      <div className="absolute inset-0 z-0">
        <Image
          src={herobg2}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div>

      {/* Trees */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={herobg4}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
      </div> */}

      {/* Vignette — It darkens the edges and removes focus from the text */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 70% at 50% 45%,
              transparent 40%,
              color-mix(in srgb, var(--bg-primary) 55%, transparent) 100%
            )
          `,
        }}
      />

      {/* Soft top/bottom fade */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary), transparent)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-1"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
          opacity: 0.5,
        }}
      />

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div
          className="space-y-6"
          animate={{
            scale: isOverlay ? 1.02 : 1,
            x: isOverlay ? -4 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left center" }}
        >
          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-(--border) bg-(--bg-card) text-sm text-(--text-secondary)"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Available for work
            </motion.div>

            <motion.p
              variants={item}
              className="text-base tracking-[0.22em] uppercase text-(--accent-2) font-medium"
            >
              Frontend Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            >
              Ahmed <span className="gradient-text">Wafy</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-2xl sm:text-3xl text-(--text-secondary) leading-snug max-w-xl"
            >
              I build modern web experiences that feel{" "}
              <span className="text-(--text-primary) font-medium">
                fast, clean, and intentional
              </span>
              .
            </motion.p>

            <motion.p
              variants={item}
              className="text-(--text-secondary) max-w-lg leading-relaxed text-base sm:text-lg"
            >
              React · Next.js · TypeScript — focused on polished UI and smooth
              interactions.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-3">
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, "", "#projects");
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="btn-primary group px-8 py-4 rounded-full font-medium text-base inline-flex items-center gap-2"
              >
                View My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/cv.pdf"
                download="Ahmed-Wafy-CV.pdf"
                className="btn-secondary px-8 py-4 rounded-full font-medium text-base"
              >
                Download CV
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center gap-5 pt-3"
            >
              {/* GitHub + LinkedIn icons زي ما هم */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
