(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  // var Game = Asteroids.Game;

  var MovingObject = Asteroids.MovingObject = function(attrs, game) {
    this.pos = attrs.pos;
    // this.centerX = attrs.pos[0];
    // this.centerY = attrs.pos[1];
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = game;
    this.isWrappable = true;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0],
                  this.pos[1] + this.vel[1]];

    if (this.isWrappable) {
      this.pos = this.game.wrap(newPos);
    } else {
      this.pos = newPos;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {

  };
})();
