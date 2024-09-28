document.addEventListener("DOMContentLoaded", function() {
    const gameSettings = document.getElementById("game-settings");
    const playerSelection = document.getElementById("playerSelection");
    const startGameButton = document.getElementById("startGame");
    const gameBoard = document.getElementById("game-board");
    const grid = document.querySelector(".grid");
    const gameStatus = document.getElementById("gameStatus");
    const gameMessage = document.getElementById("gameMessage");
    const messageIcon = document.getElementById("messageIcon");
    const messageText = document.getElementById("messageText");
    const restartGameButton = document.getElementById("restartGame");
    const gameOptions = document.querySelectorAll(".game-option");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const symbolsSelection = document.getElementById("symbolsSelection");
    const playerXSymbolInput = document.getElementById("playerXSymbol");
    const playerOSymbolInput = document.getElementById("playerOSymbol");
    let gameMode, currentPlayer, board, isGameActive;
    let playerSymbols = {X: "X", O: "O"};

    function initializeBoard() {
        grid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            grid.appendChild(cell);
        }
        board = Array(9).fill(null);
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        isGameActive = true;
        gameMessage.classList.add("hidden");
        restartGameButton.classList.add("hidden");
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;
        if (board[index] || !isGameActive) return;
        board[index] = currentPlayer;
        cell.textContent = playerSymbols[currentPlayer];
        if (checkWin()) {
            gameStatus.textContent = `Player ${currentPlayer} Wins!`;
            gameMessage.classList.remove("hidden");
            messageIcon.textContent = "check_circle";
            messageText.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            restartGameButton.classList.remove("hidden");
        } else if (board.every(cell => cell)) {
            gameStatus.textContent = "It's a Draw!";
            gameMessage.classList.remove("hidden");
            messageIcon.textContent = "error";
            messageText.textContent = "It's a draw!";
            isGameActive = false;
            restartGameButton.classList.remove("hidden");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]  // diagonals
        ];
        return winPatterns.some(pattern => 
            board[pattern[0]] && 
            board[pattern[0]] === board[pattern[1]] && 
            board[pattern[0]] === board[pattern[2]]
        );
    }

    function handleGameOptionClick(event) {
        gameMode = event.currentTarget.dataset.mode;
        playerSelection.classList.remove("hidden");
        gameSettings.classList.add("hidden");
        player2Input.classList.toggle("hidden", gameMode === "player-vs-computer");
    }

    function startGame() {
        if (player1Input.value.trim() === "") {
            alert("Please enter a name for Player 1.");
            return;
        }
        if (gameMode === "player-vs-player" && player2Input.value.trim() === "") {
            alert("Please enter a name for Player 2.");
            return;
        }
        if (playerXSymbolInput.value.trim() === "") {
            alert("Please enter a symbol for Player X.");
            return;
        }
        if (playerOSymbolInput.value.trim() === "") {
            alert("Please enter a symbol for Player O.");
            return;
        }
        playerSymbols = {
            X: playerXSymbolInput.value.trim(),
            O: playerOSymbolInput.value.trim()
        };
        initializeBoard();
        gameBoard.classList.remove("hidden");
    }

    function restartGame() {
        initializeBoard();
    }

    gameOptions.forEach(option => option.addEventListener("click", handleGameOptionClick));
    startGameButton.addEventListener("click", startGame);
    restartGameButton.addEventListener("click", restartGame);
});
