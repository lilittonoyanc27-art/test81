import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEXTS } from './vocabData';
import { 
  ArrowLeft, 
  BookOpen, 
  Languages, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

export default function ReadingView({ onBack }: { onBack: () => void }) {
  const [selectedTextIdx, setSelectedTextIdx] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (selectedTextIdx === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <header className="text-center space-y-4">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-indigo-600 transition-colors mx-auto"
           >
             <ArrowLeft className="w-4 h-4" /> ԵՏ ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
           </button>
           <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Ընտրեք Տեքստը</h2>
        </header>

        <div className="grid sm:grid-cols-2 gap-8">
          {TEXTS.map((text, i) => (
            <motion.button
              key={text.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTextIdx(i)}
              className="bg-white p-8 rounded-[40px] shadow-xl border-2 border-slate-50 text-left space-y-4 group"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {i + 1}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600">{text.titleEsp}</h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{text.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const text = TEXTS[selectedTextIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <button 
          onClick={() => setSelectedTextIdx(null)}
          className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> ԵՏ ՑՈՒՑԱԿ
        </button>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 shadow-inner">
          {TEXTS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelectedTextIdx(i)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedTextIdx === i 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:bg-white'
              }`}
            >
              ՏԵՔՍՏ {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
           key={text.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className="bg-white rounded-[48px] p-8 sm:p-16 shadow-2xl border-2 border-indigo-50 relative overflow-hidden"
        >
          {/* Decorative stuff */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-16 -translate-y-16" />
          
          <div className="relative space-y-12">
            <header className="space-y-2 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                  <BookOpen className="w-4 h-4" /> Իսպաներեն Ընթերցանություն
               </div>
               <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                 {text.titleEsp}
               </h2>
               <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
                 {text.title}
               </p>
            </header>

            <div className="space-y-6">
              {text.sentences.map((line, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => toggleTranslation(`${text.id}-${idx}`)}
                >
                  <div className="flex items-start gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-snug">
                         {line.esp}
                       </p>
                       <AnimatePresence>
                         {showTranslation[`${text.id}-${idx}`] && (
                           <motion.p 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="text-indigo-600 font-bold italic text-base overflow-hidden"
                           >
                             {line.arm}
                           </motion.p>
                         )}
                       </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-center gap-4 text-slate-300 font-black uppercase text-[10px] tracking-[0.4em]">
               <Languages className="w-4 h-4" /> ՄԱՆՐԱՄԱՍՆԵՐԻ ՀԱՄԱՐ ՍԵՂՄԵՔ ՆԱԽԱԴԱՍՈՒԹՅԱՆ ՎՐԱ <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
