
function createModel(elementId) {

  var element = document.getElementById(elementId);
  var model;

  if (element) {

    model = {
      width: $(element).width(),
      height: $(element).height()
    };

    Object.defineProperty(model, "left", {
        get: function() {
          return $(element).position().left;
        },
        set: function(x) {
          element.style.left = x + "px";
        },
    });

    Object.defineProperty(model, "top", {
        get: function() {
          return $(element).position().top;
        },
        set: function(y) {
          element.style.top = y + "px";
        },
    });

    Object.defineProperty(model, "right", {
        get: function() {
          return this.x + this.width;
        },
        set: function(x) {
          this.x = x - this.width;
        },
    });

    Object.defineProperty(model, "bottom", {
        get: function() {
          return this.y + this.height;
        },
        set: function(y) {
          this.y = y - this.height;
        },
    });

  }

  return model;

}

var ball = createModel("ball");
var board = createModel("board");
var leftPaddle = createModel("leftPaddle");
var rightPaddle = createModel("rightPaddle");

