import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  stars: 0,
  completedExercises: {},
  medals: [],
  history: [],
};

const MEDAL_MILESTONES = {
  10: 'Detective de Palabras',
  50: 'Reina de los Nombres',
  100: 'Estrella de los Adjetivos',
  200: 'Campeona de los Verbos',
  300: 'Maga de los Sinónimos',
  400: 'Maestra de las Sílabas',
  500: 'Experta en Lengua',
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('luna-progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('luna-progress', JSON.stringify(progress));
  }, [progress]);

  const addStars = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));
  };

  const recordExercise = (worldId: number, isCorrect: boolean) => {
    setProgress(prev => {
      const worldKey = `world_${worldId}`;
      const newCompleted = { ...prev.completedExercises };
      
      if (isCorrect) {
        newCompleted[worldKey] = (newCompleted[worldKey] || 0) + 1;
      }
      
      const totalCompleted = Object.values(newCompleted).reduce((a, b) => a + b, 0);
      let newMedals = [...prev.medals];
      
      Object.entries(MEDAL_MILESTONES).forEach(([milestone, medalName]) => {
        if (totalCompleted >= parseInt(milestone) && !newMedals.includes(medalName)) {
          newMedals.push(medalName);
        }
      });

      return {
        ...prev,
        completedExercises: newCompleted,
        medals: newMedals
      };
    });
  };

  const recordSession = (worldId: number, correct: number, incorrect: number) => {
    setProgress(prev => ({
      ...prev,
      history: [
        ...prev.history,
        { date: new Date().toISOString(), correct, incorrect, worldId }
      ]
    }));
  };

  const resetProgress = () => {
    if (window.confirm('¿Seguro que quieres borrar todo tu progreso?')) {
      setProgress(defaultProgress);
    }
  };

  const getTotalCompleted = () => {
    return Object.values(progress.completedExercises).reduce((max, current) => max + current, 0);
  };

  return {
    progress,
    addStars,
    recordExercise,
    recordSession,
    resetProgress,
    getTotalCompleted
  };
};
