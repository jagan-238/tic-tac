import { updateBoardUI, updateScoreDisplay, updateStatus } from './ui.js';

let board = ["","","","","","","","",""];
let playerScore=0, computerScore=0, drawScore=0;

window.playerMove = function(index){
  if(board[index]!=""||checkWinner(board)) return;
  board[index]="X";
  if(checkWinner(board)){endGame();return;}
  computerMove();
  updateBoardUI(board);
  if(checkWinner(board)) endGame();
}

function computerMove(){
  let empty=[];
  board.forEach((c,i)=>{if(c=="") empty.push(i);});
  if(empty.length==0) return;
  const move = empty[Math.floor(Math.random()*empty.length)];
  board[move]="O";
}

function checkWinner(b){
  const combos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let c of combos){
    const [a,b1,c1]=c;
    if(b[a]&&b[a]===b[b1]&&b[a]===b[c1]) return b[a];
  }
  if(!b.includes("")) return "Draw";
  return null;
}

function endGame(){
  const winner=checkWinner(board);
  if(winner==="X"){updateStatus("You Win!");playerScore++;}
  else if(winner==="O"){updateStatus("Computer Wins!");computerScore++;}
  else{updateStatus("Draw!");drawScore++;}
  updateScoreDisplay(playerScore,computerScore,drawScore);
}

document.getElementById('startGameBtn').addEventListener('click',()=>{
  board=["","","","","","","","",""];
  updateBoardUI(board);
  updateStatus("Your Turn");
});

document.getElementById('resetGameBtn').addEventListener('click',()=>{
  board=["","","","","","","","",""];
  updateBoardUI(board);
  updateStatus("Your Turn");
});
