(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Ship = Asteroids.Ship;

  var Game = Asteroids.Game = function (height, width) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.height = height;
    this.width = width;
    this.lives = 3;
  };

  Game.IMG = new Image();
  Game.IMG.src = "totoro2.png";
  Game.NUM_ASTEROIDS = 10;
  Game.asteroidSpeed = 5;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var attr = {
        pos: this.randomPosition(),
        vel: Asteroids.Util.randomVec(Game.asteroidSpeed)
      };
      var game = this;

      this.asteroids.push(
        new Asteroids.Asteroid(attr, game)
      );
    }
  };

  Game.prototype.allObjects = function() {
    if (this.lives > 0) {
      return this.asteroids.concat(this.bullets, this.ship);
    } else {
      return this.asteroids.concat(this.bullets);
    }
  };

  Game.prototype.randomPosition = function () {
    var diceRoll = Math.random();
    var x = Math.random() * this.width;
    var y = Math.random() * this.height;

    if (diceRoll < 0.25) {
      x = 0;
    } else if (diceRoll < 0.5) {
      y = 0;
    } else if (diceRoll < 0.75) {
      x = this.width;
    } else {
      y = this.height;
    }

    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,this.width, this.height);

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });

    this.drawLives(ctx);
  };


  Game.prototype.drawLives = function(ctx) {
    var initX = 10;
    var initY = 10;

    for (var i = 0; i < this.lives; i++) {
      ctx.drawImage(Game.IMG, initX, initY);
      initX += 60;
    }
  };


  Game.prototype.moveObjects = function () {
    this.allObjects().forEach( function(object) {
      object.move.bind(object)();
    });
  };


  Game.prototype.wrap = function(pos) {
    var wrapX, wrapY;
    if (pos[0] < 0) {
      wrapX = this.width;
    } else {
      wrapX = pos[0] % this.width;
    }

    if (pos[1] < 0) {
      wrapY = this.height;
    } else {
      wrapY = pos[1] % this.height;
    }

    return [wrapX, wrapY];
  };

  Game.prototype.remove = function (i, arr) {
    arr.splice(i, 1);
  };

  Game.prototype.removeOldBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      if(this.isOutOfBounds(this.bullets[i].pos)) {
        this.remove(i, this.bullets);
      }
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.width || pos[0] < 0 ||
      pos[1] > this.height || pos[1] < 0);
   };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.loseLife();
        this.collideable = false;
        this.ship.isVisible = false;
        window.setTimeout(function() {
          this.ship.relocate();
          this.redrawAsteroids();
          this.ship.isVisible = true;
          this.collideable = true;
        }.bind(this),2000);
      }
    }

    for (var k = 0; k < this.bullets.length; k++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if (this.bullets[k].isCollidedWith(this.asteroids[j])) {
          this.remove(j, this.asteroids);
          this.remove(k, this.bullets);
          this.checkCollisions();
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.removeOldBullets();
  };

  Game.prototype.powerShip = function() {
    this.ship.power();
  };

  Game.prototype.turnShip = function(dir) {
    this.ship.turn(dir);
  };

  Game.prototype.isOver = function() {
    return this.isWon() || this.isLost();
  };

  Game.prototype.isWon = function() {
   return this.asteroids.length === 0;
  };

  Game.prototype.isLost = function() {
    return this.lives === 0;
  };

  Game.prototype.loseLife = function() {
    if (this.collideable === true) {
      this.lives -= 1;
    }
  };

  Game.prototype.redrawAsteroids = function() {
    that = this;
    this.asteroids.forEach(function(asteroid) {
      asteroid.pos = that.randomPosition();
    });
  };

})();
