import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, MapPin, Loader2, Search } from 'lucide-react';
import { getWeatherInfo } from '../services/gemini';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export default function Weather() {
  const [location, setLocation] = useState('पुणे (Pune)');
  const [weather, setWeather] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (loc: string) => {
    setIsLoading(true);
    try {
      const info = await getWeatherInfo(loc);
      setWeather(info);
    } catch (error) {
      console.error(error);
      setWeather('हवामान माहिती मिळवण्यात अडचण आली. (Error fetching weather info.)');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand-olive/20 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-brand-olive">
          <Cloud size={24} />
          <h2 className="text-xl font-semibold">हवामान अंदाज (Weather Forecast)</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather(location)}
            placeholder="शहर/गाव (City/Village)"
            className="p-2 bg-brand-cream/50 rounded-lg border-none focus:ring-2 focus:ring-brand-olive outline-none text-sm w-32 md:w-48"
          />
          <button
            onClick={() => fetchWeather(location)}
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
            <p className="text-gray-500 italic">माहिती शोधत आहे... (Searching...)</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm max-w-none text-gray-700 bg-brand-cream/20 p-4 rounded-2xl"
          >
            <ReactMarkdown>{weather || ''}</ReactMarkdown>
          </motion.div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center gap-2">
          <Sun className="text-orange-500" size={24} />
          <span className="text-xs font-medium text-blue-800">उन्हाळा (Summer)</span>
        </div>
        <div className="bg-green-50 p-4 rounded-2xl flex flex-col items-center gap-2">
          <CloudRain className="text-blue-500" size={24} />
          <span className="text-xs font-medium text-green-800">पावसाळा (Monsoon)</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center gap-2">
          <Cloud className="text-gray-500" size={24} />
          <span className="text-xs font-medium text-gray-800">हिवाळा (Winter)</span>
        </div>
      </div>
    </div>
  );
}
