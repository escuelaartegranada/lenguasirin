export type Category = 'nombres' | 'adjetivos' | 'verbos' | 'sinonimos' | 'silabas' | 'ficha';

export interface Word {
  word: string;
  category: 'nombre' | 'adjetivo' | 'verbo';
  syllables: string[];
  vowels: string[];
  consonants: string[];
  startsWith: string;
  endsWith: string;
  rhymesWith: string[];
  startsLike: string[];
  synonyms: string[];
  antonyms: string[];
  exampleSentence: string;
  isIndividual?: boolean;
  collective?: string;
  isAnimal?: boolean;
  isPerson?: boolean;
  isThing?: boolean;
  isPlace?: boolean;
  definition?: string;
}

export interface Exercise {
  id: string;
  worldId: number;
  type: 'multiple-choice' | 'true-false' | 'match' | 'fill-blank' | 'sort-syllables';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audioText?: string;
  image?: string; // Optional image prompt or emoji
}

export interface UserProgress {
  stars: number;
  completedExercises: Record<string, number>;
  medals: string[];
  history: {
    date: string;
    correct: number;
    incorrect: number;
    worldId: number;
  }[];
}
