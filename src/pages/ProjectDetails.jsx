import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

const ProjectDetails = () => {
  const { projects } = useContent();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="py-32 text-center max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-white mb-4">Project Not Found</h2>
        <p className="text-slate-400 mb-8 text-sm">The project you're looking for doesn't exist or has been relocated.</p>
        <button onClick={() => navigate('/work')} className="btn-primary">
          Back to Portfolio
        </button>
      </div>
    );
  }

  // Find next project for bottom navigation
  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <article className="py-12 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title={`${project.title || project.name} | Hussain Awan Portfolio | Hussain Web Solutions`}
        description={project.description || `View the ${project.title || project.name} project details. Professional web development by Hussain Awan.`}
        canonical={`https://hussain-web-solutions.vercel.app/work/${project.id}`}
        image={project.image}
      />
      <Reveal>
        <Link to="/work" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-10">
          <ArrowLeft size={16} /> Back to all projects
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/40 text-violet-300 border border-violet-500/30 mb-4">
            <Layers size={13} />
            <span>{project.category}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {project.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="aspect-[16/10] w-full bg-[#0a0c20] rounded-3xl overflow-hidden mb-16 shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/[0.08] relative">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1026]">
              <span className="text-2xl font-bold text-slate-400">{project.name}</span>
            </div>
          )}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-20">
        <Reveal delay={100} className="lg:col-span-2 space-y-10">
          <section className="cosmic-card p-8">
            <h2 className="text-xl font-bold text-white mb-4">Overview & Objective</h2>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{project.overview || project.description}</p>
              {project.purpose && (
                <p><strong>Primary Goal:</strong> {project.purpose}</p>
              )}
            </div>
          </section>

          <section className="cosmic-card p-8">
            <h2 className="text-xl font-bold text-white mb-4">Engineered Solution</h2>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {project.solution || `I developed a custom architecture tailored to the client's operational goals, using modern code principles to deliver a fast, responsive, and seamless experience across all screen sizes.`}
              </p>
              {project.features && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Key Implementation Features</h4>
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </Reveal>

        {/* Sidebar Info */}
        <Reveal delay={150} className="space-y-6">
          <div className="cosmic-card p-6 sm:p-8">
            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-6">Project Metadata</h3>
            
            <div className="space-y-5 text-sm">
              <div>
                <span className="block text-xs text-slate-400 mb-1">Project Name</span>
                <span className="font-semibold text-white">{project.name}</span>
              </div>
              
              <div>
                <span className="block text-xs text-slate-400 mb-1">Engineering Role</span>
                <span className="font-semibold text-white">Full-Stack / Storefront Developer</span>
              </div>

              {project.technologies && (
                <div>
                  <span className="block text-xs text-slate-400 mb-2">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs rounded-lg font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary w-full justify-center text-xs sm:text-sm font-semibold"
              >
                <span>View Live Deployment</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Next Project Nav */}
      <Reveal delay={100}>
        <div className="border-t border-white/[0.08] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="block text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Next Case Study</span>
            <h3 className="text-xl font-bold text-white">
              <Link to={`/work/${nextProject.id}`} className="hover:text-violet-300 transition-colors">
                {nextProject.name}
              </Link>
            </h3>
          </div>
          <Link to={`/work/${nextProject.id}`} className="btn-secondary text-xs sm:text-sm">
            <span>Explore Next Project</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>
    </article>
  );
};

export default ProjectDetails;
