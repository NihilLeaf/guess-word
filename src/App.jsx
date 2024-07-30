import { useCallback, useEffect, useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen/StartScreen';
import { wordsList } from './data/words';
import MainGame from './components/MainGame/MainGame';
import GameOver from './components/GameOver/GameOver';

const stages = [
  {
    id: 1,
    name: 'start',
  },
  {
    id: 2,
    name: 'onGame',
  },
  {
    id: 3,
    name: 'gameOver',
  },
];

function App() {
  let guessQty = 5;
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessQty);
  const [score, setScore] = useState(0);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    )
      return;

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actual) => [...actual, normalizedLetter]);
    } else {
      setWrongLetters((actual) => [...actual, normalizedLetter]);

      setGuesses((guesses) => guesses - 1);
    }
  };

  const retryGame = () => {
    resetStates();
    setGameStage(stages[0].name);
  };

  const resetStates = () => {
    setPickedWord('');
    setPickedCategory('');
    setLetters([]);
    setGuesses(guessQty);
    setScore(0);
  };

  const resetLettersState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  const getRandomCategory = (categories) => {
    return categories[
      Math.floor(Math.random() * Object.keys(categories).length)
    ];
  };

  const getRandomWord = useCallback((category) => {
    return words[category][Math.floor(Math.random() * words[category].length)];
  }, [words]);

  const pickWordAndCategory = useCallback(() => {
    const category = getRandomCategory(Object.keys(words));
    setPickedCategory(category);

    const word = getRandomWord(category);
    setPickedWord(word);

    const lettersSplitted = word
      .replace(/\s+/g, '')
      .split('')
      .map((l) => l.toLowerCase());
    setLetters(lettersSplitted);
  }, [words, getRandomWord]);

  const startGame = useCallback(() => {
    resetLettersState();
    pickWordAndCategory();
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  useEffect(() => {
    if (!guesses) {
      resetLettersState();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    if (!letters.length) return;

    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length === guessedLetters.length) {
      setScore((score) => score + 100);
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <>
      <div className='App'>
        {gameStage == 'start' && <StartScreen startGame={startGame} />}
        {gameStage == 'onGame' && (
          <MainGame
            verifyLetter={verifyLetter}
            pickedCategory={pickedCategory}
            pickedWord={pickedWord}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage == 'gameOver' && (
          <GameOver
            retryGame={retryGame}
            score={score}
          />
        )}
      </div>
    </>
  );
}

export default App;
