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
        board = new Board(Player, Enemy, Row, Star, Life, ctx),
        animationID;

    function init() {
    	board.init();
    	// Canvas dimensions
    	canvas.width = board.getWidth();
    	canvas.height = board.getHeight();
    	doc.body.appendChild(canvas);
    	newGame();
    }

    function newGame() {
    	score.clearScore();
    	board.instantiateRows();
    	board.createStar();
    	board.resetPlayer();
    	var modal = view.modal.createChooseHeroesModal(heroesImages);
        modal.onConfirm(function(){
        	var imageSrc = modal.getChosenImageSrc();
        	board.setPlayersImage(imageSrc);
        	board.holdPlayersInput(4000);
        	main();
        });
    }

    function main() {
    	if (!board.isPlayerOutOfLives()) {
    		update();
    		render();
	    	animationID = win.requestAnimationFrame(main);
    	} else {
    		clear();
    		win.cancelAnimationFrame(animationID);
			displayResult();
		}
    }

    function update() {
		board.update();
		updateOnCollision();
		updateWhenPlayerOnSpecificRow('water-block');
		updateOnItemCollection();
    }

    function updateOnCollision() {
    	if (board.isCollisionHappened()) {
    		board.onCollisionWithEnemy();
    	}
    }

    function updateWhenPlayerOnSpecificRow(rowType) {
    	if (board.isPlayerOnCertainRowType(rowType)) {
    		board.reactWhenPlayerOnRow(rowType);
    		score.update(50);
    	}
    }

    function displayResult() {
    	var scoreResult = score.getScore();
    	view.modal.createResultGameModal(scoreResult).onConfirm(function() {
    		newGame();
    	});
    }

    function updateOnItemCollection() {
    	if (board.isPlayerGotStar()) {
    		score.update(100);
    		board.removeStar();
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