(function(global) {
	var app = global.App || {};
	var Enemy = function(positionY, speed) {
	    var bugWidth = 110;
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
	Enemy.prototype.update = function() {
    	this.location.x += this.speed;
	}
	Enemy.prototype.checkCollision = function(player) {
	    if ((player.location.x >= (this.location.x - this.getBugWidth()/2)) && 
	        (player.location.x <= (this.location.x + this.getBugWidth()/2)) &&
	        player.location.y === this.location.y) {
	        return true;
	    } else {
	        return false;
	    }
	}
	Enemy.prototype.render = function() {
	    ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
	}
	app.Enemy = Enemy;
    global.App = app;
})(this);