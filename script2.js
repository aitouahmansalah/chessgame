const width = 8;
const gameboard = document.querySelector(".gameboard");
const playerdisplay = document.querySelector("#player");
const info = document.querySelector("#info-display");
let player = 'white'; 
playerdisplay.textContent=player;
const pieces = [
    rook , knight , bishop , queen , king , bishop , knight , rook ,
    pawn , pawn , pawn , pawn , pawn , pawn ,pawn ,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn , pawn , pawn , pawn , pawn , pawn ,pawn ,pawn,
    rook , knight , bishop , queen , king , bishop , knight , rook 
]

function showbord(){
    pieces.forEach((piece, i )=> {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("square-id",(width * width -1)-i);
        let row = Math.floor((63-i)/8) + 1;
        square.innerHTML = piece;
        square.firstChild?.setAttribute("draggable",true);
        if(row%2 === 0){
            square.classList.add( i % 2 ===0 ?"green":"beige" );
        }else{
            square.classList.add( i % 2 ===0 ?"beige" :"green" );
        }
        gameboard.append(square);
        if(i >= 48){
            square.firstChild.firstChild.classList.add("white");
        }
        if(i <= 15){
            square.firstChild.firstChild.classList.add("black");
        }

    })
}
showbord();

const allsquares = document.querySelectorAll(".square");

