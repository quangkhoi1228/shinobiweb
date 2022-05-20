if (typeof CKEDITOR == "object") {
	CKEDITOR.editorConfig = function(config) {
		config.language = 'vi';
		config.height = 300;
		config.toolbarCanCollapse = true;
		config.allowedContent = true;
		config.bodyClass = 'document-editor content has-padding-1-rem';
		config.contentsCss = '/static/production/shinobi_2.css';
	}
};