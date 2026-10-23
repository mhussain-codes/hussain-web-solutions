import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../lib/motion';

const Hero = () => {
  const { heroData, siteInfo } = useContent();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="about-me" className="relative flex flex-col h-full w-full overflow-hidden">
      {/* Cosmic Inverted Black Hole Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20 pointer-events-none opacity-90"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 mt-32 sm:mt-40 w-full z-[20] max-w-7xl mx-auto min-h-[85vh]"
      >
        {/* Left Column: Copy & CTAs */}
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start lg:max-w-[620px]">
          {/* Welcome Box */}
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.95]"
          >
            <Sparkles className="text-[#b49bff] mr-[10px] h-4 w-4 shrink-0" />
            <h1 className="Welcome-text text-[13px] font-semibold tracking-wide">
              Web Developer &amp; Automation Portfolio
            </h1>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-3 mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            <span>
              Providing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500">
                the best
              </span>{' '}
              project experience.
            </span>
          </motion.div>

          {/* Subtitle Bio */}
          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-base sm:text-lg text-gray-300 my-4 max-w-[580px] leading-relaxed"
          >
            {heroData?.subheadline ||
              "I'm a Web Developer & Automation Specialist with experience in Website, E-Commerce, Shopify, and Software development. Check out my projects and skills."}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={slideInFromLeft(1)} className="flex items-center gap-4 pt-2">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="py-3 px-8 button-primary text-center text-white font-medium cursor-pointer rounded-lg border border-[#7042f88b] shadow-[0_0_20px_rgba(112,66,248,0.4)] hover:shadow-[0_0_30px_rgba(112,66,248,0.6)] transition-all"
            >
              Learn more
            </a>
            <a
              href={`${siteInfo?.contact?.whatsappLink || 'https://wa.me/923255269507'}?text=${encodeURIComponent(siteInfo?.contact?.defaultMessage || 'Hi Hussain')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="py-3 px-6 text-sm text-gray-300 hover:text-white border border-white/10 hover:border-purple-500/50 rounded-lg transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column: Exact Tech Constellation / Orbital SVG */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full lg:w-auto h-full flex justify-center items-center mt-12 lg:mt-0 select-none pointer-events-none"
        >
          <img
            src="/hero-bg.svg"
            alt="Technologies Orbit"
            width={620}
            height={620}
            draggable={false}
            className="select-none max-w-[360px] sm:max-w-[500px] lg:max-w-[620px] w-full h-auto drop-shadow-[0_0_35px_rgba(112,66,248,0.3)] animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
