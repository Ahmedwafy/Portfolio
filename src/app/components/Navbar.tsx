"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));

    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      if (!isScrolled) setSideOpen(false);

      const offset = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);

    setSideOpen(false);
    window.history.pushState(null, "", href);

    // Wait for the side menu to close before scrolling to the section
    setTimeout(() => {
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 280);
  };

  return (
    <>
      {/* TOP PILL - Navigation bar*/}
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
          >
            <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 h-12 sm:h-14 rounded-full border border-(--border) bg-(--bg-card)/60 backdrop-blur-md">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("#home");
                }}
                className="font-bold text-sm sm:text-base tracking-tight px-2 sm:px-3 shrink-0"
              >
                Ahmed <span className="gradient-text">Wafy</span>
              </a>

              <ul className="hidden md:flex items-center gap-0.5 text-sm">
                {links.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(link.href);
                        }}
                        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-(--accent)/15 text-(--accent) font-medium"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-2 pl-1 sm:pl-2">
                <ThemeBtn theme={theme} toggleTheme={toggleTheme} />
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("#contact");
                  }}
                  className="hidden sm:inline-flex btn-primary text-xs font-medium px-3.5 py-1.5 rounded-full"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* FLOATING AW → vertical pill */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-5 left-5 z-50"
          >
            <div className="border border-(--border) bg-(--bg-primary)/85 backdrop-blur-xl shadow-lg rounded-full flex flex-col items-center w-16 overflow-hidden">
              <button
                onClick={() => setSideOpen((v) => !v)}
                className="w-16 h-16 flex items-center justify-center font-bold text-lg gradient-text shrink-0"
                aria-label={sideOpen ? "Close menu" : "Open menu"}
              >
                AW
              </button>

              <AnimatePresence initial={false}>
                {sideOpen && (
                  <motion.div
                    key="side-links"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.2 },
                    }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="flex flex-col items-center gap-1.5 pb-3.5 pt-0">
                      <div className="w-7 h-px bg-(--border) mb-1" />

                      {links.map((link) => {
                        const id = link.href.replace("#", "");
                        const isActive = active === id;
                        return (
                          <button
                            key={link.href}
                            type="button"
                            title={link.label}
                            onClick={() => goTo(link.href)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm transition-all ${
                              isActive
                                ? "bg-(--accent)/20 text-(--accent) font-semibold"
                                : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-white/5"
                            }`}
                          >
                            {link.label.slice(0, 1)}
                          </button>
                        );
                      })}

                      <div className="w-7 h-px bg-(--border) my-1" />

                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        aria-label="Toggle theme"
                      >
                        <span
                          className={`w-4 h-4 rounded-full ${
                            theme === "purple"
                              ? "bg-purple-500"
                              : "bg-amber-500"
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeBtn({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-11 h-7 rounded-full border border-(--border) bg-(--bg-card) flex items-center px-0.5"
      aria-label="Toggle theme"
    >
      <span
        className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === "purple"
            ? "translate-x-0 bg-purple-500"
            : "translate-x-4 bg-amber-500"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white/90" />
      </span>
    </button>
  );
}
