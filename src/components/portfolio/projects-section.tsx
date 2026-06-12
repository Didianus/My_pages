"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, X, Layers, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/portfolio/section-heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
    title: "Website Rumah Yoga",
    shortDescription: "Website Rumah Yoga dengan rekomendasi AI",
    fullDescription:
      "Rumah Yoga hadir sebagai ruang inspiratif untuk relaksasi, kebugaran, dan mindfulness melalui berbagai program yoga yang cocok untuk semua kalangan. Dengan desain yang menenangkan dan navigasi yang mudah, situs ini memudahkan pengunjung untuk menemukan kelas, workshop, dan acara yang sesuai dengan kebutuhan mereka. Fitur rekomendasi berbasis AI memberikan pengalaman personalisasi, membantu pengguna menemukan program yoga yang paling cocok untuk mereka berdasarkan preferensi dan tujuan kesehatan mereka. Rumah Yoga bertujuan untuk menjadi sumber utama bagi siapa saja yang ingin meningkatkan kesejahteraan fisik dan mental melalui praktik yoga.",
    image: "/rumahyoga.png",
    tags: ["Full Stack"],
    demo: "https://rumahyoga.vercel.app/",
    github: "https://rumahyoga.vercel.app/",
  },
  {
    id: 2,
    title: "Dir Wallet",
    shortDescription: "Dashboard analitik dengan data real-time",
    fullDescription:
      "Dir-Wallet merupakan sistem berbasis web yang dirancang untuk merekam dan mengelola data transaksi keuangan, sehingga pengguna dapat memantau riwayat transaksi dan laporan saldo secara real-time. Sistem ini menyediakan fitur-fitur seperti pencatatan transaksi masuk dan keluar, kategori pengeluaran, serta laporan keuangan yang mudah dipahami. Dengan tampilan yang user-friendly, Dir-Wallet memudahkan pengguna dalam mengelola keuangan mereka dengan lebih efisien dan terorganisir. Sistem ini juga dapat diakses melalui berbagai perangkat, memungkinkan pengguna untuk tetap terhubung dengan keuangan mereka kapan saja dan di mana saja. Dir-Wallet bertujuan untuk membantu pengguna dalam mencapai tujuan keuangan mereka dengan memberikan alat yang efektif untuk mengelola dan memantau keuangan pribadi mereka.",
    image: "/ewallet.png",
    tags: ["Full Stack"],
    demo: "https://dirwallet.vercel.app/",
    github: "https://dirwallet.vercel.app/",
  },
  {
    id: 3,
    title: "Website Desa Lidi",
    shortDescription: "Platform media sosial untuk kreatif",
    fullDescription:
      "Website Desa dikembangkan untuk mendukung digitalisasi layanan pemerintahan desa dengan menyediakan informasi publik, berita, agenda kegiatan, serta layanan administrasi secara online. Situs ini dirancang dengan fokus pada kemudahan akses dan interaksi, memungkinkan warga desa untuk tetap terhubung dengan perkembangan desa mereka serta mempermudah komunikasi antara kepala desa dan masyarakat. Dengan fitur-fitur yang user-friendly, website ini bertujuan untuk meningkatkan transparansi, partisipasi masyarakat, dan efisiensi dalam pengelolaan administrasi desa.",
    image: "/desalidi.png",
    tags: ["Full Stack"],
    demo: "https://web-desa-lidi-9kka.vercel.app/",
    github: "https://web-desa-lidi-9kka.vercel.app/",
  },
  {
    id: 4,
    title: "Website Absensi",
    shortDescription: "Website agensi kreatif dengan efek 3D",
    fullDescription:
      "Website Absensi merupakan sistem berbasis web yang digunakan untuk mencatat dan mengelola kehadiran karyawan atau mahasiswa secara digital, sehingga proses monitoring menjadi lebih efektif dan akurat. Sistem ini dirancang dengan fitur-fitur seperti pencatatan waktu masuk dan keluar, laporan kehadiran, serta integrasi dengan perangkat absensi fisik untuk memastikan data yang akurat dan real-time. Dengan tampilan yang user-friendly, website ini memudahkan pengguna dalam mengelola absensi mereka serta memberikan kemudahan bagi administrator dalam memantau kehadiran secara efisien.",
    image: "/webabsen.png",
    tags: ["Full Stack"],
    demo: "https://absen-pegawai-pied.vercel.app/",
    github: "https://absen-pegawai-pied.vercel.app/",
  },
  {
    id: 5,
    title: "Website Kas",
    shortDescription: "Website agensi kreatif dengan efek 3D",
    fullDescription:
      "Website ini dikembangkan dengan fokus pada desain yang responsif, pengalaman pengguna yang optimal, serta penyajian informasi yang jelas dan menarik. Dengan menggunakan teknologi web modern, situs ini bertujuan untuk memberikan pengalaman yang menyenangkan bagi pengunjung sekaligus menyampaikan pesan dan nilai-nilai yang ingin disampaikan oleh agensi kreatif tersebut. Fitur-fitur interaktif dan konten yang relevan dirancang untuk meningkatkan keterlibatan pengguna, sehingga menciptakan hubungan yang lebih kuat antara agensi dan audiensnya. Website ini juga dioptimalkan untuk performa yang cepat dan aksesibilitas yang baik, memastikan bahwa semua pengunjung dapat menikmati pengalaman yang lancar dan menyenangkan saat menjelajahi situs ini.",
    image: "/kasdesa.png",
    tags: ["Full Stack"],
    demo: "https://kasdesalidi.vercel.app/",
    github: "https://kasdesalidi.vercel.app/",
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
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -12;
    const tiltY = (x - 0.5) * 12;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

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
        perspective: "1000px",
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
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated gradient border on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,212,0.3), rgba(168,85,247,0.3))",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* Image Section */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
              Lihat Detail
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
                Kode
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
                Teknologi
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
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Demo Langsung
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
                Lihat Kode
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
        <SectionHeading title="Proyek Unggulan" subtitle="// Karya" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
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
