/* global */

var imageProcessor = (function () {
	var config = {};
	function init () {
		domHandler.bindEvents();
		config = app.config();
	}
	function loadedImageHandler (event) {
		imageProcessor.processLoadedImage(event.target.result);
	}
	function processLoadedImage (imageBase64) {
		// creating new Image Object
		var img = new Image();
		// overriding default "load" events
		img.onload = function (e) {
			var thumbnail = imageProcessor.createCanvasThumbnail(e.target);
			domHandler.appendThumbnail(thumbnail);
		};
		// assigning base64 image which automatically trigger above method
		img.src = imageBase64;
	}
	function calculateRatio (img) {
		// calculating ratio for image shrinking
		var ratio = 1;
		if(img.width > config.thumbSize) ratio = config.thumbSize / img.width;
		else if(img.height > config.thumbSize) ratio = config.thumbSize / img.height;
		// higher value will determine ratio.

		return ratio;
	}
	function createCanvasThumbnail(img) {
		var ratio = imageProcessor.calculateRatio(img);
		// creating new canvas element
		var canvasElement = document.createElement("canvas");
		var ctx = canvasElement.getContext("2d");

		// setting basic properties of canvas
		canvasElement.width = config.thumbSize;
		canvasElement.height = config.thumbSize;

		// putting base64 image.src into canvas for later use
		canvasElement.originalFile = img.src;

		// drawing shrink image in canvas
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

		return canvasElement;
	}
	// public methods
	return {
		init: init,
		loadedImageHandler: loadedImageHandler,
		processLoadedImage: processLoadedImage,
		calculateRatio: calculateRatio,
		createCanvasThumbnail: createCanvasThumbnail
	};
}());

// initializing whole app
// imageProcessor.init();

