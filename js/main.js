// const board 
// const squares = [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""]
// ]

const squares = Array.from(document.getElementsByClassName('square'));
console.log('squares');

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

const playerXWon = 'Player X Won';
const playerOWon = 'Player O Won';
const draw = 'Draw';

let resetBtn = document.getElementById('resetBtn');
let currentPlayer;
let spaces = Array(9).fill(null);
let statusText = document.getElementById('statusText');

let form = document.querySelector('#playerForm');
let player1Input = document.getElementById('player1');
let player2Input = document.getElementById('player2');

let player1Score = 0;
let player2Score = 0; 

const startingPlayer = getRandomPlayer();
console.log(`Starting player: ${startingPlayer}`);

//randomizing which player goes first 
function getRandomPlayer() { //randomly selects a starting player
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? 'X' : 'O';
    // alert("first up"); need to display who's going first.
}

// initilizing the game
function init() {
    currentPlayer = getRandomPlayer();
    spaces = Array(9).fill(null);
    squares.forEach(square => {
        square.textContent = '';
        square.addEventListener('click', handleSquareClick);
    });
    updateStatusText();
}

//function to start the game
function startGame() {
    // document.getElementById('board').addEventListener('click', handleSquareClick);
    // squares.forEach((square) => square.addEventListener('click', handleSquareClick)); 
    resetBtn.addEventListener('click', resetGame);
    updateStatusText();
};

// making squares clickable
function handleSquareClick(event) {
    if (event.target.classList.contains('square')) { //reese helped me with this...? lol
        // console.log('event.target');
        const id = parseInt(event.target.id);
        console.log(event);
        // event.target.classList.toggle('red');
        if (!spaces[id] && !checkWin()){
            spaces[id] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.removeEventListener('click', handleSquareClick);
            if (!checkDraw()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatusText();
            }
        }
    }
    checkDraw();
}

//update score when a player wins
function updateScore() {
    document.getElementById('player1Score').textContent = `Player X: ${player1Score}`;
    document.getElementById('player2Score').textContent = `Player O: ${player2Score}`;
}

//function for when someone wins
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i]; //[abc] is the array iteration here
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) { //checks to see if all three squares are in a winning combination by the same player
            alert(`${currentPlayer} wins!`);
            if (currentPlayer === 'X') {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScore();
            resetGame();
            // return false; //return false to show no draw
        }
    } 
        // return true; // return for no win
}


//function for tie
function checkDraw(){
    console.log('check for draw');
    if (spaces.every(space => space !== null)) {
        alert('DRAW');
        resetGame();
        // return true;
    }
}

//restart the game
function resetGame() {
    squares.forEach(square => {
        square.textContent = '';
        square.removeEventListener('click', handleSquareClick);
        square.addEventListener('click', handleSquareClick);
    });
    currentPlayer = getRandomPlayer();
    spaces = Array(9).fill(null);
    updateStatusText();
    
}

//which player's turn it is
function updateStatusText(){
    statusText.textContent = `Current Turn: ${currentPlayer}`;
}

startGame();


//player inputting their names
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (!player1Input.value.trim() || !player2Input.value.trim()) {
        alert('Enter both players names');
    } else{
        alert (`Players are ${player1Input.value} and ${player2Input.value}`);
        init(); //start the game!!!
    }
});




//game audio for when the game is over