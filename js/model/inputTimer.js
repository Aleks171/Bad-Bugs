(function(global) {
	var app = global.App || {};
	var inputTimer = function(posX, posY, ctx) {
		var that = this;
		this.posX = posX;
		this.posY = posY;
		this.time = 4;
		this.timerID;
		this.updateDisplay = function(what) {
			this.timeToDisplay = what;
		};
		this.getDisplayedTime = function() {
			return this.timeToDisplay;
		};
		this.clearTimer = function() {
			this.time = null;
		};
		this.getTimerID = function() {
			return this.timerID;
		};
		this.setTimerID = function(id) {
			this.timerID = id;
		};
		this.getTime = function() {
			return this.time;
		};
		this.setTime = function(time) {
			this.time = time;
		};
		this.startTimer = function() {
			var timerID = global.setInterval(function() {
				var time = that.getTime();
				time -= 1;
				that.setTime(time);
			}, 1000);
			this.setTimerID(timerID);
		};
		this.update = function() {
			if (this.getTime() > 0) {
				this.updateDisplay(this.getTime());
			}
			if (this.getTime() === 0) {
				this.clearTimer();
				global.clearInterval(this.getTimerID());
				this.updateDisplay('GO!');
				global.setTimeout(function() {
					that.updateDisplay('');
				}, 3000);
			} 
		};
		this.render = function() {
			ctx.font = "30px Arial";
			ctx.fillStyle = "darkred";
	        ctx.fillText(this.getDisplayedTime(), this.posX, this.posY);
		};
	}
	app.inputTimer = inputTimer;
	global.App = app;
})(this);