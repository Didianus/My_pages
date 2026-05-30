'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

/* ────────────────────────────────────────────
   Typewriter hook
   ──────────────────────────────────────────── */
function useTypewriter(text: string, speed = 60, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ────────────────────────────────────────────
   Floating orb component
   ──────────────────────────────────────────── */
function FloatingOrb({
  color,
  size,
  top,
  left,
  delay,
  duration,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: `blur(${size * 0.4}px)`,
        opacity: 0.15,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ────────────────────────────────────────────
   Gradient mesh background (pure CSS)
   ──────────────────────────────────────────── */
function GradientMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,245,212,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 50% 80%, rgba(244,114,182,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Animated mesh blobs */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw',
          height: '60vw',
          top: '-20%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(0,245,212,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '50vw',
          height: '50vw',
          bottom: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '40vw',
          height: '40vw',
          top: '30%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Profile image with 3D tilt & glow
   ──────────────────────────────────────────── */
function ProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative group cursor-hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Animated glow ring */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, #00f5d4, #a855f7, #f472b6, #00f5d4)',
            backgroundSize: '300% 300%',
            animation: 'gradient-rotate 4s ease infinite',
          }}
        />

        {/* Outer glow pulse */}
        <motion.div
          className="absolute -inset-4 rounded-3xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,245,212,0.15), rgba(168,85,247,0.15))',
          }}
          animate={{
            opacity: isHovering ? [0.3, 0.6, 0.3] : [0.15, 0.25, 0.15],
            scale: isHovering ? [1, 1.02, 1] : [1, 1.01, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Image container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src="/profile.png"
            alt="Paskalis Didianus Jeharus - Full-Stack Developer & Creative Designer"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/40 via-transparent to-transparent" />
        </div>

        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00f5d4] rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#a855f7] rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#a855f7] rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#00f5d4] rounded-br-lg" />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Social link button
   ──────────────────────────────────────────── */
function SocialLink({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="cursor-hover relative p-3 rounded-xl border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-[#00f5d4] hover:border-[#00f5d4]/30 hover:bg-[#00f5d4]/5 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={20} />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00f5d4] to-[#a855f7] group-hover:w-4/5 transition-all duration-300" />
    </motion.a>
  );
}

/* ────────────────────────────────────────────
   Scroll indicator
   ──────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-hover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="text-xs font-mono tracking-widest text-muted-foreground/60 uppercase">
        Gulir
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} className="text-[#00f5d4]/60" />
      </motion.div>
      <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-[#00f5d4]"
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Main Hero Section
   ──────────────────────────────────────────── */
export default function HeroSection() {
  const tagline = 'Menciptakan Pengalaman Digital Yang Menginspirasi';
  const { displayed: typedTagline, done: typewriterDone } = useTypewriter(tagline, 55, 1400);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient mesh background */}
      <GradientMeshBackground />

      {/* Floating orbs */}
      <FloatingOrb color="#00f5d4" size={120} top="10%" left="5%" delay={0} duration={12} />
      <FloatingOrb color="#a855f7" size={90} top="60%" left="85%" delay={2} duration={14} />
      <FloatingOrb color="#f472b6" size={70} top="75%" left="15%" delay={4} duration={16} />
      <FloatingOrb color="#38bdf8" size={100} top="20%" left="70%" delay={1} duration={13} />
      <FloatingOrb color="#00f5d4" size={60} top="85%" left="60%" delay={3} duration={15} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left column: Text content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f5d4]/20 bg-[#00f5d4]/5 text-sm text-[#00f5d4] font-mono">
                <Sparkles size={14} />
                <span>Tersedia untuk hire</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5d4]" />
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4"
            >
              <span className="block text-foreground/80 text-lg sm:text-xl md:text-2xl font-medium mb-2">
                Halo, Saya
              </span>
              <span className="gradient-text">Paskalis Didianus Jeharus</span>
            </motion.h1>

            {/* Profession */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium mb-6"
            >
              Full-Stack Developer &amp; Desainer Kreatif
            </motion.p>

            {/* Tagline with typewriter */}
            <motion.div
              variants={itemVariants}
              className="mb-6 min-h-[2rem]"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground/90">
                {typedTagline}
                <motion.span
                  className="inline-block w-[3px] h-[1em] ml-1 bg-[#00f5d4] align-middle"
                  animate={{ opacity: [1, 1, 0, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.45, 0.5, 0.95, 1],
                    repeatDelay: typewriterDone ? 0 : 9999,
                  }}
                />
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Saya mengubah ide menjadi aplikasi web yang elegan dan berkinerja tinggi.
              Dengan passion pada kode bersih dan desain memukau, saya membangun produk
              digital yang meninggalkan kesan mendalam.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                onClick={() => handleScrollTo('projects')}
                size="lg"
                className="cursor-hover group relative overflow-hidden bg-[#00f5d4] text-[#050510] hover:bg-[#00f5d4]/90 font-semibold text-base px-8 h-12 rounded-xl neon-cyan transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Proyek
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>

              <Button
                onClick={() => handleScrollTo('contact')}
                size="lg"
                variant="outline"
                className="cursor-hover group relative overflow-hidden border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10 hover:border-[#a855f7]/50 font-semibold text-base px-8 h-12 rounded-xl transition-all duration-300"
              >
                <span className="relative z-10">Hubungi Saya</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a855f7]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <span className="text-sm text-muted-foreground/50 mr-1 hidden sm:inline">
                Temukan saya di
              </span>
              <SocialLink
                href="https://github.com"
                icon={Github}
                label="GitHub"
                delay={1.5}
              />
              <SocialLink
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
                delay={1.6}
              />
              <SocialLink
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
                delay={1.7}
              />
            </motion.div>
          </motion.div>

          {/* ── Right column: Profile image ── */}
          <div className="flex-shrink-0">
            <ProfileImage />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />
    </section>
  );
}
