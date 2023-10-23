document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const cells = board.getElementsByClassName('cell');
  const info = document.getElementById('info');
  const resetButton = document.querySelector('button:nth-child(1)');
  const marksX = document.querySelector('.marks-x');
  const marksO = document.querySelector('.marks-o');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  let scores = { X: 0, O: 0 };

  function resetGame() {
    for (const cell of cells) {
      cell.textContent = '';
      cell.classList.remove('cell-X', 'cell-O');
    }
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    info.textContent = 'Player X\'s Turn';
  }

  function checkWin() {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        gameActive = false;
        return gameBoard[a];
      }
    }

    if (!gameBoard.includes('')) {
      gameActive = false;
      return 'Draw';
    }

    return null;
  }

  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
      gameBoard[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(`cell-${currentPlayer}`);
      const winner = checkWin();

      if (winner) {
        if (winner === 'Draw') {
          info.textContent = 'It\'s a Draw!';
        } else {
          scores[winner]++; 
          marksX.textContent = scores.X;
          marksO.textContent = scores.O;
          if (scores[winner] >= 3) {
            info.textContent = `Player ${winner} wins the game!`;
            setTimeout(resetGame, 2000);
            scores.X = 0; 
            scores.O = 0;
            marksX.textContent = 'X'; 
            marksO.textContent = 'O';
          } else {
            info.textContent = `Player ${winner} wins!`;
            setTimeout(resetGame, 2000);
          }
        }
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        info.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  }

  for (const cell of cells) {
    cell.addEventListener('click', handleCellClick);
  }

  resetButton.addEventListener('click', resetGame);
});