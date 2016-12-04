

var app = (function (imageProcessor, domHandler, fileHandler) {
	var defaultConfig = {
		thumbSize: 150,
		imageGallerySelector: "#mainArea",
		fileTypesAllowed: "jpe?g|png",
		fileSizeAllowed: 5242880,
		imageProcessorFileInput: "#imageLoader",
		dropZoneSelector: ".callout"
	};
	var config = {};

	function init (initConfig) {
		imageProcessor.init();
		config = setConfig(initConfig);
	}
	function setConfig(input) {
		return Object.assign({}, defaultConfig, input);
	}
	function getConfig() {
		return config;
	}
	return {
		init: init,
		config: getConfig
	};
}(imageProcessor, domHandler, fileHandler));

app.init({
	imageGallerySelector: "#mainArea",
	fileTypesAllowed: "jpe?g|png|gif",
	fileSizeAllowed: 10485760,
	imageProcessorFileInput: "#imageLoader",
	dropZoneSelector: ".callout"
});