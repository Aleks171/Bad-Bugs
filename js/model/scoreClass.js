(function(global) {
	var app = global.App || {};
	var Score = function(posX, posY, ctx) {
		this.posX = posX;
		this.posY = posY;
		this.score = 0;
		this.update = function(points) {
			this.score += points;
	        ctx.fillText("Score: " + this.score, this.posX, this.posY);
		};
		this.render = function() {
			ctx.font = "30px Arial";
	        ctx.fillText("Score: " + this.score, this.posX, this.posY);
		};
		this.getScore = function() {
			return this.score;
		};
		this.clearScore = function(argument) {
			this.score = 0;
		};
	}
	app.Score = Score;
	global.App = app;
})(this);