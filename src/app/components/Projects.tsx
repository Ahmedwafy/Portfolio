"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import TasklyImg from "../../../public/yyy.png";
import TreatlyImg from "../../../public/Treatly.png";
import MonitoImg from "../../../public/gggg.png";
import ProjectImage from "./ProjectImage";
import { Type } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Taskly",
    subtitle: "Task & Project Management",
    description:
      "Full-stack platform for organizing projects and team workflows with secure auth and type-safe forms.",
    tech: ["Next.js", "TypeScript", "Supabase", "TanStack Query"],
    live: "https://taskly-sigma-five.vercel.app/login",
    github: "https://github.com/Ahmedwafy/Taskly",
    image: TasklyImg,
  },
  {
    id: 2,
    title: "Monito",
    subtitle: "Pet Adoption Platform",
    description:
      "Full-stack pet adoption app with Next.js, MongoDB, and custom JWT auth (httpOnly cookies)",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://monito-liart.vercel.app/",
    github: "https://github.com/Ahmedwafy/Monito",
    image: MonitoImg,
  },
  {
    id: 3,
    title: "Treatly",
    subtitle: "Medical Appointment Booking",
    description:
      "Full-stack clinic booking app with JWT auth, smart filters, and smooth UI animations.",
    tech: ["Next.js", "MongoDB", "JWT", "Framer Motion"],
    live: "https://treatly-olive.vercel.app/",
    github: "https://github.com/Ahmedwafy/Treatly",
    image: TreatlyImg,
  },
];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm tracking-widest uppercase text-(--accent-2) mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
        </div>

        {/* Accordion Gallery */}
        <div className="flex gap-2 h-105 sm:h-120 lg:h-130">
          {projects.map((project) => {
            const isActive = activeId === project.id;

            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onMouseEnter={() => setActiveId(project.id)}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-(--border)"
                animate={{
                  flex: isActive ? 3.2 : 0.7,
                }}
                transition={{ duration: 0.55, ease }}
                style={{
                  boxShadow: isActive ? "0 0 40px var(--accent-glow)" : "none",
                }}
              >
                {/* Image */}
                {isActive ? (
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    isActive={isActive}
                  />
                ) : null}

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-colors duration-400 ${
                    isActive
                      ? "bg-linear-to-t from-black/85 via-black/30 to-transparent"
                      : "bg-black/55"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  {/* Collapsed label (vertical-ish) */}
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-end justify-center pb-6"
                    >
                      <span
                        className="text-white/90 font-semibold text-sm tracking-wide"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {project.title}
                      </span>
                    </motion.div>
                  )}

                  {/* Expanded content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1, ease }}
                    >
                      <p className="text-(--accent-2) text-xs tracking-widest uppercase mb-1">
                        {project.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed mb-4 max-w-md">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={project.live}
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer" // Prevent security vulnerabilities // window.opener === null for security
                          className="btn-primary px-4 py-2 rounded-full text-sm font-medium"
                        >
                          Live Demo →
                        </Link>
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full text-sm font-medium border border-white/25 text-white hover:bg-white/10 transition-colors flex
                          items-center"
                        >
                          GitHub
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
