var Board = function(player, Row) {
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

    this.imageWidth = 101;
    this.imageHeight = 83;
    this.numColumns = 5;
	this.rowWidth = this.imageWidth * this.numColumns;
	this.player = player;
	this.rows = [];
	function render() {

	}
	function addRow(rowType, rowImage) {
		this.rows.push(new Row(x, this.imageHeight, this.imageWidth, this.numColumns, rowType, rowImage, this.player));
	}
	function rowsInstantiation() {
    	for (var x = 0, row; x < rowsLength; x += 1) {
    		row = rowImages[x];
	        if (row === 'images/water-block.png') {
	            addRow('water-block', 'images/water-block.png');
	        }
	        if (row === 'images/stone-block.png') {
	            addRow('stone-block', 'images/stone-block.png');
	        }
    	}
    }
}