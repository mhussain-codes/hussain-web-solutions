import React, { useState } from 'react';
import { MessageCircle, Mail, Send, CheckCircle2, Globe2, Clock } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Contact = () => {
  const { siteInfo } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    service: 'Shopify Development',
    description: '',
    features: '',
    timeline: '',
    budget: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/hussainxwebsolutions@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${formData.name}`,
          Name: formData.name,
          Email: formData.email,
          WhatsApp: formData.whatsapp,
          Company: formData.company,
          Service: formData.service,
          Description: formData.description,
          Features: formData.features,
          Timeline: formData.timeline,
          Budget: formData.budget
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          company: '',
          service: 'Shopify Development',
          description: '',
          features: '',
          timeline: '',
          budget: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contact Hussain Awan | Start a Web Project | Hussain Web Solutions"
        description="Get in touch with Hussain Awan to discuss your next web development project. Fill out the brief or reach out directly on WhatsApp or social channels."
        canonical="https://hussain-web-solutions.vercel.app/contact"
      />
      <Reveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            <Mail size={15} />
            <span>Direct Inquiries</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Start Your Next Project
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fill out the brief below to share your specifications, or reach out directly through WhatsApp for immediate discussion.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact & Info */}
        <Reveal delay={100} className="lg:col-span-5 space-y-6">
          <div className="cosmic-card p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Direct Communication</h2>
            
            <div className="space-y-4">
              <a 
                href={`${siteInfo.contact.whatsappLink}?text=${encodeURIComponent(siteInfo.contact.defaultMessage)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all text-slate-200 group"
              >
                <div className="w-11 h-11 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Direct WhatsApp</p>
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {siteInfo.contact.whatsapp}
                  </p>
                </div>
              </a>

              <a 
                href={`mailto:${siteInfo.contact.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-500/10 transition-all text-slate-200 group"
              >
                <div className="w-11 h-11 bg-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Official Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {siteInfo.contact.email}
                  </p>
                </div>
              </a>

              <a 
                href={siteInfo.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all text-slate-200 group"
              >
                <div className="w-11 h-11 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                  <LinkedinIcon size={22} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">LinkedIn Profile</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    Hussain Awan
                  </p>
                </div>
              </a>

              {/* Social Channels */}
              <div className="pt-2 grid grid-cols-3 gap-2.5">
                {siteInfo.contact.instagram && (
                  <a
                    href={siteInfo.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-pink-500/40 hover:bg-pink-500/10 transition-all text-slate-200 group text-center"
                  >
                    <FaInstagram className="text-pink-400 text-lg mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-pink-300">Instagram</span>
                  </a>
                )}
                {siteInfo.contact.twitter && (
                  <a
                    href={siteInfo.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-sky-500/40 hover:bg-sky-500/10 transition-all text-slate-200 group text-center"
                  >
                    <FaTwitter className="text-sky-400 text-lg mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-sky-300">Twitter (X)</span>
                  </a>
                )}
                {siteInfo.contact.facebook && (
                  <a
                    href={siteInfo.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-slate-200 group text-center"
                  >
                    <FaFacebook className="text-blue-400 text-lg mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-blue-300">Facebook</span>
                  </a>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-400" />
                <span>Typical response time: within 2 to 4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 size={14} className="text-violet-400" />
                <span>Serving clients across UAE, Saudi Arabia, UK, AUS, and Worldwide</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Project Inquiry Form */}
        <Reveal delay={200} className="lg:col-span-7">
          <div className="cosmic-card p-6 sm:p-10">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Project Inquiry Received!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Your project specifications have been sent directly to {siteInfo.contact.email}. I will review the details and get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')} 
                  className="btn-secondary mt-4 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white mb-1">Project Specification Form</h3>
                <p className="text-xs text-slate-400 mb-4">Please fill in as much detail as you currently have available.</p>

                {status === 'error' && (
                  <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    Submission failed. Please email directly to {siteInfo.contact.email} or connect on WhatsApp.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors" 
                      placeholder="e.g. Alex Smith" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors" 
                      placeholder="alex@company.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="whatsapp" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp Number
                    </label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      name="whatsapp" 
                      value={formData.whatsapp} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors" 
                      placeholder="+971 ... / +44 ..." 
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors" 
                      placeholder="Brand or Agency Name" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0f24] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
                  >
                    <option value="Shopify Development">Shopify Storefront / Theme Development</option>
                    <option value="Custom Web Application">Custom React Web Application</option>
                    <option value="WordPress & WooCommerce">WordPress / WooCommerce Website</option>
                    <option value="Workflow & WhatsApp Automation">Workflow & WhatsApp Bot Automation</option>
                    <option value="Performance & Speed Optimization">Performance & Speed Optimization</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Overview & Objectives *
                  </label>
                  <textarea 
                    id="description" 
                    name="description" 
                    rows={4} 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-violet-400 transition-colors" 
                    placeholder="Describe your goals, desired features, inspirations, or any existing website links..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'} 
                  className="w-full btn-primary py-3 text-sm font-semibold justify-center cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;
