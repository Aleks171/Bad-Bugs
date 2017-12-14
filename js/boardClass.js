(function(global) {
	var app = global.App || {};
	var Board = function(Player, Enemy, Row, Star, Life, ctx) {
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
	    	rowsQuantity = rowImages.length;

	    this.numColumns = 5;
    	this.imageWidth = 101;
	    this.imageHeight = 83;
    	this.boardHeight = rowsQuantity * this.imageHeight;
		this.boardWidth = this.imageWidth * this.numColumns;
    	this.ctx = ctx;
		//this.player = new Player(this.boardWidth, this.boardHeight - this.imageHeight, this.imageWidth, this.imageHeight, Life, ctx);
		this.star;
		this.getWidth = function() {
			return this.boardWidth;
		};
		this.getHeight = function() {
			return this.boardHeight;
		};
		this.getPlayer = function() {
			return this.player;
		};
		this.getRows = function() {
			return this.rows;
		};
		this.renderRows = function() {
			this.rows.forEach(function(row) {
				row.render();
			});
		};
		this.addRow = function(rowNum, rowType, rowImage) {
			this.getRows().push(new Row(rowNum, this.imageHeight, this.imageWidth, this.numColumns, rowType, rowImage, Enemy, this.ctx));
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
		this.reinstantiateRows = function() {
			var rows = this.getRows();
			rows = [];
			this.instantiateRows();
		};
		this.instantiateRows = function() {
			this.rows = [];
	    	for (var rowNum = 0, row; rowNum < rowsQuantity; rowNum += 1) {
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
	    this.getStar = function() {
	    	return this.star;
	    };
	    this.createStar = function() {
	    	var coordinates = this.getRandomCoordinateOnBoard();
    		this.star = new Star(coordinates.rowXposition, coordinates.rowYposition, this.ctx);
	    };
	    this.renderStar = function() {
	    	if (this.star) {
	    		this.star.render();
	    	}
	    };
	    this.removeStar = function() {
	    	this.star = null;
	    };
	    this.isPlayerGotStar = function() {
	    	var star = this.getStar(),
	    	player = this.getPlayer();
	    	if (star) {
	    		if (star.isPlayerOnStar(player)) {
	    			return true;
	    		} else {
	    			return false;
	    		}
	    	} else {
	    		return false;
	    	}
	    };
	    this.generateEnemies = function() {
	    	this.rows.forEach(function(row) {
	    		if (row.getType() === 'stone-block') {
	    			row.generateEnemy();
	    		}
	    	});
	    };
	    this.isPlayerOnCertainRowType = function(rowType) {
	    	var onRow = false,
	    		player = this.getPlayer(),
	    		rows = this.getRows();
	    	rows.forEach(function(row) {
	    		if (row.getType() === rowType) {
	    			if (row.isPlayerOnRow(player)) {
	    				onRow = true;
	    			}
	    		}
	    	});
	    	return onRow;
	    };
	    this.update = function() {
	    	// generate enemies fn
	    	this.generateEnemies();

	    	// update enemies location fn
    	 	this.updateEnemies();

	    	// remove enemies that are out of row fn
	    	this.removeOutOfRowEnemies();
	    };
	    this.updateEnemies = function() {
	    	var rows = this.getRows();
	    	rows.forEach(function(row) {
	    		var enemies = row.getEnemies();
	    		enemies.forEach(function(enemy) {
	    			enemy.update();
	    		});
	    	});
	    };
	    this.setEnemiesSpeedInRow = function() {
	    	var rows = this.getRows();
	    	rows.forEach(function(row) {
	    		row.setEnemiesSpeed();
	    	});
	    };
	    this.removeOutOfRowEnemies = function() {
	    	var rows = this.getRows();
	    	rows.forEach(function(row) {
	    		if (row.getType() === 'stone-block') {
	    			row.removeOutOfRowEnemy();
	    		}
	    	})
	    };
	    this.isCollisionHappened = function() {
	    	var rows = this.getRows(),
	    		collision = false,
	    		player = this.getPlayer();
    		rows.forEach(function(row) {
    			var enemies = row.getEnemies();
    			enemies.forEach(function(enemy) {
	    			if (enemy.checkCollision(player)) {
	    				collision = true;
	    			}
    			});
    		});
    		return collision;
	    };
	    this.renderPlayer = function() {
			this.getPlayer().render();
	    };
	    this.renderRows = function() {
	    	this.getRows().forEach(function(row) {
	    		row.render();
	    	});
	    };
	    this.render = function() {
	    	// render rows
	    	this.renderRows();
	    	// render player
	    	this.renderPlayer();
	    	// render star
	    	this.renderStar();
	    };
	    this.resetPlayersLocation = function() {
	    	this.player.resetLocation();
	    };
	    this.instantiatePlayerInput = function() {
	    	this.player.attachKeysForPlayer();
	    };
	    this.holdPlayersInput = function() {
	    	this.player.holdInput();
	    };
	    this.initiatePlayer = function() {
	    	this.player = new Player(this.boardWidth, this.boardHeight - this.imageHeight, this.imageWidth, this.imageHeight, Life, ctx);
	    };
	};
	app.Board = Board;
	global.App = app;
})(this);