/* commented lines below are default values which are used in modules if in config below these fields are missing */

// var imageProcessorConf = {
// 	thumbSize: 150,
// 	imageGallerySelector: "#mainArea",
// 	fileTypesAllowed: "jpe?g|png", |  regexp
// 	fileSizeAllowed: 5242880,
// 	imageProcessorFileInput: "#imageLoader",
// 	dropZoneSelector: ".callout"
// };

var imageProcessorConf = {
	thumbSize: 120,
	imageGallerySelector: "#mainArea",
	fileTypesAllowed: "jpe?g|png|gif",
	fileSizeAllowed: 10485760,
	imageProcessorFileInput: "#imageLoader",
	dropZoneSelector: ".callout"
};