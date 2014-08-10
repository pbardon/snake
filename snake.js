(function (root) {
  var S = root.S = (root.S || {});


  var Snake = S.Snake = function(dir) {
    this.dir = dir;
    this.seg = [new Coord(4,3), new Coord(4,4)];
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
        this.x += 1;
      } else if (dir === "E") {
        this.x -= 1;
      } else {
        return "wtf?";
      }
  }

  Snake.prototype.move = function (ui) {
    var head = this.seg[0];
    this.ateApple(head, ui);
    if (this.apple) {
      console.log('ate apple')
    }else {
      var tail = this.seg.pop(1);
    }
    if (this.outOfBounds(head)) {
      ui.gameOver();
    };
    var newHead = new Coord(head.x, head.y);
    newHead.plus(this.dir);
    this.seg.unshift(newHead);
  };

  Snake.prototype.outOfBounds = function(head) {
    if (head.x < 0 || head.y < 0) {
      return true;
    }else if (head.x > 9 || head.y > 9){
      return true;
    }else {
      return false;
    }
  };


  Snake.prototype.ateApple = function(head, ui) {
    var snake = this;
    this.apple = false;
    ui.board.apples.forEach(function(apple) {
      if (head.x === apple.x && head.y == apple.y){
        var ind = ui.board.apples.indexOf(apple);
        ui.board.apples.splice(ind, 1);
        ui.board.placeApple();
        snake.apple = true;
      }
    });

  };


  Snake.prototype.turn = function(newDir) {
    this.dir = newDir
  };

})(this);
