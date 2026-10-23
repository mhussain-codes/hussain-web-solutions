import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const WhatsAppButton = ({ className = "", message = null }) => {
  const { siteInfo } = useContent();
  const { whatsappLink, defaultMessage } = siteInfo.contact;
  const href = `${whatsappLink}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] border border-emerald-400/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#070814] cursor-pointer ${className}`}
    >
      <MessageCircle size={18} />
      <span>Let's Talk on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
