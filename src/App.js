
import './App.css';
import Board from './components/Board'
import Counter from './components/Counter';
import Header from './components/Header'
import GameOver from './components/GameOver'
import React, {useState, useEffect} from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore]= useState(0)
  const [gameOver, endGame]= useState(false)

  useEffect(()=>{
    const storedHighScore=localStorage.getItem('highScore')
    if(storedHighScore != null) setHighScore(storedHighScore)
  }, [])

  if (score>highScore){
    setHighScore(score)
    localStorage.setItem('highScore', score)
    // Set local stoprage
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
