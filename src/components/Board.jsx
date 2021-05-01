import React, {useState, useEffect} from 'react'
import LinkedList from '../LinkedList'

export default function Board() {
    const [board, setBoard]= useState(makeBoard(10))
    const [snakeCells, setSnakeCells]= useState(new Set(['33']));
    const [snake, setSnake] = useState(new LinkedList(3,3));
    const [foodCell, setFoodCell] = useState("36")
    let gameOver=false;
    let speed = 1000;

    useEffect(()=>{
        setInterval(()=>{
            slither()
        }, speed)
    }, [])

   

    let currentDirection="ArrowRight";

    const slither = ()=>{
        let currentSnakeHead = snake.head;
        // Get direction
        if (currentDirection=="ArrowRight"){
            currentSnakeHead.lecolumn=currentSnakeHead.lecolumn+1
        }
        if (currentDirection=="ArrowLeft"){
            currentSnakeHead.lecolumn=currentSnakeHead.lecolumn-1
        }
        if (currentDirection=="ArrowDown"){
            currentSnakeHead.lerow=currentSnakeHead.lerow+1
        }
        if (currentDirection=="ArrowUp"){
            currentSnakeHead.lerow=currentSnakeHead.lerow-1
        }
        
        if (currentSnakeHead.lecolumn>9 || currentSnakeHead.lerow>9 || currentSnakeHead.lecolumn<0 || currentSnakeHead.lerow<0 || snakeCells.has(currentSnakeHead.lerow+""+currentSnakeHead.lecolumn)){
            alert('gameover')
        }

        setSnakeCells(new Set([currentSnakeHead.lerow+""+currentSnakeHead.lecolumn]))

        console.log(snakeCells)
        if(currentSnakeHead.lerow+""+currentSnakeHead.lecolumn == foodCell){
            eatFood()
        }
    }

    function eatFood(){
        // Grow snake
        console.log("Eat food")
        generateFood()
    }

    // Handle key press
    useEffect(() => {
        window.addEventListener('keydown', e => {
            // ArrowUp
            // ArrowDown
            // ArrowLeft
            // ArrowRight
            if (e.key=="ArrowUp" || e.key=="ArrowDown" || e.key=="ArrowLeft" || e.key=="ArrowRight"){
                currentDirection=e.key
            }
        });
        }, []);

    function generateFood(){
        let randomrow=Math.floor(Math.random() * 10);
        let randomcol=Math.floor(Math.random() * 10);
        
        if(snakeCells.has(randomrow+""+randomcol)){
            generateFood()
        }
        let foodyCell=randomrow+""+randomcol
        setFoodCell(foodyCell)


    }

    return (
        <div className="boardContainer">
            {board.map((row, index)=>(
                <div key={index} className="row">{
                    row.map((cell, cell_index)=>(
                        <div key={cell_index} className={`cell   ${snakeCells.has(''+index+''+cell_index)? 'snake-cell': foodCell==index+""+cell_index? 'food': ''}`}>{index + '' + cell_index}</div>
                    ))
                }
                </div>
            ))}
        </div>
    )

    
}

const makeBoard = size =>{
    
    const board =[]

    for( let row=0; row<size; row++){
        const currentRow=[];
        for (let cell=0; cell<size; cell++){
            currentRow.push(0)
        }
        board.push(currentRow)
    }
    return board
}
