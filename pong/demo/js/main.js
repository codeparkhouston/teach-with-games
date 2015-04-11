
var delay = 20;

setInterval(tick, delay);

// ball speed
var xSpeed = -5
var ySpeed = 5;

// paddle speeds
var leftSpeed = 0;
var rightSpeed = 0;

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
    paddle.y2 = board.height;
  }
}

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

window.addEventListener("keyup", keyUp);

function keyUp(event) {
  switch (event.keyCode) {
    case KEY_UP:
    case KEY_DOWN: rightSpeed = 0; break;
    case KEY_W:
    case KEY_S:    leftSpeed = 0;  break;
  }
}
