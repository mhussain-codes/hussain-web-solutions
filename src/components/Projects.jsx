import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Projects = () => {
  const { projects } = useContent();

  // Take top 3 projects to match the exact 3-card layout in the reference
  const displayProjects = projects && projects.length >= 3 ? projects.slice(0, 3) : [
    {
      id: 'at-brand',
      title: 'Modern E-Commerce Storefront',
      badge: 'Shopify Storefront',
      description: 'High-converting custom Shopify storefront with optimized checkout flow, sub-second load times, and custom Liquid components engineered for international retail brands.',
      image: '/assets/images/at-brand.png',
      link: 'https://atbrand.store'
    },
    {
      id: 'trade-signals',
      title: 'Automated Trading Signal Platform',
      badge: 'Web App & Automation',
      description: 'Interactive trading web application with real-time analytics, automated alert routing to Telegram and WhatsApp, and custom technical indicator dashboards.',
      image: '/assets/images/trade-signals.png',
      link: 'https://hussaintradesignals.netlify.app'
    },
    {
      id: 'unique-match-maker',
      title: 'Interactive Web Application',
      badge: 'Full Stack React App',
      description: 'Dynamic matching platform with responsive UI, real-time client validation, fluid transitions, and seamless booking workflow for modern service agencies.',
      image: '/assets/images/unique-match-maker.png',
      link: 'https://uniquematchmaker.netlify.app'
    }
  ];

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 px-4 sm:px-10 max-w-7xl mx-auto z-[20]"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 py-10 text-center tracking-tight"
      >
        My Projects
      </motion.h1>

      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayProjects.map((project, idx) => (
          <motion.a
            key={project.id || idx}
            href={project.link || '#'}
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl shadow-xl shadow-[#2A0E61]/30 border border-[#2A0E61] hover:border-purple-500/60 bg-[#030014]/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden bg-black/40 border-b border-[#2A0E61]/60">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Details */}
            <div className="relative p-6 flex flex-col flex-1 justify-between">
              <div>
                {project.badge && (
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 rounded-full mb-3">
                    {project.badge}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
                </h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400">
                <span>View Live Project</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
