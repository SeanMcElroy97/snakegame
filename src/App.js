
import './App.css';
import Board from './components/Board'
import Counter from './components/Counter';
import Header from './components/Header'
import GameOver from './components/GameOver'
import React, {useState} from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore]= useState(0)
  const [gameOver, endGame]= useState(false)

  if (score>highScore){
    setHighScore(score)
  }
  return (
    <>
    <Header/>
    <h3 className="highScoretext">High score</h3>
    <Counter score={highScore}/>
    <h3 className="highScoretext">Current score</h3>
    <Counter score={score}/>
    {gameOver?<GameOver endGame={endGame}/>:<Board score={score} setScore={setScore} endGame={endGame}/>}
    </>
  )
}

export default App;
