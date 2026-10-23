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

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const { message, history } = body;
  if (!message || typeof message !== 'string') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Message is required' })
    };
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
      const req = https.request(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
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

      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Gemini error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process AI response',
        fallback: "You can connect with M. Hussain directly on WhatsApp at +92 325 5269 507 or email hussainxwebsolutions@gmail.com."
      })
    };
  }
};
