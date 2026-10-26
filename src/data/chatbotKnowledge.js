// Verified Knowledge Base for Hussain's Portfolio Assistant

export const VERIFIED_CONTACTS = {
  name: "M. Hussain",
  phone: "+92 3255269507",
  whatsappUrl: "https://wa.me/923255269507",
  callUrl: "tel:+923255269507",
  githubUrl: "https://github.com/mhussain-codes",
  linkedinUrl: "https://www.linkedin.com/in/hussain-awan-b64314282/",
  instagramUrl: "https://www.instagram.com/hussainxwebsolutions?cplk=MWs1MGpkaTh5MTllMA==",
  twitterUrl: "https://x.com/hussainawann",
  facebookUrl: "https://www.facebook.com/share/19fZxJZbJv/"
};

export const VERIFIED_PROJECTS = [
  {
    name: "Unique Match Maker",
    url: "https://unique-match-maker.vercel.app/",
    type: "Custom Web Application",
    desc: "A dignified community matchmaking and candidate profile discovery web application built with React 19, Vite, and Tailwind CSS. Features dynamic multi-criteria filtering and private bio-data management."
  },
  {
    name: "Timecraft Shopify Theme Demo",
    url: "https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/",
    type: "Shopify Storefront",
    desc: "A luxury watchmaker e-commerce demonstration crafted with custom Shopify Liquid sections, high-resolution product showcases, and conversion-optimized slide-out cart drawers."
  },
  {
    name: "Hussain Trade Signals Bot",
    url: "https://hussaintradesignalsbot.netlify.app/",
    type: "Fintech & Automation",
    desc: "An automated financial analytics and trading signals web dashboard delivering real-time technical indicator calculations and automated Telegram/WhatsApp signal dispatch."
  },
  {
    name: "Cherry Flows",
    url: "https://cherryflows.com/",
    type: "AI Agency Website",
    desc: "A responsive corporate website built for an AI Automation agency featuring appointment booking engines and automated lead capture pipelines."
  },
  {
    name: "At Brand",
    url: "https://atbrand.store/",
    type: "E-Commerce",
    desc: "A high-converting men's fashion e-commerce storefront with streamlined checkout and product variant selectors."
  },
  {
    name: "Skillpathhub",
    url: "https://sandybrown-gaur-200812.hostingersite.com/",
    type: "Education Platform",
    desc: "An interactive online skills and course roadmap portal for digital learners."
  },
  {
    name: "Aqua Life",
    url: "https://paleturquoise-coyote-717141.hostingersite.com/",
    type: "Corporate Platform",
    desc: "A commercial industrial water filtration corporate platform engineered for B2B product showcasing and equipment inquiry routing."
  }
];

export const VERIFIED_SERVICES = [
  {
    title: "Shopify & E-Commerce Development",
    desc: "Custom Liquid theme design, conversion-rate optimization, variant pickers, speed optimization, and multi-currency checkout."
  },
  {
    title: "React & Modern Web Applications",
    desc: "Fast, single-page web applications built using React 19, Vite, Next.js, and Tailwind CSS."
  },
  {
    title: "WordPress & WooCommerce",
    desc: "Bespoke corporate websites, appointment booking platforms, and customized WooCommerce storefronts."
  },
  {
    title: "Workflow & AI Automation",
    desc: "WhatsApp inquiry routing, customer support chatbots, and API integrations to automate repetitive tasks."
  }
];

