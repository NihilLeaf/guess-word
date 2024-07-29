import { useEffect, useState } from 'react';
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
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const startGame = () => {
    pickWordAndCategory();

    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) return

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actual) => [...actual, normalizedLetter])
    } else {
      setWrongLetters((actual) => [...actual, normalizedLetter])
    }

    setGuesses(guesses => guesses - 1)

    if(normalizedLetter == pickedWord.toLowerCase()) {
      setScore(score => score + 100) 
      pickWordAndCategory()
      alert('Ganhou')
    }
  };

  useEffect(() => {
    if(!guesses) {
      resetStates()
      setGameStage(stages[2].name);
    }
  }, [guesses])

  const retryGame = () => {
    setGameStage(stages[0].name);
  };

  const resetStates = () => {
    setPickedWord('');
    setPickedCategory('');
    setLetters([]);
    setGuessedLetters([])
    setWrongLetters([])
    setGuesses(5)
    setScore(0)
  }

  const pickWordAndCategory = () => {
    const category = getRandomCategory(Object.keys(words));
    setPickedCategory(category);

    const word = getRandomWord(category);
    setPickedWord(word);

    const lettersSplitted = word.replace(/\s+/g, '').split('').map(l => l.toLowerCase())
    setLetters(lettersSplitted)
  };

  const getRandomCategory = (categories) => {
    return categories[
      Math.floor(Math.random() * Object.keys(categories).length)
    ];
  };

  const getRandomWord = (category) => {
    return words[category][Math.floor(Math.random() * words[category].length)];
  };

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
        {gameStage == 'gameOver' && <GameOver retryGame={retryGame} />}
      </div>
    </>
  );
}

export default App;
