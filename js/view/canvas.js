(function(global) {
    var app = global.App || {},
        doc = global.document,
        view = app.view || {};

    var Canvas = function() {
    	var canvas = createCanvas(),
    		ctx = canvas.getContext('2d');
    	function createCanvas() {
    		var canvas = doc.createElement('canvas');
    		return canvas;
    	}
    	function appendCanvasTo(where) {
    		where.appendChild(canvas);
    	}
    	function getCanvas() {
    		return canvas;
    	}
    	function getContext() {
    		return ctx;
    	}
    	function setWidth(width) {
    		canvas.width = width;
    	}
    	function setHeight(height) {
    		canvas.height = height;
    	}
    	function getWidth() {
    		return canvas.width;
    	}
    	function getHeight() {
    		return canvas.height;
    	}
    	function clearCanvas() {
    		var width = getWidth(),
    			height = getHeight();
    		ctx.clearRect(0,0,width,height);
    	}
    	return {
    		getContext: getContext,
    		appendCanvasTo: appendCanvasTo,
    		setWidth: setWidth,
    		setHeight: setHeight,
    		getWidth: getWidth,
    		getHeight: getHeight,
    		clearCanvas: clearCanvas
    	};
    	
    };
    view.Canvas = Canvas;
 	app.view = view;
    global.App = app;
})(this);