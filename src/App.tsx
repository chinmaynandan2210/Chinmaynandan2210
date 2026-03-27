import React, { useState } from 'react';
import { Sprout, MessageCircle, Cloud, ShoppingBag, Leaf, Menu, X } from 'lucide-react';
import Chat from './components/Chat';
import Weather from './components/Weather';
import Market from './components/Market';
import CropGuide from './components/CropGuide';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'home' | 'chat' | 'weather' | 'market' | 'guide';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'मुख्य (Home)', icon: Sprout },
    { id: 'chat', label: 'सल्लागार (Advisor)', icon: MessageCircle },
    { id: 'weather', label: 'हवामान (Weather)', icon: Cloud },
    { id: 'market', label: 'बाजार (Market)', icon: ShoppingBag },
    { id: 'guide', label: 'मार्गदर्शक (Guide)', icon: Leaf },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-brand-olive/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-olive/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-olive mb-4 leading-tight">
                  शेतकरी मित्र <br />
                  <span className="text-2xl md:text-3xl font-medium text-brand-earth opacity-80">तुमचा शेतीचा खरा सोबती</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mb-8">
                  आधुनिक तंत्रज्ञान आणि पारंपारिक शेतीचा संगम. आम्ही तुम्हाला शेतीविषयक सर्व माहिती, हवामान अंदाज आणि बाजार भाव एकाच ठिकाणी उपलब्ध करून देतो.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="px-8 py-4 bg-brand-olive text-white rounded-full font-bold shadow-lg hover:bg-brand-olive/90 transition-all hover:scale-105"
                  >
                    सल्ला विचारा (Ask Advice)
                  </button>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="px-8 py-4 border-2 border-brand-olive text-brand-olive rounded-full font-bold hover:bg-brand-olive/5 transition-all"
                  >
                    पीक माहिती (Crop Info)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onClick={() => setActiveTab('weather')} className="cursor-pointer bg-blue-50 p-6 rounded-3xl border border-blue-100 hover:shadow-lg transition-all group">
                <Cloud className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-blue-900 mb-2">हवामान (Weather)</h3>
                <p className="text-sm text-blue-700">तुमच्या भागातील पावसाचा आणि तापमानाचा अंदाज घ्या.</p>
              </div>
              <div onClick={() => setActiveTab('market')} className="cursor-pointer bg-green-50 p-6 rounded-3xl border border-green-100 hover:shadow-lg transition-all group">
                <ShoppingBag className="text-green-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-green-900 mb-2">बाजार भाव (Market)</h3>
                <p className="text-sm text-green-700">विविध बाजार समित्यांमधील पिकांचे ताजे भाव पहा.</p>
              </div>
              <div onClick={() => setActiveTab('chat')} className="cursor-pointer bg-orange-50 p-6 rounded-3xl border border-orange-100 hover:shadow-lg transition-all group">
                <MessageCircle className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-orange-900 mb-2">मदत (Help)</h3>
                <p className="text-sm text-orange-700">पिकांवरील रोग आणि कीड नियंत्रणासाठी एआय सल्ला मिळवा.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'chat':
        return <Chat />;
      case 'weather':
        return <Weather />;
      case 'market':
        return <Market />;
      case 'guide':
        return <CropGuide />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-olive/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-brand-olive rounded-xl flex items-center justify-center text-white shadow-lg">
              <Sprout size={24} />
            </div>
            <span className="text-2xl font-bold text-brand-olive tracking-tight">शेतकरी मित्र</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === item.id 
                    ? 'bg-brand-olive text-white shadow-md' 
                    : 'text-gray-600 hover:bg-brand-olive/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-olive"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-brand-olive/10 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-left font-medium flex items-center gap-3 ${
                      activeTab === item.id 
                        ? 'bg-brand-olive text-white' 
                        : 'text-gray-600 hover:bg-brand-olive/5'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-olive text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sprout size={24} />
              <span className="text-2xl font-bold">शेतकरी मित्र</span>
            </div>
            <p className="text-brand-cream/70 text-sm leading-relaxed">
              आम्ही महाराष्ट्रातील शेतकऱ्यांना सक्षम करण्यासाठी कटिबद्ध आहोत. आधुनिक तंत्रज्ञानाचा वापर करून शेती अधिक फायदेशीर बनवणे हे आमचे ध्येय आहे.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">महत्वाच्या लिंक्स (Quick Links)</h4>
            <ul className="space-y-3 text-sm text-brand-cream/70">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('guide')}>पीक माहिती</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('weather')}>हवामान अंदाज</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('market')}>बाजार भाव</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('chat')}>एआय सल्ला</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">संपर्क (Contact)</h4>
            <p className="text-sm text-brand-cream/70 mb-4">
              काही प्रश्न असल्यास आम्हाला संपर्क करा.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <MessageCircle size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-brand-cream/40">
          &copy; २०२६ शेतकरी मित्र. सर्व हक्क राखीव. (All rights reserved.)
        </div>
      </footer>
    </div>
  );
}
