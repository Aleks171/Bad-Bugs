(function(global) {
	var app = global.App || {};
	var Score = function(posX, posY, ctx) {
		this.posX = posX;
		this.posY = posY;
		this.ctx = ctx;
		this.score = 0;
		this.update = function() {
			this.score += 50;
	        ctx.fillText("Score: " + this.score, this.posX, this.posY);
		}
		this.render = function() {
			ctx.font = "30px Arial";
	        ctx.fillText("Score: " + this.score, this.posX, this.posY);
		}
	}
	app.Score = Score;
	global.App = app;
})(this);