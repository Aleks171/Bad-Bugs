var Row = function (rowNum, rowHeight, rowWidth) {
	var that = this;
	this.rowNum = rowNum;
	this.rowHeight = rowHeight;
	this.rowWidth = rowWidth;
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
		
	}
	this.addEnemy = function(enemy) {
		this.enemies.push(enemy);
	};
	this.generateEnemy = function() {
		var spanTime = randomTime();
		setTimeout(function(){
			that.addEnemy(new Enemy(that.rowNum, that.rowHeight));
			that.generateEnemy();
		}, spanTime);
	};
	this.generateEnemy();
}

var randomTime = function() {
	var min = 1700,
		max = 4000,
		time = ((max-min) * Math.random())+min;
	return time;
};

var rows = [];
