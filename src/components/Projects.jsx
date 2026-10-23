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

  // Predefined high-fidelity outlines matching the style in the user's sample image
  const projectOutlines = {
    'at-brand': "A conversion-engineered, mobile-first e-commerce storefront developed for AT Brand, an international men's fashion label. Built with custom WordPress, Elementor, and WooCommerce architecture, it features seamless multi-currency checkout, responsive product variant selectors, and sub-second catalog navigation. The platform elevates their digital retail experience, providing global shoppers with a frictionless, premium shopping journey across all devices.",
    'unique-match-maker': "A modern community matrimonial and candidate profile discovery web application built with clean frontend architecture. Engineered using React 19, Vite, and Tailwind CSS, it features dynamic multi-criteria matchmaking filters, structured bio-data cards, and accessible zero-layout-shift UI. The application provides families and candidates with an intuitive, private, and secure platform for verified matchmaking discovery.",
    'hussain-trade-signals-bot': "An automated financial analytics and trading signal platform integrating live crypto and market data feeds. Engineered with real-time technical indicator calculation algorithms, automated alert routing to Telegram and WhatsApp, and interactive risk-to-reward ratio calculators. The dashboard delivers instant, data-driven market intelligence to traders without visual bloat or execution delay.",
    'timecraft-shopify-theme': "A bespoke Shopify storefront demonstration crafted for luxury watchmakers and heritage lifestyle retailers. Built with custom Shopify Liquid sections, high-resolution product showcase zooms, dynamic slide-out cart drawers, and conversion-focused customer journeys. Tailored to demonstrate enterprise-grade speed optimization, variant switching, and luxury brand storytelling.",
    'cherryflows': "A responsive business website built for CherryFlows, an AI Automation agency helping organizations streamline workflows. Built with customized WordPress and Elementor architectures, it integrates appointment booking engines, interactive service tiers, and automated lead capture pipelines to drive qualified client conversions.",
    'skillpathhub': "An interactive course and skills roadmap web portal designed for digital learners and educators. Built with responsive layout structures, organized curriculum roadmaps, and frictionless navigation to help students track skill progression and career milestones with clarity.",
    'aqua-life': "A sustainable industrial water filtration corporate platform engineered for B2B inquiry generation and technical equipment showcasing. Features structured engineering specifications, responsive product galleries, and streamlined inquiry routing for international commercial clients."
  };

  // All 7 projects with resolved images and comprehensive outlines
  const allProjects = (projects && projects.length > 0 ? projects : [
    {
      id: 'at-brand',
      name: 'AT Brand – Modern E-Commerce Storefront',
      badge: 'Shopify Storefront',
      category: 'E-Commerce',
      description: projectOutlines['at-brand'],
      image: '/images/at-brand.png',
      url: 'https://atbrand.store',
      technologies: ['Shopify', 'Liquid', 'Tailwind CSS', 'JavaScript', 'E-Commerce']
    },
    {
      id: 'unique-match-maker',
      name: 'Unique Match Maker – Interactive Web Application',
      badge: 'Full Stack React App',
      category: 'Web Applications',
      description: projectOutlines['unique-match-maker'],
      image: '/images/unique-match-maker.png',
      url: 'https://unique-match-maker.vercel.app/',
      technologies: ['React 19', 'Vite', 'Tailwind CSS', 'Responsive UI']
    },
    {
      id: 'hussain-trade-signals-bot',
      name: 'Hussain Trade Signals – Fintech Bot & Analytics',
      badge: 'Fintech & Automation',
      category: 'Automation',
      description: projectOutlines['hussain-trade-signals-bot'],
      image: '/images/trade-signals.png',
      url: 'https://hussaintradesignalsbot.netlify.app/',
      technologies: ['React', 'Financial APIs', 'Telegram Alerts', 'Automation']
    },
    {
      id: 'timecraft-shopify-theme',
      name: 'Timecraft – Luxury Watchmaker Shopify Theme',
      badge: 'Shopify Storefront',
      category: 'E-Commerce',
      description: projectOutlines['timecraft-shopify-theme'],
      image: '/images/timecraft.png',
      url: 'https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/',
      technologies: ['Shopify', 'Liquid', 'Cart Drawer', 'Performance']
    },
    {
      id: 'cherryflows',
      name: 'CherryFlows – AI Automation Agency Portal',
      badge: 'Agency Website',
      category: 'Corporate',
      description: projectOutlines['cherryflows'],
      image: '/images/cherryflows.png',
      url: 'https://cherryflows.com/',
      technologies: ['WordPress', 'Elementor Pro', 'Booking Engine']
    },
    {
      id: 'skillpathhub',
      name: 'SkillPathHub – Digital Learning Platform',
      badge: 'Education Platform',
      category: 'Web Applications',
      description: projectOutlines['skillpathhub'],
      image: '/images/skillpathhub.png',
      url: 'https://sandybrown-gaur-200812.hostingersite.com/',
      technologies: ['React', 'WordPress', 'LMS Engine', 'Responsive']
    },
    {
      id: 'aqua-life',
      name: 'Aqua Life – Environmental Corporate Platform',
      badge: 'Corporate Website',
      category: 'Corporate',
      description: projectOutlines['aqua-life'],
      image: '/images/aqua-life.png',
      url: 'https://paleturquoise-coyote-717141.hostingersite.com/',
      technologies: ['Web Design', 'B2B Lead Flow', 'Tailwind CSS']
    }
  ]).map(p => ({
    ...p,
    outlineText: p.description?.length > 90 ? p.description : (projectOutlines[p.id] || p.overview || p.description),
    resolvedImage: resolveImage(p.image, p.id)
  }));

  // Top 2 Recent Featured Projects (Showcased in Staggered Frosted-Glass Hero Style)
  const topTwoProjects = allProjects.slice(0, 2);

  // The remaining 5 projects (Showcased in the interactive Compact Section)
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
      {/* Section Header */}
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
      {/* PART 1: TOP 2 RECENT PROJECTS (Exact Staggered Layout from Sample Image 2)  */}
      {/* ========================================================================= */}
      <div className="w-full space-y-28 mb-24">
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
                className={`lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#2A0E61] bg-[#0c0f26]/80 shadow-[0_0_50px_rgba(112,66,248,0.25)] group ${
                  isEven ? 'lg:order-2 lg:ml-auto' : 'lg:order-1 lg:mr-auto'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.resolvedImage}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#030014]/50 via-transparent to-purple-900/20 pointer-events-none" />
                </div>
              </div>

              {/* Text & Overlapping Frosted Glass Outline Column (Image 2 Structure) */}
              <div
                className={`lg:col-span-6 z-20 ${
                  isEven
                    ? 'lg:order-1 lg:mr-[-60px]'
                    : 'lg:order-2 lg:ml-[-60px]'
                }`}
              >
                {/* Header Outline Information */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1.5">
                    Featured Project
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                    {project.name}
                  </h3>
                </div>

                {/* Frosted Glass Outline Paragraph */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#08091a]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-purple-500/50 transition-all duration-300 text-gray-300 text-sm leading-relaxed">
                  {project.outlineText}
                </div>

                {/* Technologies pills */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
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

                {/* Minimalist Globe Icon Link (Exact Image 2 Style) */}
                <div className="mt-5 flex items-center gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/60 hover:bg-purple-600/20 text-white text-xs font-semibold transition-all group/link"
                    aria-label={`Visit ${project.name}`}
                  >
                    <Globe size={16} className="text-purple-400 group-hover/link:rotate-45 transition-transform" />
                    <span>Live Website Demo</span>
                    <ExternalLink size={12} className="opacity-70 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                  <span className="text-xs text-gray-500 font-mono">Project 0{idx + 1} of 0{allProjects.length}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* PART 2: COMPACT INNOVATIVE SHOWCASE FOR REMAINING WEBSITES (Page Lamba Na Ho) */}
      {/* ========================================================================= */}
      <div className="w-full pt-12 border-t border-white/[0.08]">
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

          {/* Carousel Arrows */}
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

                {/* Outline Text & Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                      <ExternalLink size={15} className="text-gray-400 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
                    </h4>
                    <p className="mt-2.5 text-xs text-gray-300 line-clamp-3 leading-relaxed">
                      {project.outlineText}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400">
                    <span className="flex items-center gap-1.5">
                      <Globe size={13} />
                      <span>Open Live Website</span>
                    </span>
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
