function getRow(cellId) {
    return cellId.charAt(5) == 'A' ? 0 : cellId.charAt(5) == 'B' ? 1 : 2
}
function getCol(cellId) {
    return cellId.charCodeAt(6) - 49
}

const EMPTY_CELL = "e"
const X_CELL = "x"
const O_CELL = "o"

var isXTurn = true
var remainingMoves = 9
var gameOver = false
// TODO: Add stats tracking?
//var winner = EMPTY_CELL

var boardButtons = [[],[],[]]
var board = [[],[],[]]

function checkWin() {
    //check rows and cols
    for (i = 0; i < 3 ; i++) {
        var rowHeadVal = board[i][0]
        var colHeadVal = board[0][i]

        if ((rowHeadVal != EMPTY_CELL && rowHeadVal == board[i][1] && rowHeadVal == board[i][2])
            || (colHeadVal != EMPTY_CELL && colHeadVal == board[1][i] && colHeadVal == board[2][i])) {
            return true
        }
    }

    //check diagonals
    return (board[0][0] != EMPTY_CELL && board[0][0] == board[1][1] && board[0][0] == board[2][2])
        || (board[0][2] != EMPTY_CELL && board[0][2] == board[1][1] && board[0][2] == board[2][0])
}

function anounceWin(player) {
    // TODO: Add fanfare
    boardButtons[1][1].innerHTML = player + " is the winner"
    boardButtons[1][1].style.backgroundColor = 'green'
}
function anounceLose() {
    // TODO: Add fanfare?
    boardButtons[1][1].innerHTML = "No Winner"
    boardButtons[1][1].style.backgroundColor = 'red'
}


var gameBoardCells = document.getElementsByClassName("cell")

// Add each cell to board and add event listeners
for (var i = 0 ; i < gameBoardCells.length ; i++) {
    var cell = gameBoardCells[i]

    var id = cell.id
    var col = getCol(id)
    var row = getRow(id)
    boardButtons[row][col] = cell
    board[row][col] = EMPTY_CELL


    cell.addEventListener('click', function(event) {
        var cellClicked = event.target
        var row = getRow(cellClicked.id)
        var col = getCol(cellClicked.id)

        if (!gameOver && board[row][col] == EMPTY_CELL) {
            board[row][col] = isXTurn ? X_CELL : O_CELL
            remainingMoves--

            //console.log(cellClicked.id + " " + board[row][col])
            cellClicked.innerHTML = board[row][col]
            cellClicked.style.backgroundColor = "#F1F1F1"
            
            if (checkWin()) {
                gameOver = true
                anounceWin(isXTurn ? X_CELL : O_CELL)
            }

            if (remainingMoves <= 0) {
                gameOver = true
                anounceLose()
            }

            isXTurn = isXTurn == false
        }
    })
    //console.log(gameBoardCells[i] + ", " + row + ", " + col)
}

console.log(boardButtons)


