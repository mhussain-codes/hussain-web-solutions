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
        title="Hussain Awan | Web Developer, Shopify Expert & AI Automation | Hussain Web Solutions"
        description="Official portfolio of Hussain Awan (Hussain Web Solutions). Modern web development, high-converting Shopify storefronts, bespoke WordPress, and automated web platforms."
        canonical="https://hussain-web-solutions.vercel.app/"
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