// Fast deterministic instant matcher for ultra-low latency response (0-50ms)
export function getFastInstantAnswer(query) {
  if (!query || typeof query !== 'string') return null;
  const q = query.toLowerCase().trim();

  // Contact / Phone / WhatsApp / Call / Number queries (English & Roman Urdu)
  if (
    q.includes('contact') || 
    q.includes('whatsapp') || 
    q.includes('phone') || 
    q.includes('number') || 
    q.includes('call') || 
    q.includes('rabta') || 
    q.includes('no') ||
    q.includes('kese contact') ||
    q.includes('kaise baat')
  ) {
    return {
      text: `You can reach M. Hussain directly via:\n\n• **WhatsApp:** [Chat on WhatsApp (${VERIFIED_CONTACTS.phone})](${VERIFIED_CONTACTS.whatsappUrl})\n• **Direct Call:** [${VERIFIED_CONTACTS.phone}](${VERIFIED_CONTACTS.callUrl})\n• **LinkedIn:** [Hussain Awan on LinkedIn](${VERIFIED_CONTACTS.linkedinUrl})\n• **Instagram:** [Instagram Profile](${VERIFIED_CONTACTS.instagramUrl})\n• **Twitter (X):** [Twitter / X](${VERIFIED_CONTACTS.twitterUrl})\n• **Facebook:** [Facebook Page](${VERIFIED_CONTACTS.facebookUrl})\n• **GitHub:** [mhussain-codes](${VERIFIED_CONTACTS.githubUrl})\n\nFeel free to send a message on WhatsApp anytime!`,
      action: 'contact'
    };
  }

  // Shopify queries
  if (q.includes('shopify') || q.includes('store') || q.includes('ecommerce') || q.includes('e-commerce') || q.includes('dukaan')) {
    return {
      text: `M. Hussain specializes in high-converting **Shopify & WooCommerce storefronts**, including custom Liquid development, speed optimization, and mobile-friendly checkouts.\n\n✨ **Featured E-Commerce Work:**\n• [Timecraft Luxury Watch Theme Demo](https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/)\n• [At Brand Men's Fashion Store](https://atbrand.store/)\n\nWould you like to discuss your store requirements on WhatsApp?`,
      link: { text: "View Timecraft Demo", url: "https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/" },
      whatsapp: true
    };
  }

  // Services queries (English & Roman Urdu)
  if (q.includes('service') || q.includes('kya karte') || q.includes('kya kaam') || q.includes('offer') || q.includes('skills')) {
    return {
      text: `M. Hussain provides 4 specialized engineering services:\n\n1. **Shopify & E-Commerce:** Bespoke Liquid themes, speed optimization, and checkout flows.\n2. **Custom Web Applications:** Fast React 19, Vite, and Next.js applications.\n3. **WordPress & WooCommerce:** Corporate platforms and appointment booking portals.\n4. **Workflow & AI Automation:** WhatsApp lead routing and custom automations.\n\nWhich service best matches your project goal?`,
      action: 'services'
    };
  }

  // Projects / Portfolio queries (English & Roman Urdu)
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('kaam dikhao') || q.includes('dikha')) {
    return {
      text: `Here are Hussain's verified production projects:\n\n1. [Timecraft Shopify Theme Demo](https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/) — Luxury watchmaker storefront\n2. [Unique Match Maker](https://unique-match-maker.vercel.app/) — Matrimonial web platform\n3. [Hussain Trade Signals Bot](https://hussaintradesignalsbot.netlify.app/) — Trading indicator dashboard\n4. [Cherry Flows](https://cherryflows.com/) — AI agency website\n5. [At Brand](https://atbrand.store/) — Men's apparel e-commerce\n6. [Skillpathhub](https://sandybrown-gaur-200812.hostingersite.com/) — Course roadmap portal\n7. [Aqua Life](https://paleturquoise-coyote-717141.hostingersite.com/) — Industrial water systems\n\nClick any project link above to explore!`,
      action: 'projects'
    };
  }

  // Specific project queries: Match Maker
  if (q.includes('match') || q.includes('matrimonial') || q.includes('rishta')) {
    return {
      text: `**Unique Match Maker** is a custom community matrimonial application built with React 19, Vite, and Tailwind CSS. It features verified candidate profiles, multi-criteria filtering, and secure bio-data handling.\n\n🔗 [Open Unique Match Maker](https://unique-match-maker.vercel.app/)`,
      link: { text: "Open Unique Match Maker", url: "https://unique-match-maker.vercel.app/" }
    };
  }

  // Specific project queries: Trade Signals / Bot
  if (q.includes('trade') || q.includes('signal') || q.includes('crypto') || q.includes('bot')) {
    return {
      text: `**Hussain Trade Signals Bot** is an automated fintech web application connecting financial feeds, technical analysis calculations, and automated alerts to Telegram and WhatsApp.\n\n🔗 [Open Trade Signals Dashboard](https://hussaintradesignalsbot.netlify.app/)`,
      link: { text: "Open Trade Signals Dashboard", url: "https://hussaintradesignalsbot.netlify.app/" }
    };
  }

  // Pricing / Cost / Budget (English & Roman Urdu)
  if (q.includes('price') || q.includes('cost') || q.includes('kitne') || q.includes('rate') || q.includes('budget') || q.includes('fee')) {
    return {
      text: `Website and e-commerce pricing depends on your specific scope (number of pages, custom features, integrations, and launch timeline).\n\nM. Hussain provides transparent milestone-based quotes. The quickest way to get an exact estimate is to share your requirements directly on [WhatsApp (+92 3255269507)](${VERIFIED_CONTACTS.whatsappUrl}).`,
      whatsapp: true
    };
  }

  // Greetings in English & Roman Urdu
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('salam') || q.includes('assalam')) {
    return {
      text: `Hello! Assalam-o-Alaikum! 😊\n\nI am Hussain's Portfolio Assistant. How can I assist you today?\n\n• Ask about **Services**\n• Explore **Shopify or Web Projects**\n• Get **Contact Details** to discuss a new build`,
      action: 'greeting'
    };
  }

  return null;
}
