
var helpersModule = (function () {
	var config = {};

	function init(input) {
		config = input;
	}
	function calculateRatio (img) {
		// calculating ratio for image shrinking
		var ratio = 1;
		if(img.width > config.thumbSize) ratio = config.thumbSize / img.width;
		else if(img.height > config.thumbSize) ratio = config.thumbSize / img.height;
		// higher value will determine ratio.

		return ratio;
	}
	return {
		init: init,
		calculateRatio: calculateRatio
	};
}());