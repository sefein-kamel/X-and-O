const game = document.getElementById('game');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function createBoard() {
  game.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    game.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} Win! 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell !== "")) {
    message.textContent = "تعادل!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => 
    combo.every(i => board[i] === currentPlayer)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
  createBoard();
}

// بداية اللعبة
createBoard();