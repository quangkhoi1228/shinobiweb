shinobi.menumodule = {

	'currentModule': '',

	'patern': '',

	'container': '',

	'build': function (patern, option) {

		shinobi.menumodule.patern = patern;

		var container = document.querySelectorAll(patern)[0];

		shinobi.menumodule.container = container;

		shinobi.menumodule.render(option);

	},

	'activeCurrentTab': function (container, option) {
		var shinobimenu = container;
		var hrefList = shinobimenu.querySelectorAll('[href]');

		for (var j = 0; j < hrefList.length; j++) {
			var pathname = window.location.pathname;
			var href = hrefList[j].getAttribute('href');
			if (option && option.hasOwnProperty('includesSearch')) {
				if (option.includesSearch) {
					pathname = pathname + window.location.search;
				}
			}

			if (option && option.hasOwnProperty('notCareSearch')) {
				if (option.notCareSearch) {
					pathname = window.location.pathname;
					href = (href.indexOf('?')) ? href.slice(0, href.indexOf('?')) : href;
				}
			}
			if (href == pathname) {

				hrefList[j].parentNode.classList.add('is-active');

				shinobi.menumodule
					.openParentNode(hrefList[j].parentNode.parentNode);

			}
		}
	},

	'renderMenuModuleSelectHeader': function (query) {

		var currentModule = window.localStorage.getItem('currentModule');
		if (!currentModule || currentModule == '') {
			shinobi.menumodule.setDefaultModule(function () {
				shinobi.menumodule.buildHeaderSelectMenuModule(query);
			});
		} else {
			shinobi.menumodule.buildHeaderSelectMenuModule(query);
		}

	},

	buildHeaderSelectMenuModule: function (query) {
		var container = document.querySelector(query);

		container
			.setAttribute('class', 'navbar-item has-dropdown is-hoverable');

		var a = document.createElement('a');
		a.setAttribute('class', 'navbar-link');
		a.innerHTML = '<span class="icon"><i class="fal fa-cog"></i></span> <span>' + window.localStorage.getItem('currentModule') + '</span>';

		container.appendChild(a);

		shinobi.menumodule.getListModule(function (listMenu) {

			var listMenuData = JSON.parse(listMenu);

			var menuContainer = document.createElement('div');

			menuContainer.setAttribute('class', 'navbar-dropdown is-right');

			container.appendChild(menuContainer);

			for (var i = 0; i < listMenuData.length; i++) {

				shinobi.menumodule.buildHeaderMenuModuleItem(menuContainer,
					listMenuData, i);
			}

		})
	},

	'buildHeaderMenuModuleItem': function (menuContainer, listMenuData, i) {

		var item = document.createElement('a');
		item.setAttribute('class', 'navbar-item');
		item.innerHTML = listMenuData[i];
		menuContainer.appendChild(item);

		item.onclick = function () {
			var value = this.innerHTML;
			window.localStorage.setItem('currentModule', value);
			shinobi.menumodule.getListMenuModule(value, function (data) {
				if (data.length > 0) {
					window.location.href = data[0].menuurl;
				} else {
					location.reload();
				}
			});
		}

	},

	'setDefaultModule': function (callback) {

		shinobi.menumodule.getListModule(function (listMenuData) {

			var data = JSON.parse(listMenuData);

			if (data[0]) {

				// if (!window.localStorage.getItem('currentModule')) {

				window.localStorage.setItem('currentModule', data[0]);

				// }

				if (typeof callback == 'function') {

					callback()
				}

			}

		});
	},

	'getListModule': function (callback) {

		var request = {};
		shinobi.cacheapi.request('/authenapi/ModuleApi/getUserModules', JSON
			.stringify(request), function (response) {
				callback(response);
			})

	},

	'openParentNode': function (currentItem, container) {

		setTimeout(function () {

			// menuParent.scrollIntoView();

			var menu = container;
			var item = currentItem.getElementsByTagName('a')[0].parentNode;
			var a = Number(item + (5 * 17));
			if (container) {
				if (container.hasOwnProperty('scrollTop')) {
					container.scrollTop = item.offsetTop;
				}
			}

		}, 1000)

		var menuParent = currentItem.parentNode;

		if (menuParent.getAttribute('class')
			&& menuParent.getAttribute('class').includes('ul-submenu')) {

			menuParent.previousElementSibling.click();

			shinobi.menumodule.openParentNode(menuParent.parentNode, container);

		}
	},

	'render': function (option) {
		if (window.localStorage.getItem('currentModule')) {
			var modulename = window.localStorage.getItem('currentModule');

			shinobi.menumodule.getListMenuModule(modulename, function (jsonArr) {
				var data = jsonArr;
				shinobi.menurender.build(shinobi.menumodule.patern, data);

				shinobi.menumodule.activeCurrentTab(shinobi.menumodule.container);

				if (option && option.hasOwnProperty('callback')) {
					option.callback();
				}
			})
		} else {
			setTimeout(function () {
				shinobi.menumodule.render(option);
			}, 200)
		}
	},

	getListMenuModule: function (modulename, callback) {
		var request = {};
		request.modulename = modulename;
		shinobi.cacheapi.request('/authenapi/MenuApi/getListMenu', JSON
			.stringify(request), function (response) {
				var jsonArr = JSON.parse(response);

				callback(jsonArr);
			});
	}
};