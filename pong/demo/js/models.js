
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

