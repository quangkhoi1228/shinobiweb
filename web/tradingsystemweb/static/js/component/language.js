shinobi.language = {

	'currentPagelang': '',
	'existLangAttribte': 'snb-exist-lang',
	option: {},
	jsonArray: [],
	dataRender: {},
	hasChangeLanguage: true,
	warningList: [],

	'build': function (option) {

		this.option = option;
		this.setupOption();

		shinobi.language.renderLangCodeSelect(function () {
			shinobi.language.renderPageLanguage();

		});

	},

	setupOption: function () {
		var option = this.option;
		if (option) {
			if (option.hasOwnProperty('autoReload') && option['autoReload']) {
				setInterval(function () {
					shinobi.language.renderPageLanguage();
				}, 2000);
			}
		}
	},

	'renderPageLanguage': function () {

		if (shinobi.language.hasChangeLanguage) {
			shinobi.language.getLangCodeList(function () {
				shinobi.language.hasChangeLanguage = false;

				shinobi.language.buildDataRender(function () {
					shinobi.language.render();
				});
			})
		} else {
			shinobi.language.render();
		}

	},

	buildDataRender: function (callback) {
		shinobi.language.dataRender = {};
		shinobi.language.jsonArray
			.forEach(function (item) {

				shinobi.language.dataRender[item['resourcename']] = item['resourcevalue'];

			});

		if (typeof callback == 'function') {
			callback();
		}
	},
	'render': function () {

		var listSnbLang = document.querySelectorAll('[snb-lang]');
		for (var i = 0; i < listSnbLang.length; i++) {

			shinobi.language.renderElement(listSnbLang[i]);
		}
	},

	renderContainer: function (container) {

		var listSnbLang = container.querySelectorAll('[snb-lang]');
		for (var i = 0; i < listSnbLang.length; i++) {

			shinobi.language.renderElement(listSnbLang[i]);
		}
	},
	renderElement: function (elem) {

		var currentLangCode = window.localStorage.getItem('currentLangCode');
		if (!elem.hasAttribute('language')
			|| elem.getAttribute('language') != currentLangCode) {

			var dataRender = shinobi.language.dataRender;

			var listAttribute = Object.values(elem.attributes);

			var listSnbLangAttribute = listAttribute.filter(function (item) {

				return item.name.includes('snb-lang');
			});

			if (listSnbLangAttribute.length > 0) {
				var attrValue;
				if (listSnbLangAttribute.length == 1) {

					if (dataRender
						.hasOwnProperty(listSnbLangAttribute[0].value)) {
						elem.innerHTML = dataRender[listSnbLangAttribute[0].value];
					} else {

						attrValue = listSnbLangAttribute[0].value;

						shinobi.language.warningElem(elem, attrValue);

					}
				} else {
					listSnbLangAttribute.forEach(function (attributeItem) {
						var attrName = attributeItem.name;
						attrValue = attributeItem.value;
						if (attrName.includes('snb-lang-')) {
							var attributeKey = attrName
								.replace('snb-lang-', '');
							if (dataRender.hasOwnProperty(attrValue)) {
								var attributeData = dataRender[attrValue];

								if (attributeKey == 'innerhtml') {
									elem.innerHTML = attributeData
								} else if (attributeKey == 'value') {
									elem.value = attributeData;
								} else {
									elem.setAttribute(attributeKey,
										attributeData);

								}
							} else {

								shinobi.language.warningElem(elem, attrValue);

							}

						}
					});

				}
				elem.setAttribute('language', currentLangCode)

			}
		}

	},

	warningElem: function (elem, attrValue) {
		if (!shinobi.language.warningList.includes(attrValue)) {
			console.log('---');
			console.log(elem);
			console.log('resourcename: ' + attrValue + '    =    ????');
			shinobi.language.warningList.push(attrValue);
		}
	},

	'renderLangCodeSelect': function (callback) {

		var currentLangCode = window.localStorage.getItem('currentLangCode');
		var selectLangcode = document.getElementById('selectLangcode');
		if (selectLangcode) {
			if (!currentLangCode) {

				window.localStorage.setItem('currentLangCode',
					selectLangcode.value);

			} else {

				selectLangcode.value = currentLangCode;

			}

			selectLangcode.onchange = function () {

				window.localStorage.setItem('currentLangCode', this.value);
				if (shinobi.hasOwnProperty('userstorage')) {
					shinobi.userstorage.updateStorage();
				}
				shinobi.language.hasChangeLanguage = true;

				shinobi.language.renderPageLanguage();

				if (shinobi.language.option.hasOwnProperty('onchangeLangCodeSelectCallback')) {
					shinobi.language.option.onchangeLangCodeSelectCallback();
				}

			}
		} else {
			console.log(' not declare language select');
			window.localStorage.setItem('currentLangCode', 'VN');

		}

		if (typeof callback == 'function') {
			callback();
		}

	},

	'getLangCodeList': function (callback) {

		var currentLangCode = window.localStorage.getItem('currentLangCode');

		var request = {};

		request.langcode = currentLangCode;

		var url = (typeof shinobi.coreapi == 'object' && shinobi.coreapi.languageApi) ? shinobi.coreapi.languageApi
			: '/api/StaticPagePublicApi/';

		shinobi.cacheapi.request(url + 'getListPageCode', JSON
			.stringify(request), function (response) {
				shinobi.language.jsonArray = JSON.parse(response);
				callback(response);
			});

	},

	'free': '<span snb-lang="PAGECODE_FREE"></span>',
	'subscribed': '<span snb-lang="PAGECODE_SUBCRIBED"></span>',
	'onlyFollower': '<span snb-lang="PAGECODE_ONLYFORFOLLOWERS"></span>',
};