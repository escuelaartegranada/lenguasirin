import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button, Card } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';
import { Star, GraduationCap, Map, BookOpen, Trophy, Settings, Play } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { playPop } = useSound();

  const handleNav = (path: string) => {
    playPop();
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-8">
      
      {/* Title Area */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-block py-1 px-4 rounded-full bg-amber-100 text-amber-600 font-bold text-sm mb-4 border-2 border-amber-200 shadow-sm">
          Para Luna 🌙
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 leading-tight font-handwriting drop-shadow-sm text-sky-600">
          Luna y la Isla <br/> de las Palabras
        </h1>
        <p className="text-xl text-slate-500 font-medium">Prepárate para tu examen jugando 🎈</p>
      </motion.div>

      {/* Progress Summary */}
      <Card hoverEffect={true} animate={true} className="w-full mb-8 flex flex-row items-center justify-between p-4 px-8 border-4 border-amber-100 bg-amber-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-3 rounded-full border-2 border-amber-200 shadow-sm">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <p className="text-sm text-amber-700 font-bold uppercase">Estrellas</p>
            <p className="text-3xl font-black text-amber-600">{progress.stars}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-purple-700 font-bold uppercase text-right">Medallas</p>
            <p className="text-3xl font-black text-purple-600 text-right">{progress.medals.length}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full border-2 border-purple-200 shadow-sm">
            <Trophy className="w-8 h-8 text-purple-400 fill-purple-400" />
          </div>
        </div>
      </Card>

      {/* Main Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Button size="xl" className="h-32 text-2xl flex-col gap-2" variant="primary" onClick={() => handleNav('/lessons')}>
          <GraduationCap className="w-10 h-10" />
          Lecciones
        </Button>
        <Button size="xl" className="h-32 text-2xl flex-col gap-2" variant="success" onClick={() => handleNav('/map')}>
          <Map className="w-10 h-10" />
          Mundos
        </Button>
        <Button size="xl" className="h-32 text-2xl flex-col gap-2" variant="danger" onClick={() => handleNav('/daily')}>
          <BookOpen className="w-10 h-10" />
          Palabra del día
        </Button>
        <Button size="xl" className="h-32 text-2xl flex-col gap-2" variant="3d" onClick={() => handleNav('/review')}>
          <Play className="w-10 h-10" />
          Repaso Final
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <Button size="lg" className="h-24 flex-col gap-1" variant="secondary" onClick={() => handleNav('/medals')}>
          <Trophy className="w-8 h-8" />
          Mis Medallas
        </Button>
        <Button size="lg" className="h-24 bg-slate-200 text-slate-600 border-b-[6px] border-slate-300 hover:bg-slate-300 hover:text-slate-700 active:border-b-0 active:translate-y-1.5 shadow-none flex-col gap-1 rounded-2xl" variant="ghost" onClick={() => handleNav('/adults')}>
          <Settings className="w-8 h-8" />
          Zona Adulto
        </Button>
      </div>

    </div>
  );
};
