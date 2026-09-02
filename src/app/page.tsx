"use client";

import { ThemeProvider, useTheme } from "@/app/components/ThemeProvider";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import LightRays from "./components/LightRays";
import ConsoleEasterEgg from "./components/ConsoleEasterEgg";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function RaysBackground() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [raysColor, setRaysColor] = useState("#a855f7");

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setRaysColor(theme === "purple" ? "#a855f7" : "#f59e0b");
      setVisible(true);
    }, 250);
    return () => clearTimeout(t);
  }, [theme]);

  return (
    <div
      className={`fixed top-0 h-screen w-screen -z-10 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LightRays
        raysOrigin="top-left"
        raysColor={raysColor}
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "var(--accent)",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <ConsoleEasterEgg />
      <Navbar />
      <main>
        <RaysBackground />
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
    </ThemeProvider>
  );
}
