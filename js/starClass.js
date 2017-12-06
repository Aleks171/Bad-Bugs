(function(global) {
	var app = global.App || {};
	var Star = function(x, y, player, ctx) {
		this.sprite = 'images/Star.png';
		this.location = {
			x: x,
			y: y - 41.5
		};
		this.ctx = ctx;
		this.isPlayerOnStar = function(player) {
			if ((this.location.x === player.getLocationX()) && (this.location.y === player.getLocationY())) {
				return true;
			} else {
				return false;
			}
		};
	};
	Star.prototype.render = function() {
	   this.ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
	}
	app.Star = Star;
	global.App = app;
})(this);