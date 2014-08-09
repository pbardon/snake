(function (root) {
  var S = root.S = (root.S || {});

  var SnakeUI = S.SnakeUI = function($rootEl) {
    this.$el = $rootEl;
  };

  SnakeUI.STEP_MILLIS = 100;

  SnakeUI.prototype.setUpBoard = function () {
    this.$el.html(buildBoard(10));
    debugger;
    start();
  };

  SnakeUI.prototype.render = function () {
    var ui = this;
  };

  SnakeUI.prototype.colorSquare = function(x, y) {
    $square = $(".row" + x + " .col" + y);
    debugger;
    $square.css('background-color', 'red');
  };

  var buildBoard = function(num){
    var that = this;
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

  var start = function() {
    var board = new S.Board();
    $(SnakeUI.$el).on("keydown", handlekeyEvent.bind(board));
    setInterval(turn.bind(board), 100);
  };

  var turn = function() {
    this.render.bind(this);
    this.snake.move();
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
