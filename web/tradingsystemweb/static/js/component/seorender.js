shinobi.seorender = {

	'gaid' : 'UA-138668527-1',

	'json' : [
			{
				'pageurl' : '/page/index',
				'pagename' : 'Aladin | Nền tảng kết nối cộng đồng nhà đầu tư chứng khoán chuyên nghiệp',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/traderlisting',
				'pagename' : 'Nhà tư vấn',
				'pagerender' : 'shinobi.seorender.listingPageRender'
			}, {
				'pageurl' : '/page/investorlisting',
				'pagename' : 'Nhà đầu tư',
				'pagerender' : 'shinobi.seorender.listingPageRender'
			}, {
				'pageurl' : '/page/blogoverview',
				'pagename' : 'Blog đầu tư',
				'pagerender' : 'shinobi.seorender.blogOverviewRender'
			}, {
				'pageurl' : '/page/blogpost/',
				'pagename' : 'Bài viết',
				'pagerender' : 'shinobi.seorender.blogPostRender'
			}, {
				'pageurl' : '/page/tradinginstruction',
				'pagename' : 'Hướng dẫn nhà đầu tư',

			}, {
				'pageurl' : '/page/account',
				'pagename' : 'Trang cá nhân',
				'pagerender' : 'shinobi.seorender.renderPublicUserProfilePage'
			}, {
				'pageurl' : '/page/traderaccount',
				'pagename' : 'Nhà tư vấn',
				'pagerender' : 'shinobi.seorender.renderPublicUserProfilePage'
			}, {
				'pageurl' : '/page/investoraccount',
				'pagename' : 'Nhà đầu tư',
				'pagerender' : 'shinobi.seorender.renderPublicUserProfilePage'
			}, {
				'pageurl' : '/page/traderguide',
				'pagename' : 'Hướng dẫn Nhà tư vấn',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/question',
				'pagename' : 'Các câu hỏi thường gặp',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/aboutus',
				'pagename' : 'Về Chúng tôi',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/job',
				'pagename' : 'Nghề nghiệp',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/privacypolicy',
				'pagename' : 'Chính sách Bảo mật',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/denyrisk',
				'pagename' : 'Khước từ rủi ro',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/investorserviceterms',
				'pagename' : 'Điều khoản NĐT',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/traderserviceterms',
				'pagename' : 'Điều khoản NTV',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/contact',
				'pagename' : 'Liên hệ',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/investwithaladin',
				'pagename' : 'Đầu tư cùng Aladin',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/traderintroduction',
				'pagename' : 'Hợp tác cùng Nhà tư vấn',
				'pagerender' : ''
			}, {
				'pageurl' : '/page/investorregistration',
				'pagename' : 'Đăng kí',
				'pagerender' : ''
			} ],

	'build' : function(callback) {

		shinobi.seorender.renderPageSeo(callback);
	},

	'renderPublicUserProfilePage' : function(item) {

		var pathName = window.location.pathname;

		var pathNameSplit = pathName.split('/');

		var pageUrl = pathNameSplit[pathNameSplit.length - 1];

		var request = {};
		request.pageurl = pageUrl;

		shinobi.api.request('/api/UserApi/getUsernameFromHomePage', JSON
				.stringify(request), function(response) {

			shinobi.api.request('/api/UserApi/getAllUserInfo', response,
					function(userInfo) {

						var userInfoObject = JSON.parse(userInfo);

						var fullName = userInfoObject.firstname + ' '
								+ userInfoObject.lastname;

						// document.title = fullName;

						var headContent = document.head.innerHTML;
						headContent = '<title>' + fullName + '</title>'
								+ headContent;
						document.head.innerHTML = headContent;
					});
		});
	},

	'blogPostRender' : function(item) {

		var request = {};

		var pathName = window.location.pathname;

		var pathNameSplit = pathName.split('/');

		var postUrl = pathNameSplit[pathNameSplit.length - 1];

		request.posturl = blogPostPageUrl + postUrl;

		shinobi.api.request('/api/BlogOverviewApi/getPreViewContent', JSON
				.stringify(request), function(response) {

			var jsonArr = JSON.parse(response);

			document.title = jsonArr.posttitle;

			var markup = '  <meta property="og:url" content="'
					+ window.location.href + '" />';
			markup = markup + ' <meta property="og:type" content="website" />';
			markup = markup + ' <meta property="og:title" content="'
					+ jsonArr.posttitle + '" />';

			// if (jsonArr.previewcontent) {
			//
			// markup = markup + ' <meta property="og:description" content="'
			// + jsonArr.previewcontent.replace('/(<([^>]+)>)/ig', '')
			// + '" />';
			// } else {
			// markup = markup + ' <meta property="og:description" content="'
			// + jsonArr.title + '" />';
			//			}

			markup = markup + '<meta property="og:image" content="'
					+ jsonArr.thumpnailurl + '" />';
			var headContent = document.head.innerHTML;
			headContent = markup + headContent;
			document.head.innerHTML = headContent;

		});

	},

	'blogOverviewRender' : function(item) {

		var pathName = window.location.pathname;

		var pathNameSplit = pathName.split('/');

		var postType = pathNameSplit[pathNameSplit.length - 2];

		var postFilter = pathNameSplit[pathNameSplit.length - 1];

		var title = er.postFiterConvert(postFilter)
				+ ' '
				+ shinobi.aladinUtil.convertPostTypeToVn(postType)
						.toLowerCase();

		var pageTitle = item.pagename + ': ' + title;

		// var headContent = document.head.innerHTML;
		// headContent = '<title>' + pageTitle + '</title>' + headContent;
		// document.head.innerHTML = headContent;

		document.title = pageTitle;

	},

	'listingPageRender' : function(item) {

		var pathName = window.location.pathname;

		var timeFrame;

		if (item.pageurl == pathName) {

			timeFrame = shinobi.investortraderlistingcontentheaderrender.defaultTimeFrame;

		} else {

			var pathNameSplit = pathName.split('/');

			timeFrame = pathNameSplit[pathNameSplit.length - 1];
		}

		// document.title = item.pagename + ': ' +
		// er.listingTimeFrame(timeFrame);

		var pageTitle = item.pagename + ': ' + er.listingTimeFrame(timeFrame);

		// var headContent = document.head.innerHTML;
		// headContent = '<title>' + pageTitle + '</title>' + headContent;
		// document.head.innerHTML = headContent;

		document.title = pageTitle;

	},

	'defaultRender' : function(item) {

		// var headContent = document.head.innerHTML;
		// headContent = '<title>' + item.pagename + '</title>' + headContent;
		// document.head.innerHTML = headContent;

		document.title = item.pagename;

	},

	'addGA' : function() {
		ga("create", shinobi.seorender.gaid, "auto");
		ga("send", "pageview");
	},

	'renderPageSeo' : function(callback) {

		var jsonArr = shinobi.seorender.json;

		var pathName = window.location.pathname;

		for (var i = 0; i < jsonArr.length; i++) {

			var item = jsonArr[i];

			// var pageUrlRegex = new RegExp(item.pageurl, "igs");

			// if (pageUrlRegex.test(pathName)) {

			if (pathName.includes(item.pageurl)) {
				if (!item.pagerender || item.pagerender == ''
						|| item.pagerender == null) {

					shinobi.seorender.defaultRender(item);
				} else {

					eval(item.pagerender)(item);
				}

				setTimeout(function() {

					callback(true);
				}, 2000);

				return;
			}
		}

		callback(false);
	},

};