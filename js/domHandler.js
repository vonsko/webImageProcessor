/* global */

var domHandler = (function () {
	var config = {};
	function init (input) {
		config = input;
		domHandler.bindEvents();
	}
	function clearThumbnailGallery() {
		document.querySelector(config.imageGallerySelector).innerHTML = "";
	}
	function thumbnailClickHandler(e) {
		domHandler.openImagePopup(domHandler.buildPopup(e.target.originalFile));
	}
	function buildPopup (content) {
		return "<img src='" + content + "'/>";
	}
	function openImagePopup(content) {
		var newWindow = window.open("", "","scrollbars=0, toolbar=0");
		newWindow.document.write(content);
	}
	function appendThumbnail(image) {
		var galleryElement = document.querySelector(config.imageGallerySelector);
		var thumbElement = domHandler.wrapThumbnail(image);
		thumbElement.addEventListener("click", domHandler.thumbnailClickHandler ,false);
		galleryElement.appendChild(thumbElement);
	}
	function wrapThumbnail(image) {
		var thumbnailElement = document.createElement("a");
		thumbnailElement.classList.add("thumbnail");
		thumbnailElement.setAttribute("title", "click to enlarge");
		thumbnailElement.appendChild(image);

		return thumbnailElement;
	}
	function bindEvents() {
		// @todo: input selector to config
		document.querySelector(config.imageProcessorFileInput).addEventListener("change", fileHandler.loadFiles, false);
		document.querySelector(config.dropZoneSelector).addEventListener("drop", fileHandler.dropZoneHandlers.drop, false);
		document.querySelector(config.dropZoneSelector).addEventListener("dragover", fileHandler.dropZoneHandlers.dragover, false);
		document.querySelector(config.dropZoneSelector).addEventListener("dragleave", fileHandler.dropZoneHandlers.dragleave, false);
	}
	return {
		init: init,
		clearThumbnailGallery: clearThumbnailGallery,
		thumbnailClickHandler: thumbnailClickHandler,
		buildPopup: buildPopup,
		openImagePopup: openImagePopup,
		appendThumbnail: appendThumbnail,
		wrapThumbnail: wrapThumbnail,
		bindEvents: bindEvents
	};
}());

domHandler.buildPopup = function (content) {
	return "<div style='text-align: center'><img src='" + content + "'/></div>";
};