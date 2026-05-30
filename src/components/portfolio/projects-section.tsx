'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, X, Layers, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/portfolio/section-heading';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demo: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NeonCommerce',
    shortDescription: 'E-commerce platform with AI recommendations',
    fullDescription:
      'A next-generation e-commerce platform that leverages artificial intelligence to deliver personalized product recommendations. Built with a modern React frontend and Next.js server-side rendering, it features real-time inventory tracking, dynamic pricing algorithms, and a seamless checkout experience. The AI engine analyzes user behavior patterns to surface relevant products, increasing conversion rates by 40%.',
    image: '/project1.png',
    tags: ['React', 'Next.js', 'AI'],
    demo: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'DataViz Pro',
    shortDescription: 'Analytics dashboard with real-time data',
    fullDescription:
      'An enterprise-grade analytics dashboard that transforms complex datasets into intuitive, interactive visualizations. Powered by D3.js for custom chart rendering and WebSocket connections for real-time data streaming, it supports customizable widgets, drag-and-drop layout management, and automated report generation. The dashboard handles millions of data points with smooth 60fps rendering performance.',
    image: '/project2.png',
    tags: ['TypeScript', 'D3.js', 'WebSocket'],
    demo: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'ConnectHub',
    shortDescription: 'Social media platform for creatives',
    fullDescription:
      'A vibrant social media platform designed specifically for creative professionals to showcase their work, collaborate on projects, and build their professional network. Built with React Native for cross-platform mobile support and GraphQL for efficient data fetching, it features real-time messaging, portfolio showcases, project boards, and an AI-powered content discovery engine that helps creatives find inspiration and collaboration opportunities.',
    image: '/project3.png',
    tags: ['React Native', 'GraphQL', 'Node.js'],
    demo: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'StudioFlow',
    shortDescription: 'Creative agency website with 3D effects',
    fullDescription:
      'A visually stunning creative agency website that pushes the boundaries of web design with immersive 3D effects and fluid animations. Utilizing Three.js for WebGL rendering and GSAP for choreographed scroll animations, the site features interactive 3D product showcases, parallax storytelling sections, and a custom cursor experience. The design language blends minimalism with bold typographic choices and smooth page transitions.',
    image: '/project4.png',
    tags: ['Three.js', 'GSAP', 'Next.js'],
    demo: '#',
    github: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -12;
      const tiltY = (x - 0.5) * 12;
      setTilt({ x: tiltX, y: tiltY });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className="group relative cursor-hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden glass transition-shadow duration-500"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated gradient border on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(135deg, rgba(0,245,212,0.3), rgba(168,85,247,0.3))',
            padding: '1px',
            WebKitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Image Section */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </motion.div>

          {/* Dark gradient overlay at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23]/40 to-transparent" />

          {/* Hover overlay with actions */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#050510]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => onOpen(project)}
              className="cursor-hover px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00f5d4] to-[#a855f7] text-[#050510] font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] transition-shadow duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              View Details
              <ChevronRight size={16} />
            </motion.button>

            <motion.div
              className="flex items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <a
                href={project.demo}
                className="cursor-hover flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#00f5d4]/30 text-[#00f5d4] hover:bg-[#00f5d4]/10 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={12} />
                Demo
              </a>
              <a
                href={project.github}
                className="cursor-hover flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={12} />
                Code
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-[#00f5d4] transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.demo}
                className="cursor-hover p-1.5 rounded-lg text-muted-foreground hover:text-[#00f5d4] hover:bg-[#00f5d4]/10 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View demo for ${project.title}`}
              >
                <ExternalLink size={14} />
              </a>
              <a
                href={project.github}
                className="cursor-hover p-1.5 rounded-lg text-muted-foreground hover:text-[#a855f7] hover:bg-[#a855f7]/10 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title}`}
              >
                <Github size={14} />
              </a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#00f5d4] via-[#a855f7] to-[#00f5d4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-[#00f5d4]/20 sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        {/* Image Section */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent" />

          {/* Close button overlay */}
          <button
            onClick={onClose}
            className="cursor-hover absolute top-4 right-4 p-2 rounded-full bg-[#050510]/60 backdrop-blur-sm border border-white/10 text-foreground hover:text-[#00f5d4] hover:border-[#00f5d4]/30 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-6 p-0">
            <DialogTitle className="text-2xl sm:text-3xl font-bold gradient-text">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-3">
              {project.fullDescription}
            </DialogDescription>
          </DialogHeader>

          {/* Tech Stack */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} className="text-[#00f5d4]" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#00f5d4]">
                Tech Stack
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-[#00f5d4]/10 to-[#a855f7]/10 text-foreground border border-[#00f5d4]/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="cursor-hover flex-1 bg-gradient-to-r from-[#00f5d4] to-[#00f5d4]/80 text-[#050510] font-semibold hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:from-[#00f5d4] hover:to-[#00f5d4] transition-all duration-300 h-11"
            >
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="cursor-hover flex-1 border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10 hover:text-[#a855f7] hover:border-[#a855f7]/50 h-11"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                View Source
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00f5d4]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#a855f7]/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading title="Featured Projects" subtitle="// My Work" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={handleOpenProject}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
