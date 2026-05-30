'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/portfolio/section-heading';

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      'Paskalis adalah developer luar biasa yang membawa keahlian teknis dan visi kreatif ke setiap proyek. Hasilnya melampaui ekspektasi kami.',
    author: 'Sarah Chen',
    role: 'CEO @ TechVenture',
    rating: 5,
  },
  {
    quote:
      'Bekerja dengan Paskalis menjadi pengubah permainan untuk kehadiran digital kami. Perhatian pada detail dan solusi inovatif sangat luar biasa.',
    author: 'Michael Torres',
    role: 'CTO @ DataFlow',
    rating: 5,
  },
  {
    quote:
      'Developer paling berbakat yang pernah saya temui. Paskalis menghasilkan produk yang tidak hanya berfungsi sempurna tapi juga terlihat memukau.',
    author: 'Emma Wilson',
    role: 'Kepala Desain @ CreativeHub',
    rating: 5,
  },
  {
    quote:
      'Kemampuan Paskalis menerjemahkan ide kompleks menjadi kode yang indah dan fungsional sangat luar biasa. Seorang profesional sejati dalam setiap aspek.',
    author: 'David Kim',
    role: 'Pendiri @ InnovateLab',
    rating: 5,
  },
];

// ─── Slide transition variants ────────────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-[#a855f7]/5 blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 h-72 w-72 rounded-full bg-[#00f5d4]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <SectionHeading title="Testimoni Klien" subtitle="// Apa Kata Mereka" />

        {/* Carousel container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="cursor-hover absolute -left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0f0f23]/80 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-[#00f5d4]/40 hover:text-[#00f5d4] hover:shadow-[0_0_20px_rgba(0,245,212,0.15)] sm:-left-5 sm:h-12 sm:w-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={goNext}
            className="cursor-hover absolute -right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0f0f23]/80 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-[#00f5d4]/40 hover:text-[#00f5d4] hover:shadow-[0_0_20px_rgba(0,245,212,0.15)] sm:-right-5 sm:h-12 sm:w-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Testimonial card */}
          <div className="mx-auto max-w-2xl overflow-hidden px-8 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="glass-strong gradient-border cursor-hover relative rounded-2xl p-8 sm:p-10 md:p-12"
              >
                {/* Large decorative quote mark */}
                <div className="pointer-events-none absolute -top-2 left-6 text-[100px] font-serif leading-none text-[#00f5d4]/8 sm:left-8 sm:text-[120px] md:text-[140px] select-none">
                  &ldquo;
                </div>

                {/* Quote icon */}
                <div className="relative mb-6 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00f5d4]/15 to-[#a855f7]/15">
                    <Quote className="h-6 w-6 text-[#00f5d4]" />
                  </div>
                </div>

                {/* Star rating */}
                <div className="relative mb-6 flex items-center justify-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      fill={i < testimonial.rating ? '#facc15' : 'transparent'}
                      stroke={i < testimonial.rating ? '#facc15' : '#475569'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="relative mb-8 text-center text-lg leading-relaxed text-slate-300 sm:text-xl sm:leading-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="relative text-center">
                  <p className="gradient-text text-lg font-bold sm:text-xl">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-400 sm:text-base">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="cursor-hover relative flex h-3 items-center justify-center transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.span
                  animate={{
                    width: i === current ? 28 : 10,
                    backgroundColor:
                      i === current ? '#00f5d4' : 'rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="block h-[6px] rounded-full"
                />
                {/* Glow on active dot */}
                {i === current && (
                  <motion.span
                    layoutId="dot-glow"
                    className="absolute h-3 w-7 rounded-full bg-[#00f5d4]/20 blur-sm"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
