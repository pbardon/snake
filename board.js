(function (root) {
  var S = root.S = (root.S || {});


  var Board = S.Board = function() {
    this.snake = new S.Snake("N");
    this.apples = [new S.Coord(4, 2)];
  }

  Board.prototype.render = function() {
    for(var i = 0; i < 10; i++) {
      rowString = "";
      for(var j = 0; j < 10; j++){
        var setSnake = false;
        this.snake.seg.forEach(function(s) {
          if (s.x == j && s.y == i) {
            colorSquare(i, j, 'red');
            rowString += "S";
            setSnake = true;
          }
        });
          this.apples.forEach(function(a) {
            if (a.x == j && a.y == i) {
              colorSquare(i, j, 'green');
              rowString += "S";
              setSnake = true;
            }
        });
        if (!setSnake) {
          eraseSquare(i, j);
        }
      }
    }

  };

  Board.prototype.renderGameOver = function() {
    for(var i = 0; i < 10; i++) {
      for(var j = 0; j < 10; j++){
        colorSquare(i, j, 'black');
      }
    }
  };

  var colorSquare = function(x, y, color) {
    $square = $(".row" + x + " .col" + y);
    $square.css('background-color', color);
  };

  var eraseSquare = function(x, y) {
    $square = $(".row" + x + " .col" + y);
    $square.css('background-color', 'white');
  };

})(this);
