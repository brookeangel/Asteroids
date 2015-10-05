(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Bullet = Asteroids.Bullet;

  var Ship = Asteroids.Ship = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.isWrappable = true;
    this.angle = 250;
  };

  Asteroids.Util.inherits(Ship,Asteroids.MovingObject);

  // Ship.COLOR = "#FF0000";
  Ship.RADIUS = 40;
  Ship.IMG = new Image();
  Ship.IMG.src = "totoro2.png";

  var TO_RADIANS = Math.PI/180;

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * TO_RADIANS);
    ctx.drawImage(Ship.IMG, -(Ship.IMG.height/2), -(Ship.IMG.width/2));
    ctx.restore();
  };

  // Ship.prototype.draw = function(ctx) {
  //   ctx.fillStyle = this.color;
  //   ctx.beginPath();
  //
  //   ctx.arc(
  //     this.pos[0],
  //     this.pos[1],
  //     this.radius,
  //     0,
  //     2 * Math.PI,
  //     false
  //   );
  //
  //   ctx.fill();
  // };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width/2, this.game.height/2];
    this.vel = [0,0];
  };

  Ship.prototype.power = function () {
    var impulse = 5;
    this.vel[0] = impulse * Math.sin(this.angle * TO_RADIANS);
    this.vel[1] -= impulse * Math.cos(this.angle * TO_RADIANS);
  };

  Ship.prototype.turn = function (dir) {
    var delta = (dir === 'right') ? 15 : -15;
    this.angle = (this.angle + delta) % 360;
  };

  Ship.prototype.fireBullet = function () {
    var vel = this.vel.slice();
    var relSpeed = 20;

    var bullet = new Bullet({
      pos: this.pos.slice(),
      vel: [vel[0] + relSpeed * Math.sin(this.angle * TO_RADIANS),
            vel[1] - relSpeed * Math.cos(this.angle * TO_RADIANS)]
    }, this.game);

    this.game.bullets.push(bullet);
  };


})();
