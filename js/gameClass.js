var Game = (function(global) {
	var doc = global.document,
		win = global.window,
		Resources = global.Resources,
		Row = global.App.Row,
		Score = global.App.Score,
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
    // Load images
 	Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    function init() {
		Resources.
    	// Canvas dimensions
    	canvas.width = 505;
    	canvas.height = 664;
    	doc.body.appendChild(canvas);
    	score = new Score(0, 30, ctx);
        player = new Player(numCols * imageWidth, (numRows-1) * imageHeight, imageWidth, imageHeight);
        board = new Board(player, Row);
        main();
    }

    function main() {
    	update();
    	render();
    	win.requestAnimationFrame(main);
    }

    function update() {
    	updateEnemiesPosition();
    }

    // Render rows, enemies, score etc.
    function render() {
    	var rows = board.getRows();
    	rows.forEach(function(row) {
    		// Render row
    		var enemies;
    		row.render();
    		enemies = row.getEnemies();
    		// Render enemy
    		enemies.forEach(function(enemy) {
    			enemy.render();
    		});
    	});
    	score.render();
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

})(this);