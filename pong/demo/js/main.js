
var delay = 20;

setInterval(tick, delay);

// ball speed
var xSpeed = -5
var ySpeed = 5;

// paddle speeds
var leftSpeed = 0;
var rightSpeed = 0;

var score = { left: 0, right: 0};

function makeWin(player) {
  console.log("player", player, "wins!");

  score[player] += 1;
  console.log(score);
}

function tick() {
  // move ball
  ball.x += xSpeed;
  ball.y += ySpeed;

  // bounce against left and right walls
  if (ball.x < 0) {
    ball.x = 0;
    xSpeed = 5;
    makeWin("right");
  }
  else if (ball.x2 > board.width) {
    ball.x2 = board.width;
    xSpeed = -5;
    makeWin("left");
  }

  // bounce against left and right paddles
  if (ball.x2 >= rightPaddle.x &&
      ball.x2 - xSpeed <= rightPaddle.x &&
      ballTouchingPaddle(rightPaddle)) {
    ball.x2 = rightPaddle.x;
    xSpeed = -5;
  }
  if (ball.x <= leftPaddle.x2 &&
      ball.x - xSpeed >= leftPaddle.x2 &&
      ballTouchingPaddle(leftPaddle)) {
    ball.x = leftPaddle.x2;
    xSpeed = 5;
  }

  // bounce against top and bottom walls
  if (ball.y < 0) {
    ball.y = 0;
    ySpeed = 5;
  }
  else if (ball.y2 > board.height) {
    ball.y2 = board.height;
    ySpeed = -5;
  }

  // move paddles
  leftPaddle.y += leftSpeed;
  rightPaddle.y += rightSpeed;
  keepPaddleInside(leftPaddle);
  keepPaddleInside(rightPaddle);
}

function ballTouchingPaddle(paddle) {
  return !(paddle.y2 < ball.y || ball.y2 < paddle.y);
}

function keepPaddleInside(paddle) {
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
