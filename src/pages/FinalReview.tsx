import React, { useState, useEffect } from 'react';
import { generateFinalReview } from '../utils/exerciseFactory';
import { Exercise } from '../types';
import { Button, Card, cn } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

export const FinalReview = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const { addStars } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    setExercises(generateFinalReview().slice(0, 30));
  }, []);

  if (exercises.length === 0) return <div>Cargando...</div>;

  const handleAnswer = (answer: string) => {
    const isCorrect = Array.isArray(exercises[currentIndex].correctAnswer) 
      ? exercises[currentIndex].correctAnswer.includes(answer)
      : answer === exercises[currentIndex].correctAnswer;

    if (isCorrect) setCorrectCount(c => c + 1);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      finishReview(correctCount + (isCorrect ? 1 : 0));
    }
  };

  const finishReview = (finalCorrect: number) => {
    setDone(true);
    addStars(finalCorrect * 5); // 5 stars per correct
    if (finalCorrect > 20) {
      confetti({ particleCount: 200, spread: 150, origin: { y: 0.6 } });
    }
  };

  if (done) {
    const percentage = correctCount / exercises.length;
    let message = "¡Sigue practicando, tú puedes!";
    if (percentage > 0.9) message = "¡Ya casi eres experta en Lengua!";
    else if (percentage > 0.7) message = "¡Se te da genial!";
    else if (percentage > 0.5) message = "¡Vas por buen camino!";

    return (
      <div className="py-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-black text-amber-500 mb-6">Repaso Terminado</h2>
        <Card className="w-full max-w-sm mb-8 border-4 border-amber-200">
          <div className="text-6xl font-black text-slate-800 mb-4">{correctCount}<span className="text-3xl text-slate-400">/30</span></div>
          <p className="text-xl font-medium text-slate-600 mb-4">{message}</p>
          <div className="bg-amber-100 text-amber-700 py-2 rounded-xl font-bold">
            Has ganado {correctCount * 5} ⭐
          </div>
        </Card>
        <Button onClick={() => navigate('/')} size="xl">
          Volver al Inicio
        </Button>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <div className="py-6 flex flex-col items-center h-full">
      <div className="w-full mb-4 flex justify-between font-bold text-slate-400">
        <span>Repaso Final</span>
        <span>{currentIndex + 1} / {exercises.length}</span>
      </div>
      
      <div className="w-full bg-slate-200 h-4 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-amber-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex) / exercises.length) * 100}%` }}
        />
      </div>

      <Card className="w-full text-center border-4 border-amber-200 mb-8 py-10">
        <h2 className="text-3xl font-black text-slate-700 mb-10 leading-relaxed">
          {currentExercise.question}
        </h2>
        
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {currentExercise.options?.map((option, idx) => (
             <Button
             key={idx}
             size="lg"
             variant="ghost"
             className="border-2 border-slate-200 bg-white hover:border-amber-300 py-4 text-xl"
             onClick={() => handleAnswer(option)}
           >
             {option}
           </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};
