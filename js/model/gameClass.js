var Game = (function(global) {
	var doc = global.document,
		win = global.window,
		Resources = global.App.utils.Resources,
		Row = global.App.Row,
		Score = global.App.Score,
		Board = global.App.Board,
		inputTimer = global.App.inputTimer,
		Player = global.App.Player,
		Enemy = global.App.Enemy,
		Star = global.App.Star,
		Life = global.App.Life,
		view = global.App.view,
		Canvas = global.App.view.Canvas,
        heroesImages = [
        	"images/char-boy.png",
            "images/char-cat-girl.png",
            "images/char-horn-girl.png",
            "images/char-pink-girl.png",
            "images/char-princess-girl.png"],
    	canvas = Canvas(),
    	ctx = canvas.getContext(),
    	inputReleaseIndicator,
        score = new Score(0, 30, ctx),
        board = new Board(Player, Enemy, Row, Star, Life, ctx),
        animationID;
   
    function newGame() {
    	score.clearScore();
    	// modal to choose game params
    	var modal = view.modal.createChooseHeroesModal(heroesImages);
        modal.onConfirm(function(modalData){
        	setDifficulty(modalData.difficulty);
        	board.instantiateRows();
        	board.init();
        	board.resetPlayer();
        	board.setPlayersImage(modalData.imageSrc);
        	board.holdPlayersInput(4000);
        	inputReleaseIndicator = new inputTimer(board.getWidth()/2, 30, ctx);
        	canvas.setWidth(board.getWidth());
    		canvas.setHeight(board.getHeight());
    		canvas.appendCanvasTo(doc.body);
    		inputReleaseIndicator.startTimer();
        	main();
        });
    }

    function setDifficulty(difficulty) {
    	var level;
    	if (difficulty === 'easy') {
    		level = {
	    		rows: [
		        'images/water-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/grass-block.png',
		        'images/grass-block.png'
		    	],
	    		columns: 5
    		};
    	}
    	if (difficulty === 'medium') {
    		level = {
	    		rows: [
		        'images/water-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/grass-block.png',
		        'images/grass-block.png'
		    	],
	    		columns: 5
    		};
    	}
    	if (difficulty === 'hard') {
    		level = {
	    		rows: [
		        'images/water-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/stone-block.png',
		        'images/grass-block.png',
		        'images/grass-block.png'
		    	],
	    		columns: 7
    		};
    	}
    	board.setLevel(level);
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
		inputReleaseIndicator.update();
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

    // Render board, score etc.
    function render() {
		clear();
    	board.render();
    	score.render();
    	inputReleaseIndicator.render();
    }

    function clear() {
    	canvas.clearCanvas();
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
    Resources.onReady(newGame);
})(this);