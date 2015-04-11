
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

function hasWinner(a,b,c) {
  var s = $("#board img").toArray().map(getShape);

  // make sure all are the same
  if (s[a] == s[b] && s[b] == s[c]) {

    // make sure it's not empty
    if (s[a] != "e") {

      // return the winner image
      return s[a];
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
  [2, 4, 6],
];

function findWinner() {
  for (let [a, b, c] of winningLines) {
    let winner = hasWinner(a,b,c);
    if (winner) {
      return winner;
    }
  }
  return false;
}
