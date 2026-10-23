import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';

// Safe image resolver to ensure images always load
const resolveImage = (img, id) => {
  if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('data:') || img.startsWith('/'))) {
    return img;
  }
  const fallbackMap = {
    'at-brand': '/images/at-brand.png',
    'unique-match-maker': '/images/unique-match-maker.png',
    'hussain-trade-signals-bot': '/images/trade-signals.png',
    'trade-signals': '/images/trade-signals.png',
    'timecraft-shopify-theme': '/images/timecraft.png',
    'timecraft': '/images/timecraft.png',
    'cherryflows': '/images/cherryflows.png',
    'skillpathhub': '/images/skillpathhub.png',
    'aqua-life': '/images/aqua-life.png',
  };
  return fallbackMap[id] || '/images/at-brand.png';
};

const Projects = () => {
  const { projects } = useContent();
  const [filter, setFilter] = useState('All');
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  // All 7 projects with resolved images
  const allProjects = (projects && projects.length > 0 ? projects : [
    {
      id: 'at-brand',
      name: 'AT Brand – Modern E-Commerce Storefront',
      badge: 'Shopify Storefront',
      category: 'E-Commerce',
      description: 'High-converting custom Shopify storefront with optimized checkout flow, sub-second load times, and custom Liquid components engineered for international retail brands.',
      image: '/images/at-brand.png',
      url: 'https://atbrand.store',
      technologies: ['Shopify', 'Liquid', 'Tailwind CSS', 'JavaScript', 'E-Commerce']
    },
    {
      id: 'unique-match-maker',
      name: 'Unique Match Maker – Interactive Web Application',
      badge: 'Full Stack React App',
      category: 'Web Applications',
      description: 'A dignified matrimonial matchmaking and profile discovery web application built with modern frontend architecture, criteria filtering, and responsive discovery.',
      image: '/images/unique-match-maker.png',
      url: 'https://unique-match-maker.vercel.app/',
      technologies: ['React 19', 'Vite', 'Tailwind CSS', 'Responsive UI']
    },
    {
      id: 'hussain-trade-signals-bot',
      name: 'Hussain Trade Signals – Fintech Bot & Analytics',
      badge: 'Fintech & Automation',
      category: 'Automation',
      description: 'An automated trading signals web application delivering real-time technical indicators, risk management metrics, and automated alert routing.',
      image: '/images/trade-signals.png',
      url: 'https://hussaintradesignalsbot.netlify.app/',
      technologies: ['React', 'Financial APIs', 'Telegram Alerts', 'Automation']
    },
    {
      id: 'timecraft-shopify-theme',
      name: 'Timecraft – Luxury Watchmaker Shopify Theme',
      badge: 'Shopify Storefront',
      category: 'E-Commerce',
      description: 'A bespoke luxury timepiece e-commerce showcase featuring high-speed product rendering and conversion-optimized customer journeys.',
      image: '/images/timecraft.png',
      url: 'https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/',
      technologies: ['Shopify', 'Liquid', 'Cart Drawer', 'Performance']
    },
    {
      id: 'cherryflows',
      name: 'CherryFlows – AI Automation Agency Portal',
      badge: 'Agency Website',
      category: 'Corporate',
      description: 'A responsive business website tailored for an AI Automation agency featuring appointment booking, lead capture, and service pricing tiers.',
      image: '/images/cherryflows.png',
      url: 'https://cherryflows.com/',
      technologies: ['WordPress', 'Elementor Pro', 'Booking Engine']
    },
    {
      id: 'skillpathhub',
      name: 'SkillPathHub – Digital Learning Platform',
      badge: 'Education Platform',
      category: 'Web Applications',
      description: 'An interactive course and skills roadmap portal designed for modern digital learners with clean typography and fast course browsing.',
      image: '/images/skillpathhub.png',
      url: 'https://sandybrown-gaur-200812.hostingersite.com/',
      technologies: ['React', 'WordPress', 'LMS Engine', 'Responsive']
    },
    {
      id: 'aqua-life',
      name: 'Aqua Life – Environmental Corporate Platform',
      badge: 'Corporate Website',
      category: 'Corporate',
      description: 'A sustainable industrial water filtration corporate website engineered for B2B inquiry routing, equipment specs, and lead capture.',
      image: '/images/aqua-life.png',
      url: 'https://paleturquoise-coyote-717141.hostingersite.com/',
      technologies: ['Web Design', 'B2B Lead Flow', 'Tailwind CSS']
    }
  ]).map(p => ({
    ...p,
    resolvedImage: resolveImage(p.image, p.id)
  }));

  // Top 2 Recent Featured Projects (Showcased in Staggered Frosted-Glass Hero Style)
  const topTwoProjects = allProjects.slice(0, 2);

  // The remaining 5 projects (Showcased in the interactive 3D Compact Slider)
  const remainingProjects = allProjects.slice(2);

  const filteredRemaining = filter === 'All' 
    ? remainingProjects 
    : remainingProjects.filter(p => p.category?.toLowerCase().includes(filter.toLowerCase()) || p.badge?.toLowerCase().includes(filter.toLowerCase()));

  const handlePrev = () => {
    setActiveCarouselIdx(prev => (prev === 0 ? filteredRemaining.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCarouselIdx(prev => (prev === filteredRemaining.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="flex flex-col items-center justify-center py-20 px-4 sm:px-8 max-w-7xl mx-auto z-[20] w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="Welcome-box py-[6px] px-[14px] border border-[#7042f88b] mx-auto mb-3">
          <Sparkles className="text-[#b49bff] mr-[8px] h-4 w-4" />
          <span className="Welcome-text text-[12px] font-semibold">Featured Work &amp; Case Studies</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 tracking-tight">
          My Projects
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
          Bespoke e-commerce storefronts, high-converting digital products, and custom web applications.
        </p>
      </motion.div>

      {/* ========================================================================= */}
      {/* PART 1: TOP 2 RECENT PROJECTS (Staggered Frosted-Glass Style from Image 2) */}
      {/* ========================================================================= */}
      <div className="w-full space-y-24 mb-24">
        {topTwoProjects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0"
            >
              {/* Project Image Column */}
              <div
                className={`lg:col-span-8 relative rounded-3xl overflow-hidden border border-[#2A0E61] bg-[#0c0f26]/80 shadow-[0_0_50px_rgba(112,66,248,0.25)] group ${
                  isEven ? 'lg:order-2 lg:ml-auto' : 'lg:order-1 lg:mr-auto'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.resolvedImage}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle ambient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#030014]/60 via-transparent to-purple-900/20 pointer-events-none" />
                </div>
              </div>

              {/* Overlapping Frosted Glass Description Card */}
              <div
                className={`lg:col-span-6 z-20 ${
                  isEven
                    ? 'lg:order-1 lg:mr-[-100px]'
                    : 'lg:order-2 lg:ml-[-100px]'
                }`}
              >
                <div className="p-6 sm:p-8 rounded-3xl bg-[#08091a]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:border-purple-500/50 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 block">
                    Featured Project
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {project.name}
                  </h3>

                  <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </div>

                  {/* Technologies tags */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.technologies.slice(0, 5).map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium text-purple-200 bg-purple-950/60 border border-purple-500/30 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Live link */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-300 transition-colors group/link"
                    >
                      <Globe size={18} className="text-purple-400 group-hover/link:rotate-45 transition-transform" />
                      <span>Visit Live Platform</span>
                      <ExternalLink size={14} className="opacity-70 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                    <span className="text-xs text-gray-500 font-mono">0{idx + 1} / 0{allProjects.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* PART 2: INNOVATIVE COMPACT CAROUSEL FOR ALL OTHER WEBSITES (Compact Size) */}
      {/* ========================================================================= */}
      <div className="w-full pt-10 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              <Layers size={14} />
              <span>Explore More Production Systems</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              More Verified Client Stores &amp; Web Apps
            </h3>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/20 text-white transition-all cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/20 text-white transition-all cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {['All', 'E-Commerce', 'Web Applications', 'Automation', 'Corporate'].map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setActiveCarouselIdx(0); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10 hover:border-purple-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Card Interactive Grid of Remaining Projects (Image 1 Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRemaining.map((project, idx) => {
            const isHighlighted = idx === activeCarouselIdx;
            return (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 flex flex-col ${
                  isHighlighted 
                    ? 'border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)] -translate-y-2 bg-[#0c0e29]/90' 
                    : 'border border-[#2A0E61] hover:border-purple-500/60 bg-[#08091a]/80 hover:-translate-y-1'
                }`}
              >
                {/* Image Preview */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50 border-b border-[#2A0E61]/60">
                <img
                  src={project.resolvedImage}
                  alt={project.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08091a] via-transparent to-transparent opacity-80" />
                
                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-purple-950/80 border border-purple-500/40 rounded-full backdrop-blur-md">
                    {project.badge || project.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <ExternalLink size={15} className="text-gray-400 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
                  </h4>
                  <p className="mt-2 text-xs text-gray-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span>Open Live Website</span>
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </div>
              </div>
            </motion.a>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
