import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button } from '../components/ui';
import { AudioButton } from '../components/AudioButton';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const LESSONS = [
  {
    id: 1,
    title: 'La palabra del día',
    text: 'Podemos mirar una palabra por partes: letras, vocales, consonantes, sílabas, principio, final y frases.',
    example: 'Por ejemplo: "Sol" tiene 3 letras, empieza por S y acaba en L.'
  },
  {
    id: 2,
    title: 'Los nombres',
    text: 'Los nombres sirven para nombrar personas, animales, cosas y lugares.',
    example: 'Por ejemplo: Luna, perro, mesa, montaña.'
  },
  {
    id: 3,
    title: 'Los adjetivos',
    text: 'Los adjetivos dicen CÓMO es algo o alguien.',
    example: 'Por ejemplo: El pez ROJO. La niña FELIZ.'
  },
  {
    id: 4,
    title: 'Los verbos',
    text: 'Los verbos son acciones, las cosas que hacemos.',
    example: 'Por ejemplo: correr, saltar, leer.'
  },
  {
    id: 5,
    title: 'Los sinónimos',
    text: 'Algunas palabras diferentes significan lo mismo.',
    example: 'Feliz es igual a contento. Coche es igual a auto.'
  },
  {
    id: 6,
    title: 'Las sílabas',
    text: 'Las palabras se pueden partir en golpes de voz.',
    example: 'Pe-lo-ta (3 golpes). Sol (1 golpe).'
  }
];

export const Lessons = () => {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const { addStars } = useProgress();

  const handleFinish = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    addStars(5);
    setActiveLesson(null);
  };

  return (
    <div className="py-4">
      <h2 className="text-3xl font-black text-center mb-8 text-slate-800">Lecciones Mágicas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LESSONS.map((lesson, i) => (
          <Card key={lesson.id} className="cursor-pointer hover:border-sky-300 transition-colors" >
            <div className="flex justify-between items-center" onClick={() => setActiveLesson(lesson.id)}>
              <h3 className="text-xl font-bold text-sky-600">Lección {i + 1}</h3>
              <div className="bg-sky-100 rounded-full w-10 h-10 flex items-center justify-center text-sky-500 font-bold">
                {i + 1}
              </div>
            </div>
            <p className="text-lg font-bold mt-2 text-slate-700">{lesson.title}</p>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {activeLesson !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-sky-200 text-center relative"
            >
              <div className="absolute top-4 right-4">
                <AudioButton text={`${LESSONS.find(l => l.id === activeLesson)?.text} ${LESSONS.find(l => l.id === activeLesson)?.example}`} />
              </div>
              <h3 className="text-3xl font-black text-sky-600 mb-6">{LESSONS.find(l => l.id === activeLesson)?.title}</h3>
              <p className="text-2xl text-slate-700 mb-6 font-medium leading-relaxed">
                {LESSONS.find(l => l.id === activeLesson)?.text}
              </p>
              <div className="bg-sky-50 p-6 rounded-2xl mb-8">
                <p className="text-xl text-sky-800 font-bold">
                  {LESSONS.find(l => l.id === activeLesson)?.example}
                </p>
              </div>
              
              <Button size="xl" className="w-full" onClick={handleFinish}>
                ¡Lo he entendido! ⭐
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
