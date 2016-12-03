/* global imageProcessorConf, domHandler */

var fileHandler = (function () {
	var defaults = {
		fileTypesAllowed: imageProcessorConf.fileTypesAllowed || "jpe?g|png",
		fileSizeAllowed: imageProcessorConf.fileSizeAllowed || 5242880
	};
	return {
		// loading files method - prepared for use with draganddrop events and input[file] change event
		loadFiles: function (e) {
			// preventing default behaviour - because drop navigate to dropped file
			e.preventDefault();
			// changing files collection
			var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
			// clearing gallery container every time
			domHandler.clearThumbnailGallery();
			// processing each file…
			for (var i = 0; i < files.length; i++) {
				fileHandler.processFile(files[i]);
			}
		},
		processFile: function (file) {
			// … mostly validating for name and size
			if(fileHandler.checkFileType(file) && fileHandler.checkFileSize(file)) {
				// initializing fileReader api
				var reader = new FileReader();
				// overriding readers load event
				reader.onload = imageProcessor.loadedImageHandler;
				// reading file by reader and converting to base64
				reader.readAsDataURL(file);
			} else {
				// place for handling files other than images
				console.warn("coming thru, not an suitable image file", file.name);
			}
		},
		checkFileType: function (file) {
			// checking if provided file is proper image file, via regexp
			var typesAllowed = defaults.fileTypesAllowed;
			return new RegExp("\\.("+typesAllowed+")$", "i").test(file.name);
		},
		checkFileSize: function (file) {
			// check if file size is not exceeding acceptable file size (5mb)
			return file.size < defaults.fileSizeAllowed;
		},
		dropZoneHandlers: {
			// handlers for dropzone
			drop: function (e) {
				e.target.classList.remove("dropzonehover");
				fileHandler.loadFiles(e);
				e.preventDefault();
			},
			dragover: function (e) {
				e.target.classList.add("dropzonehover");
				e.preventDefault();
			},
			dragleave: function (e) {
				e.target.classList.remove("dropzonehover");
				e.preventDefault();
			}
		}
	};
}());