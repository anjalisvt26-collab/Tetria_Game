const SHAPES =[
    [
        [0,1,0,0],
         [0,1,0,0],
          [0,1,0,0],
           [0,1,0,0]
    ],
    [
        [0,1,0],        
        [0,1,0], 
        [1,1,0]        
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
   [ [1,0,0],
    [0,1,1],
    [0,0,0]
],
[
    [0,1,1],
    [1,1,0],
    [0,0,0]
],
[
    [1,1,1],
    [0,1,0],
    [0,0,0]
],
[
    [1,1],
    [1,1],
]
]
const colors =[
     "#fff",
     "#9b5fe0",
     "#16a4d8",
     "#60dbe8",
     "#8bd346",
     "#efdf48",
     "#f9a52c",
     "#d64e12"
]
const ROWS=20;
const COLS = 10;
let score=0;

let canvas=document.querySelector("#tetris");
let scoreboard=document.querySelector("h2");
let ctx=canvas.getContext("2d");
ctx.scale(30,30);

let pieceobj= null;
let grid=genrateGrid();
console.log(grid);
// console.log(pieceobj);

function generaterandompiece(){
    let ran=Math.floor(Math.random()*7);
    // console.log(SHAPES[ran]);
    let piece=SHAPES[ran];
    let colorIndex=ran +1;
    let x=4;
    let y=0;
    return {piece,x,y,colorIndex};

}
setInterval(newgamestate,500);

function newgamestate(){
    checkGrid();
    if(pieceobj == null){
        pieceobj=generaterandompiece();
        rendonprice();
       }
         moveDown();
    }

function checkGrid(){
    let count= 0;
    
    for(let i= 0; i<grid.length;i++){
        let allfilled=true;
        for(let j=0; j<grid[i].length;j++){
            if(grid[i][j] == 0){
                allfilled=false;
     }
    }
    if(allfilled){
        grid.splice(i,1);
        grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        count++;
    }
    }
    if(count == 1){
        score+=10;
    }else if(count == 2){
        score+=30;
     } else if(count == 3){
            score+=50;
        }else if(count >3){
            score+=100;
        }
        scoreboard.innerHTML="score: "+ score;
    }


function rendonprice(){
     if(pieceobj == null){
        return;
    }
    let piece= pieceobj.piece;
    for(let i = 0; i<piece.length;i++){ // ROW
        for(let j = 0;j<piece[i].length;j++){ //COLUMN
            if(piece[i][j] == 1){
                ctx.fillStyle=colors[pieceobj.colorIndex];// fill color
                ctx.fillRect(pieceobj.x + j,pieceobj.y+i, 1, 1);//square draw
            }

        }
    }
    
}

function moveDown(){
    if(!collision(pieceobj.x,pieceobj.y+1))
    pieceobj.y+=1;
     else{
        for(let i=0; i<pieceobj.piece.length;i++){
        for(let j=0; j<pieceobj.piece[i].length;j++){
            if(pieceobj.piece[i][j] == 1){
                let p=pieceobj.x+j;
                let q=pieceobj.y+i;
                grid[q][p] = pieceobj.colorIndex;
            }
        }
    }

    checkGrid(); 

    if(pieceobj.y == 0){
        alert("GAME OVER"); 
        grid = genrateGrid();
        score=0;
    }
    pieceobj=null;
}
    renderGrid();
}
function moveleft(){
    if(!collision(pieceobj.x-1,pieceobj.y))
    pieceobj.x-=1;
    
    renderGrid();
}
function moveRight(){
    if(!collision(pieceobj.x+1,pieceobj.y))
    pieceobj.x+=1;
    renderGrid();
}
function rotate(){
    let rotatedPiece=[];
    let piece=pieceobj.piece;
    for(let i=0; i<piece.length;i++){
        rotatedPiece.push([]);
        for(let j=0;j<piece[i].length;j++){
            rotatedPiece[i].push(0);
        }
    }
    for(let i=0;i<piece.length;i++){
        for(let j=0; j<piece[i].length;j++){
            rotatedPiece[i][j]=piece[j][i];

        }
    }
    for(let i =0; i<rotatedPiece.length;i++){
        rotatedPiece[i]=rotatedPiece[i]. reverse();
    }
    if(!collision(pieceobj.x,pieceobj.y,rotatedPiece)){
     pieceobj.piece = rotatedPiece;
    }
    renderGrid();

}


function collision(x,y,rotatedPiece){
    let piece= rotatedPiece || pieceobj.piece;
    for(let i=0; i<piece.length;i++){
        for(let j= 0; j<piece[i].length;j++){
            if(piece[i][j] == 1){
                let p = x+j;
                let q= y+i;
                if(p>=0 && p<COLS &&q>=0 &&q<ROWS){
                    if(grid[q][p]>0){
                        return true;
                    }

                }
                else{
                    return true;
                }
            }
        }
    }
    return false;
}
function genrateGrid(){
    let grid=[];
    for(let i= 0; i<ROWS;i++){
        grid.push([]);
            for(let j=0; j<COLS;j++){
                grid[i].push(0);
             }
        }
    return grid;
}
function renderGrid(){
    ctx.clearRect(0,0,COLS,ROWS);
    for(let i=0;i<grid.length;i++){

        for(let j=0;j<grid[i].length;j++){

            ctx.fillStyle=colors[grid[i][j]];
            ctx.fillRect(j,i,1,1);
        }
    }
    rendonprice();

}
document.addEventListener("keydown", function(e){
    console.log(e.code);
    let key=e.code;
    if(key=="ArrowDown"){
        moveDown();
    }else if(key == "ArrowLeft"){
        moveleft();
    }
    else if(key == "ArrowRight"){
        moveRight();
    }
    else if(key == "ArrowUp"){
        rotate();
    }
})
    
