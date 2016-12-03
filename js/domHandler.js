/* global imageProcessorConf, fileHandler */

var domHandler = (function () {
	var defaults = {
		imageProcessorFileInput: imageProcessorConf.imageProcessorFileInput || "#imageLoader",
		imageGallerySelector: imageProcessorConf.imageGallerySelector || "#mainArea",
		dropZoneSelector: imageProcessorConf.dropZoneSelector || ".callout"
	};
	return {
		clearThumbnailGallery: function () {
			document.querySelector(defaults.imageGallerySelector).innerHTML = "";
		},
		thumbnailClickHandler: function (e) {
			domHandler.openImagePopup(domHandler.buildPopup(e.target.originalFile));
		},
		// method for building popup
		buildPopup: function (content) {
			return "<img src='" + content + "'/>";
		},
		// method for opening popup - could be easy rewrited for modal use
		openImagePopup: function (content) {
			var newWindow = window.open("", "","scrollbars=0, toolbar=0");
			newWindow.document.write(content);
		},
		// appending new thumbnail with provided image and binding event
		appendThumbnail: function (image) {
			var galleryElement = document.querySelector(defaults.imageGallerySelector);
			var thumbElement = domHandler.wrapThumbnail(image);
			thumbElement.addEventListener("click", domHandler.thumbnailClickHandler ,false);
			galleryElement.appendChild(thumbElement);
		},
		// method for wrapping image
		wrapThumbnail: function (image) {
			var thumbnailElement = document.createElement("a");
			thumbnailElement.classList.add("thumbnail");
			thumbnailElement.setAttribute("title", "click to enlarge");
			thumbnailElement.appendChild(image);

			return thumbnailElement;
		},

		// binding all events
		bindEvents: function () {
			// @todo: input selector to config
			document.querySelector(defaults.imageProcessorFileInput).addEventListener("change", fileHandler.loadFiles, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("drop", fileHandler.dropZoneHandlers.drop, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("dragover", fileHandler.dropZoneHandlers.dragover, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("dragleave", fileHandler.dropZoneHandlers.dragleave, false);
		}
	};
}());

// example of overwriting buildPopup method
domHandler.buildPopup = function (content) {
	return "<div style='text-align: center'><img src='" + content + "'/></div>";
};