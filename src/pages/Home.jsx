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
        title="Hussain Awan | Full Stack Web Developer, Shopify Expert & Automation Specialist"
        description="Official portfolio of Hussain Awan (Hussain Web Solutions). Full Stack Web Developer & Shopify Expert engineering high-converting e-commerce storefronts, React web apps, and automated workflows."
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
