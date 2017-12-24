(function(global) {
	var app = global.App || {};
	var Score = function(posX, posY, ctx) {
		this.posX = posX;
		this.posY = posY;
		this.score = 0;
		this.setScore = function(score) {
			this.score = score;
		};
		this.getScore = function() {
			return this.score;
		};
		this.getPosX = function() {
			return this.posX;
		};
		this.getPosY = function() {
			return this.posY;
		};
		this.update = function(points) {
			this.score += points;
		};
		this.render = function() {
			ctx.font = "30px Arial";
			ctx.fillStyle = "black";
	        ctx.fillText("Score: " + this.getScore(), this.getPosX(), this.getPosY());
		};
		this.getScore = function() {
			return this.score;
		};
		this.clearScore = function() {
			this.setScore(0);
		};
	}
	app.Score = Score;
	global.App = app;
})(this);