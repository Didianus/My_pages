'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-mono tracking-widest uppercase text-[#00f5d4] mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? '80px' : '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-1 rounded-full bg-gradient-to-r from-[#00f5d4] to-[#a855f7] mt-4 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
