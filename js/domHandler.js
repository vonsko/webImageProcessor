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
		buildPopup: function (content) {
			return "<img src='" + content + "'/>";
		},
		openImagePopup: function (content) {
			var newWindow = window.open("", "","scrollbars=0, toolbar=0");
			newWindow.document.write(content);
		},
		appendThumbnail: function (image) {
			var galleryElement = document.querySelector(defaults.imageGallerySelector);
			var thumbElement = domHandler.wrapThumbnail(image);
			thumbElement.addEventListener("click", domHandler.thumbnailClickHandler ,false);
			galleryElement.appendChild(thumbElement);
		},
		wrapThumbnail: function (image) {
			var thumbnailElement = document.createElement("a");
			thumbnailElement.classList.add("thumbnail");
			thumbnailElement.setAttribute("title", "click to enlarge");
			thumbnailElement.appendChild(image);

			return thumbnailElement;
		},
		bindEvents: function () {
			// @todo: input selector to config
			document.querySelector(defaults.imageProcessorFileInput).addEventListener("change", fileHandler.loadFiles, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("drop", fileHandler.dropZoneHandlers.drop, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("dragover", fileHandler.dropZoneHandlers.dragover, false);
			document.querySelector(defaults.dropZoneSelector).addEventListener("dragleave", fileHandler.dropZoneHandlers.dragleave, false);
		}
	};
}());