import React, {useState, useEffect, useRef} from 'react'
import LinkedList from '../LinkedList'

export default function Board({score, setScore}) {
    const [board, setBoard]= useState(makeBoard(10))
    const [snakeCells, setSnakeCells]= useState(new Set(['33']));
    const [snake, setSnake] = useState(new LinkedList(3,3));
    const [foodCell, setFoodCell] = useState("36")
    const [currentDirection , setCurrentDirection]=useState("ArrowRight")
    
    let gameOver=false;
    let speed = 1000;


    useEffect(() => {
        window.addEventListener('keydown', e => {
            // ArrowUp
            // ArrowDown
            // ArrowLeft
            // ArrowRight
            console.log(e.key)
            if (e.key=="ArrowUp" || e.key=="ArrowDown" || e.key=="ArrowLeft" || e.key=="ArrowRight"){
                setCurrentDirection(e.key)
            }
        });
        }, []);

    useInterval(() => {
        slither();
      }, 1000);


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
        
        if (currentSnakeHead.lecolumn>9 || currentSnakeHead.lerow>9 || currentSnakeHead.lecolumn<0 || currentSnakeHead.lerow<0){
            alert('gameover')
        }

        console.log("current_dir" + currentDirection)
        setSnakeCells(new Set([currentSnakeHead.lerow+""+currentSnakeHead.lecolumn]))

        console.log(snakeCells)
        if(currentSnakeHead.lerow+""+currentSnakeHead.lecolumn == foodCell){
            eatFood()
        }
    }

    function eatFood(){
        // Grow snake
        console.log("Eat food")
        setScore(score+1)
        generateFood()
    }



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

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
