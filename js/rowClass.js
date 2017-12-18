(function(global) {
	var app = global.App || {};

	var Row = function (rowNum, rowHeight, rowBlockWidth, columns, type, image, Enemy, ctx) {
		var that = this;
		this.ctx = ctx;
		this.type = type;
		this.image = image;
		this.rowNum = rowNum;
		this.rowBlockWidth = rowBlockWidth;
		this.rowWidth = this.rowBlockWidth * columns;
		this.rowHeight = rowHeight;
		this.rowStartPosition = 0;
		this.columns = columns;
		this.rowYposition = this.rowNum * this.rowHeight;
		this.enemiesPositionInRow = (function(){
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
		this.speedOfEnemies = Row.randomNumber(1, 2);
		this.distanceBetweenEnemiesMultiplicator = Row.randomNumber(2, 3);
		this.generateEnemy = function() {
			var enemy = this.getEnemies()[this.getEnemies().length-1];
			if (enemy) {
				if ((this.rowStartPosition + enemy.getLocationX()) > this.getRowBlockWidth() * this.distanceBetweenEnemiesMultiplicator) {
					this.addEnemy(new Enemy(this.getEnemiesPositionInRow(), this.speedOfEnemies, this.ctx));
					this.distanceBetweenEnemiesMultiplicator = Row.randomNumber(2, 3);
				}
			} else {
				this.addEnemy(new Enemy(this.getEnemiesPositionInRow(), this.speedOfEnemies, this.ctx));
			}
		};
	};
	Row.prototype.getEnemies = function() {
		return this.enemies;
	};
	Row.prototype.getRowBlockWidth = function() {
		return this.rowBlockWidth;
	};
	Row.prototype.getRowWidth = function() {
		return this.rowWidth;
	};
	Row.prototype.getRowHeight = function() {
		return this.rowHeight;
	};
	Row.prototype.getRowColumns = function() {
		return this.columns;
	};
	Row.prototype.getRandomColumnPosition = function() {
		var column = Row.randomNumber(0, this.getRowColumns() - 1);
		return column * this.getRowBlockWidth();
	};
	Row.prototype.getType = function() {
		return this.type;
	};
	Row.prototype.getImage = function() {
		return this.image;
	};
	Row.prototype.getRowYposition = function() {
		return this.rowYposition;
	};
	Row.prototype.removeEnemy = function() {
		this.enemies.shift();
	};
	Row.prototype.getEnemiesPositionInRow = function() {
		return this.enemiesPositionInRow;
	};
	Row.prototype.isEnemyOutOfRow = function(enemy) {
		if ((enemy.getLocationX()) > this.getRowWidth()) {
			return true;
		} else {
			return false;
		}
	};
	Row.prototype.removeOutOfRowEnemy = function() {
		var enemy = this.getEnemies()[0];
		if (enemy) {
			if (this.isEnemyOutOfRow(enemy)) {
				this.removeEnemy();
			}
		}
	};
	Row.prototype.addEnemy = function(enemy) {
		this.enemies.push(enemy);
	};
	Row.prototype.isPlayerOnRow = function(player) {
		if (this.getRowYposition() - this.getRowHeight()/2 === player.getLocationY()) {
			return true;
		} else {
			return false;
		}
	};
	Row.prototype.renderEnemies = function() {
		this.getEnemies().forEach(function(enemy) {
			enemy.render();
		});
	};
	Row.prototype.setEnemiesSpeed = function() {
		var newSpeed = Row.randomNumber(1, 2),
			enemies = this.getEnemies();
		this.speedOfEnemies = newSpeed;
		enemies.forEach(function(enemy) {
			enemy.setSpeed(newSpeed);
		});
	};
	Row.prototype.checkCollisionWithEnemies = function(player) {
		var enemies = this.getEnemies(),
			collision = false;
		enemies.forEach(function(enemy) {
			if (enemy.checkCollision(player)) {
				collision = true;
			}
		});
		return collision;
	};
	Row.prototype.update = function() {
		var enemies = this.getEnemies();
		enemies.forEach(function(enemy) {
			enemy.update();
		});
	};
	Row.prototype.render = function() {
		for (var column = 0; column < this.columns; column += 1) {
			this.ctx.drawImage(Resources.get(this.getImage()), column * this.rowBlockWidth, this.rowNum * this.rowHeight);
		}
		this.renderEnemies();
	}
	Row.randomNumber = function(min, max) {
		return Math.round(((max - min) * Math.random()) + min);
	};

	app.Row = Row;
	global.App = app;
})(this);