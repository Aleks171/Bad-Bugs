var Game = (function(global) {
	var doc = global.document,
		win = global.window,
		Resources = global.Resources,
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
        rows;

    function init() {
		Resources.
    	// Canvas dimensions
    	canvas.width = 505;
    	canvas.height = 664;
    	doc.body.appendChild(canvas);
    	score = new Score(0, 30, ctx);
        player = new Player(numCols * imageWidth, (numRows-1) * imageHeight, imageWidth, imageHeight);
        rowsInstantiation();
    }

    function main() {

    }

    function render() {

    }

})(this);