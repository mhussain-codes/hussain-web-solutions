import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteInfo as defaultSiteInfo } from '../data/site';
import { projects as defaultProjects } from '../data/projects';
import { services as defaultServices } from '../data/services';
import { faq as defaultFaq } from '../data/faq';

const STORAGE_KEY = 'hws_site_content_v1';
const AUTH_KEY = 'hws_admin_auth_v1';
const PASS_KEY = 'hws_admin_pass_v1';
const DEFAULT_PASSWORD = 'hussain@admin2026';

const defaultHeroData = {
  statusBadge: "Available for Select Contracts & Q4 Projects",
  headlinePart1: "Premium Web Development &",
  headlineGradient: "E-Commerce Solutions.",
  subheading: "I build fast, conversion-optimized corporate websites, digital storefronts, and custom web applications.",
  description: "I am a remote web developer specializing in WordPress, Shopify, React, and seamless business automation. From professional company websites and appointment booking platforms to complex WooCommerce stores, I help businesses in the UAE, Saudi Arabia, the UK, and Australia scale their digital presence.",
  locationText: "Remote Worldwide (UAE, UK, AUS, PK)",
  quickContactText: "Direct WhatsApp Communication"
};

const defaultProcessSteps = [
  {
    step: '01',
    title: 'Discovery & Scope',
    desc: 'We define the core business goal, target audience, technical requirements, and milestone roadmap.',
    badge: 'Stage 1'
  },
  {
    step: '02',
    title: 'Architecture & UI',
    desc: 'Creating high-performance wireframes, layout structures, and mobile-first component patterns.',
    badge: 'Stage 2'
  },
  {
    step: '03',
    title: 'Clean Development',
    desc: 'Engineering with modern React, Shopify Liquid, or WordPress. Adding custom logic and API automation.',
    badge: 'Stage 3'
  },
  {
    step: '04',
    title: 'Testing & Launch',
    desc: 'Comprehensive speed testing, cross-browser audits, SEO schema verification, and seamless go-live.',
    badge: 'Stage 4'
  }
];

const defaultAboutData = {
  tagline: "Pragmatic Web Engineering & Conversion Focus",
  paragraphs: [
    "I am a professional web developer with deep practical experience in WordPress, Elementor, WooCommerce, Shopify, modern web technologies, and business automation. My focus is on creating premium e-commerce experiences and digital storefronts that serve a clear business purpose.",
    "I believe in practical solutions, performance optimization, and clear communication across global time zones. Whether crafting custom Shopify themes from Liquid code or building interactive React dashboards, I prioritize code cleanliness, maintainability, and real business value.",
    "Beyond standard website builds, I integrate practical AI and WhatsApp automation to handle incoming inquiries, route leads, and automate operational workflows for client organizations."
  ],
  skills: [
    'React.js',
    'Tailwind CSS',
    'Shopify & Liquid',
    'WordPress',
    'WooCommerce',
    'JavaScript (ES6+)',
    'Vite',
    'Node.js & APIs',
    'WhatsApp Automation',
    'HTML5 / Semantic Web',
    'Git & GitHub',
    'Netlify & Vercel'
  ],
  principles: [
    { title: "Business-First", desc: "Every line of code and design element serves your underlying conversion or operational goal." },
    { title: "Performance & SEO", desc: "Rigorous testing for Core Web Vitals, sub-second load times, and structured JSON-LD schema." },
    { title: "Clean Architecture", desc: "Maintainable, modern code with zero unnecessary dependencies, bloat, or brittle setups." },
    { title: "Clear Communication", desc: "Transparent milestone updates across global time zones (UAE, UK, Australia, Worldwide)." }
  ]
};

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  // Load initial content from localStorage or defaults
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          siteInfo: parsed.siteInfo || defaultSiteInfo,
          heroData: parsed.heroData || defaultHeroData,
          projects: parsed.projects || defaultProjects,
          services: parsed.services || defaultServices,
          processSteps: parsed.processSteps || defaultProcessSteps,
          aboutData: parsed.aboutData || defaultAboutData,
          faq: parsed.faq || defaultFaq,
        };
      }
    } catch (e) {
      console.warn("Could not parse saved content from storage", e);
    }
    return {
      siteInfo: defaultSiteInfo,
      heroData: defaultHeroData,
      projects: defaultProjects,
      services: defaultServices,
      processSteps: defaultProcessSteps,
      aboutData: defaultAboutData,
      faq: defaultFaq,
    };
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Save content to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error("Failed to save content to storage", e);
    }
  }, [content]);

  // Auth methods
  const login = (password) => {
    const currentPassword = localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD;
    if (password === currentPassword) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Incorrect administrator password.' };
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdminAuthenticated(false);
  };

  const changeAdminPassword = (oldPass, newPass) => {
    const currentPassword = localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD;
    if (oldPass !== currentPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    localStorage.setItem(PASS_KEY, newPass);
    return { success: true };
  };

  // Section updater methods
  const updateSiteInfo = (newSiteInfo) => {
    setContent(prev => ({ ...prev, siteInfo: { ...prev.siteInfo, ...newSiteInfo } }));
  };

  const updateHeroData = (newHeroData) => {
    setContent(prev => ({ ...prev, heroData: { ...prev.heroData, ...newHeroData } }));
  };

  const updateProjects = (newProjects) => {
    setContent(prev => ({ ...prev, projects: newProjects }));
  };

  const updateServices = (newServices) => {
    setContent(prev => ({ ...prev, services: newServices }));
  };

  const updateProcessSteps = (newSteps) => {
    setContent(prev => ({ ...prev, processSteps: newSteps }));
  };

  const updateAboutData = (newAboutData) => {
    setContent(prev => ({ ...prev, aboutData: { ...prev.aboutData, ...newAboutData } }));
  };

  const updateFaq = (newFaq) => {
    setContent(prev => ({ ...prev, faq: newFaq }));
  };

  const resetToDefaults = () => {
    const initial = {
      siteInfo: defaultSiteInfo,
      heroData: defaultHeroData,
      projects: defaultProjects,
      services: defaultServices,
      processSteps: defaultProcessSteps,
      aboutData: defaultAboutData,
      faq: defaultFaq,
    };
    setContent(initial);
    localStorage.removeItem(STORAGE_KEY);
    return true;
  };

  const exportBackupJson = () => {
    return JSON.stringify(content, null, 2);
  };

  const importBackupJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') throw new Error("Invalid JSON structure");
      setContent({
        siteInfo: parsed.siteInfo || defaultSiteInfo,
        heroData: parsed.heroData || defaultHeroData,
        projects: parsed.projects || defaultProjects,
        services: parsed.services || defaultServices,
        processSteps: parsed.processSteps || defaultProcessSteps,
        aboutData: parsed.aboutData || defaultAboutData,
        faq: parsed.faq || defaultFaq,
      });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        ...content,
        isAdminAuthenticated,
        login,
        logout,
        changeAdminPassword,
        updateSiteInfo,
        updateHeroData,
        updateProjects,
        updateServices,
        updateProcessSteps,
        updateAboutData,
        updateFaq,
        resetToDefaults,
        exportBackupJson,
        importBackupJson
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
