"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/portfolio/section-heading";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
  accent: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const experiences: ExperienceEntry[] = [
  {
    period: "2025 - 2026",
    role: "Junior Full-Stack Developer",
    company: "DigitalCraft Studio",
    description:
      "Memimpin tim 8 developer, merancang aplikasi web skalabel dan microservice.",
    accent: "#a855f7",
  },
  {
    period: "2024 - 2025",
    role: "Tahap Belajar Full-Stack Developer",
    company: "InnovateTech",
    description:
      "Membangun aplikasi web modern menggunakan React, Node.js, dan layanan cloud.",
    accent: "#f472b6",
  },
];

// ── Timeline Card ─────────────────────────────────────────────────────────────
function TimelineCard({
  entry,
  index,
  isLeft,
}: {
  entry: ExperienceEntry;
  index: number;
  isLeft: boolean;
}) {
  return (
    <div
      className={`relative flex w-full items-start md:items-center ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* ── Card (positioned to one side) ── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className={`ml-14 w-full md:ml-0 md:w-[calc(50%-36px)] ${
          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
        }`}
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: `0 0 35px ${entry.accent}20, 0 0 70px ${entry.accent}08`,
          }}
          className="cursor-hover group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0f0f23]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/[0.12]"
        >
          {/* Animated gradient border on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              padding: "1px",
              background: `linear-gradient(135deg, ${entry.accent}66, ${entry.accent}22, transparent, ${entry.accent}44)`,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Glow behind card on hover */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `${entry.accent}12` }}
          />

          {/* Accent bar on the side facing the timeline */}
          <div
            className={`absolute top-0 bottom-0 w-[2px] ${
              isLeft ? "left-0 md:right-0 md:left-auto" : "left-0"
            }`}
            style={{
              background: `linear-gradient(180deg, ${entry.accent}, ${entry.accent}33, transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Period & Badge row */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="gradient-text text-sm font-bold font-mono tracking-wide">
                {entry.period}
              </span>
              {entry.current && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: 0.3,
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: `${entry.accent}15`,
                    color: entry.accent,
                    border: `1px solid ${entry.accent}30`,
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: entry.accent }}
                  />
                  Saat ini
                </motion.span>
              )}
            </div>

            {/* Role */}
            <h3 className="mb-1 text-lg font-semibold text-white group-hover:text-[#00f5d4] transition-colors duration-300">
              {entry.role}
            </h3>

            {/* Company */}
            <div className="mb-3 flex items-center gap-2">
              <Briefcase
                className="h-3.5 w-3.5"
                style={{ color: entry.accent }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: entry.accent }}
              >
                {entry.company}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-400">
              {entry.description}
            </p>

            {/* Arrow indicator */}
            <div
              className={`mt-4 flex items-center gap-1 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 ${
                isLeft ? "md:flex-row-reverse" : ""
              }`}
              style={{ color: entry.accent }}
            >
              <ArrowRight
                className={`h-3 w-3 ${isLeft ? "md:rotate-180" : ""}`}
              />
              <span>Selengkapnya</span>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-bl-2xl opacity-[0.04]"
            style={{
              background: `radial-gradient(circle at 100% 100%, ${entry.accent}, transparent 70%)`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Dot on the timeline ── */}
      <div className="absolute left-4 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center md:left-1/2 top-5 md:top-1/2 md:-translate-y-1/2">
        {/* Outer glow ring */}
        <div
          className="absolute h-5 w-5 rounded-full"
          style={{
            background: `${entry.accent}30`,
            boxShadow: `0 0 12px ${entry.accent}50, 0 0 24px ${entry.accent}25`,
          }}
        />
        {/* Solid dot */}
        <div
          className="relative z-10 h-3 w-3 rounded-full border-2 border-[#050510]"
          style={{ background: entry.accent }}
        />
        {/* Pulse animation for current position */}
        {entry.current && (
          <motion.div
            className="absolute h-5 w-5 rounded-full"
            style={{ border: `2px solid ${entry.accent}` }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-[#00f5d4]/[0.03] blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 h-80 w-80 rounded-full bg-[#a855f7]/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <SectionHeading title="Pengalaman" subtitle="// Perjalanan Saya" />

        {/* ── Timeline ── */}
        <div className="relative mt-8">
          {/* Central vertical glowing line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="timeline-glow w-full rounded-full origin-top"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-10 md:space-y-14">
            {experiences.map((entry, i) => {
              const isLeft = i % 2 === 0;

              return (
                <TimelineCard
                  key={entry.period}
                  entry={entry}
                  index={i}
                  isLeft={isLeft}
                />
              );
            })}
          </div>

          {/* Timeline end cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            className="absolute left-4 -bottom-1 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center md:left-1/2"
          >
            <div className="h-3 w-3 rotate-45 rounded-sm border border-[#00f5d4]/40 bg-[#0f0f23]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
