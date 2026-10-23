import { Code, Globe, Workflow, ShoppingBag, Zap, Cpu } from 'lucide-react';

export const services = [
  {
    id: "web-development",
    title: "Custom Web Development",
    category: "Full-Stack & Frontend",
    description: "Responsive, high-performance websites engineered with clean semantic code, fast load times, and structured content tailored to business objectives.",
    icon: Code,
    deliverables: ["Modern React & Vite architecture", "Mobile-first responsive design", "Custom interactive components", "Semantic HTML & accessible structure"]
  },
  {
    id: "shopify-ecommerce",
    title: "Shopify & E-Commerce",
    category: "Storefront Engineering",
    description: "High-converting Shopify and WooCommerce storefronts featuring bespoke product showcases, optimized cart experiences, and seamless checkout journeys.",
    icon: ShoppingBag,
    deliverables: ["Custom Shopify Liquid sections", "Conversion-focused PDP layouts", "Cart drawer & checkout optimization", "WooCommerce custom setups"]
  },
  {
    id: "wordpress-elementor",
    title: "WordPress & CMS Solutions",
    category: "Content Management",
    description: "Tailored WordPress and Elementor development giving you complete content control with clean layouts, reliable plugin architecture, and zero bloat.",
    icon: Globe,
    deliverables: ["Custom Elementor templates", "Lightweight plugin configuration", "Client-editable dynamic content", "Security & backup hardening"]
  },
  {
    id: "automation-bots",
    title: "Workflow & Bot Automation",
    category: "Intelligent Systems",
    description: "Practical digital automation for repetitive business tasks, automated customer inquiry handling via WhatsApp, and live notification dashboards.",
    icon: Workflow,
    deliverables: ["WhatsApp business inquiry routing", "Custom API & webhook integrations", "Automated alert & notification systems", "Form lead dispatch to email & CRM"]
  },
  {
    id: "performance-optimization",
    title: "Performance & Technical SEO",
    category: "Speed & Visibility",
    description: "Speed audits, image compression, script tree-shaking, and technical schema optimization targeting top-tier Google Lighthouse scores.",
    icon: Zap,
    deliverables: ["Sub-second Core Web Vitals", "Lighthouse 90+ performance audit", "Structured JSON-LD schema", "Cross-browser regression testing"]
  },
  {
    id: "digital-products",
    title: "Custom Web Applications",
    category: "Product Engineering",
    description: "Custom web tools, matrimonial matchmaking platforms, interactive calculators, and analytical signal dashboards engineered for reliability.",
    icon: Cpu,
    deliverables: ["Component-driven UI systems", "Real-time state & API integration", "Intuitive user workflows", "High uptime cloud deployment"]
  }
];
