import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  RxGithubLogo, 
  RxLinkedinLogo 
} from 'react-icons/rx';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

const Header = () => {
  const { siteInfo } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'About me', link: '#about-me' },
    { title: 'Skills', link: '#skills' },
    { title: 'Projects', link: '#projects' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = targetId;
    }
  };

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-4 sm:px-10">
      <div className="w-full h-full flex items-center justify-between m-auto max-w-7xl">
        {/* Logo + Name */}
        <a
          href="#about-me"
          onClick={(e) => handleNavClick(e, '#about-me')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain cursor-pointer transition-transform group-hover:scale-110"
          />
          <div className="font-bold text-gray-200 tracking-wide text-sm sm:text-base group-hover:text-purple-400 transition-colors">
            {siteInfo?.founder || "M. Hussain"}
          </div>
        </a>

        {/* Center Glass Nav Pill */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200 text-sm shadow-inner shadow-[#a48fff1f]">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.link}
                onClick={(e) => handleNavClick(e, link.link)}
                className="cursor-pointer hover:text-[#b49bff] transition-colors font-medium px-2 py-0.5"
              >
                {link.title}
              </a>
            ))}

            <a
              href="https://github.com/mhussain-codes/hussain-web-solutions"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[#b49bff] transition-colors font-medium px-2 py-0.5"
            >
              Source Code
            </a>
          </div>
        </div>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex flex-row items-center gap-4">
          <a
            href="https://github.com/mhussain-codes"
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-300 hover:text-white hover:scale-110 transition-all p-1"
            aria-label="GitHub"
          >
            <RxGithubLogo className="h-5 w-5" />
          </a>
          <a
            href={siteInfo?.contact?.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-300 hover:text-[#0077b5] hover:scale-110 transition-all p-1"
            aria-label="LinkedIn"
          >
            <RxLinkedinLogo className="h-5 w-5" />
          </a>
          <a
            href={`${siteInfo?.contact?.whatsappLink || 'https://wa.me/923255269507'}?text=${encodeURIComponent(siteInfo?.contact?.defaultMessage || 'Hi Hussain')}`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-300 hover:text-emerald-400 hover:scale-110 transition-all p-1"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a
            href={siteInfo?.contact?.facebook || "https://facebook.com"}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-300 hover:text-[#1877f2] hover:scale-110 transition-all p-1"
            aria-label="Facebook"
          >
            <FaFacebook className="h-5 w-5" />
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none p-2 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-[#7042f840] p-6 flex flex-col items-center text-gray-200 md:hidden z-50">
          <div className="flex flex-col items-center gap-4 text-sm font-medium w-full">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.link}
                onClick={(e) => handleNavClick(e, link.link)}
                className="cursor-pointer hover:text-[#b49bff] py-2 w-full text-center transition"
              >
                {link.title}
              </a>
            ))}
            <a
              href="https://github.com/mhussain-codes/hussain-web-solutions"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[#b49bff] py-2 w-full text-center transition"
            >
              Source Code
            </a>
          </div>

          <div className="flex justify-center items-center gap-6 mt-6 pt-4 border-t border-white/10 w-full">
            <a href="https://github.com/mhussain-codes" target="_blank" rel="noreferrer noopener" className="text-white hover:text-purple-400">
              <RxGithubLogo className="h-6 w-6" />
            </a>
            <a href={siteInfo?.contact?.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer noopener" className="text-white hover:text-purple-400">
              <RxLinkedinLogo className="h-6 w-6" />
            </a>
            <a href={siteInfo?.contact?.whatsappLink || "https://wa.me/923255269507"} target="_blank" rel="noreferrer noopener" className="text-white hover:text-emerald-400">
              <FaWhatsapp className="h-6 w-6" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
