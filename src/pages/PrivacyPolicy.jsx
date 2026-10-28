import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Privacy Policy | Hussain Web Solutions"
        description="Privacy policy and data governance practices for Hussain Web Solutions."
        canonical="https://hussain-web-solutions.vercel.app/privacy-policy"
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">Privacy Policy</h1>
      <div className="cosmic-card p-8 md:p-10 space-y-6 text-slate-300 text-sm leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <p>This Privacy Policy describes how Hussain Web Solutions collects, uses, and safeguards client information submitted across this web property.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">1. Information Collection</h2>
        <p>We may collect personal details such as your name, business email, WhatsApp contact number, and technical project scope when you voluntarily submit inquiries via our project forms, contact channels, or interactive assistant.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">2. Use of Information</h2>
        <p>The information submitted is utilized strictly to evaluate project feasibility, prepare proposals, correspond regarding deliverables, and execute web development contracts. We do not sell, rent, or distribute client contact details to third parties.</p>
        
        <h2 className="text-lg font-bold text-white pt-2">3. Data Security & Storage</h2>
        <p>We apply industry-standard security protocols to protect all transmitted inquiries. No Internet transmission is entirely immune to interception, but reasonable technical safeguards are maintained at all times.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
