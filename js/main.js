const squares = Array.from(document.getElementsByClassName('square'));
// console.log('squares', squares);


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


const alerts = document.querySelectorAll('.alert');

//Show Alerts
function showAlert(message) {
    // console.log('showAlert with message', message)
    const alert = document.querySelector('.alert');
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => {
        hideAlert();
    },2000);
}

//Hide Alerts
function hideAlert() {
    const alert = document.querySelector('.alert');
    alert.style.display ='none';
}


let resetBtn = document.getElementById('resetBtn');
let currentPlayer;
let switchPlayers;
let spaces = Array(9).fill(null);
// console.log('spaces', spaces);
let statusText = document.getElementById('statusText');

let player1Score = 0;
let player2Score = 0; 
let draw = 0;
let playingTo = 3; //how many games allowed

const startingPlayer = getRandomPlayer();
console.log(`Starting player: ${startingPlayer}`);


//This works!!
let form = document.querySelector('#playerForm');
let player1Input = document.getElementById('player1');
let player2Input = document.getElementById('player2');
let board = document.getElementById('board');

//submit players name to view players and gameboard
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (!player1Input.value.trim() || !player2Input.value.trim()) {
        showAlert('Enter both players names');
    } else{
        hideAlert();
        showAlert(`Players are ${player1Input.value} and ${player2Input.value}`);
        board.classList.remove("d-none");
        init(); //starts the game after players input their names
    }
});

//randomizing which player goes first 
function getRandomPlayer() { //randomly selects a starting player
    // console.log('getRandomPlayer', getRandomPlayer);
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? 'X' : 'O';
    // alert("first up"); need to display who's going first.
}

// initilizing the game, setting up the game to begin. 
function init() {
    currentPlayer = getRandomPlayer();
    spaces = Array(9).fill(null);
    squares.forEach(square => {
        square.textContent = '';
        square.addEventListener('click', handleSquareClick);
    });
    updateStatusText();
}

//function to start the game, 
function startGame() {
    // document.getElementById('board').addEventListener('click', handleSquareClick);
    squares.forEach((square) => square.addEventListener('click', handleSquareClick)); 
    resetBtn.addEventListener('click', resetGame);
    updateStatusText();
};

// making squares clickable and defining a win or a draw with the spaces. 
function handleSquareClick(event) {
    if (event.target.classList.contains('square')) { //reese helped me with this...? lol
        // console.log('event.target');
        const id = parseInt(event.target.id);
        // console.log(event);
        // event.target.classList.toggle('red');
        if (!spaces[id]){
            spaces[id] = currentPlayer;
            event.target.textContent = currentPlayer;
            console.log('just changed the text')
            event.target.removeEventListener('click', handleSquareClick);
            if (!checkWin()){ //check for win after updating game. 
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            updateStatusText();
        } 
        checkDraw();
    }
}


//had to call the function, and place another if statemnent so it can show the correct person who won.
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i]; //[abc] is the array iteration here since we have a couple arrays for winning combos
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) { //checks to see if all three squares are in a winning combination by the same player
            if (currentPlayer === 'X') {
                player1Score++; //update player's score after winning 
            } else {
                player2Score++;// update player's score after winning 
            }
            // updateStatusText();
            updateScore();
            setTimeout(() => {
                document.querySelector('.alert').style.display = 'none'; //This should hide my HTML 
                showAlert(`Player ${currentPlayer} wins this round!`);
                resetGame();
            }, 500);
            return true;
        }
    }
    return false;
    showAlert('DRAW');
 }




//function for tie/DRAW
//function works now. I wasn't calling the function in the correct function: in the handlesquareclick
function checkDraw(){
    // console.log('checkDraw', checkDraw);
    if (squares.every(square => square.innerHTML)) { //if each individual square is filled 
        console.log('squares', squares);
        draw++;
        document.querySelector('.alert').style.display = 'none'; //This should hide my HTML 
        updateScore();
        showAlert('DRAW');
        // updateStatusText();
        resetGame();
        return true;
    } else {
        return false;
    }
}


//update score when a player wins and when theres a draw
function updateScore() {
    document.getElementById('player1Score').textContent = `Player 1: ${player1Score}`;
    document.getElementById('player2Score').textContent = `Player 2: ${player2Score}`;
    document.getElementById('draw').textContent = `Draw: ${draw}`;
}

//resets the game board, clears the board but doesnt erase winning history
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

//shows which player's who's turn it is displayed on screen
function updateStatusText(){
    if (currentPlayer !== undefined) {
        statusText.textContent = `Current Player ${currentPlayer}`;
    }
}

// only allows up to 3 games to be played
// function NewGame() {

// }

startGame();

