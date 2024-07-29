import "./StartScreen.module.css"
const StartScreen = ({startGame}) => {
  return (
    <>
      <h1>Guess the world</h1>
      <div className="startScreen">
        
        <h4>Click on the button and guess the word!</h4>
        <button onClick={startGame}>Start Game</button>
      </div>
    </>
  )
}

export default StartScreen