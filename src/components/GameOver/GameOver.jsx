import "./GameOver.css"
const GameOver = ({retryGame, score}) => {
  return (
    <>
      <h2>Game Over!!</h2>
      <p>Points: <span>{score}</span></p>
      <button onClick={retryGame}>Retry game</button>
    </>
    
  )
}

export default GameOver