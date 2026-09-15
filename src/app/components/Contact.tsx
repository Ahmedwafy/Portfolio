"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus("sending");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent successfully");

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest uppercase text-(--accent-2) mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s build something amazing
          </h2>
          <p className="text-(--text-secondary) max-w-lg mx-auto">
            I&apos;m currently open to new opportunities and interesting
            projects. Drop me a message and I&apos;ll get back to you.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-(--border) bg-(--bg-card) p-10 text-center"
            >
              <div
                className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "color-mix(in srgb, var(--accent) 18%, transparent)",
                  color: "var(--accent)",
                }}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold mb-2">Message sent</h3>
              <p className="text-(--text-secondary) text-sm max-w-sm mx-auto">
                Thanks for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-(--text-secondary) mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-(--bg-card) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-(--text-secondary) mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-(--bg-card) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-(--text-secondary) mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-(--bg-card) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent) transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-base disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-16 pt-10 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-(--text-secondary)">
          <p>© {new Date().getFullYear()} Ahmed Wafy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="https://github.com/Ahmedwafy?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--accent) transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahmed-abdel-wahab-9043ab1a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--accent) transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
