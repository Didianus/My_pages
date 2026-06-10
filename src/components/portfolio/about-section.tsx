"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Briefcase,
  Award,
  Users,
  Calendar,
  Rocket,
  Star,
  Code2,
  Zap,
  GraduationCap,
} from "lucide-react";
import SectionHeading from "@/components/portfolio/section-heading";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 30 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, motionVal, target]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  {
    icon: Briefcase,
    value: 2,
    suffix: "+",
    label: "Tahun Pengalaman",
    color: "#00f5d4",
  },
  {
    icon: Rocket,
    value: 5,
    suffix: "+",
    label: "Proyek Selesai",
    color: "#a855f7",
  },
  {
    icon: Users,
    value: 3,
    suffix: "+",
    label: "Klien Puas",
    color: "#f472b6",
  },
  {
    icon: Award,
    value: 0,
    suffix: "+",
    label: "Penghargaan",
    color: "#38bdf8",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Mulai Kuliah",
    description: "...",
    icon: GraduationCap,
    color: "blue",
    current: false,
  },
  {
    year: "2025",
    title: "Junior Full Stack Developer",
    description: "...",
    icon: Briefcase,
    color: "green",
    current: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-[#00f5d4]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-[#a855f7]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <SectionHeading title="Tentang Saya" subtitle="// Siapa Saya" />

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left – Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Menciptakan Pengalaman Digital Yang{" "}
              <span className="gradient-text">Menginspirasi</span>
            </h3>

            <p className="text-lg leading-relaxed text-slate-300">
              Saya Paskalis Didianus Jeharus — seorang full-stack developer yang
              bersemangat dengan{" "}
              <span className="font-semibold text-[#00f5d4]">
                2+ tahun pengalaman
              </span>{" "}
              membangun aplikasi web yang indah, berkinerja tinggi, dan
              memberikan dampak nyata.
            </p>

            <p className="leading-relaxed text-slate-400">
              Saya mengkhususkan diri pada{" "}
              <span className="text-white font-medium">React</span>,{" "}
              <span className="text-white font-medium">Next.js</span>,{" "}
              <span className="text-white font-medium">Php</span>, dan teknologi
              web modern. Karya saya berada di persimpangan kode bersih dan
              desain yang matang — karena perangkat lunak hebat harus terasa
              sebaik performanya.
            </p>

            <p className="leading-relaxed text-slate-400">
              Saya percaya pada{" "}
              <span className="text-[#a855f7] font-medium">kode bersih</span>,{" "}
              <span className="text-[#f472b6] font-medium">
                desain yang matang
              </span>
              , dan{" "}
              <span className="text-[#00f5d4] font-medium">
                pembelajaran berkelanjutan
              </span>
              . Setiap proyek adalah kesempatan untuk mendorong batas dan
              memberikan sesuatu yang luar biasa.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                "React",
                "Next.js",
                "php",
                "Node.js",
                "Tailwind CSS",
                "Prisma",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-[#00f5d4]/40 hover:text-[#00f5d4]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: `0 0 30px ${stat.color}25, 0 0 60px ${stat.color}10`,
                  }}
                  className="glass group cursor-hover relative overflow-hidden rounded-2xl p-6 text-center transition-colors duration-300 hover:border-white/15"
                >
                  {/* Icon glow background */}
                  <div
                    className="absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: stat.color }}
                  />

                  <div className="relative">
                    <div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${stat.color}15` }}
                    >
                      <Icon
                        className="h-6 w-6 transition-colors duration-300"
                        style={{ color: stat.color }}
                      />
                    </div>

                    <div className="mb-1 text-3xl font-bold text-white sm:text-4xl">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>

                    <p className="text-xs font-medium text-slate-400 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h3 className="mb-12 text-center text-2xl font-bold text-white sm:text-3xl">
            Linimasa <span className="gradient-text">Karier</span>
          </h3>

          <div className="relative">
            {/* Glowing vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] md:left-1/2 md:-translate-x-1/2">
              <div className="timeline-glow h-full w-full rounded-full" />
            </div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: "easeOut",
                    }}
                    className="relative flex items-start md:items-center"
                  >
                    {/* Dot on the line */}
                    <div
                      className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
                      style={{ top: "6px" }}
                    >
                      <div
                        className="absolute h-4 w-4 rounded-full"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 12px ${item.color}60, 0 0 24px ${item.color}30`,
                        }}
                      />
                      <div
                        className="h-2 w-2 rounded-full bg-white"
                        style={{ position: "relative", zIndex: 1 }}
                      />
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-12 w-full md:ml-0 md:w-[calc(50%-32px)] ${
                        isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          boxShadow: `0 0 25px ${item.color}15`,
                        }}
                        className="glass cursor-hover group relative overflow-hidden rounded-xl p-5 transition-colors duration-300 hover:border-white/15"
                      >
                        {/* Accent line on the card side facing the timeline */}
                        <div
                          className={`absolute top-0 bottom-0 w-[2px] ${
                            isLeft ? "right-0 md:left-0" : "left-0 md:right-0"
                          }`}
                          style={{
                            background: `linear-gradient(180deg, ${item.color}, transparent)`,
                          }}
                        />

                        <div className="flex items-start gap-4">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                            style={{ background: `${item.color}15` }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: item.color }}
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-slate-500" />
                              <span
                                className="text-sm font-bold"
                                style={{ color: item.color }}
                              >
                                {item.year}
                              </span>
                              {item.current && (
                                <span className="rounded-full bg-[#00f5d4]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00f5d4]">
                                  Saat ini
                                </span>
                              )}
                            </div>
                            <h4 className="mt-1 text-base font-semibold text-white">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
