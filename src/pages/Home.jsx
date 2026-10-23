import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Encryption from '../components/Encryption';
import Projects from '../components/Projects';

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <SEO 
        title="M. Hussain | Full Stack Web Developer & Automation Specialist"
        description="Providing the best project experience. Modern web development, high-converting Shopify storefronts, and automated web platforms."
        canonical="https://hussainwebsolutions.netlify.app/"
      />
      
      {/* 1. Hero Section with Inverted Blackhole & Tech Orbit */}
      <Hero />

      {/* 2. Skills Section with Tech Grid & Video Aura */}
      <Skills />

      {/* 3. Encryption / Performance & Security Section */}
      <Encryption />

      {/* 4. Projects Showcase Section (3 Featured Cards) */}
      <Projects />
    </div>
  );
};

export default Home;
