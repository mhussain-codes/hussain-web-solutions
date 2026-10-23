import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Send,
  MessageCircle,
  Mail
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import portraitImg from '../assets/images/hussain-portrait.jpg';

const Home = () => {
  const { 
    siteInfo, 
    heroData, 
    projects, 
    services, 
    processSteps, 
    aboutData, 
    faq 
  } = useContent();

  const [activeTab, setActiveTab] = useState('featured');
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, error: null });
  const [formData, setFormData] = useState({ name: '', email: '', projectType: 'Shopify Store', message: '' });

  const featuredProjects = projects.filter(p => p.featured);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true, error: null });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteInfo.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
        })
      });

      if (response.ok) {
        setFormStatus({ submitted: true, loading: false, error: null });
        setFormData({ name: '', email: '', projectType: 'Shopify Store', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch {
      setFormStatus({ 
        submitted: false, 
        loading: false, 
        error: 'There was a problem submitting your message. Please reach out directly via WhatsApp or email.' 
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070814] text-slate-100 overflow-hidden">
      <SEO 
        title={`${siteInfo.businessName} | Web Developer & Shopify Specialist`}
        description={siteInfo.description}
        canonical="https://hussainwebsolutions.netlify.app/"
      />

      {/* =========================================================================
          HERO SECTION with restrained cosmic background & authentic portrait
      ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Cosmic Background Ring - strictly decorative, static geometry */}
        <div className="hero-glow-radial" aria-hidden="true" />
        
        {/* Decorative Celestial Ring from Reference 2 */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-40 -z-10 overflow-hidden" aria-hidden="true">
          <div className="w-[500px] h-[500px] mx-auto rounded-full border-t-2 border-violet-400/40 shadow-[0_-15px_50px_rgba(139,92,246,0.4)]" />
        </div>

        <Reveal delay={80}>
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Copy Column */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              
              {/* Availability & Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>{heroData.statusBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
                {heroData.headlinePart1} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300">
                  {heroData.headlineGradient}
                </span>
              </h1>

              {/* Secondary Subheading */}
              <h2 className="text-lg sm:text-xl font-medium text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {heroData.subheading}
              </h2>

              {/* Grounded Value Proposition Body Copy */}
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {heroData.description}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start pt-3">
                <a href="#work" className="btn-primary w-full sm:w-auto">
                  <span>Explore Featured Work</span>
                  <ArrowRight size={16} />
                </a>
                <a href="#contact" className="btn-secondary w-full sm:w-auto">
                  <span>Start a Project</span>
                  <ArrowUpRight size={16} />
                </a>
                <a 
                  href="/cv.pdf" 
                  download 
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Location & Quick Contact Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe2 size={14} className="text-violet-400" />
                  {heroData.locationText}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Zap size={14} className="text-cyan-400" />
                  {heroData.quickContactText}
                </span>
              </div>
            </div>

            {/* Right Column: Authentic Portrait Treatment */}
            <div className="relative flex-shrink-0">
              {/* Restrained Violet-Blue Rim Glow */}
              <div 
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-cyan-500/20 blur-xl opacity-75 -z-10" 
                aria-hidden="true" 
              />

              {/* Portrait Frame */}
              <div className="relative w-56 h-56 sm:w-68 sm:h-68 lg:w-80 lg:h-80 rounded-3xl p-1.5 bg-gradient-to-b from-white/[0.15] via-violet-500/20 to-white/[0.05] shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#0c0f24] relative">
                  <img
                    src={portraitImg}
                    alt={`${siteInfo.founder} — Web Developer & Shopify Specialist`}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle rim shadow inside */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[22px] pointer-events-none" />
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 -right-2 sm:bottom-2 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-[#0c0f24]/90 border border-violet-500/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                <span className="text-xs font-semibold text-white">{siteInfo.founder}</span>
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* =========================================================================
          QUALITY & LIGHTHOUSE METRICS STRIP (Inspired by Reference 2)
      ========================================================================= */}
      <section className="relative py-12 border-y border-white/[0.06] bg-[#090b1c]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={100}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Title */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">
                  <Cpu size={15} />
                  <span>Technical Standards</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Built for Speed, Accessibility & Scalability
                </h3>
              </div>

              {/* 4 Circular Lighthouse Metric Rings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { score: '98', label: 'Performance', color: '#10b981' },
                  { score: '96', label: 'Accessibility', color: '#10b981' },
                  { score: '98', label: 'Best Practices', color: '#10b981' },
                  { score: '100', label: 'SEO Audit', color: '#10b981' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-2">
                      <span className="text-lg font-extrabold text-emerald-400 tracking-tight">
                        {item.score}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Core Deliverable Pillar Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  Mobile First
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  Clean Architecture
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  Zero Layout Shift
                </span>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          FEATURED WORK SECTION (#work)
      ========================================================================= */}
      <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="section-glow-violet -top-20 left-10" aria-hidden="true" />

        <Reveal delay={80}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
                <Layers size={15} />
                <span>Selected Portfolio Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Projects & Storefronts
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Real-world web applications, custom e-commerce themes, and automation tools built with precision.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-fit">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'featured'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Featured Highlights ({featuredProjects.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Projects ({projects.length})
              </button>
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'featured' ? featuredProjects : projects).map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isFeatured={project.featured} 
            />
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <Reveal delay={150}>
          <div className="mt-14 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-sm font-semibold text-white">Need a custom feature or bespoke platform?</span>
              <p className="text-xs text-slate-400 mt-0.5">I build tailored solutions for businesses with unique workflows.</p>
            </div>
            <a href="#contact" className="btn-secondary py-2 px-5 text-xs whitespace-nowrap">
              Discuss Your Specs
              <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* =========================================================================
          SERVICES / SPECIALTIES SECTION (#services)
      ========================================================================= */}
      <section id="services" className="relative py-24 bg-[#090b1c]/80 border-y border-white/[0.06] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={80}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
                <Code2 size={15} />
                <span>Specialized Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What I Deliver For Growing Brands
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3">
                Full-spectrum engineering across modern e-commerce storefronts, bespoke corporate websites, and automated business workflows.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW I WORK / PROCESS SECTION (#process)
      ========================================================================= */}
      <section id="process" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <Reveal delay={80}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
              <Sparkles size={15} />
              <span>Transparent Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How I Work: Concept to Deployment
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              A structured, milestone-driven process ensuring predictable delivery, clear communication, and zero surprises.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, idx) => (
            <Reveal key={item.step || idx} delay={idx * 100}>
              <div className="cosmic-card p-6 sm:p-7 flex flex-col h-full group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ABOUT & TECH STACK SECTION (#about)
      ========================================================================= */}
      <section id="about" className="relative py-24 bg-[#090b1c]/80 border-t border-white/[0.06] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={80}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Portrait & Identity */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl p-1 bg-gradient-to-tr from-violet-600/40 via-white/10 to-cyan-500/30 shadow-[0_0_35px_rgba(139,92,246,0.3)] mb-6">
                  <img
                    src={portraitImg}
                    alt={siteInfo.founder}
                    className="w-full h-full rounded-[20px] object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{siteInfo.founder}</h3>
                <p className="text-violet-400 text-sm font-medium mb-4">{siteInfo.positioning}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={siteInfo.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-2 px-4 text-xs"
                  >
                    LinkedIn Profile
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="/cv.pdf"
                    download
                    className="btn-secondary py-2 px-4 text-xs"
                  >
                    Resume / CV
                    <Download size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Grounded Bio & Core Principles */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                  <ShieldCheck size={15} />
                  <span>About & Principles</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {aboutData.tagline}
                </h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {aboutData.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Tech Stack Galaxy / Constellation */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Technologies & Environments Mastered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 text-slate-200 text-xs font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          COMMON QUESTIONS / FAQ SECTION (#faq)
      ========================================================================= */}
      <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
        <Reveal delay={80}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
              <Sparkles size={15} />
              <span>Clarity & Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Direct answers about my workflow, platforms, timelines, and remote collaboration.
            </p>
          </div>
        </Reveal>

        <FaqAccordion items={faq} />
      </section>

      {/* =========================================================================
          HIGH-IMPACT CONTACT CALL TO ACTION SECTION (#contact)
      ========================================================================= */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        <div className="section-glow-violet top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

        <Reveal delay={80}>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#111438] to-[#0a0c20] border border-violet-500/30 p-8 sm:p-12 lg:p-16 shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Direct Inquiries */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Currently Accepting Inquiries
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Let's Discuss Your Next Web Project.
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Whether you need a custom Shopify storefront, an agency booking website, or automated customer workflows, I am ready to engineer a high-impact solution.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`${siteInfo.contact.whatsappLink}?text=${encodeURIComponent(siteInfo.contact.defaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all text-slate-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Direct WhatsApp</div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {siteInfo.contact.whatsapp}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteInfo.contact.email}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-500/10 transition-all text-slate-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Email Inquiries</div>
                      <div className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                        {siteInfo.contact.email}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Working Contact Form */}
              <div className="lg:col-span-7 bg-[#070919]/90 border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-2">Send Project Brief</h3>
                <p className="text-xs text-slate-400 mb-6">Inquiries route directly to {siteInfo.contact.email}.</p>

                {formStatus.submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Thank you for reaching out!</h4>
                    <p className="text-xs text-slate-300">
                      Your message was received successfully. I will review your requirements and respond within a few hours.
                    </p>
                    <button
                      onClick={() => setFormStatus({ submitted: false, loading: false, error: null })}
                      className="btn-compact mt-3"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {formStatus.error && (
                      <div className="p-3 text-xs rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        {formStatus.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. John Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project Focus
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f24] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
                      >
                        <option value="Shopify Store">Shopify Storefront / Theme</option>
                        <option value="WordPress / WooCommerce">WordPress / WooCommerce Site</option>
                        <option value="Custom Web App">Custom React Web Application</option>
                        <option value="Workflow Automation">WhatsApp & API Automation</option>
                        <option value="Website Redesign">Speed Optimization & Redesign</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project Details & Requirements *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell me about your business, desired features, goals, and target timeline..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className="w-full btn-primary py-3 font-semibold justify-center cursor-pointer"
                    >
                      {formStatus.loading ? (
                        <span>Sending Brief...</span>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </Reveal>
      </section>

    </div>
  );
};

/* Accordion Component */
const FaqAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={index} delay={index * 60}>
            <div className="cosmic-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-white text-sm sm:text-base pr-4">
                  {item.question}
                </span>
                <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-violet-400">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/[0.06] pt-3.5">
                  {item.answer}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export default Home;
