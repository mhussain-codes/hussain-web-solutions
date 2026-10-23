import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Terms & Conditions | Hussain Web Solutions"
        description="Terms and conditions governing the use of Hussain Web Solutions web development services."
        canonical="https://hussainwebsolutions.netlify.app/terms"
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">Terms & Conditions</h1>
      <div className="cosmic-card p-8 md:p-10 space-y-6 text-slate-300 text-sm leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <p>By accessing and utilizing the Hussain Web Solutions website, you agree to comply with the terms and conditions outlined below.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">1. Scope of Engagement</h2>
        <p>All professional web engineering, Shopify theme customization, and automation services are provided subject to specific written project scopes, milestone definitions, and mutual approval before commencement.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">2. Intellectual Property</h2>
        <p>Upon final project delivery and full compensation, all bespoke client code, design assets, and content developed for the client become the client's property, unless third-party licenses (such as open-source frameworks or CMS plugins) apply.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">3. Limitation of Liability</h2>
        <p>Hussain Web Solutions exercises high standards of quality assurance and cross-device testing. However, ongoing third-party platform updates (e.g. Shopify platform shifts or external API modifications) remain subject to their respective terms.</p>
      </div>
    </div>
  );
};

export default Terms;
