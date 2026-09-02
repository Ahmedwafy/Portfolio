"use client";

import { Code2, Layout, Rocket, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean & scalable code",
    desc: "Maintainable, type-safe code with React, Next.js and TypeScript.",
  },
  {
    icon: Layout,
    title: "Pixel-perfect UI",
    desc: "Careful spacing, hierarchy, and interfaces that feel polished.",
  },
  {
    icon: Rocket,
    title: "Full-stack delivery",
    desc: "Complete apps with auth, databases, and modern tooling.",
  },
  {
    icon: Sparkles,
    title: "UX-focused mindset",
    desc: "Fast, accessible experiences people actually enjoy using.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-sm tracking-widest uppercase text-(--accent-2) mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-[1.15]">
              Crafting digital experiences
              <br className="hidden sm:block" />
              with code &amp; care
            </h2>

            <div className="space-y-4 text-(--text-secondary) leading-relaxed max-w-xl">
              <p>
                I&apos;m{" "}
                <span className="text-(--text-primary) font-medium">
                  Ahmed Wafy
                </span>
                , a Frontend Developer who loves turning ideas into clean,
                performant and delightful web interfaces.
              </p>
              <p>
                I specialize in React, Next.js and TypeScript, and I enjoy
                building full-stack applications with tools like Supabase,
                MongoDB.
              </p>
              <p>
                When I&apos;m not coding, I explore new UI patterns, learn new
                technologies, and refine the details that make a product feel
                finished.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex mt-8 text-sm font-medium text-(--accent) hover:underline underline-offset-4"
            >
              Let&apos;s work together →
            </a>
          </div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card group rounded-2xl p-5 hover:border-(--accent)/35 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent) 15%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1.5 text-[15px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
