/* global */

var fileHandler = (function () {
	var config = {};
	function init (input) {
		config = input;
		domHandler.bindEvents();
	}
	var dropzonehandlers = {
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
	};
	function loadFiles (e) {
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
	}
	function processFile (file) {
		// … mostly validating for name and size
		if(fileHandler.checkFileType(file) && fileHandler.checkFileSize(file)) {
			// initializing fileReader api
			var reader = new FileReader();
			// overriding readers load event
			reader.onload = galleryModule.loadedImageHandler;
			// reading file by reader and converting to base64
			reader.readAsDataURL(file);
		} else {
			// place for handling files other than images
			console.warn("coming thru, not an suitable image file", file.name);
		}
	}
	function checkFileType (file) {
		// checking if provided file is proper image file, via regexp
		var typesAllowed = config.fileTypesAllowed;
		return new RegExp("\\.("+typesAllowed+")$", "i").test(file.name);
	}
	function checkFileSize (file) {
		// check if file size is not exceeding acceptable file size (5mb)
		return file.size < config.fileSizeAllowed;
	}
	return {
		init: init,
		loadFiles: loadFiles,
		processFile: processFile,
		checkFileType: checkFileType,
		checkFileSize: checkFileSize,
		dropZoneHandlers: dropzonehandlers
	};
}());