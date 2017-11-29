var Row = function (rowNum, rowHeight, rowWidth) {
	var that = this;
	this.rowNum = rowNum;
	this.rowHeight = rowHeight;
	this.rowWidth = rowWidth;
	this.rowStartPosition = 0;
	this.enemies = [];
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
	this.currentDistanceBetweenEnemies = randomDistance();
	this.generateEnemy = function() {
		var enemy = this.enemies[this.enemies.length-1];
		if (enemy) {
			if ((this.rowStartPosition + (enemy.location.x - enemy.getBugWidth()/2)) > this.currentDistanceBetweenEnemies) {
				this.addEnemy(new Enemy(this.rowNum, this.rowHeight));
				this.currentDistanceBetweenEnemies = randomDistance();
			}
		} else {
			this.addEnemy(new Enemy(this.rowNum, this.rowHeight));
		}
	};
	this.addEnemy = function(enemy) {
		this.enemies.push(enemy);
	};
};

var randomDistance = function() {
	var distances = [110, 220],
	number = Math.round(Math.random());
	return distances[number];
};

var rows = [];