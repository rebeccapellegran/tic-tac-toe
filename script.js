const gameStatus = document.querySelector('.game-status')
let gameActive = true;
let currentPlayer = "x"
let gameState = ["","","","","","","","",""];

const winningMessage = () => `Player ${currentPlayer} has won`;
const tieMessage = ()   => `the game has ended in a draw`;
const currentPlayerTurn = () => `Its currently ${currentPlayer}'s turn`;
gameStatus.innerHTML = currentPlayerTurn();

function handleTilePlayed (clickedTile, clickedTileIndex) {
gameState[clickedTileIndex] = currentPlayer;
clickedTile.innerHTML = currentPlayer;
}
function handlePlayerChange(){
    currentPlayer = currentPlayer ==="x" ?"o": "x";
    gameStatus.innerHTML = currentPlayerTurn();
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <=7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winningConditions[0]];
        let b = gameState[winningConditions[1]];
        let c = gameState[winningConditions [2]];
        if ( a === '' || b === '' || c === ''){
            continue;
        }
        if(a ===b && b===c){
            roundWon =true;
            break
        }
    }
if (roundWon) {
    gameStatus.innerHTML = winningMessage();
    gameActive= false;
    return;
    }   
}
function tileClick(clickedTileEvent){
    const clickedTile = clickedTileEvent.target;
    const clickedTileIndex = parseInt(
        clickedTile.getAttribute('data-tile-index')
    );
    if (gameState[clickedTileIndex] !== "" || !gameActive) {
        return;
    }
    handleTilePlayed(clickedTile,clickedTileIndex);
    resultValidation();
}
function restartGame () {
    gameActive= true;
    currentPlayer ="x"
    gameState = ["","","","","","","","",""];
    gameStatus.innerHTML= currentPlayerTurn();
    document.querySelectorAll('tile').forEach(tile=>tile.innerHTML="");
}

document.querySelectorAll('.tile').forEach(tile=>tile.addEventListener('click',tileClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);