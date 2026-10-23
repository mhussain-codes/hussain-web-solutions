import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Footer = () => {
  const { siteInfo } = useContent();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05060f] text-slate-300 pt-20 pb-10 border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand & Entity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/30">
                <span>H</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {siteInfo.businessName}
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Bespoke web development, conversion-engineered Shopify storefronts, and practical digital automation for forward-thinking brands worldwide.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/20 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={siteInfo.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/20 transition-all"
                aria-label="Facebook Page"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={`${siteInfo.contact.whatsappLink}?text=${encodeURIComponent(siteInfo.contact.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${siteInfo.contact.email}`}
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="Direct Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#work" className="text-slate-400 hover:text-violet-300 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-violet-300 transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-slate-400 hover:text-violet-300 transition-colors">
                  How I Work
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-violet-300 transition-colors">
                  About M. Hussain
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-violet-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-violet-300 transition-colors">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Capabilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Shopify & Liquid Themes</li>
              <li className="hover:text-slate-200 transition-colors">React & Modern Web Apps</li>
              <li className="hover:text-slate-200 transition-colors">WordPress & WooCommerce</li>
              <li className="hover:text-slate-200 transition-colors">WhatsApp & API Automation</li>
              <li className="hover:text-slate-200 transition-colors">Technical SEO & Speed Optimization</li>
            </ul>
          </div>

          {/* Location & Availability */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Status & Delivery
            </h4>
            <div className="space-y-3 text-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q4 Projects
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Serving clients across the UAE, Saudi Arabia, the UK, Australia, and worldwide.
              </p>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white pt-2 transition-colors cursor-pointer"
              >
                Back to top <ArrowUp size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {siteInfo.businessName} &bull; Founded by M. Hussain. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
