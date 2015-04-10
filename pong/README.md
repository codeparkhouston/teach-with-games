# Pong

Creating [Pong] will require the following steps:

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
    var ballSpeed = 5;

    function tick() {
      ball.style.x += ballSpeed;
      if (ball.style.x > board.width) {
      }
    }
    ```

1. Make the ball bounce off left wall.

1. Add vertical speed.

1. Make ball bounce off bottom wall

1. Make ball bounce off top wall

1. ...

[Pong]:http://en.wikipedia.org/wiki/Pong