let startPosition ;
let dragged ;
allsquares.forEach((square)=>{
square.addEventListener('dragstart',dragStart);
square.addEventListener('dragover',dragOver);
square.addEventListener('drop',dragDrop);
})
function dragStart(e){

   startPosition = e.target.parentNode.getAttribute('square-id');
    dragged = e.target;
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){
    e.stopPropagation();
    const go = dragged.firstChild.classList.contains(player);
    const taken = e.target.classList.contains('peice');
    const valid = checkvalid(e.target);
    const opgo = player === 'white' ? 'black' : 'white';
    const takenop = e.target.firstChild?.classList.contains(opgo);
    if(go){
        if(takenop && valid ){
             e.target.parentNode.append(dragged);
            e.target.remove();
            checkwin()
            changeplayer();
            return
        }
        if(taken && !takenop ){
            info.textContent="ypou connot go there"
            setTimeout(()=>info.textContent="",2000);
            return 
        }
        if(valid){
            e.target.append(dragged);
            checkwin()
            changeplayer();
        }
    }
   

}
function changeplayer(){
    if(player === "black"){
       player= "white";
       reverse();
    }else{
        player = "black";
        reverte();
    }
    playerdisplay.textContent = player;
}
function reverse(){
   const squares = document.querySelectorAll(".square");
    squares.forEach((square,i)=>{
      square.setAttribute('square-id',(width * width -1)-i);  
    })
   
}
function reverte(){
    const squares = document.querySelectorAll(".square");
     squares.forEach((square,i)=>{
       square.setAttribute('square-id',i);  
     })
    
 }
 function checkvalid(target){
    const id = Number(target.getAttribute('square-id')) || Number( target.parentNode.getAttribute('square-id'));
    console.log(id);
    const start = Number(startPosition);
    console.log(start);
    const piece = dragged.id;
    console.log(start + (width * 2) + 1 === id);
    console.log(piece);
    switch (piece) {
        case 'pawn':
            const starter =[8,9,10,11,12,13,14,15];
            if((starter.includes(start) && start + width * 2 === id )
            || (start + width  === id )
            || (start + width - 1 === id &&document.querySelector(`[square-id="${start +width - 1}"]`).firstChild )
            ||( start + width + 1  === id &&document.querySelector(`[square-id="${start +width + 1}"]`).firstChild )){return true ; }else{
                return false
            }
            break;
            case 'kinght':
                if(
                    start + width * 2 - 1 === id ||
                    start + (width * 2) + 1 === id ||
                    start + width - 2  === id ||
                    start - width + 2  === id || 
                    start - width * 2 + 1 === id||
                    start - width * 2 - 1 === id||
                    start - width - 2  === id||
                    start + width  + 2 === id
                ){
                    console.log("true");
                    return true;
                }else{
                    console.log("false");
                    return false;
                }
    break;
    case 'bishop':
         if(
            start + width + 1 === id ||
            start + width * 2 + 2 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild ||
            start + width * 3 + 3 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild ||
            start + width * 4 + 4 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild ||
            start + width * 5 + 5 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild ||
            start + width * 6 + 6 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild ||
            start + width * 7 + 7 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild && !document.querySelector(`[square-id="${start +width *6  + 6}"]`).firstChild || 
            start - width - 1 === id ||
            start - width * 2 - 2 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild ||
            start - width * 3 - 3 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild ||
            start - width * 4 - 4 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild ||
            start - width * 5 - 5 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild ||
            start - width * 6 - 6 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild ||
            start - width * 7 - 7 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild && !document.querySelector(`[square-id="${start -width *6  - 6}"]`).firstChild ||
            start - width + 1 === id ||
            start - width * 2 + 2 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild ||
            start - width * 3 + 3 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild ||
            start - width * 4 + 4 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild ||
            start - width * 5 + 5 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild ||
            start - width * 6 + 6 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild ||
            start - width * 7 + 7 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild && !document.querySelector(`[square-id="${start -width *6  + 6}"]`).firstChild ||
            start + width - 1 === id ||
            start + width * 2 - 2 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild ||
            start + width * 3 - 3 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild ||
            start + width * 4 - 4 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild ||
            start + width * 5 - 5 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild ||
            start + width * 6 - 6 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild ||
            start + width * 7 - 7 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild && !document.querySelector(`[square-id="${start +width *6  - 6}"]`).firstChild 
            ){
                return true;
            }else{
                return false
            }
            break;
            case 'rook':
                if(
                  start + width === id ||
                  start + width * 2 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild || 
                  start + width * 3 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild ||           
                  start + width * 4 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild ||
                  start + width * 5 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild ||
                  start + width * 6 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 5}"]`).firstChild ||
                  start + width * 7 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 6}"]`).firstChild ||
                  start - width === id ||
                  start - width * 2 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild || 
                  start - width * 3 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild ||           
                  start - width * 4 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild ||
                  start - width * 5 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild ||
                  start - width * 6 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 5}"]`).firstChild ||
                  start - width * 7 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 6}"]`).firstChild ||
                  start + 1 === id ||
                  start +  2 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild || 
                  start +  3 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild ||           
                  start + 4 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild ||
                  start +  5 === target && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild ||
                  start +  6 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild && !document.querySelector(`[square-id="${start +  5}"]`).firstChild ||
                  start +  7 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild && !document.querySelector(`[square-id="${start +  5}"]`).firstChild && !document.querySelector(`[square-id="${start +  6}"]`).firstChild ||
                  start - 1 === id ||
                  start -  2 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild || 
                  start -  3 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild ||           
                  start - 4 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild ||
                  start -  5 === target && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild ||
                  start -  6 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild && !document.querySelector(`[square-id="${start -  5}"]`).firstChild ||
                  start -  7 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild && !document.querySelector(`[square-id="${start -  5}"]`).firstChild && !document.querySelector(`[square-id="${start -  6}"]`).firstChild 
                  ){
                    return true;
                  }else{
                    return false
                }
                  break;
                  case 'queen':
                    if(
                        start + width === id ||
                        start + width * 2 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild || 
                        start + width * 3 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild ||           
                        start + width * 4 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild ||
                        start + width * 5 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild ||
                        start + width * 6 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 5}"]`).firstChild ||
                        start + width * 7 === id && !document.querySelector(`[square-id="${start + width}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start + width * 6}"]`).firstChild ||
                        start - width === id ||
                        start - width * 2 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild || 
                        start - width * 3 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild ||           
                        start - width * 4 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild ||
                        start - width * 5 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild ||
                        start - width * 6 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 5}"]`).firstChild ||
                        start - width * 7 === id && !document.querySelector(`[square-id="${start - width}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 3}"]`).firstChild  && !document.querySelector(`[square-id="${start - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${start - width * 6}"]`).firstChild ||
                        start + 1 === id ||
                        start +  2 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild || 
                        start +  3 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild ||           
                        start + 4 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild ||
                        start +  5 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild ||
                        start +  6 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild && !document.querySelector(`[square-id="${start +  5}"]`).firstChild ||
                        start +  7 === id && !document.querySelector(`[square-id="${start + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start +  4}"]`).firstChild && !document.querySelector(`[square-id="${start +  5}"]`).firstChild && !document.querySelector(`[square-id="${start +  6}"]`).firstChild ||
                        start - 1 === id ||
                        start -  2 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild || 
                        start -  3 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild ||           
                        start - 4 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild ||
                        start -  5 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild ||
                        start -  6 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild && !document.querySelector(`[square-id="${start -  5}"]`).firstChild ||
                        start -  7 === id && !document.querySelector(`[square-id="${start - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -  2}"]`).firstChild && !document.querySelector(`[square-id="${start +  3}"]`).firstChild  && !document.querySelector(`[square-id="${start -  4}"]`).firstChild && !document.querySelector(`[square-id="${start -  5}"]`).firstChild && !document.querySelector(`[square-id="${start -  6}"]`).firstChild ||
                        start + width * 2 + 2 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild ||
                        start + width * 3 + 3 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild ||
                        start + width * 4 + 4 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild ||
                        start + width * 5 + 5 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild ||
                        start + width * 6 + 6 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild ||
                        start + width * 7 + 7 === id&& !document.querySelector(`[square-id="${start +width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild && !document.querySelector(`[square-id="${start +width *6  + 6}"]`).firstChild || 
                        start - width - 1 === id ||
                        start - width * 2 - 2 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild ||
                        start - width * 3 - 3 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild ||
                        start - width * 4 - 4 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild ||
                        start - width * 5 - 5 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild ||
                        start - width * 6 - 6 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild ||
                        start - width * 7 - 7 === id&& !document.querySelector(`[square-id="${start -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild && !document.querySelector(`[square-id="${start -width *6  - 6}"]`).firstChild ||
                        start - width + 1 === id ||
                        start - width * 2 + 2 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild ||
                        start - width * 3 + 3=== id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild ||
                        start - width * 4 + 4 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild ||
                        start - width * 5 + 5 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild ||
                        start - width * 6 + 6 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild ||
                        start - width * 7 + 7 === id&& !document.querySelector(`[square-id="${start -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${start -width *2  + 2}"]`).firstChild && !document.querySelector(`[square-id="${start -width *3  + 3}"]`).firstChild && !document.querySelector(`[square-id="${start -width *4  + 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  + 5}"]`).firstChild && !document.querySelector(`[square-id="${start -width *6  + 6}"]`).firstChild ||
                        start + width - 1 === id ||
                        start + width * 2 - 2 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild ||
                        start + width * 3 - 3 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild ||
                        start + width * 4 - 4 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild ||
                        start + width * 5 - 5 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild ||
                        start + width * 6 - 6 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild ||
                        start + width * 7 - 7 === id&& !document.querySelector(`[square-id="${start +width - 1}"]`).firstChild && !document.querySelector(`[square-id="${start +width *2  - 2}"]`).firstChild && !document.querySelector(`[square-id="${start +width *3  - 3}"]`).firstChild && !document.querySelector(`[square-id="${start +width *4  - 4}"]`).firstChild && !document.querySelector(`[square-id="${start +width *5  - 5}"]`).firstChild && !document.querySelector(`[square-id="${start +width *6  - 6}"]`).firstChild   
                    ){
                        return true;
                    }else{
                        return false
                    }
                    break;
                    case 'king':
                        if(
                            start + 1 === id ||
                            start -1 === id ||
                            start + width === id ||
                            start +width +1 === id ||
                            start + width -1 === id ||
                            start - width === id ||
                            start -width +1 === id ||
                            start - width -1 === id
                        ){
                            return true ;
                        }else{
                            return false
                        }
                        break ; 
        default:
            break;
    }
}
function checkwin(){
  const kings = Array.from(document.querySelectorAll('#king'));
  console.log(kings)
  if(!kings.some(king => king.firstChild.classList.contains('white'))){
    info.textContent = "black player wins "
    const allsquares = document.querySelectorAll('.square')
    allsquares.forEach(square => {
        square.firstChild?.setAttribute('draggable',false)
    });
  }
  if(!kings.some(king => king.firstChild.classList.contains('black'))){
    info.textContent = "white player wins "
    const allsquares = document.querySelectorAll('.square')
    allsquares.forEach(square => {
        square.firstChild?.setAttribute('draggable',false)
    });
  }    
}