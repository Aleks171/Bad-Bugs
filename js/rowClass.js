var Row = function (rowNum, rowWidth) {
	this.rowNum = rowNum;
	this.rowWidth = rowWidth;
	this.enemies = [];
	this.removeEnemy = function() {

	}
	this.addEnemy = function(enemy) {
		this.enemies.push(enemy);
	}
}

var rows = [];
