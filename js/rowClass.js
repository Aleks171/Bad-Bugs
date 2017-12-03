var Row = function (rowNum, rowHeight, rowBlockWidth, columns, type, image, player) {
	var that = this;
	this.rowNum = rowNum;
	this.rowBlockWidth = rowBlockWidth;
	this.rowWidth = this.rowBlockWidth * columns;
	this.rowHeight = rowHeight;
	this.rowStartPosition = 0;
	this.columns = columns;
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
	this.getType = function() {
		return type;
	};
	this.getImage = function() {
		return image;
	}
	this.removeEnemy = function() {
		this.enemies.shift();
	};
	this.isEnemyOutOfRow = function() {
		var enemy = this.enemies[0];
		if (enemy) {
			if ((enemy.location.x - enemy.getBugWidth()/2) > this.rowWidth) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	};
	this.speedOfEnemies = Row.randomNumber();
	this.distanceBetweenEnemiesMultiplicator = Row.randomNumber();
	this.generateEnemy = function() {
		var enemy = this.enemies[this.enemies.length-1];
		if (enemy) {
			if ((this.rowStartPosition + enemy.location.x) > enemy.getBugWidth() * this.distanceBetweenEnemiesMultiplicator) {
				this.addEnemy(new Enemy(this.enemyPositionInRow, this.speedOfEnemies));
				this.distanceBetweenEnemiesMultiplicator = Row.randomNumber();
			}
		} else {
			this.addEnemy(new Enemy(this.enemyPositionInRow, this.speedOfEnemies));
		}
	};
	this.addEnemy = function(enemy) {
		this.enemies.push(enemy);
	};
	this.isPlayerOnRow = function() {
		if (-this.rowHeight/2 === player.getLocationY()) {
			return true;
		} else {
			return false;
		}
	}
};

Row.prototype.render = function() {
	for (var i = 0, column; i < this.columns; i +=1) {
		column = i;
		ctx.drawImage(Resources.get(this.getImage()), column * this.rowBlockWidth, this.rowNum * this.rowHeight);
	}
}

Row.randomNumber = function() {
	return Math.round(Math.random() + 1);
};

var rows = [];