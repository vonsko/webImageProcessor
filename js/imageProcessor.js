/* global */

var imageProcessor = (function (galleryModule, domHandler, fileHandler) {
	var defaultConfig = {
		thumbSize: 150,
		imageGallerySelector: "#mainArea",
		fileTypesAllowed: "jpe?g|png",
		fileSizeAllowed: 5242880,
		imageProcessorFileInput: "#imageLoader",
		dropZoneSelector: ".callout"
	};
	var config = {};
	function init (inputConfig) {
		config = Object.assign({}, defaultConfig, inputConfig);
		helpersModule.init(config);
		galleryModule.init(config);
		domHandler.init(config);
		fileHandler.init(config);
	}
	return {
		init: init
	};
}(galleryModule, domHandler, fileHandler));