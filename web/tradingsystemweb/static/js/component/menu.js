shinobi.menu = {

	'moduleTable': '',

	'tableId': 'dataTable',

	'previewPatern': '#previewContainer',

	'build': function () {

		shinobi.menu.renderListModule();

		shinobi.menu.addEventAddSubMenu();

		shinobi.menu.addEventIconPicker();
	},

	'addEventIconPicker': function () {

		if (!shinobi.initbulma) {
			bulmaIconpicker.attach();
		}

		setTimeout(function () {

			var iconpickerModal = document
				.getElementsByClassName('iconpicker-modal')[0];

			iconpickerModal.classList.add('is-medium');

		}, 2000);

	},

	'addEventAddSubMenu': function () {

		var createSubmenuButton = document
			.getElementById('createSubmenuButton');
		createSubmenuButton.onclick = function () {

			var previewContainer = document.getElementById('previewContainer');

			var parentMenuData = {};
			// parentMenuData.menuparent = null;
			parentMenuData.modulename = previewContainer.getAttribute('value');

			shinobi.menu
				.activeMenuItemInfomationModal(
					parentMenuData,
					function (menuData) {
						shinobi.menu
							.createAndInsertMenuItemChildNode(menuData);
					});
		}

	},
	'renderListModule': function () {

		shinobi.menu.moduleTable = new shinobi.table(shinobi.menu.tableId);
		// table1.viewDetailPanelId = "detailpanel";

		var colNames = shinobi.menu.moduleTable
			.getColnames(shinobi.menu.tableId);

		var renders = [];
		renders[0] = shinobi.menu.viewMenuStructure;
		// renders[1] = table1.numberFormatRender;
		// renders[2] = erLib.renderUserTypeTable;
		// renders[3] = table1.inputableRender;

		var request = {};
		request.recordPerPage = shinobi.util
			.getRecordNumber(shinobi.menu.tableId);

		var filter = {};
		filter.colname = "id";
		filter.operator = ">";
		filter.value = 0;

		shinobi.menu.moduleTable.staticfilters[0] = filter;

		var sort = {};
		sort.colname = "id";
		sort.value = "desc";

		shinobi.menu.moduleTable.sorts[0] = sort;

		shinobi.menu.moduleTable
			.initLoadApi("/authenapi/ModuleApi/findDataList", request,
				colNames, renders);

	},

	'viewMenuStructure': function (elem, row, col) {

		var moduleName = elem.innerHTML;

		elem.innerHTML = '<a class="button is-small is-icon is-info"><span class="icon"><i class="fal fa-search"></i></span></a>';

		elem.onclick = function () {

			shinobi.util.removeClass('menuButtonGroup', 'is-hidden');

			shinobi.menu.createStructure(moduleName);

		}
	},

	'createStructure': function (moduleName) {

		shinobi.menu.getModuleMenuData(moduleName, function (menuData) {

			var previewContainer = document.getElementById('previewContainer');
			previewContainer.innerHTML = '';

			previewContainer.setAttribute('value', moduleName);

			shinobi.menurender.build(shinobi.menu.previewPatern, menuData);

			shinobi.menurender.showAllMenu(shinobi.menu.previewPatern);

			setTimeout(function () {

				shinobi.menurender.showAllMenu(shinobi.menu.previewPatern);
			}, 1000);

			shinobi.menu.addEventInsertChildNode(shinobi.menu.previewPatern);

			shinobi.menu.addEventDeleteMenuItem(shinobi.menu.previewPatern);

			shinobi.menu.addEventUpdateMenuItem(shinobi.menu.previewPatern);

			shinobi.menu.addEventMoveUpMenuItem(shinobi.menu.previewPatern);

			shinobi.menu.addEventMoveDownMenuItem(shinobi.menu.previewPatern);

		});

	},

	'addEventMoveDownMenuItem': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var listMenuItem = container.getElementsByClassName('shinobimenu-item');

		for (var i = 0; i < listMenuItem.length; i++) {

			shinobi.menu.addMoveDownItemButton(listMenuItem, i);

		}
	},

	'addMoveDownItemButton': function (listMenuItem, i) {

		var span = document.createElement('span');
		span.setAttribute('class', 'icon tooltip');
		span.setAttribute('data-tooltip', 'Chuyển xuống');
		span.innerHTML = '<i class="fal fa-arrow-down"></i>';

		var item = listMenuItem[i];

		if (item.parentNode.nextElementSibling) {

			// item.insertBefore(span, item.firstChild);
			item.appendChild(span);

			span.onclick = function () {

				var parentMenuData = shinobi.menu.getParentMenuData(this);

				parentMenuData.menucode = parentMenuData.menuparent;

				shinobi.menu.callApiUpdateMenu(
					'/authenapi/MenuApi/moveMenuDown', parentMenuData);

			}
		}

	},

	'addEventMoveUpMenuItem': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var listMenuItem = container.getElementsByClassName('shinobimenu-item');

		for (var i = 0; i < listMenuItem.length; i++) {

			shinobi.menu.addMoveUpItemButton(listMenuItem, i);

		}
	},

	'addMoveUpItemButton': function (listMenuItem, i) {

		var span = document.createElement('span');
		span.setAttribute('class', 'icon tooltip');
		span.setAttribute('data-tooltip', 'Chuyển lên');
		span.innerHTML = '<i class="fal fa-arrow-up"></i>';

		var item = listMenuItem[i];

		if (item.parentNode.previousElementSibling) {

			// item.insertBefore(span, item.firstChild);
			item.appendChild(span);

			span.onclick = function () {

				var parentMenuData = shinobi.menu.getParentMenuData(this);

				parentMenuData.menucode = parentMenuData.menuparent;

				shinobi.menu.callApiUpdateMenu('/authenapi/MenuApi/moveMenuUp',
					parentMenuData);

			}
		}
	},

	'callApiUpdateMenu': function (api, parentMenuData) {
		shinobi.notification.notification.loading();
		shinobi.api.request(api, JSON.stringify(parentMenuData), function (
			response) {

			if (response == 'update success') {

				shinobi.notification.notification.info('Cập nhật thành công');
				setTimeout(function () {
					shinobi.menu.createStructure(parentMenuData.modulename);
				}, 1000)
			}
		})
	},

	'addEventUpdateMenuItem': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var listMenuItem = container.getElementsByClassName('shinobimenu-item');

		for (var i = 0; i < listMenuItem.length; i++) {

			shinobi.menu.addUpdateItemButton(listMenuItem, i);

		}
	},

	'addUpdateItemButton': function (listMenuItem, i) {

		var span = document.createElement('span');
		span.setAttribute('class', 'icon has-text-info tooltip');
		span.setAttribute('data-tooltip', 'Chỉnh sửa');
		span.innerHTML = '<i class="fal fa-pen"></i>';

		var item = listMenuItem[i];

		// item.insertBefore(span, item.firstChild);
		item.appendChild(span);

		span.onclick = function () {

			var parentMenuData = shinobi.menu.getParentMenuData(this);
			var aTag = item.getElementsByTagName('a')[0];
			parentMenuData.menudes = aTag.getAttribute('title');
			parentMenuData.menucode = aTag.getAttribute('id');
			parentMenuData.menuicon = aTag.getAttribute('icon-class');
			parentMenuData.menuname = aTag.innerHTML;
			parentMenuData.menuurl = aTag.getAttribute('href');
			shinobi.menu
				.activeMenuItemInfomationModal(
					parentMenuData,
					function (menuData) {

						menuData.menucode = parentMenuData.menucode;

						shinobi.api
							.request(
								'/authenapi/MenuApi/updateMenu',
								JSON.stringify(menuData),
								function (response) {

									if (response == 'update success') {

										shinobi.notification.notification
											.info('Cập nhật thành công');
										setTimeout(
											function () {
												shinobi.menu
													.createStructure(parentMenuData.modulename);
											}, 1000)
									}
								});
					});

		}

	},

	'addEventDeleteMenuItem': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var listMenuItem = container.getElementsByClassName('shinobimenu-item');

		for (var i = 0; i < listMenuItem.length; i++) {

			shinobi.menu.addDeleteItemButton(listMenuItem, i);

		}
	},

	'addDeleteItemButton': function (listMenuItem, i) {

		var span = document.createElement('span');
		span.setAttribute('class', 'icon has-text-danger tooltip');
		span.setAttribute('data-tooltip', 'Xóa');
		span.innerHTML = '<i class="fal fa-times"></i>';

		var item = listMenuItem[i];

		// item.insertBefore(span, item.firstChild);
		item.appendChild(span);

		span.onclick = function () {

			var parentMenuData = shinobi.menu.getParentMenuData(this);

			var confirmRemoveMenuItemModal = document
				.getElementById('confirmRemoveMenuItemModal');
			confirmRemoveMenuItemModal.classList.add('is-active');

			var acceptRemoveMenuItemModal = document
				.getElementById('acceptRemoveMenuItemModal');

			acceptRemoveMenuItemModal.onclick = function () {

				parentMenuData.menucode = parentMenuData.menuparent;

				delete parentMenuData.menuparent;

				shinobi.api
					.request(
						'/authenapi/MenuApi/deleteMenu',
						JSON.stringify(parentMenuData),
						function (response) {

							if (response == 'update success') {

								shinobi.notification.notification
									.info('Xóa thành công');
								setTimeout(
									function () {
										shinobi.menu
											.createStructure(parentMenuData.modulename);
									}, 1000)
							}
						})

				confirmRemoveMenuItemModal.classList.remove('is-active');

			}

		}

	},

	'activeMenuItemInfomationModal': function (parentMenuData, callback) {

		if (!parentMenuData.menudes) {

			parentMenuData.menudes = '';
		}
		if (!parentMenuData.menuicon) {

			parentMenuData.menuicon = shinobi.menurender.defaultIcon;
		}
		if (!parentMenuData.menuname) {

			parentMenuData.menuname = '';
		}
		if (!parentMenuData.menuurl) {

			parentMenuData.menuurl = '';
		}

		var menuItemInfomationModal = document
			.getElementById('menuItemInfomationModal');

		if (!parentMenuData.menuparent) {

			menuItemInfomationModal.querySelectorAll('[snb-key=menuparent]')[0]
				.removeAttribute('value');
		}
		var previewIcon = menuItemInfomationModal
			.getElementsByClassName('iconpicker-preview')[0];

		previewIcon.innerHTML = '<i snb-key="menuicon" snb-key-class="menuicon" class="iconpicker-icon-preview icon-menu"></i>';

		menuItemInfomationModal.classList.add('is-active');

		shinobi.mapping.render('#menuItemInfomationModal', JSON
			.stringify(parentMenuData));

		var acceptModalButton = document.getElementById('acceptModalButton');

		acceptModalButton.onclick = function () {

			var menuData = shinobi.menu.getModalInput();

			callback(menuData);

			menuItemInfomationModal.classList.remove('is-active');

		}
	},

	'addEventInsertChildNode': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var listMenuItem = container.getElementsByClassName('shinobimenu-item');

		for (var i = 0; i < listMenuItem.length; i++) {

			shinobi.menu.addInsertItemButton(listMenuItem, i);

		}

	},
	'addInsertItemButton': function (listMenuItem, i) {

		var span = document.createElement('span');
		span.setAttribute('class', 'icon has-text-success tooltip');
		span.setAttribute('data-tooltip', 'Thêm menu con');
		span.innerHTML = '<i class="fal fa-plus"></i>';

		var item = listMenuItem[i];

		// item.insertBefore(span, item.firstChild);
		item.appendChild(span);

		span.onclick = function () {

			var parentMenuData = shinobi.menu.getParentMenuData(this);

			shinobi.menu
				.activeMenuItemInfomationModal(
					parentMenuData,
					function (menuData) {
						shinobi.menu
							.createAndInsertMenuItemChildNode(menuData);
					});

		}

		// remove event toggle
		item.onclick = function () {

		}
	},

	'createAndInsertMenuItemChildNode': function (menuData) {

		shinobi.notification.notification.loading();

		shinobi.api.request('/authenapi/MenuApi/createMenu', JSON
			.stringify(menuData), function (response) {

				if (response == 'update success') {

					shinobi.notification.notification.info('Tạo mới thành công');

					setTimeout(function () {
						shinobi.menu.createStructure(menuData.modulename);
					}, 1000)

				}
			})

	},
	'getParentMenuData': function (iconElem) {

		var menuItem = iconElem.parentNode;

		var aTag = menuItem.getElementsByTagName('a')[0];

		var previewContainer = document.getElementById('previewContainer');

		var object = {};

		object.menuparent = aTag.getAttribute('id');
		object.modulename = previewContainer.getAttribute('value');

		return object;

	},

	'getModalInput': function () {

		var menuItemInfomationModal = document
			.getElementById('menuItemInfomationModal');

		var listSnbKey = menuItemInfomationModal.querySelectorAll('[snb-key]');

		var object = {};

		for (var i = 0; i < listSnbKey.length; i++) {

			var snbKey = listSnbKey[i].getAttribute('snb-key');

			var value = listSnbKey[i].value;

			if (value != '') {

				object[snbKey] = value;
			}

		}

		var iconpickerPreview = document
			.getElementsByClassName('iconpicker-preview')[0];
		var iconClass = iconpickerPreview.getElementsByTagName('i')[0]
			.getAttribute('class');
		object.menuicon = iconClass;
		return object;
	},
	'getModuleMenuData': function (moduleName, callback) {

		var request = {};
		request.modulename = moduleName;
		console.log(window.localStorage.getItem("currentModule"));
		console.log(moduleName);
		shinobi.notification.notification.loading();

		shinobi.api.request('/authenapi/MenuApi/getListMenu', JSON
			.stringify(request), function (response) {

				var jsonArr = JSON.parse(response);
				shinobi.notification.notification.loaded();

				callback(jsonArr);
			});
	},

};