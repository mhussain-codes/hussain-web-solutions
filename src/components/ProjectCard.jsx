import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const ProjectCard = ({ project, index = 0, isFeatured = false }) => {
  return (
    <Reveal delay={index * 120}>
      <div className="cosmic-card flex flex-col h-full overflow-hidden group">
        {/* Preview Container - Stable, no scaling jump on hover */}
        <div className="relative aspect-[16/10] bg-[#070919] overflow-hidden border-b border-white/[0.06]">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview showcase`}
              className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0d1026] text-slate-400 font-medium">
              {project.name}
            </div>
          )}

          {/* Top Badge Overlay */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#070814]/85 text-violet-300 border border-violet-500/30 backdrop-blur-md shadow-sm">
              {project.badge || project.category}
            </span>
            {isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow bg-transparent">
          <div className="text-xs font-semibold tracking-wider text-violet-400 uppercase mb-2">
            {project.category}
          </div>

          <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
            {project.name}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Technology Badges */}
          {project.technologies && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[11px] rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Obvious Actions: "View Live Project" is primary and prominent */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary py-2.5 text-xs sm:text-sm font-semibold justify-center"
            >
              <span>View Live Project</span>
              <ArrowUpRight size={16} />
            </a>

            {/* Optional internal case study link */}
            <Link
              to={`/work/${project.id}`}
              className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              title="Read Case Study Details"
            >
              Overview
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default ProjectCard;
