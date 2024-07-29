import { useRef, useState } from 'react';
import './MainGame.css';

const MainGame = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  let [letterGuess, setLetterGuess] = useState('');

  const letterInputRef = useRef(null)

  const handleSubmit = (e) => { 
    e.preventDefault();
    
    if(letterGuess) verifyLetter(letterGuess)

    setLetterGuess("")

    letterInputRef.current.focus()
  };

  return (
    <>
      <div className='categoryTitle'>
        <h2>
          Category Selected:{' '}
          <span className='categorySelected'>{pickedCategory}</span>
        </h2>
        <div className='pointAndGuesses'>
          <p>Points: {score}</p>
          <p>Guesses: {guesses}</p>
        </div>
      </div>

      <div className='wordsContainer'>
        {letters.map((letter, i) => (
          
          <div
            className='blockForLetter'
            key={i}
            type='text'>
            <span>{guessedLetters.includes(letter) ? letter : ""}</span>
          </div>
        ))}
      </div>

      <div className='guessContainer'>
        <form>
          <input
            type='text'
            name='letter'
            maxLength={1}
            required
            onChange={(e) => setLetterGuess(e.target.value)}
            ref={letterInputRef}
            value={letterGuess}
          />
          
        </form>
        <button onClick={handleSubmit}>Guess</button>

      </div>

      <div className='wrongLetters'>
        <p>Letters already used: </p>

        {wrongLetters.map((l, i) => (
          <span key={i}>{l}, </span>
        ))}
      </div>

      <button
        style={{ marginTop: '50px' }}
        onClick={verifyLetter}>
        End game
      </button>
    </>
  );
};

export default MainGame;
