'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, Coffee } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────
const quickLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
];

const footerSocials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: '#00f5d4' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: '#a855f7' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: '#38bdf8' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative mt-auto">
      {/* Glassmorphism top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      {/* Accent gradient line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#00f5d4]/30 to-transparent" />

      <div className="glass-strong">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Main footer content */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start">
            {/* ── Left: Logo + Copyright ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className="cursor-hover inline-block"
              >
                <span className="text-2xl font-bold gradient-text">P.J</span>
              </a>
              <p className="mt-2 text-sm text-slate-500">
                © 2025 Paskalis Didianus Jeharus. Hak cipta dilindungi.
              </p>
            </motion.div>

            {/* ── Center: Quick Links ─────────────────────────────────── */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              aria-label="Footer navigation"
            >
              <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="cursor-hover text-sm text-slate-400 transition-colors duration-300 hover:text-[#00f5d4]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* ── Right: Social Icons ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {footerSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-hover flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-[var(--hover-color)]"
                    style={{ '--hover-color': social.color } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = social.color;
                      (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 6px ${social.color}55)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.filter = '';
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              Dibangun dengan{' '}
              <Heart className="inline h-3 w-3 text-[#f472b6] fill-[#f472b6]" />{' '}
              dan banyak{' '}
              <Coffee className="inline h-3 w-3 text-[#facc15]" />{' '}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
