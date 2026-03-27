import React from 'react';
import { Leaf, Info, Calendar, Droplets, Sun } from 'lucide-react';
import { motion } from 'motion/react';

const crops = [
  {
    name: 'कांदा (Onion)',
    season: 'हिवाळा/पावसाळा (Winter/Monsoon)',
    duration: '१२०-१५० दिवस (120-150 Days)',
    water: 'मध्यम (Medium)',
    tips: 'पाण्याचा निचरा होणारी जमीन निवडा. (Choose well-draining soil.)'
  },
  {
    name: 'सोयाबीन (Soybean)',
    season: 'पावसाळा (Monsoon)',
    duration: '९०-११० दिवस (90-110 Days)',
    water: 'पावसावर अवलंबून (Rain-fed)',
    tips: 'पेरणीपूर्वी बीजप्रक्रिया करा. (Do seed treatment before sowing.)'
  },
  {
    name: 'कापूस (Cotton)',
    season: 'पावसाळा (Monsoon)',
    duration: '१६०-१८० दिवस (160-180 Days)',
    water: 'जास्त (High)',
    tips: 'काळी कसदार जमीन उत्तम. (Black fertile soil is best.)'
  },
  {
    name: 'ऊस (Sugarcane)',
    season: 'वर्षभर (Year-round)',
    duration: '१२-१८ महिने (12-18 Months)',
    water: 'खूप जास्त (Very High)',
    tips: 'ठिबक सिंचनाचा वापर करा. (Use drip irrigation.)'
  }
];

export default function CropGuide() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand-olive/20">
      <div className="flex items-center gap-2 text-brand-olive mb-6">
        <Leaf size={24} />
        <h2 className="text-xl font-semibold">पीक मार्गदर्शक (Crop Guide)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crops.map((crop, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-brand-cream/20 p-5 rounded-2xl border border-brand-olive/10 flex flex-col gap-3"
          >
            <h3 className="text-lg font-bold text-brand-olive flex items-center gap-2">
              <Info size={18} />
              {crop.name}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-olive" />
                <span>{crop.season}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-brand-olive" />
                <span>{crop.water}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-2 border-t border-brand-olive/10 pt-2">
              {crop.tips}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
