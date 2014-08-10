(function (root) {
  var S = root.S = (root.S || {});


  var Snake = S.Snake = function(dir) {
    this.dir = dir;
    this.points = 0;
    this.seg = [new Coord(4,5, 'red'), new Coord(4,6, 'orange')];
  };

  var Coord = S.Coord = function(x, y, color) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  Snake.COLORS = ['#FF0000', '#FF3100', '#FF720D', '#B30CE8', '#F8FF00', '#D5FF00', '#0006FF', '#00FFFA', '#8300E8', '#E800CD'];

  Snake.prototype.ateApple = function(head, ui) {
    var snake = this;
    this.apple = false;
    ui.board.apples.forEach(function(apple) {
      if (head.x === apple.x && head.y == apple.y){
        var ind = ui.board.apples.indexOf(apple);
        ui.board.apples.splice(ind, 1);
        ui.board.placeApple();
        snake.points++;
        snake.apple = true;
      }
    });

  };

  Snake.prototype.checkBodyCollision = function(nh) {
    var snake = this;
    var collision = false;
    this.seg.forEach(function(segment){
      if(nh.x === segment.x && nh.y === segment.y){
        collision = true;
      }
    });
    return collision;
  };



  Snake.prototype.move = function (ui) {
    var snake = this;
    var head = this.seg[0];
    var headColor = head.color
    var tail = this.seg[this.seg.length - 1]
    this.ateApple(head, ui);
    if (this.apple) {
      tail.color =  this.randomColor();
    }else {
      this.seg.pop(1);
    }
    if (this.outOfBounds(head)) {
      ui.gameOver();
    };
    var newHead = new Coord(head.x, head.y, headColor);
    newHead.plus(this.dir);
    if (this.checkBodyCollision(newHead)){
      ui.gameOver();
    }
    for(i = 0; i < this.seg.length-1; i++) {
      snake.seg[i].color = snake.seg[i+1].color
    }
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
  };

  Snake.prototype.randomColor = function() {
    var index = Math.floor(Math.random() * 10);
    return Snake.COLORS[index];
  };

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir
  };

})(this);
