var fileHandler = (function () {
	var defaults = {
		fileTypesAllowed: imageProcessorConf.fileTypesAllowed || "jpe?g|png",
		fileSizeAllowed: imageProcessorConf.fileSizeAllowed || 5242880
	};
	return {
		loadFiles: function (e) {
			e.preventDefault();
			var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
			console.log("files", files);
			domHandler.clearThumbnailGallery();
			for (var i = 0; i < files.length; i++) {
				fileHandler.processFile(files[i]);
			}
		},
		processFile: function (file) {
			if(fileHandler.checkFileType(file) && fileHandler.checkFileSize(file)) {
				var reader = new FileReader();
				reader.onload = imageProcessor.processLoadedImage;
				reader.readAsDataURL(file);
			} else {
				console.warn("coming thru, not an suitable image file", file.name);
			}
		},
		checkFileType: function (file) {
			var typesAllowed = defaults.fileTypesAllowed;
			return new RegExp("\\.("+typesAllowed+")$", "i").test(file.name);
		},
		checkFileSize: function (file) {
			return file.size < defaults.fileSizeAllowed;
		},
		dropZoneHandlers: {
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