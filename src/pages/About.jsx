import React from 'react';
import { Download, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import portraitImg from '../assets/images/hussain-portrait.jpg';

const About = () => {
  const { siteInfo, aboutData } = useContent();
  return (
    <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="About M. Hussain | Web Developer & Automation Specialist"
        description="Learn about M. Hussain, founder of Hussain Web Solutions. A web developer skilled in WordPress, Shopify, React, and workflow automation."
        canonical="https://hussainwebsolutions.netlify.app/about"
      />
      <Reveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            <ShieldCheck size={15} />
            <span>Profile & Engineering Philosophy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            About M. Hussain
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Remote web developer, Shopify storefront engineer, and digital automation specialist building high-performance web solutions for global businesses.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        {/* Left Column: Portrait & Actions */}
        <Reveal delay={100} className="lg:col-span-4">
          <div className="cosmic-card p-6 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1 bg-gradient-to-tr from-violet-600/40 via-white/10 to-cyan-500/30 shadow-[0_0_35px_rgba(139,92,246,0.3)] mb-6">
              <img 
                src={portraitImg} 
                alt={siteInfo.founder} 
                className="w-full h-full rounded-[22px] object-cover object-top"
              />
            </div>
            <h3 className="text-xl font-bold text-white">{siteInfo.founder}</h3>
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mt-1 mb-4">
              Founder &bull; Hussain Web Solutions
            </p>
            
            <div className="w-full space-y-3 pt-2">
              <a href="/cv.pdf" download className="btn-primary w-full text-xs sm:text-sm py-2.5">
                <Download size={16} /> Download CV
              </a>
              <a href="/contact" className="btn-secondary w-full text-xs sm:text-sm py-2.5">
                <Mail size={16} /> Get in Touch
              </a>
            </div>
          </div>
        </Reveal>
        
        {/* Right Column: Bio & Core Approach */}
        <div className="lg:col-span-8 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <Reveal delay={150}>
            <div className="cosmic-card p-8 space-y-5">
              <h3 className="text-xl font-bold text-white">Background & Positioning</h3>
              {(aboutData?.paragraphs || [
                "Hi, I'm M. Hussain. I am a professional remote web developer specializing in high-performance Shopify stores, custom WordPress solutions, and React-based web applications.",
                "My focus is on creating websites that look exceptional and serve a clear, measurable business purpose. Whether it is a corporate platform, a bespoke WooCommerce setup, a tailored Shopify storefront, or a custom React application, I build solutions that are fast, accessible, and simple to maintain.",
                "Beyond standard website builds, I integrate practical AI and WhatsApp automation to handle incoming inquiries, route leads, and automate operational workflows for client organizations."
              ]).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="cosmic-card p-8">
              <h3 className="text-xl font-bold text-white mb-6">Core Delivery Principles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Business-First", desc: "Every line of code and design element serves your underlying conversion or operational goal." },
                  { title: "Performance & SEO", desc: "Rigorous testing for Core Web Vitals, sub-second load times, and structured JSON-LD schema." },
                  { title: "Clean Architecture", desc: "Maintainable, modern code with zero unnecessary dependencies, bloat, or brittle setups." },
                  { title: "Clear Communication", desc: "Transparent milestone updates across global time zones (UAE, UK, Australia, Worldwide)." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-violet-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block text-sm">{item.title}</strong>
                      <span className="text-xs text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Technical Skills Categorized */}
      <Reveal delay={100}>
        <div className="cosmic-card p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Comprehensive Technical Stack</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-4 border-b border-white/[0.08] pb-2">
                Frontend & UI
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 Semantic', 'Vite', 'Responsive Design'].map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-white/[0.04] text-slate-300 rounded-lg border border-white/[0.08] text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-4 border-b border-white/[0.08] pb-2">
                E-Commerce & CMS
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Shopify', 'Shopify Liquid', 'WordPress', 'Elementor', 'WooCommerce', 'Theme Customization'].map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-white/[0.04] text-slate-300 rounded-lg border border-white/[0.08] text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-4 border-b border-white/[0.08] pb-2">
                Automation & APIs
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['WhatsApp Automation', 'REST APIs', 'Node.js Basics', 'Webhook Routing', 'Form Automation'].map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-white/[0.04] text-slate-300 rounded-lg border border-white/[0.08] text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-4 border-b border-white/[0.08] pb-2">
                Tooling & Standards
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Git & GitHub', 'Netlify Deployment', 'Vercel Deployment', 'Technical SEO', 'Core Web Vitals'].map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-white/[0.04] text-slate-300 rounded-lg border border-white/[0.08] text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default About;
