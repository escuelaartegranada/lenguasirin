import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Exercise } from '../types';
import { generateExercisesForWorld } from '../utils/exerciseFactory';
import { Button, Card, cn } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';
import { AudioButton } from '../components/AudioButton';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Game = () => {
  const { worldId } = useParams();
  const navigate = useNavigate();
  const { addStars, recordExercise, recordSession } = useProgress();
  const { playSuccess, playError, playFanfare } = useSound();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (worldId) {
      setExercises(generateExercisesForWorld(parseInt(worldId)));
    }
  }, [worldId]);

  useEffect(() => {
    if (feedback !== 'idle' || exercises.length === 0) return;
    
    if (timeLeft === 0) {
      handleAnswer(''); // Auto-incorrect on timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, feedback, exercises]);

  if (exercises.length === 0) return <div>Cargando...</div>;

  const currentExercise = exercises[currentIndex];

  const handleAnswer = (answer: string) => {
    if (feedback !== 'idle') return;

    const isCorrect = answer !== '' && (Array.isArray(currentExercise.correctAnswer) 
      ? currentExercise.correctAnswer.includes(answer)
      : answer === currentExercise.correctAnswer);

    if (isCorrect) {
      setFeedback('correct');
      if (currentIndex === 99) {
        playFanfare();
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.8 } });
      } else {
        playSuccess();
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      }
      
      const starsEarned = attempts === 0 ? 10 : 5;
      addStars(starsEarned);
      recordExercise(parseInt(worldId!), true);
      setSessionStats(s => ({ ...s, correct: s.correct + 1 }));

      setTimeout(() => {
        setFeedback('idle');
        setAttempts(0);
        setTimeLeft(20);
        if (currentIndex < 99) {
          setCurrentIndex(c => c + 1);
        } else {
          // Finish session
          recordSession(parseInt(worldId!), sessionStats.correct + 1, sessionStats.incorrect);
          navigate('/map');
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      playError();
      setAttempts(a => a + 1);
      setSessionStats(s => ({ ...s, incorrect: s.incorrect + 1 }));
      
      setTimeout(() => {
        setFeedback('idle');
        setTimeLeft(20);
      }, 2000);
    }
  };

  return (
    <div className="py-4 flex flex-col h-full items-center justify-center">
      {/* Progress Bar */}
      <div className="w-full flex justify-between items-center mb-4 text-slate-500 font-bold">
         <span>Ejercicio {currentIndex + 1} / 100</span>
         <div className="flex items-center gap-2">
           <span className={cn("text-xl", timeLeft <= 5 ? "text-rose-500" : "text-sky-500")}>⏳ {timeLeft}s</span>
         </div>
      </div>
      <div className="w-full bg-slate-200 h-4 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="bg-sky-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / 100) * 100}%` }}
        />
      </div>

      <Card animate={true} className="w-full max-w-2xl text-center relative border-4 border-sky-100">
        <div className="absolute -top-6 -right-2">
          <AudioButton text={currentExercise.question} className="bg-white shadow-lg border border-slate-100 p-4 w-14 h-14" />
        </div>
        
        <h2 className="text-3xl font-black text-slate-700 mb-10 mt-4 leading-relaxed">
          {currentExercise.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentExercise.options?.map((option, idx) => (
            <Button
              key={idx}
              size="xl"
              variant="3d"
              className={cn(
                "h-auto min-h-24 whitespace-normal text-2xl shadow-sm",
                feedback === 'correct' && (Array.isArray(currentExercise.correctAnswer) ? currentExercise.correctAnswer.includes(option) : option === currentExercise.correctAnswer) && "from-green-300 to-green-500 border-green-600 text-white",
                feedback === 'incorrect' && "opacity-50"
              )}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== 'idle'}
            >
              {option}
            </Button>
          ))}
        </div>

        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-24 h-24 text-green-400 mb-4" />
                <span className="text-3xl font-black text-green-500">¡Muy bien!</span>
                {attempts === 0 && <span className="text-xl font-bold text-amber-500 mt-2">+10 ⭐</span>}
              </div>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center">
                <XCircle className="w-20 h-20 text-rose-400 mb-4" />
                <span className="text-2xl font-bold text-rose-500">Ups... intenta otra vez</span>
                <span className="text-lg font-medium text-slate-500 mt-2">Luna te da otra oportunidad</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
    </div>
  );
};
