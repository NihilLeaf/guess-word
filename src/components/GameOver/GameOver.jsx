
const GameOver = ({retryGame}) => {
  return (
    <>
      <h2>Game Over!!</h2>
      <button onClick={retryGame}>Retry game</button>
    </>
    
  )
}

export default GameOver