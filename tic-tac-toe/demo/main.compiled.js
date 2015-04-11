'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

$('#board img').on('click', onClickSquare);

var turn = 'x';

function getShape(element) {
  var path = element.src;
  return path.charAt(path.length - 5);
}

function setShape(element, shape) {
  element.src = shape + '.png';
}

function onClickSquare(event) {
  var element = event.target;

  if (getShape(element) == 'e') {
    if (turn == 'x') {
      turn = 'o';
    } else {
      turn = 'x';
    }

    setShape(element, turn);

    var winner = findWinner();
    if (winner) {
      console.log('The winner is', winner, '!');
    }
  }
}

function hasWinner(a, b, c) {
  var s = $('#board img').toArray().map(getShape);

  // make sure all are the same
  if (s[a] == s[b] && s[b] == s[c]) {

    // make sure it's not empty
    if (s[a] != 'e') {

      // return the winner image
      return s[a];
    }
  }

  // no winner
  return false;
}

var winningLines = [
// rows
[0, 1, 2], [3, 4, 5], [6, 7, 8],

// columns
[0, 3, 6], [1, 4, 7], [2, 5, 8],

// diagonals
[0, 4, 8], [2, 4, 6]];

function findWinner() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = winningLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 3);

      var a = _step$value[0];
      var b = _step$value[1];
      var c = _step$value[2];

      var winner = hasWinner(a, b, c);
      if (winner) {
        return winner;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}
