"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Send,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "@/components/portfolio/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cubicBezier } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────
const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "paskalisdjeahrus@gmail.com",
    href: "mailto:paskalisdjeahrus@gmail.com",
    color: "#00f5d4",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jakarta, Indonesia",
    href: undefined,
    color: "#a855f7",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Terbuka untuk freelance",
    href: undefined,
    color: "#f472b6",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    color: "#00f5d4",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    color: "#a855f7",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "#38bdf8",
  },
  {
    name: "Dribbble",
    icon: Dribbble,
    href: "https://dribbble.com",
    color: "#f472b6",
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────
function SocialIconLink({ social }: { social: (typeof socialLinks)[number] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = social.icon;

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-hover relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.06]"
    >
      {/* Hover glow backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        animate={{
          boxShadow: hovered
            ? `0 0 20px ${social.color}30, 0 0 40px ${social.color}15`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      <Icon
        className="relative z-10 h-5 w-5 transition-all duration-300"
        style={{
          color: hovered ? social.color : "#94a3b8",
          filter: hovered ? `drop-shadow(0 0 6px ${social.color}66)` : "none",
        }}
      />
    </motion.a>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief loading state for UX polish
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Pesan terkirim! ✨",
        description:
          "Terima kasih sudah menghubungi. Saya akan segera membalas!",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-32 h-64 w-64 rounded-full bg-[#00f5d4]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-[#a855f7]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <SectionHeading title="Hubungi Saya" subtitle="// Mari Terhubung" />

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* ── Left: Contact Info ───────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Mari Membangun Sesuatu yang{" "}
                <span className="gradient-text">Luar Biasa</span> Bersama
              </h3>
              <p className="text-base leading-relaxed text-slate-400">
                Saya selalu terbuka untuk mendiskusikan proyek baru, ide
                kreatif, atau peluang untuk menjadi bagian dari sesuatu yang
                hebat. Baik Anda membutuhkan developer freelance, ingin
                berkolaborasi dalam proyek, atau hanya ingin berbicara tentang
                teknologi terbaru — inbox saya selalu terbuka.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div variants={itemVariants} className="space-y-3">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const isLink = !!detail.href;
                const Wrapper = isLink ? motion.a : "div";
                const wrapperProps = isLink
                  ? {
                      href: detail.href,
                      whileHover: { x: 4 },
                      whileTap: { scale: 0.98 },
                    }
                  : {};

                return (
                  <Wrapper
                    key={detail.label}
                    {...wrapperProps}
                    className={`flex items-center gap-4 rounded-xl p-3 -mx-3 transition-all duration-300 ${
                      isLink ? "cursor-hover group hover:bg-white/[0.04]" : ""
                    }`}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${detail.color}12`,
                        boxShadow: `0 0 20px ${detail.color}15`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: detail.color }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {detail.label}
                      </p>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                        {detail.value}
                      </p>
                    </div>
                    {isLink && (
                      <ArrowUpRight className="ml-auto h-4 w-4 text-slate-600 transition-all duration-300 group-hover:text-[#00f5d4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </Wrapper>
                );
              })}
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                Temukan saya di
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <SocialIconLink key={social.name} social={social} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="glass relative rounded-2xl p-6 sm:p-8">
              {/* Decorative gradient line at the top */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00f5d4]/40 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-slate-300"
                  >
                    Nama
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Nama Anda"
                    required
                    className="h-11 rounded-xl border-white/[0.06] bg-white/[0.03] text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-[#00f5d4]/50 focus:ring-[#00f5d4]/20 focus:ring-[3px] focus-visible:border-[#00f5d4]/50 focus-visible:ring-[#00f5d4]/20 focus-visible:ring-[3px]"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    required
                    className="h-11 rounded-xl border-white/[0.06] bg-white/[0.03] text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-[#00f5d4]/50 focus:ring-[#00f5d4]/20 focus:ring-[3px] focus-visible:border-[#00f5d4]/50 focus-visible:ring-[#00f5d4]/20 focus-visible:ring-[3px]"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-slate-300"
                  >
                    Subjek
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="Tentang apa ini?"
                    required
                    className="h-11 rounded-xl border-white/[0.06] bg-white/[0.03] text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-[#00f5d4]/50 focus:ring-[#00f5d4]/20 focus:ring-[3px] focus-visible:border-[#00f5d4]/50 focus-visible:ring-[#00f5d4]/20 focus-visible:ring-[3px]"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="space-y-2"
                >
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-slate-300"
                  >
                    Pesan
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Ceritakan tentang proyek Anda..."
                    required
                    rows={5}
                    className="min-h-[120px] rounded-xl border-white/[0.06] bg-white/[0.03] text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-[#00f5d4]/50 focus:ring-[#00f5d4]/20 focus:ring-[3px] focus-visible:border-[#00f5d4]/50 focus-visible:ring-[#00f5d4]/20 focus-visible:ring-[3px]"
                  />
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-hover group relative h-12 w-full overflow-hidden rounded-xl border-0 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.3)]"
                    style={{
                      background: "linear-gradient(135deg, #00f5d4, #a855f7)",
                      color: "#050510",
                    }}
                  >
                    {/* Shimmer overlay on hover */}
                    <span className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-4 w-4 rounded-full border-2 border-[#050510]/30 border-t-[#050510]"
                          />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
