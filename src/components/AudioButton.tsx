import React from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { Button } from './ui';

export const AudioButton = ({ text, className }: { text: string, className?: string }) => {
  const { speak } = useSpeech();
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`rounded-full p-3 ${className}`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label="Escuchar"
    >
      <Volume2 className="w-6 h-6 text-sky-500" />
    </Button>
  );
};
