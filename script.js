
// Contains where the markers are currently places
let currentField = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Records the moves in the games
let moveHistory = [[
    [null, null, null],
    [null, null, null],
    [null, null, null]
]];

// Records what part of the game history is being shown
// 0 means start, 8 means end
let historyCounter = 0;

// Records the free space on the board
let freeSpace = 9;

// Markers for players
let player1Marker = "X";
let player2Marker = "O";

// Records the winner of the game
let winner = null;

// Get the element of each tile
let tile1 = document.getElementById('tile1');
let tile2 = document.getElementById('tile2');
let tile3 = document.getElementById('tile3');
let tile4 = document.getElementById('tile4');
let tile5 = document.getElementById('tile5');
let tile6 = document.getElementById('tile6');
let tile7 = document.getElementById('tile7');
let tile8 = document.getElementById('tile8');
let tile9 = document.getElementById('tile9');

// Get the game title
let title = document.getElementById('title');

// Display the current field
function displayCurrentField() {
    tile1.textContent = currentField[0][0];
    tile2.textContent = currentField[0][1];
    tile3.textContent = currentField[0][2];
    tile4.textContent = currentField[1][0];
    tile5.textContent = currentField[1][1];
    tile6.textContent = currentField[1][2];
    tile7.textContent = currentField[2][0];
    tile8.textContent = currentField[2][1];
    tile9.textContent = currentField[2][2];
}

// Determines who is currently playing

let player1Turn = true;


// Put the marker on the board
function markboard(rowIndex, columnIndex, tileNum) {
    freeSpace -= 1;

    tileNum.classList.add("no-click");

    if (player1Turn) {
        currentField[rowIndex][columnIndex] = player1Marker;
        displayCurrentField();
        storeMove();
        checkWinner();
        displayWin();
        player1Turn = false;
    } else {
        currentField[rowIndex][columnIndex] = player2Marker;
        displayCurrentField();
        storeMove();
        checkWinner();
        displayWin();
        player1Turn = true;
    }
}


tile1.addEventListener('click', function () { markboard(0, 0, tile1) });
tile2.addEventListener('click', function () { markboard(0, 1, tile2) });
tile3.addEventListener('click', function () { markboard(0, 2, tile3) });
tile4.addEventListener('click', function () { markboard(1, 0, tile4) });
tile5.addEventListener('click', function () { markboard(1, 1, tile5) });
tile6.addEventListener('click', function () { markboard(1, 2, tile6) });
tile7.addEventListener('click', function () { markboard(2, 0, tile7) });
tile8.addEventListener('click', function () { markboard(2, 1, tile8) });
tile9.addEventListener('click', function () { markboard(2, 2, tile9) });




function disableClick() {
    tile1.classList.add("no-click");
    tile2.classList.add("no-click");
    tile3.classList.add("no-click");
    tile4.classList.add("no-click");
    tile5.classList.add("no-click");
    tile6.classList.add("no-click");
    tile7.classList.add("no-click");
    tile8.classList.add("no-click");
    tile9.classList.add("no-click");
}

function enableClick() {
    tile1.classList.remove("no-click");
    tile2.classList.remove("no-click");
    tile3.classList.remove("no-click");
    tile4.classList.remove("no-click");
    tile5.classList.remove("no-click");
    tile6.classList.remove("no-click");
    tile7.classList.remove("no-click");
    tile8.classList.remove("no-click");
    tile9.classList.remove("no-click");
}


// Store the moves in the game

function storeMove() {
    // copy the currentField array and assign it to a new array
    // add the new array to moveHistory

    // let latestField = currentField.map(x => x.slice());
    // moveHistory.push(latestField);

    moveHistory.push(JSON.parse(JSON.stringify(currentField)));

}

// Check if there's a winner

function checkWinner() {
    // check for horizontal win
    for (let i = 0; i < 3; i++) {
        if (equals3(currentField[i][0], currentField[i][1], currentField[i][2])) {
            winner = currentField[i][0];
        }
    }

    // check for vertical win
    for (let i = 0; i < 3; i++) {
        if (equals3(currentField[0][i], currentField[1][i], currentField[2][i])) {
            winner = currentField[0][i];
        }
    }

    // check diagonal win
    if (equals3(currentField[0][0], currentField[1][1], currentField[2][2])) {
        winner = currentField[0][0];
    }
    if (equals3(currentField[0][2], currentField[1][1], currentField[2][0])) {
        winner = currentField[0][2];

    }

    if (winner === null && freeSpace === 0) {
        winner = "TIE";
    }
}

function equals3(a, b, c) {
    return (a === b && b === c && a !== null);
}

// Display winner
function displayWin() {
    if (winner !== null) {
        if (winner === "TIE") {
            title.textContent = `TIE`;
        } else {
            title.textContent = `${winner} wins`;
        }
        historyCounter = moveHistory.length - 1;
        showButtons();
        disableClick();
    }
}

let buttonsWin = document.querySelector(".buttons-win");
let resetBtn = document.querySelector('.reset');
let previous = document.querySelector('.previous');

// Show buttons
function showButtons() {
    resetBtn.classList.add("buttons-win-active");
    previous.classList.add("buttons-win-active");
}



// Hide buttons and reset game

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    resetBtn.classList.remove("buttons-win-active");
    previous.classList.remove("buttons-win-active");
    next.classList.remove("buttons-win-active");

    currentField = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    moveHistory = [[
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]];
    title.textContent = "TIC TAC TOE";
    winner = null;
    freeSpace = 9;
    historyCounter = 0;
    displayCurrentField();
    enableClick();
}

// Show previous move
previous.addEventListener("click", showPrevious);

function showPrevious() {
    currentField = moveHistory[historyCounter - 1];
    displayCurrentField();
    historyCounter -= 1;
    if (historyCounter === 0) {
        previous.classList.remove("buttons-win-active");
    }
    next.classList.add("buttons-win-active");
}


// Show next move
let next = document.querySelector(".next");
next.addEventListener("click", showNext);

function showNext() {
    if (historyCounter === 0) {
        previous.classList.add("buttons-win-active");
    }
    currentField = moveHistory[historyCounter + 1];
    displayCurrentField();
    historyCounter += 1;
    if (historyCounter === (moveHistory.length - 1)) {
        next.classList.remove("buttons-win-active");
    }
}


// For choosing first player

const xBtn = document.querySelector(".x-btn");
const oBtn = document.querySelector(".o-btn");
const welcomeBg = document.querySelector(".welcome-bg");
const welcome = document.querySelector(".welcome");

xBtn.addEventListener('click', xFirst)

function xFirst() {
    player1Marker = "X";
    player2Marker = "O";
    welcomeBg.style.display = 'none';
}

oBtn.addEventListener('click', oFirst)

function oFirst() {
    player1Marker = "O";
    player2Marker = "X";
    welcomeBg.style.display = 'none';
}