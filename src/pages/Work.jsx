import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { Layers, ArrowRight } from 'lucide-react';

const Work = () => {
  const { projects } = useContent();
  const [filter, setFilter] = useState('All');

  return (
    <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Portfolio & Case Studies | Hussain Awan | Full Stack Web Developer"
        description="Explore verified projects engineered by Full Stack Web Developer Hussain Awan: Custom Shopify storefronts, React web platforms, and automated business systems."
        canonical="https://hussain-web-solutions.vercel.app/work"
      />
      
      <Reveal>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            <Layers size={15} />
            <span>Complete Engineering Archive</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Selected Work & Live Case Studies
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of custom web applications, high-converting Shopify storefronts, and automated platforms engineered for real-world reliability.
          </p>
        </div>
      </Reveal>

      {/* Category Pills */}
      <Reveal delay={80}>
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {['All', ...new Set(projects.map(p => p.badge || p.category))].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === category 
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-violet-400/40' 
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:border-violet-500/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(filter === 'All' ? projects : projects.filter(p => (p.badge === filter || p.category === filter))).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} isFeatured={project.featured} />
        ))}
      </div>

      {/* Bottom CTA Bar */}
      <Reveal delay={120}>
        <div className="mt-20 p-8 rounded-3xl bg-[#0c0f26] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Have a specific project in mind?</h3>
            <p className="text-sm text-slate-300">Let's discuss how we can build an exceptional experience for your brand.</p>
          </div>
          <a href="/contact" className="btn-primary py-3 px-6 whitespace-nowrap">
            Start a Project
            <ArrowRight size={16} />
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default Work;
