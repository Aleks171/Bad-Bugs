var Game = (function(global) {
	console.log(global);
	var doc = global.document,
		win = global.window,
		Resources = global.Resources,
		Row = global.App.Row,
		Score = global.App.Score,
		Board = global.App.Board,
		Player = global.App.Player,
		Enemy = global.App.Enemy,
		Star = global.App.Star,
		Life = global.App.Life,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 4 of stone
            'images/stone-block.png',   // Row 2 of 4 of stone
            'images/stone-block.png',   // Row 3 of 4 of stone
            'images/stone-block.png',   // Row 4 of 4 of stone
            'images/grass-block.png',   // Row 5 of 2 of grass
            'images/grass-block.png'
        ],
        // Rows info
        numRows = rowImages.length,
        numCols = 5,
        imageWidth = 101,
        imageHeight = 83,
        score,
        player,
        board;

    function init() {
    	// Canvas dimensions
    	canvas.width = 505;
    	canvas.height = 747;
    	doc.body.appendChild(canvas);
    	score = new Score(0, 30, ctx);
        player = new Player(numCols * imageWidth, (numRows-1) * imageHeight, imageWidth, imageHeight, Life, ctx);
        player.init();
        console.log('Player: ', player);
        board = new Board(player, score, Enemy, Row, Star, ctx);
        board.instantiateRows();
        board.instantiateStar();
        console.log('Board: ', board);
        main();
    }

    function main() {
    	update();
    	render();
    	win.requestAnimationFrame(main);
    }

    function update() {
    	if (player.isOutOfLives()) {
    		return;
    	}
    	updateEnemiesPosition();
    	checkCollision();
    	board.updateScoreWhenPlayerGotStar(player, score);
    }

    // Render player, rows, enemies, score etc.
    function render() {
    	ctx.clearRect(0,0,canvas.width,canvas.height);

    	var rows = board.getRows();
    	rows.forEach(function(row) {
    		// Render row
    		var enemies;
    		row.render();
    		if (row.getType() === 'stone-block') {
    			row.generateEnemy();
    			if (row.isEnemyOutOfRow()) {
                    row.removeEnemy();
                }
    		} else {
    			if (row.getType() === 'water-block') {
                    if (row.isPlayerOnRow()) {
                        score.update(50);
                        player.resetLocation();
                    }
                }
    		}
    		enemies = row.getEnemies();
    		// Render enemies
    		enemies.forEach(function(enemy) {
    			enemy.render();
    		});
    	});
    	player.render();
    	player.renderLives();
    	score.render();
    	if (board.star) {
    		board.star.render();
    	}
    }

    function updateEnemiesPosition() {
    	// Update enemies
    	var rows = board.getRows();
    	rows.forEach(function(row) {
    		var enemies = row.getEnemies();
    		enemies.forEach(function(enemy) {
    			enemy.update();
    		});
    	});
    }

    function checkCollision() {
    	var rows = board.getRows();
    	rows.forEach(function(row) {
    		var enemies = row.getEnemies();
    		enemies.forEach(function(enemy) {
    			if (enemy.checkCollision(player)) {
    				player.removeLife();
    				player.resetLocation();
    			}
    		});
    	});
    }

    // Load images
 	Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Star.png',
        'images/Heart.png'
    ]);
    Resources.onReady(init);
})(this);