"use client";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiSupabase,
  SiMongodb,
  SiFramer,
  SiGit,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

// نكرر القائمة مرتين عشان الحركة تبقى سلسة ولا نهائية
const marqueeSkills = [...skills, ...skills];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-sm tracking-widest uppercase text-(--accent-2) mb-3">
          Technologies
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Skills &amp; Technologies
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-(--bg-primary) to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-(--bg-primary) to-transparent" />

        <div className="flex animate-marquee gap-5 w-max">
          {marqueeSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`${skill.name}-${index}`}
                className="card flex items-center gap-3 px-5 py-4 rounded-2xl min-w-40 hover:border-(--accent)/40 transition-colors"
              >
                <Icon
                  className="w-7 h-7 shrink-0"
                  style={{ color: skill.color }}
                />
                <span className="text-sm text-(--text-secondary) whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
