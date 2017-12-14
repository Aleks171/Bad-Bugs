var Game = (function(global) {
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
        board = new Board(Player, Enemy, Row, Star, Life, ctx);
        
        var animationID;

    function newGame() {
    	score.clearScore();
    	board.init();
    	var modal = view.modal.createChooseHeroesModal(heroesImages);
        modal.onConfirm(function(){
        	var imageSrc = modal.getChosenImageSrc();
        	board.setPlayersImage(imageSrc);
        	board.instantiatePlayerInput();
        	main();
        });
    }

    function init() {
    	// Canvas dimensions
    	canvas.width = board.getWidth();
    	canvas.height = 747;
    	doc.body.appendChild(canvas);
    	newGame();
    }

    function main() {
    	var player = board.getPlayer();
    	if (!player.isOutOfLives()) {
    		update();
    		render();
	    	animationID = win.requestAnimationFrame(main);
    	} else {
    		clear();
    		win.cancelAnimationFrame(animationID);
			displayResult();
		}
    }

    function displayResult() {
    	var scoreResult = score.getScore();
    	view.modal.createResultGameModal(scoreResult).onConfirm(function() {
    		gameShouldContinue = true;
    		newGame();
    	});
    }

    function updateOnItemCollection() {
    	if (board.isPlayerGotStar()) {
    		score.update(100);
    		board.removeStar();
    	}
    }

    function update() {
		board.update();
		updateOnCollision();
		updateWhenPlayerOnSpecificRow();
		updateOnItemCollection();
    }

    function updateOnCollision() {
    	var player = board.getPlayer();
    	if (board.isCollisionHappened()) {
    		player.removeLife();
			player.resetLocation();
			player.holdInput();
    	}
    }

    function updateWhenPlayerOnSpecificRow() {
    	if (board.isPlayerOnCertainRowType('water-block')) {
    		score.update(50);
            board.resetPlayersLocation();
            board.setEnemiesSpeedInRow();
            board.createStar();
            board.holdPlayersInput();
    	}
    }

    // Render player, rows, enemies, score etc.
    function render() {
		clear();
    	board.render();
    	score.render();
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