# Pong

Creating [Pong] will require the following steps:

#### Starting with a wrapper model

There is too much ceremony around reading/updating the position of a DOM element,
making it not conducive to a learning student.

We want to make this process as simple as accessing plain data.  Getters and
setters can give us this.  The benefit here is that we are instilling the
principle of writing plain data (i.e. a model) and that it is somehow
data-bound to the objects on screen (i.e. a view).

```js
function createModel(elementId) {
  var element = document.getElementById(elementId);
  var model;

  if (element) {
    model = {
      // get size
      get width() { return $(element).width(); },
      get height() { return $(element).height(); },

      // get/set x (left)
      get x() { return $(element).position().left; },
      set x(x) { element.style.left = x + "px"; },

      // get/set y (top)
      get y() { return $(element).position().top; },
      set y(y) { element.style.top = y + "px"; },

      // get/set x2 (right)
      get x2() { return this.x + this.width; },
      set x2(x) { this.x = x - this.width; },

      // get/set y2 (bottom)
      get y2() { return this.y + this.height; },
      set y2(y) { this.y = y - this.height; },
    };
  }
  return model;
}

var ball = createModel("ball");
var board = createModel("board");
var leftPaddle = createModel("left-paddle");
var rightPaddle = createModel("right-paddle");
```


## Add ball

We will add a ball that moves and bounces off the walls of the board.

1. Place the ball inside a board on your page.

    ```html
    <div id="board">
      <div id="ball"></div>
    </div>
    ```

    ```css
    #board {
      width: 600px;
      height: 600px;
      background: #ddd;
    }

    #ball {
      width: 10px;
      height: 10px;
      background: white;
    }
    ```

1. To allow the ball to move freely around the board, we have to use absolute positioning.

    ```css
    #board {
      width: 600px;
      height: 600px;
      background: #ddd;

      /* NEW CODE */
      position: relative;
    }

    #ball {
      width: 10px;
      height: 10px;
      background: white;

      /* NEW CODE */
      position: absolute;
      top: 0;
      left: 0;
    }
    ```

1. Create an animation loop (call `tick` every 50 milliseconds).

    ```js
    var delay = 50;

    setInterval(tick, delay);

    function tick() {
      console.log("I will be called once every", delay, "milliseconds");
    }
    ```

1. Start moving the ball.

    ```js
    // this is only conceptual (we are really using the hidden ball model)
    var ball = document.getElementById("ball").style;

    function tick() {
      ball.x += 5;
    }
    ```

1. Make the ball bounce off left wall.

    ```js
    // this is only conceptual (we are really using the hidden board model)
    var board = document.getElementById('board').style;

    var xSpeed = -5;

    function tick() {
      ball.x += xSpeed;
      if (ball.x < 0) {
        ball.x = 0;
        xSpeed = 5;
      }
    }
    ```

1. Make the ball bounce off right wall.

    ```js
    function tick() {
      ball.x += xSpeed;
      if (ball.x < 0) {
        ball.x = 0;
        xSpeed = 5;
      }
      else if (ball.x2 > board.width) {
        ball.x2 = board.width;
        xSpeed = -5;
      }
    }
    ```

1. Add vertical movement.

    ```js
    var xSpeed = -5
    var ySpeed = 5;

    function tick() {
      ball.x += xSpeed;
      ball.y += ySpeed;

      if (ball.x < 0) {
        ball.x = 0;
        xSpeed = 5;
      }
      else if (ball.x2 > board.width) {
        ball.x2 = board.width;
        xSpeed = -5;
      }

      if (ball.y < 0) {
        ball.y = 0;
        ySpeed = 5;
      }
      else if (ball.y2 > board.height) {
        ball.y2 = board.height;
        ySpeed = -5;
      }
    }
    ```

# Add paddles

We will add left and right paddles controlled by keys.

1. Add paddles to the board.

    ```html
    <div id="board">
      <div id="left-paddle"></div>
      <div id="right-paddle"></div>
      <img id="ball" src="ball.png>
    </div>
    ```

1. Size both of the paddles.

    ```css
    #left-paddle, #right-paddle {
      width: 40px;
      height: 100px;
    }
    ```

1. Position the paddles on the board.

    ```css
    #left-paddle {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    #right-paddle {
      position: absolute;
      top: 0px;
      right: 0px;
    }
    ```

