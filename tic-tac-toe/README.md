# Tic Tac Toe

![screen](demo/screen.png)

The [final code is here](demo/js/main.js), but the following implements the code step-by-step.

1. Create the following images (all the same size squares):

  - e.png (empty)
  - x.png
  - o.png

1. Create/style the board (simple):

  ```html
  <div id="board">
    <img><img><img><br>
    <img><img><img><br>
    <img><img><img><br>
  </div>
  ```

  ```css
  #board img {
    border: 10px solid #eee;
  }
  ```

  ```js
  $('#board img').attr('src', 'e.png');
  ```

1. Attach click events to the images.

    ```js
    $('#board img').on('click', onClickSquare);

    function onClickSquare() {
      console.log("You clicked a square!");
    }
    ```

1. Set the square to an `X` when clicked.

    ```js
    function onClickSquare(event) {
      var element = event.target;
      element.src = "x.png";
    }
    ```

1. Write helper functions for getting and setting a square.

    ```js
    function getShape(element) {
      var path = element.src;
      return path.charAt(path.length - 5);
    }

    function setShape(element, shape) {
      element.src = shape + ".png";
    }

    function onClickSquare(event) {
      var element = event.target;
      console.log("square was", getShape(element));
      setShape(element, "x");
    }
    ```

1. Alternate between `X` and `O` every other click so we can take turns.

    ```js
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

      setShape(element, turn);

      switchTurn();
    }
    ```

1. Don't allow overwriting a square that already has something in it.

    ```js
    function onClickSquare(event) {
      var element = event.target;

      if (getShape(element) == "e") {
        // ...
      }
    }
    ```

## Find the winner

1. Suppose we number the squares like this:

    ```
     0 | 1 | 2
    ---|---|---
     3 | 4 | 5
    ---|---|---
     6 | 7 | 8
    ```

1. List all the possible ways to win:

  - `0 1 2` row
  - `3 4 5` row
  - `6 7 8` row
  - `0 3 6` column
  - `1 4 7` column
  - `2 5 8` column
  - `0 4 8` diagonal
  - `2 4 6` diagonal

1. Write a function that takes any three positions and tests if it has a winner.

    ```js
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
    ```

1. Write a function to find the winner from anywhere on the board:

    ```js
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
    ```

    ```js
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
    ```

1. Congratulate the winning player if someone wins.

    ```js
    function onClickSquare(event) {
      var element = event.target;
      
      // ...

      var winner = findWinner();
      if (winner) {
        console.log("The winner is", winner, "!");
      }
    }
    ```


### Extra Credit

1. Detect when game is over.

1. Stop input to the game after it is over.

1. Detect a draw.

1. If someone wins, highlight the winning squares.

  - For example, make `hasWinner` return `{winner: "x", line: [0, 1, 2]}` instead of just `"x"`

1. Create button to start a new game (only show it when a game has ended.)

[Tic-Tac-Toe]:http://en.wikipedia.org/wiki/Tic-tac-toe
