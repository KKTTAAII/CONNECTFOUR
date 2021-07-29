/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let restartBtn = document.querySelector('button')

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //I set the number of subarray to HEIGHT. 
  board.length = HEIGHT;
  
  //I use for loop so I can set the lenght of the array to certain number from WIDTH
  //This will be dynamice whenever we change the WIDTH or HEIGHT
  for(let i = 0; i<board.length; i++){
    board[i] = []
      for(let j = 0; j < WIDTH; j++){
        board[i][j] = null;
      }
  }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // This code is to add a table row with an id of 'column-top' 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //after we create a table row, we will create table datas(column). 
  //We create as many as the WIDTH and we add them to the above table row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //we then add the top row with all the columns to the main table element/board itself
  htmlBoard.append(top);

  // TODO: add comment for this code
  //we then crate rows as many as the HEIGHT
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); 
    //inside each row, we create columns as many as WIDTH with an id of the row number and the colum number
    //We then add that column to the table row above
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //after we create each row with columns/cells in them, we attach these rows to the main table/board itself
    htmlBoard.append(row);
  }

}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT-1; y >= 0; y--){
    if(board[y][x] === null){
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let circle = document.createElement('div');
  circle.classList.add('piece', `p${currPlayer}`);
  let td = document.getElementById(`${y}-${x}`);
  td.append(circle);
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null || y === undefined) {
    return evt.target.removeEventListener('click', handleClick);
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  

  // check for win
  if (checkForWin()){
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
 if(board.every((val) => val.every((currVal) => currVal))){
   return endGame("Tie!");
 }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // every time we loop over a row(y), we also loop through all columns(x)
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //there are 4 possible ways to win like the patterns below
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //win when horizontal (x++)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //win when vertical (y++)
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //win when /
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //win when \
      //if one of these is true, return true and if we look at the code above, if this whole func is true, it returns alert(msg)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();

restartBtn.addEventListener('click', function(e){
  window.location.reload(false);
}) 