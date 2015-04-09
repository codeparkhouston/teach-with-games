# Tic Tac Toe

Creating [Tic-Tac-Toe] will require the following steps:

1. Create the following images:

  - s.png (square empty)
  - x.png
  - o.png

1. Create/style the board (simple):

  ```html
  <img src="s.png"><img src="s.png"><img src="s.png"></br>
  <img src="s.png"><img src="s.png"><img src="s.png"></br>
  <img src="s.png"><img src="s.png"><img src="s.png"></br>
  ```

  ```css
  img {
    border: 10px solid black;
  }
  ```

1. Or create a correctly-styled board (advanced):

    ```html
    <div id="board">
      <div class="row"><img src="s.png"><img src="s.png"><img src="s.png"></div>
      <div class="row"><img src="s.png"><img src="s.png"><img src="s.png"></div>
      <div class="row"><img src="s.png"><img src="s.png"><img src="s.png"></div>
    </div>
    ```

    ```css
    #board, .row {
      margin: 0;
      padding: 0;
    }

    /* draw grid lines */
    .row img {
      border-bottom: 10px solid black;
      border-right: 10px solid black;
    }

    /* cells on the far-right don't need right borders */
    .row img:last-child {
      border-right: 0;
    }

    /* cells on the bottom don't need bottom borders */
    .row:last-child img {
      border-bottom: 0;
    }
    ```

1. Attach click events to the images.

    ```js
    $('img').on('click', onClick);

    function onClick() {
      console.log("You clicked a square!");
    }
    ```

1. Attach an ID to each image so we know which one was clicked.

    ```html
    <img id="a1" src="s.png"><img id="a2" src="s.png"><img id="a3" src="s.png"></br>
    <img id="b1" src="s.png"><img id="b2" src="s.png"><img id="b3" src="s.png"></br>
    <img id="c1" src="s.png"><img id="c2" src="s.png"><img id="c3" src="s.png"></br>
    ```

    ```js
    function onClick(e) {
      var id; // set this to element's id (don't remember how)
      console.log("You clicked the", id, " square!");
    }
    ```

1. Check if the square is empty.

1. Set the square to an x when clicked.

1. Keep track of whose turn it is. X or O, and change turn after every click.

1. Set the square to an X or O when clicking.

1. Detect a win when after every turn.

[Tic-Tac-Toe]:http://en.wikipedia.org/wiki/Tic-tac-toe
