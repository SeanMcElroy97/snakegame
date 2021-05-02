
import './App.css';
import Board from './components/Board'
import Counter from './components/Counter';
import Header from './components/Header'
import React, {useState} from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [gameOver, endGame]= useState(false)
  return (
    <>
    <Header/>
    <Counter score={score}/>
    {gameOver?<button onClick={()=> endGame(false)}>Play Again</button>:<Board score={score} setScore={setScore} endGame={endGame}/>}
    </>
  )
}

export default App;
