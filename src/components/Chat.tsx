import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getFarmingAdvice } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'नमस्कार! मी आपला शेती मित्र आहे. तुम्हाला शेतीबद्दल काही प्रश्न आहेत का? (Hello! I am your farming friend. Do you have any questions about farming?)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const advice = await getFarmingAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: advice || 'क्षमस्व, मला काही तांत्रिक अडचण आली आहे. (Sorry, I encountered a technical issue.)' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'काहीतरी चूक झाली आहे. कृपया पुन्हा प्रयत्न करा. (Something went wrong. Please try again.)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-olive/20">
      <div className="bg-brand-olive p-4 text-white flex items-center gap-2">
        <Bot size={24} />
        <h2 className="text-xl font-semibold">शेती सल्लागार (Farming Advisor)</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-cream/30">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${
                msg.role === 'user' 
                  ? 'bg-brand-olive text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'
              }`}>
                <div className="shrink-0 mt-1">
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
              <Loader2 className="animate-spin text-brand-olive" size={18} />
              <span className="text-sm text-gray-500 italic">विचार करत आहे... (Thinking...)</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="तुमचा प्रश्न विचारा... (Ask your question...)"
            className="flex-1 p-3 bg-brand-cream/50 rounded-full border-none focus:ring-2 focus:ring-brand-olive outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-3 bg-brand-olive text-white rounded-full hover:bg-brand-olive/90 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
