"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Code, Server, Palette, Wrench, Layers } from "lucide-react";
import SectionHeading from "@/components/portfolio/section-heading";

// ── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  accent: string; // tailwind / css colour string
  accentBg: string; // lighter bg for progress track
  skills: Skill[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const categories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Code className="h-5 w-5" />,
    accent: "#00f5d4",
    accentBg: "rgba(0,245,212,0.12)",
    skills: [
      { name: "React", level: 10 },
      { name: "Next.js", level: 50 },
      { name: "TypeScript", level: 50 },
      { name: "Tailwind CSS", level: 50 },
      { name: "Vue.js", level: 10 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Server className="h-5 w-5" />,
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.12)",
    skills: [
      { name: "Node.js", level: 50 },
      { name: "Python", level: 10 },
      { name: "PostgreSQL", level: 10 },
      { name: "MongoDB", level: 10 },
      { name: "PHP", level: 50 },
    ],
  },
  {
    id: "uiux",
    label: "UI/UX",
    icon: <Palette className="h-5 w-5" />,
    accent: "#f472b6",
    accentBg: "rgba(244,114,182,0.12)",
    skills: [
      { name: "Figma", level: 50 },
      { name: "Adobe XD", level: 10 },
      { name: "Prototyping", level: 10 },
      { name: "Design Systems", level: 10 },
    ],
  },
  {
    id: "tools",
    label: "Tools & AI",
    icon: <Wrench className="h-5 w-5" />,
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.12)",
    skills: [
      { name: "Git", level: 50 },
      { name: "Docker", level: 10 },
      { name: "AWS", level: 10 },
      { name: "AI/ML", level: 10 },
      { name: "CI/CD", level: 10 },
    ],
  },
];

const filterOptions = [
  { id: "all", label: "Semua", icon: <Layers className="h-4 w-4" /> },
  ...categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon })),
];

// ── Sub-components ───────────────────────────────────────────────────────────

/** 3-D tilt wrapper – applies perspective tilt on mouse move */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // max ±8 deg
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/** Animated progress bar with neon colours */
function SkillBar({
  name,
  level,
  accent,
  accentBg,
  index,
  isInView,
}: {
  name: string;
  level: number;
  accent: string;
  accentBg: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <motion.span
          className="text-xs font-mono tabular-nums"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
        >
          {isInView ? `${level}%` : ""}
        </motion.span>
      </div>
      {/* Track */}
      <div
        className="relative h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: accentBg }}
      >
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}cc)`,
            boxShadow: `0 0 12px ${accent}66`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: 0.3 + index * 0.08,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const visibleCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <section id="skills" className="relative py-20 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <SectionHeading
          title="Keahlian & Kompetensi"
          subtitle="// Apa Yang Saya Lakukan"
        />

        {/* ── Filter buttons ── */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`cursor-hover group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white shadow-lg"
                    : "bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200"
                }`}
              >
                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="skills-filter-glow"
                    className="absolute inset-0 rounded-full border border-[#00f5d4]/40"
                    style={{ boxShadow: "0 0 16px rgba(0,245,212,0.25)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Skill cards grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {visibleCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                <TiltCard className="h-full">
                  <div
                    className="group relative h-full rounded-2xl border border-white/[0.06] bg-[#0f0f23]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-transparent hover:shadow-[0_0_30px_rgba(0,245,212,0.08)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(15,15,35,0.9), rgba(15,15,35,0.6))",
                    }}
                  >
                    {/* Gradient border overlay on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        padding: "1px",
                        background: `linear-gradient(135deg, ${cat.accent}66, ${cat.accent}22, transparent, ${cat.accent}44)`,
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    {/* Subtle glow behind card on hover */}
                    <div
                      className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `${cat.accent}15` }}
                    />

                    {/* ── Card header ── */}
                    <div className="relative z-10 mb-6 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: cat.accentBg,
                          color: cat.accent,
                          boxShadow: `0 0 20px ${cat.accent}20`,
                        }}
                      >
                        {cat.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {cat.label}
                      </h3>
                    </div>

                    {/* ── Skill bars ── */}
                    <div className="relative z-10 space-y-4">
                      {cat.skills.map((skill, i) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          accent={cat.accent}
                          accentBg={cat.accentBg}
                          index={i}
                          isInView={isInView}
                        />
                      ))}
                    </div>

                    {/* ── Decorative corner accent ── */}
                    <div
                      className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-bl-3xl opacity-[0.04]"
                      style={{
                        background: `radial-gradient(circle at 100% 100%, ${cat.accent}, transparent 70%)`,
                      }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
