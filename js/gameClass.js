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
		view = global.App.view,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
        heroesImages = [
        	"images/char-boy.png",
            "images/char-cat-girl.png",
            "images/char-horn-girl.png",
            "images/char-pink-girl.png",
            "images/char-princess-girl.png"],
        score = new Score(0, 30, ctx),
        board = new Board(Player, Enemy, Row, Star, Life, ctx),
        player = board.getPlayer();
        
        var animationID,
        gameShouldContinue = true;

    function newGame(argument) {
    	score.clearScore();
    }

    function init() {
    	// Canvas dimensions
    	canvas.width = board.getWidth();
    	canvas.height = 747;
    	doc.body.appendChild(canvas);
        var modal = view.modal.createChooseHeroesModal(heroesImages);
        modal.onConfirm(function(){
        	var imageSrc = modal.getChosenImageSrc();
        	player.setSprite(imageSrc);
        	main();
        });
        //main();
    }

    function main() {
    	update();
    	if (gameShouldContinue) {
    		render();
	    	animationID = win.requestAnimationFrame(main);
    	} else {
    		view.modal.createResultGameModal().onConfirm(function() {gameShouldContinue = true;init();});
    	}
    }

    function update() {
    	if (player.isOutOfLives()) {
    		//stop game fn here
    		gameShouldContinue = false;
    		win.cancelAnimationFrame(animationID);
    		clear();
    	}
    	board.update();
    	updateOnCollision();
    	updateWhenPlayerOnSpecificRow();
    	board.updateScoreWhenPlayerGotStar(player, score);
    }

    function updateOnCollision() {
    	if (board.isCollisionHappened(player)) {
    		player.removeLife();
			player.resetLocation();
    	}
    }

    function updateWhenPlayerOnSpecificRow() {
    	if (board.isPlayerOnCertainRowType(player, 'water-block')) {
    		score.update(50);
            player.resetLocation();
            board.createStar();
    	}
    }

    // Render player, rows, enemies, score etc.
    function render() {
		clear();
    	var rows = board.getRows();
    	rows.forEach(function(row) {
    		// Render row
    		var enemies;
    		row.render();
    		enemies = row.getEnemies();
    		// Render enemies
    		enemies.forEach(function(enemy) {
    			enemy.render();
    		});
    	});
    	board.render();
    	score.render();
    	if (board.star) {
    		board.star.render();
    	}
    }

    function clear() {
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    
    // Load images
 	Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png',
        'images/Heart.png'
    ]);
    Resources.onReady(init);
})(this);