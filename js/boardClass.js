(function(global) {
	var app = global.App || {};
	var Board = function(player, Enemy, Row, Star, ctx) {
		var that = this;
		var rowImages = [
	        'images/water-block.png',   // Top row is water
	        'images/stone-block.png',   // Row 1 of 4 of stone
	        'images/stone-block.png',   // Row 2 of 4 of stone
	        'images/stone-block.png',   // Row 3 of 4 of stone
	        'images/stone-block.png',   // Row 4 of 4 of stone
	        'images/grass-block.png',   // Row 5 of 2 of grass
	        'images/grass-block.png'
	    	],
	    	rowsLength = rowImages.length;

    	this.ctx = ctx;
    	
	    this.imageWidth = 101;
	    this.imageHeight = 83;
	    this.numColumns = 5;
		this.rowWidth = this.imageWidth * this.numColumns;
		this.player = player;
		this.rows = [];
		this.getRows = function() {
			return this.rows;
		};
		this.renderRows = function() {
			this.rows.forEach(function(row) {
				row.render();
			});
		};
		this.addRow = function(rowNum, rowType, rowImage) {
			this.rows.push(new Row(rowNum, this.imageHeight, this.imageWidth, this.numColumns, rowType, rowImage, this.player, Enemy, this.ctx));
		};
		this.getRow = function(index) {
			return this.rows[index];
		};
		this.getIndexesOfRowsWithEnemies = function() {
			var rowsWithEnemies = [];
			this.rows.forEach(function(row, index) {
				if (row.getType() === 'stone-block') {
					rowsWithEnemies.push(index);
				}
			});
			return rowsWithEnemies;
		};
		this.getRandomRowWithEnemiesIndex = function() {
			var rowsWithEnemies = this.getIndexesOfRowsWithEnemies(),
				randomIndex = Row.randomNumber(0, rowsWithEnemies.length - 1);
			return rowsWithEnemies[randomIndex];
		};
		this.getRandomCoordinateOnBoard = function() {
			var getY = this.getRandomRowWithEnemiesIndex(),
				row = this.getRow(getY),
				rowYposition = row.getRowYposition(),
				rowXposition = row.getRandomColumnPosition();
			return {rowYposition: rowYposition, rowXposition: rowXposition};
		};
		this.star;
		this.instantiateRows = function() {
	    	for (var rowNum = 0, row; rowNum < rowsLength; rowNum += 1) {
	    		row = rowImages[rowNum];
		        if (row === 'images/water-block.png') {
		            this.addRow(rowNum, 'water-block', 'images/water-block.png');
		        }
		        if (row === 'images/stone-block.png') {
		            this.addRow(rowNum, 'stone-block', 'images/stone-block.png');
		        }
		        if (row === 'images/grass-block.png') {
		        	this.addRow(rowNum, 'grass-block', 'images/grass-block.png');
		        }
	    	}
	    };
	    this.instantiateStar = function() {
	    	var coordinates = this.getRandomCoordinateOnBoard();
    		this.star = new Star(coordinates.rowXposition, coordinates.rowYposition, this.ctx);
	    };
	};
	app.Board = Board;
	global.App = app;
})(this);