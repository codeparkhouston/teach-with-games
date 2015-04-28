
$('#board img').attr('src', 'img/e.png');

$('#board img').on('click', onClickSquare);

function getShape(element) {
  var path = element.src;
  return path.charAt(path.length - 5);
}

function setShape(element, shape) {
  element.src = "img/" + shape + ".png";
}

var turn = "x";

function switchTurn() {
  if (turn == "x") {
    turn = "o";
  }
  else {
    turn = "x";
  }
}

function onClickSquare(event) {
  var element = event.target;

  if (getShape(element) == "e") {
    setShape(element, turn);
    switchTurn();

    var winner = findWinner();
    if (winner) {
      console.log("The winner is", winner, "!");
    }
  }
}

function hasWinner(pos1, pos2, pos3) {
  var boardShapes = $("#board img").toArray().map(getShape);

  // make sure all are the same
  if (boardShapes[pos1] == boardShapes[pos2] && boardShapes[pos2] == boardShapes[pos3]) {

    // make sure it's not empty
    if (boardShapes[pos1] != "e") {

      // return the winner image
      return boardShapes[pos1];
    }

  }

  // no winner
  return false;
}

var winningLines = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonals
  [0, 4, 8],
  [2, 4, 6]
];

function findWinner() {
  for (i in winningLines){
    var line = winningLines[i];

    var pos1 = line[0];
    var pos2 = line[1];
    var pos3 = line[2];

    var winner  = hasWinner(pos1, pos2, pos3);
    if(winner){
      return winner;
    }
  }
  return false;
}
