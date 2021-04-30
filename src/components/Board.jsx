import React, {useState} from 'react'

export default function Board() {
    const BOARD_SIZE = 10
    const [board, setBoard]= useState(new Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0)))

    for (let row in board){
        console.log(row[0])
    }
    return (
        <div className="boardContainer">
            {board.map((row, index)=>(
                <div key={index} className="row">{
                    row.map((cell, cell_index)=>(
                        <div key={cell_index} className="cell"></div>
                    ))
                }
                </div>
            ))}
        </div>
    )
}
