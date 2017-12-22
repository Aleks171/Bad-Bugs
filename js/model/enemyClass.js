(function(global) {
	var app = global.App || {};
	var Resources = app.utils.Resources;
	
	var Enemy = function(positionY, speed, ctx) {
	    var bugWidth = 72;
	    this.ctx = ctx;
	    this.sprite = 'images/enemy-bug.png';
	    this.location = {
	        x: -bugWidth,
	        y: positionY
	    };
	    this.speed = speed;
	    this.getBugWidth = function() {
	        return bugWidth;
	    };
	};
	Enemy.prototype.getSprite = function() {
		return this.sprite;
	};
	Enemy.prototype.setSpeed = function(speed) {
    	this.speed = speed;
    };
    Enemy.prototype.getSpeed = function() {
		return this.speed;
    };
	Enemy.prototype.getLocationX = function() {
		return this.location.x;
	};
	Enemy.prototype.getLocationY = function() {
		return this.location.y;
	};
	Enemy.prototype.update = function() {
    	this.location.x += this.getSpeed();
	}
	Enemy.prototype.checkCollision = function(player) {
        if (((player.location.x + player.playerWidth * 0.8) >= this.getLocationX()) && 
        	(player.location.x <= this.getLocationX() + this.getBugWidth()) && (player.location.y === this.getLocationY())) {
        	return true;
        }
	     else {
	        return false;
	    }
	}
	Enemy.prototype.render = function() {
	   this.ctx.drawImage(Resources.get(this.getSprite()), this.getLocationX(), this.getLocationY());
	}
	app.Enemy = Enemy;
    global.App = app;
})(this);