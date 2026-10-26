import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { 
  RxGithubLogo, 
  RxLinkedinLogo,
  RxInstagramLogo
} from 'react-icons/rx';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

const Header = () => {
  const { siteInfo } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Work', path: '/work' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`w-full fixed top-0 transition-all duration-300 z-50 px-4 sm:px-8 ${
      isScrolled 
        ? 'h-[65px] bg-[#030014]/90 backdrop-blur-xl shadow-lg shadow-[#2A0E61]/40 border-b border-white/[0.06]' 
        : 'h-[75px] bg-[#030014]/40 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="w-full h-full flex items-center justify-between m-auto max-w-7xl">
        {/* Logo + Identity */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <img
            src="/logo.png"
            alt={siteInfo?.founder || "M. Hussain"}
            className="w-10 h-10 object-contain cursor-pointer transition-transform group-hover:scale-110 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-white tracking-tight text-sm sm:text-base group-hover:text-purple-300 transition-colors">
              {siteInfo?.founder || "M. Hussain"}
            </span>
            <span className="text-[10px] text-purple-400 font-medium tracking-wide uppercase hidden sm:block">
              Hussain Web Solutions
            </span>
          </div>
        </Link>

        {/* Center Pill Navigation for Hussain's Pages */}
        <nav className="hidden lg:flex items-center gap-1 border border-[#7042f855] bg-[#03001460] px-3 py-1.5 rounded-full text-sm shadow-inner shadow-[#a48fff1f] backdrop-blur-md">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.title}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-purple-600/40 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA + Socials */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2.5 pr-2 border-r border-white/10">
            <a
              href="https://github.com/mhussain-codes"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all p-1"
              aria-label="GitHub Profile"
            >
              <RxGithubLogo className="h-5 w-5" />
            </a>
            <a
              href={siteInfo?.contact?.linkedin || "https://linkedin.com/in/hussain-awan"}
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-400 hover:text-[#0077b5] hover:scale-110 transition-all p-1"
              aria-label="LinkedIn Profile"
            >
              <RxLinkedinLogo className="h-5 w-5" />
            </a>
            <a
              href={siteInfo?.contact?.instagram || "https://www.instagram.com/hussainxwebsolutions?cplk=MWs1MGpkaTh5MTllMA=="}
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-400 hover:text-pink-400 hover:scale-110 transition-all p-1"
              aria-label="Instagram Profile"
            >
              <RxInstagramLogo className="h-5 w-5" />
            </a>
            <a
              href={`${siteInfo?.contact?.whatsappLink || 'https://wa.me/923255269507'}?text=${encodeURIComponent(siteInfo?.contact?.defaultMessage || 'Hi Hussain')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-400 hover:text-emerald-400 hover:scale-110 transition-all p-1"
              aria-label="Direct WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>

          <Link
            to="/contact"
            className="button-primary text-xs font-semibold py-2 px-4 rounded-xl text-white border border-[#7042f88b] shadow-[0_0_20px_rgba(112,66,248,0.4)] hover:shadow-[0_0_25px_rgba(112,66,248,0.6)] transition-all flex items-center gap-1.5"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className="lg:hidden text-white focus:outline-none p-2 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#030014]/98 backdrop-blur-2xl border-b border-purple-500/30 p-6 flex flex-col items-center text-gray-200 lg:hidden shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col items-center gap-3 text-sm font-semibold w-full">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 px-4 w-full text-center rounded-xl transition-all ${
                    active ? 'bg-purple-600/30 text-white border border-purple-500/40' : 'hover:text-purple-300'
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          <div className="w-full pt-4 mt-4 border-t border-white/10 flex flex-col gap-3 items-center">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center button-primary py-2.5 rounded-xl text-white font-semibold text-xs border border-purple-500/50"
            >
              Start a Project
            </Link>

            <div className="flex justify-center items-center gap-5 pt-2">
              <a href="https://github.com/mhussain-codes" target="_blank" rel="noreferrer noopener" className="text-gray-300 hover:text-white" aria-label="GitHub">
                <RxGithubLogo className="h-5 w-5" />
              </a>
              <a href={siteInfo?.contact?.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer noopener" className="text-gray-300 hover:text-[#0077b5]" aria-label="LinkedIn">
                <RxLinkedinLogo className="h-5 w-5" />
              </a>
              <a href={siteInfo?.contact?.instagram || "https://www.instagram.com/hussainxwebsolutions?cplk=MWs1MGpkaTh5MTllMA=="} target="_blank" rel="noreferrer noopener" className="text-gray-300 hover:text-pink-400" aria-label="Instagram">
                <RxInstagramLogo className="h-5 w-5" />
              </a>
              <a href={siteInfo?.contact?.whatsappLink || "https://wa.me/923255269507"} target="_blank" rel="noreferrer noopener" className="text-gray-300 hover:text-emerald-400" aria-label="WhatsApp">
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
