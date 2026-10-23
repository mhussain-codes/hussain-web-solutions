import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Header = () => {
  const { siteInfo } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle in-page smooth scrolling or route navigation
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const navItems = [
    { label: 'Work', targetId: 'work', path: '/work' },
    { label: 'Services', targetId: 'services', path: '/services' },
    { label: 'Process', targetId: 'process', path: '/#process' },
    { label: 'About', targetId: 'about', path: '/about' },
    { label: 'FAQ', targetId: 'faq', path: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070814]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#070814]/40 backdrop-blur-md border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Entity Identity */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/30 group-hover:shadow-[0_0_22px_rgba(139,92,246,0.8)] transition-all">
              <span className="text-base tracking-tight font-extrabold">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">
                {siteInfo.brandName}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium hidden sm:inline-block">
                Web Dev &bull; Shopify &bull; Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact / CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn-primary py-2 px-5 text-xs lg:text-sm"
            >
              Start a Project
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/[0.08] bg-[#070814]/95 backdrop-blur-2xl ${
          isOpen ? 'max-h-96 opacity-100 py-5' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/[0.08]">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn-primary w-full text-center py-2.5 text-sm"
            >
              Start a Project
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
