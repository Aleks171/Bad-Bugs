(function(global) {
	var app = global.App || {};

	var Row = function (rowNum, rowHeight, rowBlockWidth, columns, type, image, Enemy, ctx) {
		var that = this;
		this.ctx = ctx;
		this.rowNum = rowNum;
		this.rowBlockWidth = rowBlockWidth;
		this.rowWidth = this.rowBlockWidth * columns;
		this.rowHeight = rowHeight;
		this.rowStartPosition = 0;
		this.columns = columns;
		this.rowYposition = this.rowNum * this.rowHeight;
		this.enemyPositionInRow = (function(){
			if (that.rowNum === 0) {
				return -that.rowHeight/2;
			}
			if (that.rowNum === 1) {
				return that.rowHeight/2;
			} else {
	        	return that.rowNum * that.rowHeight - that.rowHeight/2;
	   		}
		})();
		this.enemies = [];
		this.getEnemies = function() {
			return this.enemies;
		};
		this.getRandomColumnPosition = function() {
			var column = Row.randomNumber(0, this.columns - 1);
			return column * this.rowBlockWidth;
		};
		this.getType = function() {
			return type;
		};
		this.getImage = function() {
			return image;
		};
		this.getRowYposition = function() {
			return this.rowYposition;
		};
		this.removeEnemy = function() {
			this.enemies.shift();
		};
		this.isEnemyOutOfRow = function(enemy) {
			if ((enemy.location.x) > this.rowWidth) {
				return true;
			} else {
				return false;
			}
		};
		this.removeOutOfRowEnemy = function() {
			var enemy = this.enemies[0];
			if (enemy) {
				if (this.isEnemyOutOfRow(enemy)) {
					this.removeEnemy();
				}
			}
		};
		this.speedOfEnemies = Row.randomNumber(1, 2);
		this.distanceBetweenEnemiesMultiplicator = Row.randomNumber(2, 3);
		this.generateEnemy = function() {
			var enemy = this.enemies[this.enemies.length-1];
			if (enemy) {
				if ((this.rowStartPosition + enemy.location.x) > enemy.getBugWidth() * this.distanceBetweenEnemiesMultiplicator) {
					this.addEnemy(new Enemy(this.enemyPositionInRow, this.speedOfEnemies, this.ctx));
					this.distanceBetweenEnemiesMultiplicator = Row.randomNumber(2, 3);
				}
			} else {
				this.addEnemy(new Enemy(this.enemyPositionInRow, this.speedOfEnemies, this.ctx));
			}
		};
		this.addEnemy = function(enemy) {
			this.enemies.push(enemy);
		};
		this.isPlayerOnRow = function(player) {
			if (this.getRowYposition() - this.rowHeight/2 === player.getLocationY()) {
				return true;
			} else {
				return false;
			}
		};
	};

	Row.prototype.render = function() {
		for (var column = 0; column < this.columns; column +=1) {
			this.ctx.drawImage(Resources.get(this.getImage()), column * this.rowBlockWidth, this.rowNum * this.rowHeight);
		}
	}

	Row.randomNumber = function(min, max) {
		//return Math.round(Math.random() + 1);
		return Math.round(((max - min) * Math.random()) + min);
	};

	app.Row = Row;
	global.App = app;
})(this);