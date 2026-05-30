'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/portfolio/navbar';
import ScrollProgress from '@/components/portfolio/scroll-progress';
import HeroSection from '@/components/portfolio/hero-section';
import AboutSection from '@/components/portfolio/about-section';
import SkillsSection from '@/components/portfolio/skills-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import ExperienceSection from '@/components/portfolio/experience-section';
import TestimonialsSection from '@/components/portfolio/testimonials-section';
import ContactSection from '@/components/portfolio/contact-section';
import Footer from '@/components/portfolio/footer';

// Dynamically import heavy components to reduce initial load
const CustomCursor = dynamic(() => import('@/components/portfolio/custom-cursor'), { ssr: false });
const AnimatedBackground = dynamic(() => import('@/components/portfolio/animated-background'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
