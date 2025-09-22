// Page show function
export function showPage(pageId){
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// Scores
let boardState = Array(9).fill(null);
let playerScore = 0, compScore = 0, drawScore = 0;

// Start Game
const startBtn = document.getElementById('startGameBtn');
startBtn.addEventListener('click', ()=>{
  showPage('gamePage');
  initGame();
});

// Initialize board
function initGame(){
  boardState = Array(9).fill(null);
  const board = document.getElementById('board');
  board.innerHTML='';
  for(let i=0;i<9;i++){
    const cell=document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click',()=>playerMove(cell,i));
    board.appendChild(cell);
  }
  document.getElementById('status').textContent="Your Turn"; // player starts
}

// Player move
function playerMove(cell,index){
  if(boardState[index] || document.getElementById('status').textContent.includes("Computer")) return;
  cell.textContent='X';
  boardState[index]='X';
  if(checkWinner('X')) return updateScore('X');
  if(boardState.every(c=>c!==null)) return updateScore('Draw');
  document.getElementById('status').textContent="Computer's Turn";
  setTimeout(computerMove,500); // computer plays after player
}

// Computer move (smart)
function computerMove(){
  let move = findBestMove();
  boardState[move]='O';
  document.querySelectorAll('.cell')[move].textContent='O';
  if(checkWinner('O')) return updateScore('O');
  if(boardState.every(c=>c!==null)) return updateScore('Draw');
  document.getElementById('status').textContent="Your Turn";
}

// Check winner
function checkWinner(player){
  const combos=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(c=>c.every(i=>boardState[i]===player));
}

// Update score and reset board after delay
function updateScore(winner){
  if(winner==='X') playerScore++;
  else if(winner==='O') compScore++;
  else drawScore++;
  document.getElementById('score').textContent=`Player: ${playerScore} | Computer: ${compScore} | Draw: ${drawScore}`;
  document.getElementById('status').textContent=winner==='Draw'?'Draw':'Winner: '+winner;
  setTimeout(initGame,1500);
}

// Reset Button
document.getElementById('resetGameBtn').addEventListener('click', ()=>{
  playerScore=0; compScore=0; drawScore=0;
  document.getElementById('score').textContent='Player: 0 | Computer: 0 | Draw: 0';
  initGame();
});

// ====================== AI Logic ======================
// Computer tries to win or block player
function findBestMove(){
  // Check if computer can win
  for(let i=0;i<9;i++){
    if(!boardState[i]){
      boardState[i]='O';
      if(checkWinner('O')){boardState[i]=null; return i;}
      boardState[i]=null;
    }
  }
  // Check if player can win next, block it
  for(let i=0;i<9;i++){
    if(!boardState[i]){
      boardState[i]='X';
      if(checkWinner('X')){boardState[i]=null; return i;}
      boardState[i]=null;
    }
  }
  // Else pick center if empty
  if(!boardState[4]) return 4;
  // Else pick a corner
  const corners=[0,2,6,8].filter(i=>!boardState[i]);
  if(corners.length) return corners[Math.floor(Math.random()*corners.length)];
  // Else pick random side
  const sides=[1,3,5,7].filter(i=>!boardState[i]);
  return sides[Math.floor(Math.random()*sides.length)];
}

