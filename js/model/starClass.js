(function(global) {
	var app = global.App || {},
		Resources = app.utils.Resources;
	
	var Star = function(x, y, ctx) {
		this.sprite = 'images/Star.png';
		this.location = {
			x: x,
			y: y - 41.5
		};
		this.ctx = ctx;
	};
	Star.prototype.getSprite = function() {
		return this.sprite;
	};
	Star.prototype.isPlayerOnStar = function(player) {
		if ((this.getLocationX() === player.getLocationX()) && (this.getLocationY() === player.getLocationY())) {
			return true;
		} else {
			return false;
		}
	};
	Star.prototype.getLocationX = function() {
		return this.location.x;
	};
	Star.prototype.getLocationY = function() {
		return this.location.y;
	};
	Star.prototype.render = function() {
	   this.ctx.drawImage(Resources.get(this.getSprite()), this.getLocationX(), this.getLocationY());
	};
	app.Star = Star;
	global.App = app;
})(this);