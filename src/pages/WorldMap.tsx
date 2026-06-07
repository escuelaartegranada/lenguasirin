import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui';
import { useSound } from '../hooks/useSound';

const WORLDS = [
  { id: 1, name: 'Palabra del Día', emoji: '📝', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  { id: 2, name: 'La Cueva de los Nombres', emoji: '🐻', color: 'bg-amber-100 border-amber-300 text-amber-800' },
  { id: 3, name: 'El Bosque de los Adjetivos', emoji: '🌳', color: 'bg-lime-100 border-lime-300 text-lime-800' },
  { id: 4, name: 'La Carrera de los Verbos', emoji: '🏃‍♀️', color: 'bg-rose-100 border-rose-300 text-rose-800' },
  { id: 5, name: 'El Puente de los Sinónimos', emoji: '🌉', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { id: 6, name: 'La Playa de las Sílabas', emoji: '🏖️', color: 'bg-cyan-100 border-cyan-300 text-cyan-800' },
];

export const WorldMap = () => {
  const navigate = useNavigate();
  const { playPop } = useSound();

  return (
    <div className="py-4">
      <h2 className="text-3xl font-black text-center mb-2 text-slate-800">Elige una aventura</h2>
      <p className="text-center text-slate-500 mb-8 font-medium">Cada mundo tiene 100 ejercicios diferentes</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORLDS.map((world) => (
          <Card 
            key={world.id} 
            hoverEffect={true}
            className={`cursor-pointer border-4 ${world.color}`}
          >
            <div 
              className="flex flex-col items-center justify-center p-6 text-center h-full"
              onClick={() => {
                playPop();
                navigate(world.id === 1 ? '/daily' : `/game/${world.id}`);
              }}
            >
              <span className="text-6xl mb-4">{world.emoji}</span>
              <h3 className="text-2xl font-black mb-2">{world.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
