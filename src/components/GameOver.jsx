import React from 'react'

export default function GameOver({endGame}) {
    return (
        <div>
            <h2 className="gameOverText">Game Over</h2>
            <div className="btnContainer">
                <button className="playAgainBTN" onClick={()=>endGame(false)}>Play Again</button>
            </div>
        </div>
    )
}
