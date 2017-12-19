(function(global) {
	var app = global.App || {};
	var Board = function(level, Player, Enemy, Row, Star, Life, ctx) {
		var that = this,
	    	rowsQuantity = level.rows.length;

	    this.numColumns = level.columns;
    	this.imageWidth = 101;
	    this.imageHeight = 83;
	    this.boardOffset = 88;
    	this.boardHeight = rowsQuantity * this.imageHeight + this.boardOffset;
		this.boardWidth = this.imageWidth * this.numColumns;
		this.playersMoveLimitY = (rowsQuantity-1) * this.imageHeight;
    	this.ctx = ctx;
		this.star;
		this.getHeight = function() {
			return this.boardHeight;
		};
		this.getWidth = function() {
			return this.boardWidth;
		};
		this.getHeight = function() {
			return this.boardHeight;
		};
		this.getPlayersMoveLimitY = function() {
			return this.playersMoveLimitY;
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
		this.getRow = function(index) {
			return this.rows[index];
		};
		this.getIndexesOfRowsWithEnemies = function() {
			var rowsWithEnemies = [];
			this.getRows().forEach(function(row, index) {
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
		this.addRow = function(rowNum, rowType, rowImage) {
			this.getRows().push(new Row(rowNum, this.imageHeight, this.imageWidth, this.numColumns, rowType, rowImage, Enemy, this.ctx));
		};
		this.instantiateRows = function() {
			this.rows = [];
	    	for (var rowNum = 0, row; rowNum < rowsQuantity; rowNum += 1) {
	    		row = level.rows[rowNum];
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
	    this.isPlayerOutOfLives = function() {
	    	var player = this.getPlayer();
	    	if (player.isOutOfLives()) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    };
	    this.reactWhenPlayerOnRow = function(rowType) {
	    	if (rowType === 'water-block') {
	            this.resetPlayersLocation();
	            this.setEnemiesSpeedInRow();
	            this.createStar();
	            this.holdPlayersInput(1000);
    		}
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
	    		row.update();
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
    			if (row.checkCollisionWithEnemies(player)) {
    				collision = true;
    			}
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
	    	this.getPlayer().resetLocation();
	    };
	    this.instantiatePlayerInput = function() {
	    	this.getPlayer().attachKeysForPlayer();
	    };
	    this.holdPlayersInput = function(time) {
	    	this.getPlayer().holdInput(time);
	    };
	    this.createPlayer = function() {
	    	var player = new Player(this.getWidth(), this.getPlayersMoveLimitY(), this.imageWidth, this.imageHeight, Life, ctx);
	    	this.player = player;
	    };
	    this.setPlayersImage = function(imgSrc) {
	    	this.getPlayer().setSprite(imgSrc);
	    };
	    this.onCollisionWithEnemy = function() {
	    	var player = this.getPlayer();
	    	player.removeLife();
			player.resetLocation();
			player.holdInput(1000);
	    };
	    this.resetPlayer = function() {
	    	var player =  this.getPlayer();
	    	player.initLives();
	    };
	    this.init = function() {
	    	//create player
	    	this.createPlayer();
	    	// init player's input
	    	this.instantiatePlayerInput();
	    };
	};
	app.Board = Board;
	global.App = app;
})(this);