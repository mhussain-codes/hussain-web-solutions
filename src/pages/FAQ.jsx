import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageCircle, Sparkles, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

const FAQ = () => {
  const { faq, siteInfo } = useContent();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Frequently Asked Questions | Hussain Awan | Hussain Web Solutions"
        description="Answers to common questions about hiring web developer Hussain Awan, project timelines, Shopify integration, WordPress management, and automation services."
        canonical="https://hussain-web-solutions.vercel.app/faq"
      />
      <Reveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            <Sparkles size={15} />
            <span>Clarity & Transparancy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with me, development timelines, tech platforms, and remote collaboration.
          </p>
        </div>
      </Reveal>

      <div className="space-y-3.5 mb-16">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={index} delay={index * 50}>
              <div className="cosmic-card overflow-hidden">
                <button
                  className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
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

      <Reveal delay={200}>
        <div className="cosmic-card p-8 md:p-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Still have a specific question?</h2>
          <p className="text-slate-300 text-sm mb-6">
            I am happy to review your custom specifications or business requirements directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={`${siteInfo.contact.whatsappLink}?text=${encodeURIComponent(siteInfo.contact.defaultMessage)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              <span>Ask on WhatsApp</span>
            </a>
            <Link to="/contact" className="btn-secondary w-full sm:w-auto">
              <Mail size={16} />
              <span>Contact Form</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default FAQ;
