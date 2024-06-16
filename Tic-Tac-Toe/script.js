document.addEventListener("DOMContentLoaded", function () {
  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;
  let gameActive = true;

  const gameBoxes = document.querySelectorAll(".icons");
  const slider = document.querySelector(".slider");
  const declareWinner = document.querySelector(".declare-winner");
  const resetButton = document.querySelector("button");

  function handlePlayerTurn(box) {
    if (gameActive && !box.textContent) {
      box.textContent = currentPlayer;
      checkGameStatus();
      if (gameActive) {
        handleSliderMovement();
        togglePlayer();
      }
    }
  }

  function handleSliderMovement() {
    const sliderPosition = currentPlayer === playerX ? "90px" : "0px";
    slider.style.top = sliderPosition;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

  function checkGameStatus() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameBoxes[a].textContent &&
        gameBoxes[a].textContent === gameBoxes[b].textContent &&
        gameBoxes[a].textContent === gameBoxes[c].textContent
      ) {
        declareWinner.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
    }

    if ([...gameBoxes].every((box) => box.textContent)) {
      declareWinner.textContent = "It's a draw!";
      gameActive = false;
    }
  }

  gameBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      handlePlayerTurn(box);
    });
  });

  resetButton.addEventListener("click", function () {
    gameBoxes.forEach((box) => {
      box.textContent = "";
    });
    declareWinner.textContent = "";
    currentPlayer = playerX;
    slider.style.top = "0px";
    gameActive = true;
  });
});
