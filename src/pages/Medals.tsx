import React from 'react';
import { Card } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const ALL_MEDALS = [
  { id: 'Detective de Palabras', req: 10,  color: 'bg-amber-100 text-amber-500 border-amber-300' },
  { id: 'Reina de los Nombres', req: 50,  color: 'bg-pink-100 text-pink-500 border-pink-300' },
  { id: 'Estrella de los Adjetivos', req: 100, color: 'bg-emerald-100 text-emerald-500 border-emerald-300' },
  { id: 'Campeona de los Verbos', req: 200, color: 'bg-rose-100 text-rose-500 border-rose-300' },
  { id: 'Maga de los Sinónimos', req: 300, color: 'bg-purple-100 text-purple-500 border-purple-300' },
  { id: 'Maestra de las Sílabas', req: 400, color: 'bg-cyan-100 text-cyan-500 border-cyan-300' },
  { id: 'Experta en Lengua', req: 500, color: 'bg-yellow-100 text-yellow-600 border-yellow-400' },
];

export const Medals = () => {
  const { progress, getTotalCompleted } = useProgress();
  const total = getTotalCompleted();

  return (
    <div className="py-6">
      <h2 className="text-3xl font-black text-center mb-2 text-slate-800">Mis Medallas</h2>
      <p className="text-center text-slate-500 mb-8 font-medium">Llevas {total} ejercicios completados</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ALL_MEDALS.map((medal, i) => {
          const isUnlocked = progress.medals.includes(medal.id);

          return (
            <motion.div 
              key={medal.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`relative overflow-hidden border-4 flex flex-col items-center justify-center text-center p-6 h-full transition-all ${isUnlocked ? medal.color : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <Trophy className={`w-16 h-16 mb-4 ${isUnlocked ? '' : 'text-slate-300 grayscale'}`} />
                <h3 className={`font-bold text-lg ${isUnlocked ? '' : 'text-slate-400'}`}>
                  {medal.id}
                </h3>
                {!isUnlocked && (
                  <div className="mt-2 text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full">
                    {total} / {medal.req}
                  </div>
                )}
                {isUnlocked && (
                  <motion.div 
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-2"
                  >
                    ⭐
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
