(function (root) {
  var S = root.S = (root.S || {});

  var SnakeUI = S.SnakeUI = function($rootEl) {
    this.$el = $rootEl;
  };

  SnakeUI.STEP_MILLIS = 100;

  SnakeUI.prototype.setUpBoard = function () {
    this.$el.html(this.buildBoard(10));
    this.start();
  };



  SnakeUI.prototype.buildBoard = function(num){
    var squareString = "";
    _.times(num, function (i) {
      squareString += "<div class='row" + i + "'>";
      _.times(num, function(j) {
      squareString += "<div class='square col" + j + "'></div>";
      });
      squareString += "</div>";
    });
    return squareString;
  };

  SnakeUI.prototype.start = function() {
    this.board = new S.Board();
    $(window).on("keydown", handlekeyEvent.bind(this.board));
    this.interID = setInterval(this.turn.bind(this), 300);
  };

  SnakeUI.prototype.gameOver = function() {
    clearInterval(this.interID);
    this.board.renderGameOver();
  };

  SnakeUI.prototype.turn = function() {
    this.board.render();
    this.board.snake.move(this);

    if (this.board.snake.points % 10 === 0) {
      this.increaseSpeed();
    }
  };

  SnakeUI.prototype.increaseSpeed = function() {
    clearInterval(this.interID);
    this.interID = setInterval(this.turn.bind(this), (300 - this.board.snake.points))
  }

  var handlekeyEvent = function(event) {
    if (event.keyCode === 65) {
      this.snake.turn("E");
    } else if (event.keyCode === 87) {
      this.snake.turn("N");
    } else if (event.keyCode === 68) {
      this.snake.turn("W");
    } else if (event.keyCode === 83) {
      this.snake.turn("S");
    }
  };


})(this);
