var imageProcessor = (function () {
	var defaults = {
		thumbSize: imageProcessorConf.thumbSize || 150,
		imageGallerySelector: imageProcessorConf.imageGallerySelector || "#mainArea"
	};
	return {
		init: function () {
			domHandler.bindEvents();
		},
		processLoadedImage: function (event) {
			var img = new Image();
			img.onload = function (e) {
				var thumbnail = imageProcessor.createCanvasThumbnail(e.target);
				domHandler.appendThumbnail(thumbnail);
			};
			img.src = event.target.result;
		},
		calculateRatio: function (img) {
			var ratio = 1;
			if(img.width > defaults.thumbSize) ratio = defaults.thumbSize / img.width;
			else if(img.height > defaults.thumbSize) ratio = defaults.thumbSize / img.height;

			return ratio;
		},
		createCanvasThumbnail: function (img) {
			var ratio = imageProcessor.calculateRatio(img);
			var canvasElement = document.createElement("canvas");
			var ctx = canvasElement.getContext("2d");

			canvasElement.width = defaults.thumbSize;
			canvasElement.height = defaults.thumbSize;
			canvasElement.originalFile = img.src;

			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

			return canvasElement;
		}
	};
}());

imageProcessor.init();

