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

  Board.prototype.placeApple = function() {
    newCoord = this.randomCoord();
    newApple = new S.Coord(newCoord[0], newCoord[1]);
    this.apples.push(newApple);
  };

  Board.prototype.randomCoord = function() {
    var board = this;
    var newX = Math.floor(Math.random() * 10);
    var newY = Math.floor(Math.random() * 10);
    while (!this.checkCoord(newX, newY)) {
      newX = Math.floor(Math.random() * 10);
      newY = Math.floor(Math.random() * 10);
    }
    return [newX, newY];

  };

  Board.prototype.checkCoord = function(x, y){
    validCoord = true;
    this.snake.seg.forEach(function(segment) {
      if (x === segment.x && y ===  segment.y){
        validCoord = false;
      }
    });
    return validCoord;
  }

  var colorSquare = function(x, y, color) {
    $square = $(".row" + x + " .col" + y);
    $square.css('background-color', color);
  };

  var eraseSquare = function(x, y) {
    $square = $(".row" + x + " .col" + y);
    $square.css('background-color', 'white');
  };

})(this);
