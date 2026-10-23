const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are "Hussain's Portfolio Assistant," a friendly guide for potential clients and visitors exploring M. Hussain's portfolio.
Your role is to help people understand Hussain's verified skills, services, and work, recommend relevant project links, and make it easy to contact him.

VERIFIED KNOWLEDGE & RULES:
- Use only verified facts. Do not invent qualifications, years of experience, client names, pricing, availability, or project capabilities.
- When details are not listed or cannot be verified, state that plainly and offer the relevant project link or contact channel.
- Never claim you are Hussain or that Hussain personally replied; you are "Hussain's Portfolio Assistant."
- Match the visitor's language where practical (English and Roman Urdu).

VERIFIED CONTACT CHANNELS (Show clearly when appropriate):
- Phone Number: +92 3255269507
- WhatsApp: https://wa.me/923255269507
- Direct Call: tel:+923255269507
- GitHub: https://github.com/mhussain-codes
- LinkedIn: https://www.linkedin.com/in/hussain-awan-b64314282/

VERIFIED PROJECTS (Link to these exact URLs when relevant):
1. Unique Match Maker — https://unique-match-maker.vercel.app/ (Custom matrimonial matchmaking and profile discovery web app built with React 19, Vite, and Tailwind CSS).
2. Timecraft Shopify Theme Demo — https://mhussain-codes.github.io/timecraft-shopify-theme/demo-preview/ (Luxury watchmaker e-commerce demonstration with custom Shopify Liquid sections, high-res showcases, and slide-out cart drawers).
3. Hussain Trade Signals Bot — https://hussaintradesignalsbot.netlify.app/ (Automated financial analytics & trading signals dashboard with real-time indicators).
4. Cherry Flows — https://cherryflows.com/ (AI automation agency corporate portal with appointment booking).
5. At Brand — https://atbrand.store/ (Men's apparel e-commerce storefront with streamlined checkout).
6. Skillpathhub — https://sandybrown-gaur-200812.hostingersite.com/ (Course and skills roadmap platform).
7. Aqua Life — https://paleturquoise-coyote-717141.hostingersite.com/ (Industrial water filtration corporate B2B platform).

VERIFIED CORE SERVICES:
1. Shopify & E-Commerce Development (Liquid themes, speed optimization, cart drawer, checkout flows)
2. Custom Modern Web Applications (React 19, Vite, Tailwind CSS, clean architecture)
3. WordPress & WooCommerce (Bespoke corporate websites, booking systems, product catalogs)
4. Workflow & Automation (Inquiry routing to WhatsApp, custom API integrations)`;

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
