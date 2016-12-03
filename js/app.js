/* global imageProcessorConf, domHandler */

var imageProcessor = (function () {
	// setting values for current module - usually we would merge this via ie lodash
	var defaults = {
		thumbSize: imageProcessorConf.thumbSize || 150,
		imageGallerySelector: imageProcessorConf.imageGallerySelector || "#mainArea"
	};

	// public methods
	return {
		// in domHandler.bindEvents we have all events binding
		init: function () {
			domHandler.bindEvents();
		},
		// event handler for loaded image
		loadedImageHandler: function (event) {
			imageProcessor.processLoadedImage(event.target.result);
		},
		processLoadedImage: function (imageBase64) {
			// creating new Image Object
			var img = new Image();
			// overriding default "load" events
			img.onload = function (e) {
				var thumbnail = imageProcessor.createCanvasThumbnail(e.target);
				domHandler.appendThumbnail(thumbnail);
			};
			// assigning base64 image which automatically trigger above method
			img.src = imageBase64;
		},
		calculateRatio: function (img) {
			// calculating ratio for image shrinking
			var ratio = 1;
			if(img.width > defaults.thumbSize) ratio = defaults.thumbSize / img.width;
			else if(img.height > defaults.thumbSize) ratio = defaults.thumbSize / img.height;
			// higher value will determine ratio.

			return ratio;
		},
		createCanvasThumbnail: function (img) {
			var ratio = imageProcessor.calculateRatio(img);
			// creating new canvas element
			var canvasElement = document.createElement("canvas");
			var ctx = canvasElement.getContext("2d");

			// setting basic properties of canvas
			canvasElement.width = defaults.thumbSize;
			canvasElement.height = defaults.thumbSize;

			// putting base64 image.src into canvas for later use
			canvasElement.originalFile = img.src;

			// drawing shrink image in canvas
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

			return canvasElement;
		}
	};
}());

// initializing whole app
imageProcessor.init();

