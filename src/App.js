
import './App.css';
import Board from './components/Board'
import Counter from './components/Counter';
import Header from './components/Header'
import React, {useState} from 'react'

function App() {
  const [score, setScore] = useState(0)
  return (
    <>
    <Header/>
    <Counter score={score}/>
    <Board score={score} setScore={setScore}/>
    </>
  )
}

export default App;
