import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import ServiceCard from '../components/ServiceCard';
import WhatsAppButton from '../components/WhatsAppButton';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { Code2, ArrowRight } from 'lucide-react';

const Services = () => {
  const { services } = useContent();
  return (
    <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Web Development & Automation Services | Hussain Web Solutions"
        description="Professional WordPress development, Shopify store customization, React frontend development, and WhatsApp automation to streamline your business workflow."
        canonical="https://hussainwebsolutions.netlify.app/services"
      />
      <Reveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            <Code2 size={15} />
            <span>Full-Spectrum Engineering</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Specialized Development Services
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tailored digital solutions engineered for speed, conversion rate optimization, and automated business operations.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <Reveal delay={100}>
        <div className="rounded-3xl p-10 md:p-16 text-center bg-gradient-to-b from-[#111438] to-[#0a0c20] border border-violet-500/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Uncertain which stack best fits your goals?</h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Let's evaluate your business scope, target audience, and maintenance preferences to recommend the most cost-effective and scalable architecture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <WhatsAppButton className="w-full sm:w-auto" />
            <Link to="/contact" className="btn-secondary w-full sm:w-auto">
              <span>Send Project Specifications</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Services;
