(function(global) {
	var app = global.App || {},
		Resources = app.utils.Resources;
	
	var Life = function(x, y, ctx) {
		this.sprite = 'images/Heart.png';
		this.ctx = ctx;
		this.spriteWidth = 101;
		this.spriteHeight = 171;
		this.location = {
			x: x,
			y: y
		};
	};
	Life.prototype.getSprite = function() {
		return this.sprite;
	};
	Life.prototype.getSpriteWidth = function() {
		return this.spriteWidth;
	};
	Life.prototype.getSpriteHeight = function() {
		return this.spriteHeight;
	};
	Life.prototype.getLocationX = function() {
		return this.location.x;
	};
	Life.prototype.getLocationY = function() {
		return this.location.y;
	};
	Life.prototype.render = function() {
		this.ctx.drawImage(Resources.get(this.getSprite()), this.getLocationX(), this.getLocationY(),this.getSpriteWidth()/2.5, this.getSpriteHeight()/2.5);
	};
	app.Life = Life;
	global.App = app;
})(this);