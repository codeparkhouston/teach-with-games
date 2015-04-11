# Pong

Creating [Pong] will require the following steps:

## Add ball

1. Create a `ball.png` image.

1. Place the ball inside a board on your page.

    ```html
    <div id="board">
      <img id="ball" src="ball.png>
    </div>
    ```

1. Give the ball absolute positioning inside a properly sized board.

    ```css
    #board {
      position: relative;
      width: 500px;
      height: 500px;
      border: 1px solid black;
    }
    #ball {
      position: absolute;
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
    var ball = document.getElementById("ball");

    function tick() {
      ball.style.x += 5;
    }
    ```

1. Make the ball bounce off right wall.

    ```js
    var speed = 5;

    function tick() {
      ball.style.x += speed;
      if (ball.style.x > board.width) {
        speed = -5;
      }
    }
    ```

1. Make the ball bounce off left wall.

    ```js
    function tick() {
      ball.style.x += speed;
      if (ball.style.x > board.width) {
        speed = -5;
      }
      else if (ball.style.x < 0) {
        speed = 5;
      }
    }
    ```

1. Simplify bounce action.

    ```js
    function tick() {
      ball.style.x += speed;
      if (ball.style.x > board.width || ball.style.x < 0) {
        speed *= -1;
      }
    }
    ```

1. Add vertical movement.

    ```js
    var xSpeed = 5
    var ySpeed = 5;

    function tick() {
      ball.style.x += xSpeed;
      ball.style.y += ySpeed;
      if (ball.style.x > board.width || ball.style.x < 0) {
        xSpeed *= -1;
      }
      if (ball.style.y > board.height || ball.style.y < 0) {
        ySpeed *= -1;
      }
    }
    ```

# Add paddles

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
      left: -40px;
    }

    #right-paddle {
      position: absolute;
      top: 0px;
      right: -40px;
    }
    ```

1. Detect key presses...

[Pong]:http://en.wikipedia.org/wiki/Pong
