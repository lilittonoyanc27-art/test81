import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  Languages,
  Info
} from 'lucide-react';
import ReadingView from './ReadingView';
import ExerciseView from './ExerciseView';

export type AppScreen = 'menu' | 'reading' | 'exercises';

function MainMenu({ setScreen }: { setScreen: (s: AppScreen) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-24 text-center space-y-20">
      <div className="space-y-6">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 bg-indigo-50 rounded-3xl text-indigo-600 shadow-inner"
        >
           <Languages className="w-12 h-12" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            Իսպաներեն <br/><span className="text-indigo-600">Ընթերցանություն</span>
          </h1>
          <p className="text-xs sm:text-xl font-bold text-slate-400 uppercase tracking-[0.4em] pt-4">
            Lectura y Ejercicios
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <motion.button 
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('reading')}
          className="group bg-white p-8 sm:p-12 rounded-[48px] shadow-2xl border-2 border-indigo-50 text-left space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
          <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-12 transition-all">
             <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-indigo-600">Ընթերցանություն</h3>
            <p className="text-slate-400 font-bold italic leading-tight">Կարդացեք և թարգմանեք հիմնական տեքստերը:</p>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-widest pt-4">
             Սկսել <ArrowRight className="w-4 h-4" />
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('exercises')}
          className="group bg-slate-900 p-8 sm:p-12 rounded-[48px] shadow-2xl text-left space-y-6 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
          <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-slate-900 shadow-xl -rotate-6 group-hover:rotate-0 transition-all">
             <GraduationCap className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-emerald-400">Վարժություններ</h3>
            <p className="text-white/40 font-bold italic leading-tight">Ստուգեք ձեր գիտելիքները հարցերի միջոցով:</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[10px] tracking-widest pt-4">
             Փորձել <ArrowRight className="w-4 h-4" />
          </div>
        </motion.button>
      </div>

      <div className="pt-20 opacity-20 hidden sm:block">
         <Sparkles className="w-12 h-12 text-indigo-400 mx-auto" />
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <MainMenu setScreen={setScreen} />
          </motion.div>
        )}
        
        {screen === 'reading' && (
          <motion.div key="reading" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <ReadingView onBack={() => setScreen('menu')} />
          </motion.div>
        )}

        {screen === 'exercises' && (
          <motion.div key="exercise" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <ExerciseView onBack={() => setScreen('menu')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl border border-indigo-50 shadow-2xl rounded-full px-8 py-4 flex items-center gap-10">
        <NavButton active={screen === 'menu'} icon={<Home />} onClick={() => setScreen('menu')} label="Մենյու" />
        <NavButton active={screen === 'reading'} icon={<BookOpen />} onClick={() => setScreen('reading')} label="Կարդալ" />
        <NavButton active={screen === 'exercises'} icon={<GraduationCap />} onClick={() => setScreen('exercises')} label="Վարժ" />
      </nav>

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px]" />
      </div>

      <footer className="py-20 text-center pb-32">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-black uppercase text-[10px] tracking-[0.5em]">
           <Info className="w-4 h-4" /> ԻՍՊԱՆԵՐԵՆԻ ՈՒՍՈՒՑՈՒՄ 2026
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group relative transition-all ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-600'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
        {label}
      </span>
    </button>
  );
}

