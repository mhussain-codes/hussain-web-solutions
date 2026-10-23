import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! How can I assist you with your web development or e-commerce project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What services do you offer?",
    "Show me your projects",
    "I need a Shopify store",
    "I need a custom React web app",
    "How much does a website cost?",
    "How can I contact M. Hussain?"
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

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      let res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-4) })
      });

      if (!res.ok) {
        // Fallback for Netlify
        res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: messages.slice(-4) })
        });
      }

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm here to help! You can reach M. Hussain directly on WhatsApp at +92 325 5269 507, view his code on GitHub (https://github.com/mhussain-codes), or email hussainxwebsolutions@gmail.com for an immediate response.",
        isFallback: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ role: 'assistant', content: 'Hi there! How can I assist you with your web development or e-commerce project today?' }]);
    setError(null);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-13 h-13 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-violet-400/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 z-50 cursor-pointer ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Open AI project assistant"
      >
        <MessageSquare size={22} />
      </button>

      {/* Chat Window Container */}
      <div 
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-full sm:h-[580px] max-h-[100dvh] bg-[#0c0f26] sm:rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-300 ease-out z-50 border border-white/[0.1] ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#080a1c] border-b border-white/[0.08] text-white p-4 sm:rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600/20 border border-violet-500/40 rounded-xl flex items-center justify-center text-violet-400">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">HWS Project Assistant</h3>
              <p className="text-[11px] text-slate-400">Instant answers & project scoping</p>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-[#070814]/70">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-white/[0.06] text-violet-300 border border-white/[0.08]'
                }`}>
                  {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>
                <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-violet-600 text-white rounded-tr-xs' 
                    : 'bg-[#121636] text-slate-200 border border-white/[0.08] shadow-sm rounded-tl-xs'
                }`}>
                  {msg.content}
                  {msg.isFallback && (
                    <div className="mt-3 pt-3 border-t border-white/[0.1] flex flex-col gap-2">
                      <a 
                        href="https://wa.me/923255269507" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-center py-1.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 transition-colors"
                      >
                        Message on WhatsApp
                      </a>
                      <a 
                        href="#contact" 
                        onClick={() => setIsOpen(false)} 
                        className="block text-center py-1.5 px-3 bg-white/[0.06] border border-white/[0.08] text-violet-300 rounded-lg text-xs font-medium hover:bg-white/[0.1] transition-colors"
                      >
                        Start a Project Form
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
        {messages.length === 1 && (
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
        )}

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
              placeholder="Ask about pricing, platforms, timeline..."
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
