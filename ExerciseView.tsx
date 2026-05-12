import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXERCISES, TEXTS } from './vocabData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  RotateCcw,
  Star,
  BrainCircuit
} from 'lucide-react';

export default function ExerciseView({ onBack }: { onBack: () => void }) {
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => ex.textId === selectedTextId);
  }, [selectedTextId]);

  if (selectedTextId === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <header className="text-center space-y-4">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-emerald-600 transition-colors mx-auto"
           >
             <ArrowLeft className="w-4 h-4" /> ԵՏ ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
           </button>
           <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Ընտրեք հարցաշարը</h2>
        </header>

        <div className="grid sm:grid-cols-2 gap-8">
          {TEXTS.map((text, i) => (
            <motion.button
              key={text.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTextId(text.id)}
              className="bg-white p-8 rounded-[40px] shadow-xl border-2 border-slate-50 text-left space-y-4 group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-black group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {i + 1}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600">Հարցաշար {i + 1}</h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{text.titleEsp}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const current = filteredExercises[currentIdx];
  const relatedText = TEXTS.find(t => t.id === current.textId);

  const handleAnswer = (opt: string) => {
    if (isCorrect !== null) return;
    
    setSelectedOpt(opt);
    const correct = opt === current.correct;
    setIsCorrect(correct);
    
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIdx < filteredExercises.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setIsCorrect(null);
    setSelectedOpt(null);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white rounded-[64px] p-12 shadow-2xl space-y-10 border-4 border-indigo-50"
        >
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
          <div className="space-y-4">
             <h2 className="text-4xl font-black uppercase italic tracking-widest text-slate-900">ՎԱՐԺՈՒԹՅԱՆ ԱՎԱՐՏ</h2>
             <div className="text-8xl font-black text-indigo-600">
               {score}/{EXERCISES.length}
             </div>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={resetQuiz}
              className="bg-indigo-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-6 h-6" /> ՆՈՐԻՑ ՓՈՐՁԵԼ
            </button>
            <button 
              onClick={() => {
                resetQuiz();
                setSelectedTextId(null);
              }} 
              className="text-slate-400 font-black uppercase text-[10px] tracking-widest pt-4"
            >
               ԸՆՏՐԵԼ ԱՅԼ ՀԱՐՑԱՇԱՐ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-center text-slate-400 font-black uppercase text-[10px] tracking-widest">
        <button onClick={() => setSelectedTextId(null)} className="flex items-center gap-2 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4" /> ԵՏ ՑՈՒՑԱԿ
        </button>
        <div className="bg-white px-6 py-2 rounded-full text-indigo-600 shadow-sm border border-indigo-50">
          {currentIdx + 1} / {filteredExercises.length}
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
             <BrainCircuit className="w-4 h-4" /> Ստուգիր գիտելիքներդ
           </div>
           
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIdx}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-white rounded-[40px] p-8 sm:p-12 shadow-xl border border-indigo-50 space-y-8 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <Star className="w-32 h-32 text-indigo-600" />
                </div>

                <div className="space-y-2">
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                     ՏԵՔՍՏ: {relatedText?.titleEsp}
                   </p>
                   <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                     {current.question}
                   </h3>
                </div>

                <div className="grid gap-4">
                   {current.options.map((opt, i) => {
                     const isSelected = selectedOpt === opt;
                     const isCorrectOpt = isCorrect !== null && opt === current.correct;
                     const isWrongOpt = isCorrect === false && isSelected;

                     return (
                       <button
                         key={i}
                         onClick={() => handleAnswer(opt)}
                         disabled={isCorrect !== null}
                         className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between font-bold text-lg ${
                           isCorrectOpt 
                             ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-lg' 
                             : isWrongOpt
                             ? 'bg-rose-50 border-rose-500 text-rose-900'
                             : isSelected
                             ? 'bg-indigo-50 border-indigo-500 text-indigo-900'
                             : 'bg-white border-slate-100 hover:border-indigo-300'
                         }`}
                       >
                         {opt}
                         {isCorrectOpt && <CheckCircle2 className="text-emerald-500" />}
                         {isWrongOpt && <AlertCircle className="text-rose-500" />}
                       </button>
                     );
                   })}
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
