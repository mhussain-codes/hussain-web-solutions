import React from 'react';
import { 
  CheckCircle2, 
  Code, 
  ShoppingBag, 
  Globe, 
  Workflow, 
  Zap, 
  Cpu, 
  Layers 
} from 'lucide-react';
import Reveal from './Reveal';

// Safe icon map ensuring icons never crash when deserialized from storage
const ICON_MAP = {
  'web-development': Code,
  'shopify-ecommerce': ShoppingBag,
  'wordpress-elementor': Globe,
  'automation-bots': Workflow,
  'performance-optimization': Zap,
  'digital-products': Cpu
};

const ServiceCard = ({ service, index = 0 }) => {
  // Safe Icon resolution with fallback to prevent React render crash
  const getIcon = () => {
    if (typeof service?.icon === 'function') return service.icon;
    if (service?.id && ICON_MAP[service.id]) return ICON_MAP[service.id];
    return Layers;
  };

  const Icon = getIcon();

  return (
    <Reveal delay={index * 100}>
      <div className="cosmic-card p-7 md:p-8 flex flex-col h-full group">
        {/* Top Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/30 text-violet-400 flex items-center justify-center group-hover:bg-violet-600/20 group-hover:border-violet-400/50 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <Icon size={22} />
          </div>
          {service?.category && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
              {service.category}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
          {service?.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {service?.description}
        </p>

        {/* Deliverables / Highlights */}
        {service?.deliverables && (
          <div className="mt-auto pt-5 border-t border-white/[0.06] space-y-2">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-violet-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default ServiceCard;
