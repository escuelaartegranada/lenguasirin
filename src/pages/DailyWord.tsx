import React, { useState } from 'react';
import { Card, Button, cn } from '../components/ui';
import { wordsDatabase } from '../data/words';
import { Word } from '../types';
import confetti from 'canvas-confetti';
import { useProgress } from '../hooks/useProgress';

// Return an array of empty strings for syllables based on user input, max 6
const SilaBoxes = ({ count, name, onChange }: { count: string, name: string, onChange: (v: string) => void }) => {
  const num = parseInt(count) || 0;
  if (num <= 0 || num > 6) return <div className="text-slate-300 font-handwriting text-xl">...</div>;
  
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: num }).map((_, i) => (
        <input 
          key={i}
          onChange={(e) => {
             // just a visual dummy or we can store it. For now let's just let them type
          }}
          className="w-16 h-12 border-2 border-slate-400 rounded-lg text-center font-handwriting text-3xl outline-none focus:border-sky-400 bg-transparent"
        />
      ))}
    </div>
  );
}

export const DailyWord = () => {
  const [word] = useState<Word>(() => {
    return wordsDatabase[Math.floor(Math.random() * wordsDatabase.length)];
  });
  
  const { addStars } = useProgress();
  const [done, setDone] = useState(false);

  const [answers, setAnswers] = useState({
    minuscula: '',
    mayuscula: '',
    letras: '',
    vocales: '',
    consonantes: '',
    silabasCount: '',
    empieza: '',
    acaba: '',
    rima: '',
    empiezaIgual: '',
    categoria: '',
    frase: ''
  });

  const checkCompletion = () => {
    setDone(true);
    addStars(20);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  const handleChange = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  if (done) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-black text-green-500 mb-6">¡Ficha Completada!</h2>
        <p className="text-xl text-slate-600 mb-8 font-medium">Has ganado 20 estrellas ⭐</p>
        <Button onClick={() => window.location.reload()} size="xl">
          Hacer otra ficha
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      
      <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-[#fffcf5] relative overflow-hidden rounded-[2rem]">
        {/* Notebook background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#475569 2px, transparent 2px)', backgroundSize: '100% 3rem', marginTop: '5rem' }}></div>
        <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-rose-300 opacity-50 pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col gap-8 px-4 md:px-12 py-8">
          
          {/* Ribbon Title */}
          <div className="flex justify-center mb-6">
             <div className="relative">
               {/* Decorative Ribbon Ends */}
                <div className="absolute -left-6 top-2 border-y-[16px] border-y-transparent border-r-[24px] border-r-slate-200 h-0 w-0"></div>
                <div className="absolute -right-6 top-2 border-y-[16px] border-y-transparent border-l-[24px] border-l-slate-200 h-0 w-0"></div>
                
               <div className="bg-slate-100 border-2 border-slate-700 px-12 py-3 relative z-10 shadow-sm">
                 <h2 className="text-4xl font-handwriting text-slate-800 tracking-wide font-bold">{word.word}</h2>
               </div>
             </div>
          </div>

          {/* Minuscula / Mayuscula */}
          <div className="flex flex-col gap-6 font-handwriting text-3xl text-slate-700">
            <div className="flex items-end gap-4 min-h-[3rem]">
              <label className="whitespace-nowrap font-bold">Palabra en<br/><span className="text-2xl">minúscula</span></label>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none translate-y-2 focus:bg-sky-50 focus:ring-2 focus:ring-sky-200 rounded px-4"
                value={answers.minuscula}
                onChange={e => handleChange('minuscula', e.target.value)}
              />
            </div>
            <div className="flex items-end gap-4 min-h-[3rem]">
              <label className="whitespace-nowrap font-bold">Palabra en<br/><span className="text-2xl">mayúscula</span></label>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none uppercase translate-y-2 focus:bg-sky-50 focus:ring-2 focus:ring-sky-200 rounded px-4"
                value={answers.mayuscula}
                onChange={e => handleChange('mayuscula', e.target.value)}
              />
            </div>
          </div>

          {/* Letras, Vocales, Consonantes */}
          <div className="grid grid-cols-3 gap-8 mt-4 font-handwriting text-2xl text-slate-700 text-center">
            <div className="flex flex-col items-center gap-2">
              <label>Nº de letras</label>
              <input 
                type="number" 
                className="w-24 h-12 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center focus:border-sky-400"
                value={answers.letras}
                onChange={e => handleChange('letras', e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label>Vocales</label>
              <input 
                type="text" 
                className="w-full max-w-[200px] h-12 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center focus:border-sky-400 tracking-widest"
                value={answers.vocales}
                onChange={e => handleChange('vocales', e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label>Consonantes</label>
              <input 
                type="text" 
                className="w-full max-w-[200px] h-12 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center focus:border-sky-400 tracking-widest"
                value={answers.consonantes}
                onChange={e => handleChange('consonantes', e.target.value)}
              />
            </div>
          </div>

          {/* Sibilas */}
          <div className="grid grid-cols-[auto_1fr] gap-8 mt-6 font-handwriting text-2xl text-slate-700 items-start">
             <div className="flex flex-col gap-2 min-w-[200px]">
               <label>Nº de sílabas</label>
               <div className="flex gap-2 items-center">
                 {/* Clapping hands visual */}
                 <div className="flex gap-1 text-3xl opacity-80">
                   {Array.from({ length: parseInt(answers.silabasCount) || 1 }).slice(0,6).map((_,i) => <span key={i}>👏</span>)}
                 </div>
                 <input 
                    type="number" 
                    className="w-16 h-12 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center focus:border-sky-400 ml-auto"
                    value={answers.silabasCount}
                    onChange={e => handleChange('silabasCount', e.target.value)}
                  />
               </div>
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-center">Sílabas</label>
               <div className="flex justify-center">
                 <SilaBoxes count={answers.silabasCount} name="silabasBox" onChange={() => {}} />
               </div>
             </div>
          </div>

          {/* Empieza por / Acaba en */}
          <div className="grid grid-cols-2 gap-8 mt-6 font-handwriting text-3xl text-slate-700">
             <div className="flex items-center gap-4">
              <label className="whitespace-nowrap">Empieza por:</label>
              <input 
                type="text" 
                className="w-20 h-16 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center text-4xl focus:border-sky-400"
                value={answers.empieza}
                maxLength={1}
                onChange={e => handleChange('empieza', e.target.value)}
              />
            </div>
             <div className="flex items-center justify-end gap-4">
              <label className="whitespace-nowrap">Acaba en:</label>
              <input 
                type="text" 
                className="w-20 h-16 bg-transparent border-2 border-slate-400 rounded-xl outline-none text-center text-4xl focus:border-sky-400"
                value={answers.acaba}
                maxLength={1}
                onChange={e => handleChange('acaba', e.target.value)}
              />
            </div>
          </div>

          {/* Rima / Empieza igual */}
          <div className="flex flex-col gap-8 mt-6 font-handwriting text-3xl text-slate-700">
            <div className="flex items-end gap-2 w-full">
              <label className="whitespace-nowrap">Una palabra con la que rima</label>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none translate-y-2 focus:bg-sky-50 focus:ring-2 focus:ring-sky-200 rounded px-2"
                value={answers.rima}
                onChange={e => handleChange('rima', e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2 w-full">
              <label className="whitespace-nowrap">Una palabra que empieza igual</label>
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none translate-y-2 focus:bg-sky-50 focus:ring-2 focus:ring-sky-200 rounded px-2"
                value={answers.empiezaIgual}
                onChange={e => handleChange('empiezaIgual', e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-12 mt-10 font-handwriting text-3xl text-slate-700">
             {['Nombre', 'Adjetivo', 'Verbo'].map(cat => (
               <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all",
                    answers.categoria === cat ? "border-slate-800 bg-slate-800" : "border-slate-400 group-hover:border-slate-500"
                  )}>
                    {answers.categoria === cat && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                  <span className={answers.categoria === cat ? "font-bold" : ""}>{cat}</span>
                  {/* hidden radio to make it accessible if needed, but onClick is fine */}
                  <input type="radio" className="hidden" checked={answers.categoria === cat} onChange={() => handleChange('categoria', cat)} />
               </label>
             ))}
          </div>

          {/* Frase */}
          <div className="flex flex-col gap-4 mt-8 font-handwriting text-3xl text-slate-700">
            <label>Una frase con la palabra protagonista</label>
            <div className="relative min-h-[6rem] -mx-4 px-4 md:mx-0 md:px-0">
               <textarea 
                  className="w-full bg-transparent border-none outline-none resize-none leading-[3rem] focus:bg-sky-50 focus:ring-2 focus:ring-sky-200 rounded px-2 absolute inset-0 z-10"
                  value={answers.frase}
                  onChange={e => handleChange('frase', e.target.value)}
               />
               <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(#475569 2px, transparent 2px)', backgroundSize: '100% 3rem', backgroundPosition: '0 2.8rem' }}></div>
            </div>
          </div>

          <div className="flex justify-center mt-12 mb-4">
             <Button size="xl" className="font-sans font-bold" onClick={checkCompletion}>
              ¡Terminé mi ficha! ✔️
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
