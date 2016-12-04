/* global */

var galleryModule = (function (helpersModule, domHandler) {
	var config = {};
	function init (input) {
		config = input;
	}
	function loadedImageHandler (event) {
		processLoadedImage(event.target.result);
	}
	function processLoadedImage (imageBase64) {
		// creating new Image Object
		var img = new Image();
		// overriding default "load" events
		img.onload = function (e) {
			var thumbnail = createCanvasThumbnail(e.target);
			domHandler.appendThumbnail(thumbnail);
		};
		// assigning base64 image which automatically trigger above method
		img.src = imageBase64;
	}
	function createCanvasThumbnail(img) {
		var ratio = helpersModule.calculateRatio(img);
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
		createCanvasThumbnail: createCanvasThumbnail
	};
}(helpersModule, domHandler));