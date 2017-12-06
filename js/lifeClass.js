(function(global) {
	var app = global.App || {};
	var Life = function(x, y, ctx) {
		this.sprite = 'images/Heart.png';
		this.ctx = ctx;
		this.spriteWidth = 101;
		this.spriteHeight = 171;
		this.location = {
			x: x,
			y: y
		};
		this.getWidth = function() {
			return this.spriteWidth;
		};
	};
	Life.prototype.render = function() {
		this.ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y, this.spriteWidth/2.5, this.spriteHeight/2.5);
	};
	app.Life = Life;
	global.App = app;
})(this);