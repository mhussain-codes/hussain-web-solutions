import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Bot, User, Sparkles, ExternalLink, PhoneCall } from 'lucide-react';
import { getFastInstantAnswer, VERIFIED_CONTACTS, VERIFIED_PROJECTS } from '../data/chatbotKnowledge';

// Helper to render markdown links and bold formatting safely
const renderFormattedContent = (content) => {
  if (typeof content !== 'string') return content;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIdx = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIdx) {
      parts.push(content.substring(lastIdx, match.index));
    }
    const [, label, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors inline-flex items-center gap-0.5"
      >
        <span>{label}</span>
        <ExternalLink size={10} className="inline opacity-80 ml-0.5" />
      </a>
    );
    lastIdx = linkRegex.lastIndex;
  }
  if (lastIdx < content.length) {
    parts.push(content.substring(lastIdx));
  }

  return (
    <div className="whitespace-pre-wrap leading-relaxed space-y-1">
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {typeof p === 'string' ? (
            p.split(/(\*\*[^*]+\*\*)/g).map((sub, j) => {
              if (sub.startsWith('**') && sub.endsWith('**')) {
                return <strong key={j} className="text-white font-semibold">{sub.slice(2, -2)}</strong>;
              }
              return sub;
            })
          ) : (
            p
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Hussain's Portfolio Assistant. How can I help you explore Hussain's web development, Shopify projects, or get in touch today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What services do you offer?",
    "Show me your Shopify work",
    "How can I contact Hussain?",
    "Tell me about Unique Match Maker",
    "Show all 7 projects"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const trimmed = text.trim();
    const userMessage = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 1. Fast sub-50ms deterministic instant answer from verified knowledge
    const instant = getFastInstantAnswer(trimmed);
    if (instant) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: instant.text,
            action: instant.action,
            link: instant.link,
            whatsapp: instant.whatsapp
          }
        ]);
        setIsLoading(false);
      }, 40);
      return;
    }

    // 2. Fall back to Gemini 2.5 Flash Lite serverless endpoint
    try {
      let res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages.slice(-4) })
      });

      if (!res.ok) {
        // Fallback for Netlify
        res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history: messages.slice(-4) })
        });
      }

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm here to help! You can reach M. Hussain directly:\n\n• **WhatsApp:** [Chat on WhatsApp (${VERIFIED_CONTACTS.phone})](${VERIFIED_CONTACTS.whatsappUrl})\n• **Direct Call:** [${VERIFIED_CONTACTS.phone}](${VERIFIED_CONTACTS.callUrl})\n• **LinkedIn:** [Hussain Awan on LinkedIn](${VERIFIED_CONTACTS.linkedinUrl})\n• **GitHub:** [mhussain-codes](${VERIFIED_CONTACTS.githubUrl})\n\nFeel free to send a message on WhatsApp anytime!`,
          isFallback: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm Hussain's Portfolio Assistant. How can I help you explore Hussain's web development, Shopify projects, or get in touch today?"
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(139,92,246,0.55)] border border-violet-400/50 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 z-50 cursor-pointer ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Open Hussain's Portfolio Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window Container */}
      <div
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-full sm:h-[600px] max-h-[100dvh] bg-[#0c0f26] sm:rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-300 ease-out z-50 border border-white/[0.12] ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#080a1c] border-b border-white/[0.08] text-white p-4 sm:rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600/20 border border-violet-500/40 rounded-xl flex items-center justify-center text-violet-400">
              <Bot size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">Hussain&apos;s Portfolio Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
              </div>
              <p className="text-[11px] text-slate-400">Verified skills, projects & direct contact</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              title="Clear conversation"
              aria-label="Clear chat"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-[#070814]/75">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/[0.06] text-violet-300 border border-white/[0.08]'
                  }`}
                >
                  {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white rounded-tr-xs'
                      : 'bg-[#121636] text-slate-200 border border-white/[0.08] shadow-sm rounded-tl-xs'
                  }`}
                >
                  {renderFormattedContent(msg.content)}

                  {/* Fast Action Buttons if returned */}
                  {msg.action === 'contact' && (
                    <div className="mt-3 pt-3 border-t border-white/[0.1] grid grid-cols-2 gap-2">
                      <a
                        href={VERIFIED_CONTACTS.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={VERIFIED_CONTACTS.callUrl}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white/[0.08] border border-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/[0.15] transition-colors"
                      >
                        <PhoneCall size={12} />
                        <span>Call</span>
                      </a>
                    </div>
                  )}

                  {msg.whatsapp && (
                    <div className="mt-3 pt-3 border-t border-white/[0.1]">
                      <a
                        href={VERIFIED_CONTACTS.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-1.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        Chat on WhatsApp (+92 3255269507)
                      </a>
                    </div>
                  )}

                  {msg.isFallback && (
                    <div className="mt-3 pt-3 border-t border-white/[0.1] flex flex-col gap-2">
                      <a
                        href={VERIFIED_CONTACTS.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-1.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        Chat on WhatsApp (+92 3255269507)
                      </a>
                      <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="block text-center py-1.5 px-3 bg-white/[0.06] border border-white/[0.08] text-violet-300 rounded-lg text-xs font-medium hover:bg-white/[0.1] transition-colors"
                      >
                        Open Contact Form
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] text-violet-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} />
                </div>
                <div className="p-3 bg-[#121636] border border-white/[0.08] rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-[#0a0c20] border-t border-white/[0.06] flex gap-1.5 overflow-x-auto scrollbar-thin whitespace-nowrap">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs rounded-full hover:border-violet-500/40 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text Input */}
        <div className="p-3.5 bg-[#080a1c] border-t border-white/[0.08] sm:rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English or Roman Urdu..."
              className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 bg-violet-600 text-white rounded-xl flex items-center justify-center hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer shadow-sm"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
