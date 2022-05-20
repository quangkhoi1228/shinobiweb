shinobi.articleMarkUp = {
	'title' : 'Aladin | Nền tảng kết nối cộng đồng nhà đầu tư chứng khoán chuyên nghiệp',
	'gaid' : "UA-119675169-1",
	'headLine' : '',
	'postURL' : '',
	'image' : 'image.aladin.finance/aladin.finance.public.image/783d7f463d1a8269ab447d3593641cae/HVN.png',
	'datePublished' : new Date(),
	'dateModified' : new Date(),
	'authorName' : '',
	'authorImageURL' : '',
	'publisherName' : 'Aladin | aladin.finance',
	'publisherLogoURL' : 'https://image.aladin.finance/aladin.finance.public.image/c73f7e23e7ccb4d33744cd03cfc8a18f/Aladin-Logo-test.png',
	'description' : '',

	'buildArticleMarkupScript' : function() {
		var content = '';

		content += '<script type="application/ld+json">{';
		content += '"@context": "https://schema.org", "@type": "NewsArticle",';
		content += '"mainEntityOfPage": {"@type": "WebPage", "@id": "'
				+ shinobi.articleMarkUp.postURL + '"},';
		content += '"headline": "' + shinobi.articleMarkUp.title + '",';
		content += '"image": ["' + shinobi.articleMarkUp.image + '"],';
		content += '"datePublished": "' + shinobi.articleMarkUp.datePublished
				+ '",';
		content += '"dateModified": "' + shinobi.articleMarkUp.dateModified
				+ '",';
		content += '"author": {"@type": "Person", "name": "'
				+ shinobi.articleMarkUp.authorName + '",';
		content += '"image": {"@type": "ImageObject", "url": "'
				+ shinobi.articleMarkUp.authorImageURL + '"}},';
		content += '"publisher": {"@type": "Organization", "name": "'
				+ shinobi.articleMarkUp.publisherName + '",';
		content += '"logo": {"@type": "ImageObject", "url": "'
				+ shinobi.articleMarkUp.publisherLogoURL + '"}},';
		content += '"description": "' + shinobi.articleMarkUp.description
				+ '"}';
		content += '</script>';

		return content;
	},

	'addGA' : function() {
		ga("create", shinobi.articleMarkUp.gaid, "auto");
		ga("send", "pageview");
	},

	'buildArticleMarkUp' : function() {

		var pathName = window.location.pathname;

		var pathNameSplit = pathName.split('/');

		var postUrl = pathNameSplit[pathNameSplit.length - 1];

		var request = {};

		request.posturl = blogPostPageUrl + postUrl;

		// shinobi.api.request('/api/BlogOverviewApi/getTraderPostDetail', JSON

		shinobi.api.request('/api/BlogOverviewApi/getPreViewContent', JSON
				.stringify(request), function(response) {

			var jsonArr = JSON.parse(response);

			shinobi.articleMarkUp.getAuthorInfo(jsonArr.createduser,
					function() {
						shinobi.articleMarkUp.setNewParam(jsonArr);

						shinobi.articleMarkUp.applyToHead();

						shinobi.articleMarkUp.addGA();
					});
		});
	},

	'getAuthorInfo' : function(userName, callback) {
		var request = {};
		request.username = userName;
		shinobi.api.request('/api/UserApi/getAllUserInfo', JSON
				.stringify(request), function(response) {

			var jsonArr = JSON.parse(response);

			shinobi.articleMarkUp.authorImageURL = jsonArr.avatarlink;
			shinobi.articleMarkUp.authorName = jsonArr.firstname + " "
					+ jsonArr.lastname;

			callback();
		});
	},

	'setNewParam' : function(data) {

		if (data.posttitle.includes('"')) {
			shinobi.articleMarkUp.title = data.posttitle.replace(/"/g, '\\"');
		} else {
			shinobi.articleMarkUp.title = data.posttitle;
		}

		shinobi.articleMarkUp.dateModified = data.lastmodifieddate;
		shinobi.articleMarkUp.datePublished = data.createddate;
		shinobi.articleMarkUp.image = data.thumpnailurl;
		shinobi.articleMarkUp.postURL = 'https://www.aladin.finance'
				+ data.posturl;

	},

	'applyToHead' : function() {
		var headContent = document.head.innerHTML;

		headContent = headContent
				+ shinobi.articleMarkUp.buildArticleMarkupScript();
		document.head.innerHTML = headContent;

	},

	'build' : function() {

		shinobi.articleMarkUp.buildArticleMarkUp();
	}

}
