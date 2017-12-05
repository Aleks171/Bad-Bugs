(function(global) {
	var app = global.App || {};
	var Star = function(x, y, ctx) {
		this.sprite = 'images/Star.png';
		this.location = {
			x: x,
			y: y
		};
		this.ctx = ctx;
	};
	Star.prototype.render = function() {
	   this.ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
	}
	app.Star = Star;
	global.App = app;
})(this);