(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;
  var GameView = Asteroids.GameView = function (height, width) {
    this.height = height;
    this.width = width;
    this.game = new Asteroids.Game(this.height, this.width);
  };

  GameView.prototype.bindKeyHandlers = function() {

    var that = this;
    window.key('up', function() { that.game.powerShip(); });
    window.key('left', function() { that.game.turnShip('left'); });
    window.key('right', function() { that.game.turnShip('right'); });
    window.key('space', function() { that.game.ship.fireBullet(); });
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    var that = this;
    this.game.addAsteroids();
    this.bindKeyHandlers();
    var runInterval = window.setInterval(function() {
      that.game.draw(ctx);
      that.game.step();
      if (that.game.isOver()) {
        window.setTimeout(function() {
          clearInterval(runInterval);
          if (that.game.isWon()) {
            window.alert("You win!");
            location.reload();
          } else {
            window.alert("You lose!");
            location.reload();
          }
        }, 2000);
      }
    }, 20);
  };

})();
