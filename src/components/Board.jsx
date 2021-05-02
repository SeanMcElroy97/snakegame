import React, {useState, useEffect, useRef} from 'react'
import LinkedList from '../LinkedList'
import LinkedListNode from '../LinkedListNode'

export default function Board({score, setScore, endGame}) {
    const [board, setBoard]= useState(makeBoard(10))
    const [snakeCells, setSnakeCells]= useState(new Set(['33']));
    const [snake, setSnake] = useState(new LinkedList(3,3));
    const [foodCell, setFoodCell] = useState("36")
    const [currentDirection , setCurrentDirection]=useState("ArrowRight")
    const [speed, setSpeed] = useState(1000)
    let gameOver=false;


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
      }, speed);


    function slither(){
        console.log(snake)
        let current = snake.head
        const snakeCs= new Set()
        while (current!=null){
            snakeCs.add(current.lerow+""+current.lecolumn)
            current=current.next
        }

        setSnakeCells(snakeCs)
    }


    function growSnake(row, col){
        console.log("r"+row + "c"+col)
        const nuevoSnakeTail =new LinkedListNode(row, col)
        const currentTail = snake.tail;
        currentTail.next=nuevoSnakeTail;
        snake.tail=nuevoSnakeTail
        // console.log(snake)
        
    }

    function eatFood(){
        // Grow snake
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
            <button onClick={()=>growSnake(3,2)}>Grow snake</button>
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
