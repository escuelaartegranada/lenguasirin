import { Exercise, Word } from '../types';
import { wordsDatabase } from '../data/words';

// Helpers to get random elements
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getMultipleRandom = <T>(arr: T[], num: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

export const generateExercisesForWorld = (worldId: number): Exercise[] => {
  const exercises: Exercise[] = [];
  const TOTAL_EXERCISES = 100;

  for (let i = 0; i < TOTAL_EXERCISES; i++) {
    const word = getRandom(wordsDatabase);
    exercises.push(generateExercise(worldId, word, i));
  }

  return exercises;
};

const generateExercise = (worldId: number, baseWord: Word, index: number): Exercise => {
  switch (worldId) {
    case 1: // World 1: Ficha de la palabra (letras, vocales, rimas, etc.)
      return generateFichaExercise(baseWord, index);
    case 2: // World 2: Nombres
      return generateNombreExercise(baseWord, index);
    case 3: // World 3: Adjetivos
      return generateAdjetivoExercise(baseWord, index);
    case 4: // World 4: Verbos
      return generateVerboExercise(baseWord, index);
    case 5: // World 5: Sinónimos
      return generateSinonimoExercise(baseWord, index);
    case 6: // World 6: Sílabas / Ga, go, gu
      return generateSilabaExercise(baseWord, index);
    default:
      return generateFichaExercise(baseWord, index);
  }
};

const generateFichaExercise = (word: Word, i: number): Exercise => {
  const types = ['vocals', 'consonants', 'count', 'starts', 'ends', 'category', 'rhyme', 'startsLike'];
  const type = types[i % types.length];

  if (type === 'vocals') {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Cuáles son las vocales de la palabra "${word.word}"?`,
      options: shuffle([
        Array.from(new Set(word.vowels)).join(', '),
        Array.from(new Set(word.consonants)).join(', '),
        'a, e, i, o, u',
      ]),
      correctAnswer: Array.from(new Set(word.vowels)).join(', '),
    };
  } else if (type === 'consonants') {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Cuáles son las consonantes de la palabra "${word.word}"?`,
      options: shuffle([
        Array.from(new Set(word.consonants)).join(', '),
        Array.from(new Set(word.vowels)).join(', '),
        'm, p, t, s',
      ]),
      correctAnswer: Array.from(new Set(word.consonants)).join(', '),
    };
  } else if (type === 'count') {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Cuántas letras tiene la palabra "${word.word}"?`,
      options: shuffle([
        word.word.length.toString(),
        (word.word.length + 1).toString(),
        (word.word.length - 1).toString()
      ]),
      correctAnswer: word.word.length.toString(),
    };
  } else if (type === 'starts') {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Por qué letra empieza "${word.word}"?`,
      options: shuffle([word.startsWith, word.endsWith, 'z']),
      correctAnswer: word.startsWith,
    };
  } else if (type === 'ends') {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Por qué letra termina "${word.word}"?`,
      options: shuffle([word.endsWith, word.startsWith, 'x']),
      correctAnswer: word.endsWith,
    };
  } else if (type === 'rhyme') {
    const rhyme = word.rhymesWith && word.rhymesWith.length > 0 ? word.rhymesWith[0] : null;
    if (!rhyme) {
      return {
        id: `w1-${i}`,
        worldId: 1,
        type: 'multiple-choice',
        question: `¿Por qué letra empieza "${word.word}"?`,
        options: shuffle([word.startsWith, word.endsWith, 'z']),
        correctAnswer: word.startsWith,
      };
    }
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `Busca una palabra que rime con "${word.word}"`,
      options: shuffle([rhyme, 'mesa', 'coche']),
      correctAnswer: rhyme,
    };
  } else if (type === 'startsLike') {
    const startsLike = word.startsLike && word.startsLike.length > 0 ? word.startsLike[0] : null;
    if (!startsLike) {
      return {
        id: `w1-${i}`,
        worldId: 1,
        type: 'multiple-choice',
        question: `¿Cuáles son las vocales de la palabra "${word.word}"?`,
        options: shuffle([
          Array.from(new Set(word.vowels)).join(', '),
          Array.from(new Set(word.consonants)).join(', '),
          'a, e, i, o, u',
        ]),
        correctAnswer: Array.from(new Set(word.vowels)).join(', '),
      };
    }
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `Una palabra que empieza por la misma sílaba que "${word.word}" es:`,
      options: shuffle([startsLike, 'pelota', 'árbol']),
      correctAnswer: startsLike,
    };
  } else {
    return {
      id: `w1-${i}`,
      worldId: 1,
      type: 'multiple-choice',
      question: `¿Qué es la palabra "${word.word}"?`,
      options: ['nombre', 'adjetivo', 'verbo'],
      correctAnswer: word.category,
    };
  }
};

const generateNombreExercise = (word: Word, i: number): Exercise => {
  const names = wordsDatabase.filter(w => w.category === 'nombre');
  const notNames = wordsDatabase.filter(w => w.category !== 'nombre');
  const target = getRandom(names);
  const others = getMultipleRandom(notNames, 2);

  const type = i % 2;
  if (type === 0) {
    return {
      id: `w2-${i}`,
      worldId: 2,
      type: 'multiple-choice',
      question: `¿Cuál de estas palabras es un nombre?`,
      options: shuffle([target.word, others[0].word, others[1].word]),
      correctAnswer: target.word,
    };
  } else {
    const isName = i % 3 === 0;
    const testWord = isName ? getRandom(names) : getRandom(notNames);
    return {
      id: `w2-${i}`,
      worldId: 2,
      type: 'true-false',
      question: `¿La palabra "${testWord.word}" es un nombre?`,
      options: ['Sí', 'No'],
      correctAnswer: testWord.category === 'nombre' ? 'Sí' : 'No',
    };
  }
};

const generateAdjetivoExercise = (word: Word, i: number): Exercise => {
  const adjs = wordsDatabase.filter(w => w.category === 'adjetivo');
  const notAdjs = wordsDatabase.filter(w => w.category !== 'adjetivo');
  const target = getRandom(adjs);
  const others = getMultipleRandom(notAdjs, 2);

  return {
    id: `w3-${i}`,
    worldId: 3,
    type: 'multiple-choice',
    question: `¿Cuál de estas palabras es un adjetivo (dice cómo es algo)?`,
    options: shuffle([target.word, others[0].word, others[1].word]),
    correctAnswer: target.word,
  };
};

const generateVerboExercise = (word: Word, i: number): Exercise => {
  const verbs = wordsDatabase.filter(w => w.category === 'verbo');
  const notVerbs = wordsDatabase.filter(w => w.category !== 'verbo');
  const target = getRandom(verbs);
  const others = getMultipleRandom(notVerbs, 2);

  return {
    id: `w4-${i}`,
    worldId: 4,
    type: 'multiple-choice',
    question: `¿Cuál de estas palabras es un verbo (una acción)?`,
    options: shuffle([target.word, others[0].word, others[1].word]),
    correctAnswer: target.word,
  };
};

const generateSinonimoExercise = (word: Word, i: number): Exercise => {
  // Find a word with synonyms
  const wordsWithSynonyms = wordsDatabase.filter(w => w.synonyms && w.synonyms.length > 0);
  const wordsWithAntonyms = wordsDatabase.filter(w => w.antonyms && w.antonyms.length > 0);
  
  if (i % 2 === 0 && wordsWithSynonyms.length > 0) {
    const target = getRandom(wordsWithSynonyms);
    const syn = getRandom(target.synonyms);
    return {
      id: `w5-${i}`,
      worldId: 5,
      type: 'multiple-choice',
      question: `¿Cuál es el sinónimo de "${target.word}"? (significa lo mismo)`,
      options: shuffle([syn, 'gato', 'mesa']),
      correctAnswer: syn,
    };
  } else if (wordsWithAntonyms.length > 0) {
    const target = getRandom(wordsWithAntonyms);
    const ant = getRandom(target.antonyms);
    return {
      id: `w5-${i}`,
      worldId: 5,
      type: 'multiple-choice',
      question: `¿Cuál es el contrario de "${target.word}"?`,
      options: shuffle([ant, 'nube', 'zapato']),
      correctAnswer: ant,
    };
  } else {
    // Fallback
    return {
      id: `w5-${i}`,
      worldId: 5,
      type: 'true-false',
      question: `¿"feliz" y "contento" son sinónimos?`,
      options: ['Sí', 'No'],
      correctAnswer: 'Sí',
    }
  }
};

const generateSilabaExercise = (word: Word, i: number): Exercise => {
  const isDivide = i % 2 === 0;

  if (isDivide) {
    const correct = word.syllables.join('-');
    const badDivision = word.word.split('').join('-');
    let almostGood = `a-${correct}`;
    if (word.syllables.length > 1) {
      const wrong = [...word.syllables];
      wrong[0] = wrong[0] + wrong[1].charAt(0);
      wrong[1] = wrong[1].substring(1);
      almostGood = Array.from(new Set([wrong.filter(s => s.length > 0).join('-'), `la-${correct}`]))[0];
      if (almostGood === correct) almostGood = `la-${correct}`;
    }

    return {
      id: `w6-${i}`,
      worldId: 6,
      type: 'multiple-choice',
      question: `¿Cómo se separan las sílabas de "${word.word}"?`,
      options: shuffle([correct, badDivision, almostGood]),
      correctAnswer: correct,
    };
  }

  // Return syllable count
  return {
    id: `w6-${i}`,
    worldId: 6,
    type: 'multiple-choice',
    question: `¿Cuántas sílabas tiene "${word.word}"?`,
    options: shuffle([
      word.syllables.length.toString(),
      (word.syllables.length + 1).toString(),
      (word.syllables.length === 1 ? 3 : word.syllables.length - 1).toString()
    ]),
    correctAnswer: word.syllables.length.toString(),
  };
};

export const generateFinalReview = (): Exercise[] => {
  const result: Exercise[] = [];
  result.push(...getMultipleRandom(generateExercisesForWorld(1), 6));
  result.push(...getMultipleRandom(generateExercisesForWorld(2), 5));
  result.push(...getMultipleRandom(generateExercisesForWorld(3), 5));
  result.push(...getMultipleRandom(generateExercisesForWorld(4), 5));
  result.push(...getMultipleRandom(generateExercisesForWorld(5), 5));
  result.push(...getMultipleRandom(generateExercisesForWorld(6), 4));
  return shuffle(result);
};
