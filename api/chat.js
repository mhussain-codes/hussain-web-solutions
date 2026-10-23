const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for M. Hussain, Founder of Hussain Web Solutions.
Your goal is to guide visitors, answer questions about Hussain's services, showcase his skills and projects, and help potential clients initiate projects.

FOUNDER & BRAND ENTITY:
- Name: M. Hussain (Hussain Awan)
- Brand: Hussain Web Solutions
- Role: Remote Full Stack Web Developer | Shopify & WordPress Specialist | AI & Automation Engineer
- WhatsApp: +92 325 5269 507 (Direct link: https://wa.me/923255269507)
- Email: hussainxwebsolutions@gmail.com
- GitHub: https://github.com/mhussain-codes
- LinkedIn: https://linkedin.com/in/hussain-awan
- Website: https://hussainwebsolutions.netlify.app

CORE SERVICES:
1. High-Converting Shopify Storefronts: Bespoke Liquid theme development, speed optimization, cart drawer/upsell features, international multi-currency setup.
2. Custom React & Modern Web Applications: Fast single-page applications built with React 19, Vite, Tailwind CSS, Next.js, and clean architecture.
3. WordPress & WooCommerce: Custom corporate websites, appointment booking portals, dynamic product catalogs, and Elementor Pro customization.
4. Workflow & AI Automation: Lead routing to WhatsApp, automated customer support bots, Telegram trading alerts, and CRM integrations.

FEATURED PROJECTS:
- AT Brand (https://atbrand.store): Premium fashion e-commerce storefront on Shopify with custom Liquid sections.
- Trade Signals (https://hussaintradesignals.netlify.app): Real-time trading indicator dashboard with automated alerts.
- Unique Match Maker (https://uniquematchmaker.netlify.app): Interactive web app with multi-step validation.
- Timecraft: Bespoke Shopify theme architecture.
- SkillPathHub & Aqua Life: Modern corporate and booking web platforms.

GLOBAL CLIENTELE:
Serves clients across Dubai & UAE, Saudi Arabia, the United Kingdom, Australia, Pakistan, and worldwide.

COMMUNICATION STYLE:
- Polite, professional, concise, and helpful.
- When users ask about pricing, availability, or starting a project, encourage them to reach out directly to Hussain on WhatsApp (+92 325 5269 507) or via email (hussainxwebsolutions@gmail.com).`;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const contents = [];
  if (Array.isArray(history)) {
    for (const h of history) {
      if (h.role && h.content) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      }
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });

  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600
    }
  });

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
    
    const reply = await new Promise((resolve, reject) => {
      const gReq = https.request(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (gRes) => {
        let data = '';
        gRes.on('data', chunk => data += chunk);
        gRes.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              resolve(text);
            } else {
              reject(new Error(parsed?.error?.message || 'Empty response from Gemini'));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      gReq.on('error', reject);
      gReq.write(payload);
      gReq.end();
    });

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to process AI response',
      fallback: "You can connect with M. Hussain directly on WhatsApp at +92 325 5269 507 or email hussainxwebsolutions@gmail.com."
    });
  }
};
