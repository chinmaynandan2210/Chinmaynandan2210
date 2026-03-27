import React, { useState, useEffect } from 'react';
import { ShoppingBag, TrendingUp, MapPin, Loader2, Search } from 'lucide-react';
import { getMarketInfo } from '../services/gemini';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export default function Market() {
  const [crop, setCrop] = useState('कांदा (Onion)');
  const [market, setMarket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarket = async (c: string) => {
    setIsLoading(true);
    try {
      const info = await getMarketInfo(c);
      setMarket(info);
    } catch (error) {
      console.error(error);
      setMarket('बाजार भाव माहिती मिळवण्यात अडचण आली. (Error fetching market info.)');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket(crop);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand-olive/20 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-brand-olive">
          <ShoppingBag size={24} />
          <h2 className="text-xl font-semibold">बाजार भाव (Market Prices)</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchMarket(crop)}
            placeholder="पिकाचे नाव (Crop Name)"
            className="p-2 bg-brand-cream/50 rounded-lg border-none focus:ring-2 focus:ring-brand-olive outline-none text-sm w-32 md:w-48"
          />
          <button
            onClick={() => fetchMarket(crop)}
            className="p-2 bg-brand-olive text-white rounded-lg hover:bg-brand-olive/90 transition-colors"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-4">
            <Loader2 className="animate-spin text-brand-olive" size={32} />
            <p className="text-gray-500 italic">बाजार भाव शोधत आहे... (Searching...)</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm max-w-none text-gray-700 bg-brand-cream/20 p-4 rounded-2xl"
          >
            <ReactMarkdown>{market || ''}</ReactMarkdown>
          </motion.div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 italic p-3 bg-brand-cream/10 rounded-xl border border-dashed border-brand-olive/20">
        <TrendingUp size={16} className="text-brand-olive" />
        <span>टीप: हे भाव अंदाजे आहेत. कृपया स्थानिक बाजार समितीशी संपर्क साधा. (Note: These prices are approximate.)</span>
      </div>
    </div>
  );
}
