shinobi.seoMarkUpBuilder = {
	'baseURL': '/page/blogpost/',
	'JSON': [{
		'baseurl': '/page/blogpost/',
		'pagename': 'Bài viết',
		'markuprender': 'shinobi.articleMarkUp.build'
	}],

	'getJSON': function () {
		var request = {};
		request.baseurl = baseURL;

		shinobi.api.request('/api/Api/getJSON', JSON.stringify(request),
			function (response) {
				var jsonArr = JSON.parse(response);
				shinobi.seoMarkUpBuilder.JSON = jsonArr;
			});
	},

	'render': function () {
		// shinobi.seoMarkUpBuilder.getJSON();

		var jsonArr = shinobi.seoMarkUpBuilder.JSON;

		var pathName = window.location.pathname;

		for (var i = 0; i < jsonArr.length; i++) {
			var item = jsonArr[i];

			if (pathName.includes(item.baseurl)) {
				if (!item.markuprender || item.markuprender == ''
					|| item.markuprender == null) {

					shinobi.seoMarkUpBuilder.defaultRender();
				} else {

					eval(item.markuprender)();
				}

			}
		}

	},

	'defaultRender': function () {

	},

	'build': function () {

		shinobi.seoMarkUpBuilder.render();
	}

};
