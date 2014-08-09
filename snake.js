(function (root) {
  var S = root.S = (root.S || {});


  var Snake = S.Snake = function(dir) {
    this.dir = dir;
    this.seg = [new Coord(4,4), new Coord(4,3)];
  };

  var Coord = S.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  }

  Coord.prototype.plus = function(dir) {
      if (dir === "N") {
        this.y -= 1;
      } else if (dir === "S") {
        this.y += 1;
      } else if (dir === "W") {
        this.x -= 1;
      } else if (dir === "E") {
        this.x += 1;
      } else {
        return "wtf?";
      }
  }

  Snake.prototype.move = function () {
    snake = this;
    snake.seg.forEach(function(coord) {
      coord.plus(snake.dir);
    });
  };

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir
  };


  var Board = S.Board = function() {
    this.snake = new Snake("N");
    this.apples = [];
  }

  Board.prototype.render = function() {


    for(var i = 0; i < 9; i++) {
      rowString = "";
      for(var j = 0; j < 9; j++){
        var setSnake = false;
        this.snake.seg.forEach(function(s) {
          if (s.x == j && s.y == i) {
            S.SnakeUI.colorSquare(j, i);
            rowString += "S";
            setSnake = true;
          }
        });
        if (!setSnake) {
          rowString += ".";
        }
      }
      console.log(rowString)
    }
    console.log();
    console.log();
    console.log();
    console.log('_______________');
  }

})(this);


// board = new this.S.Board();
// board.render();
// board.snake.move();
// board.render();
