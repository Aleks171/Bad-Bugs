(function(global) {
	var app = global.App || {};
	var Enemy = function(positionY, speed, ctx) {
	    var bugWidth = 101;
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
	Enemy.prototype.update = function() {
    	this.location.x += this.speed;
	}
	Enemy.prototype.checkCollision = function(player) {
	    /*if ((player.location.x >= (this.location.x - this.getBugWidth())) && 
	        (player.location.x <= (this.location.x + this.getBugWidth()/1.4)) &&
	        player.location.y === this.location.y) {
	        return true;*/

        // 0.8 multiplier is needed for proper collision detection due to the picture margins
        if (((player.location.x + player.playerWidth * 0.8) >= this.location.x) && 
        	// 0.7 multiplier is needed for proper collision detection due to the picture margins
        	(player.location.x <= this.location.x + this.getBugWidth()*0.7) && (player.location.y === this.location.y)) {
        	return true;
        }
	     else {
	        return false;
	    }
	}
	Enemy.prototype.render = function() {
	   this.ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
	}
	app.Enemy = Enemy;
    global.App = app;
})(this);