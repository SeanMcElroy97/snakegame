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
            // console.log(e.key)
            if (e.key=="ArrowUp" || e.key=="ArrowDown" || e.key=="ArrowLeft" || e.key=="ArrowRight"){
                setCurrentDirection(e.key)
            }
        });
        }, []);

    useEffect(() => {
        setSnake(new LinkedList(3,3))
        setScore(0)
    }, []);

    useInterval(() => {
        slither();
      }, speed);


    function slither(){
        
        // Create new head
        let nuHeadrow=snake.head.lerow
        let nuHeadcol=snake.head.lecolumn
        if (currentDirection=="ArrowRight"){
            nuHeadcol=nuHeadcol+1
        }
        if (currentDirection=="ArrowDown"){
            nuHeadrow=nuHeadrow+1
        }
        if (currentDirection=="ArrowLeft"){
            nuHeadcol=nuHeadcol-1
        }
        if (currentDirection=="ArrowUp"){
            nuHeadrow=nuHeadrow-1
        }
        const nuHead=new LinkedListNode(nuHeadrow, nuHeadcol)

        if(nuHead.lerow >9 || nuHead.lerow<0 || nuHead.lecolumn>9 || nuHead.lecolumn<0 || snakeCells.has(nuHead.lerow+""+nuHead.lecolumn)){
            endGame(true)
        }
        // Set new head
        nuHead.next=snake.head
        snake.head=nuHead

        // Delete tail head
        let current=snake.head
        while(current.next!=snake.tail){
            current=current.next
        }
        // Found new tail
        // oldTailRow=cur
        current.next=null
        
        const snkTR=snake.tail.lerow
        const snkTC=snake.tail.lecolumn
        // console.log("Tail r "+snkTR + " Tail c" + snkTC)
        // Set tail
        snake.tail=current

        // Check if eating is happening
        if(snake.head.lerow+""+snake.head.lecolumn==foodCell){
            eatFood()
            growSnake(snkTR, snkTC)
        }

        // Update the ui
        let curr= snake.head
        const scells=new Set()
        while(curr!=null){
            scells.add(curr.lerow+""+curr.lecolumn)
            curr=curr.next
        }
        setSnakeCells(scells)

        // console.log(snake)
    }


    function growSnake(row, col){
        // console.log("r"+row + "c"+col)
        const nuevoSnakeTail =new LinkedListNode(row, col)
        const currentTail = snake.tail;
        currentTail.next=nuevoSnakeTail;
        snake.tail=nuevoSnakeTail
        
    }

    function eatFood(){
        // Grow snake
        setScore(score+1)
        generateFood()
        if(score>=1 && score<4){
            setSpeed(500)
        }
        if(score>=4 && score<9){
            setSpeed(200)
        }
        if(score>=9){
            setSpeed(150)
        }
        // growSnake()
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
            <div className="board">
            {board.map((row, index)=>(
                <div key={index} className="row">{
                    row.map((cell, cell_index)=>(
                        <div key={cell_index} className={`cell   ${snakeCells.has(''+index+''+cell_index)? 'snake-cell': foodCell==index+""+cell_index? 'food': ''}`}></div>
                    ))
                }
                </div>
            ))}
            </div>
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
