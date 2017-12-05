(function(global) {
	var app = global.App || {};
	var Board = function(player, Enemy, Row, ctx) {
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
		this.getRandomRowIndex = function() {
			return Row.randomNumber(0, this.rows.length);
		};
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
	};
	app.Board = Board;
	global.App = app;
})(this);