1. Add paddle speeds for left and right players (zero for now).

    ```js
    // this is only conceptual (we are really using the hidden paddle models)
    var leftPaddle = document.getElementById("left-paddle").style;
    var rightPaddle = document.getElementById("right-paddle").style;

    var leftSpeed = 0;
    var rightSpeed = 0;

    function tick() {
      // ... previous ball code ...

      leftPaddle.y += leftSpeed;
      rightPaddle.y += rightSpeed;
    }
    ```

1. Change paddle speed when keys are pressed.

    ```js
    window.addEventListener("keydown", keyDown);

    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var KEY_W = 87;
    var KEY_S = 83;

    function keyDown(event) {
      switch (event.keyCode) {
        case KEY_UP:   rightSpeed = -5; break;
        case KEY_DOWN: rightSpeed = 5;  break;
        case KEY_W:    leftSpeed = -5;  break;
        case KEY_S:    leftSpeed = 5;   break;
      }
    }
    ```

1. Stop paddle when you let go of keys.

    ```js
    window.addEventListener("keyup", keyUp);

    function keyUp(event) {
      switch (event.keyCode) {
        case KEY_UP:
        case KEY_DOWN: rightSpeed = 0; break;
        case KEY_W:
        case KEY_S:    leftSpeed = 0;  break;
      }
    }
    ```

1. Don't allow paddle to go past boundaries.

    ```js
    function tick() {
      // ... previous ball code ...

      leftPaddle.y += leftSpeed;
      rightPaddle.y += rightSpeed;

      keepPaddleInside(leftPaddle);
      keepPaddleInside(rightPaddle);
    }

    function keepPaddleInside(paddle) {
      paddle.y = Math.max(0, paddle.y);
      if (paddle.y < 0) {
        paddle.y = 0;
      }
      if (paddle.y2 > board.height) {
        paddle.y2 = paddle.height;
      }
    }
    ```

## Modify ball

We will modify the ball to exit the board and tally a win if it moves past a
paddle.

1. Implement logic to see if ball will touch paddle when it is about to cross
   the wall (advanced).

    ```js
    function ballTouchingPaddle(paddle) {
      return !(paddle.y + paddle.height < ball.y ||
               ball.y + ball.width < paddle.y);
    }
    ```

1. Modify ball to bounce on left and right walls if they touch the paddle.

    ```js
    function tick() {
      ball.x += xSpeed;
      ball.y += ySpeed;

      if (ball.x + ball.width > board.width) {
        if (ballTouchingPaddle(rightPaddle)) { // <-- NEW CODE
          ball.x = board.width - ball.width;
          xSpeed = -5;
        }
      }
      else if (ball.x < 0) {
        if (ballTouchingPaddle(leftPaddle)) { // <-- NEW CODE
          ball.x = 0;
          xSpeed = 5;
        }
      }

      // ...
    }
    ```

1. Make other player win if ball passes the other player's paddle.

    ```js
    function makeWin(player) {
      console.log("player", player, "wins!");
    }

    function tick() {
      ball.x += xSpeed;
      ball.y += ySpeed;

      if (ball.x + ball.width > board.width) {
        if (ballTouchingPaddle(rightPaddle)) {
          ball.x = board.width - ball.width;
          xSpeed = -5;
        }
        else {
          makeWin("left"); // <-- NEW CODE
        }
      }
      else if (ball.x < 0) {
        if (ballTouchingPaddle(leftPaddle)) {
          ball.x = 0;
          xSpeed = 5;
        }
        else {
          makeWin("right"); // <-- NEW CODE
        }
      }

      // ...
    }
    ```

1. Stop the game when a player wins.

    ```js
    var gameover = false;

    function makeWin(player) {
      gameover = true;
      console.log("player", player, "wins!");
    }

    function tick() {
      ball.x += xSpeed;
      ball.y += ySpeed;

      if (!gameover) {
        // ...
      }
    }
    ```

1. Restart the game after some delay when a player wins.

    ```js
    function makeWin(player) {
      gameover = true;
      console.log("player", player, "wins!");

      setTimeout(restartGame, 2000); // <-- restart in 2 seconds
    }

    function restartGame() {
      gameover = false;

      // reset ball position
      ball.x = 0;
      ball.y = 0;

      // reset ball speeds
      xSpeed = 5;
      ySpeed = 5;
    }
    ```

1. Keep score.

    ```js
    var score = { left: 0, right: 0};

    function makeWin(player) {
      gameover = true;
      console.log("player", player, "wins!");

      score[player] += 1;
      console.log("score", score);

      setTimeout(restartGame, 2000);
    }
    ```

## Extra Credit

1. Set ball `ySpeed` depending on where it hits the paddle.

[Pong]:http://en.wikipedia.org/wiki/Pong
