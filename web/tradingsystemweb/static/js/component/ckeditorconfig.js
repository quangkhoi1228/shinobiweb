if (typeof CKEDITOR == "object") {

	CKEDITOR.editorConfig = function(config) {
		config.language = 'vi';
		config.height = 300;
		config.toolbarCanCollapse = true;
		config.allowedContent = true;
		config.bodyClass = 'content column';
		config.contentsCss = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css';
	};
};