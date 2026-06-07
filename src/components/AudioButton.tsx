import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { Button, cn } from './ui';

export const AudioButton = ({ text, className }: { text: string, className?: string }) => {
  const { speak } = useSpeech();
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("rounded-full p-0 flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-500 shadow-[0_4px_0_theme(colors.sky.600)] border-2 border-sky-400 text-white hover:from-sky-400 hover:to-sky-600 active:shadow-none active:translate-y-1", className)}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label="Escuchar"
    >
      <Volume2 className="w-6 h-6" />
    </Button>
  );
};
