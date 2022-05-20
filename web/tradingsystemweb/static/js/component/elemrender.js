var publicAccountLink = '/page/account/';
var ratingDetailLink = '/page/ratingdetail/';
var blogPostPageUrl = '/page/blogpost/';
var adminPostCheckPageUrl = '/system/adminpostcheckdetail/';
var beginDateDatalist = '2019-01-01';
var endDateDatalist = '2100-01-01';
var blogIconImageLink = '/static/image/blogicon.svg';
var copyTradeIconImageLink = '/static/image/copytradeicon.svg';
var aladinLogo = '/static/image/aladin.svg';
var groupAvatar = 'https://image.aladin.finance/aladin.finance.public.file/517da259fc9feb05f65994fb850f09e4/groupchatavatar.png';
var format = function (value) {
	return Number(value).format(0, 3, ',', '.');
};
var formatInputTagDatalist = function (elem, value) {
	elem.value = format(value);
};
var formatNumberTable = function (cell, row, col, allData) {
	var value = cell.innerHTML;
	cell.innerHTML = '';
	formatInputTagDatalist(cell, value);
};
var cancelModal = function (id) {
	var modal = document.getElementById(id);
	modal.classList.remove('is-active');
};
var renderPriceOrderTable = function (cell, row, col) {
};
var renderRoomAvatarDataList = function (elem, value) {
	if (value.trim() == '') {
		elem.setAttribute('src', groupAvatar);
	} else {
		elem.setAttribute('src', value);
	}
};
var getCheckBoxList = function (elem) {
	var key = elem.getAttribute('snb-key');
	var attr = elem.getAttribute('snb-value-attr');
	var listCheckBox = document.querySelectorAll('[snb-key=' + key + ']');
	var result = [];
	for (var i = 0; i < listCheckBox.length; i++) {
		if (listCheckBox[i].checked
			&& listCheckBox[i].getAttribute('type') == 'checkbox') {
			result.push(listCheckBox[i].getAttribute(attr));
		}
	}
	return result.toString();
};
var getNation = function (elem) {
	var select = elem.getElementsByTagName('select')[0];
	return select.value;
};
var renderProvinceList = function (id, callback) {
	var container = document.getElementById(id);
	shinobi.aladinUtil.removeAllChild(container);
	var request = {};
	shinobi.api.request("/api/VietNamLocationNameApi/getAllVietNamProvince",
		JSON.stringify(request), function (response) {
			var jsonArr = JSON.parse(response);
			for (var i = 0; i < jsonArr.length; i++) {
				var option = document.createElement("option");
				option.setAttribute('value', jsonArr[i].provinceid);
				option.innerHTML = jsonArr[i].provincename;
				container.appendChild(option);
			}
			container.value = '79';
			if (typeof callback == 'function') {
				callback();
			}
		});
	return container;
};
var getCheckRadio = function (elem) {
	var attr = elem.getAttribute('snb-value-attr');
	if (elem.checked) {
		return elem.getAttribute(attr);
	}
};
var removeAllChild = function (elem, callback) {
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
	if (callback) {
		callback();
	}
};
var getAllUserInfo = function (request, callback) {
	var key = request.username.toString();
	if (!shinobi.global) {
		shinobi.global = {};
	}
	if (!shinobi.global.getAllUserInfo) {
		shinobi.global.getAllUserInfo = {};
	}
	if (!shinobi.global.getAllUserInfo[key]) {
		if (shinobi.global.getAllUserInfo[key] == false) {
			setTimeout(function () {
				getAllUserInfo(request, callback);
			}, 10);
		} else {
			shinobi.global.getAllUserInfo[key] = false;
			shinobi.api.request('/api/UserApi/getAllUserInfo', JSON
				.stringify(request), function (response) {
					shinobi.global.getAllUserInfo[key] = response;
					callback(response);
				})
		}
	} else {
		callback(shinobi.global.getAllUserInfo[key]);
	}
};
var displayResultSelect = function (selectId) {
	var x = document.getElementById(selectId);
	var txt = [];
	var i;
	for (i = 0; i < x.length; i++) {
		txt.push(x.options[i].value);
	}
	return txt;
}
var customRecordPerPagePagination = function (container, recordNum) {
	var selectRecordNum = container
		.getElementsByClassName('shinobi-recordperpage')[0];
	var listOptionSelect = selectRecordNum.getElementsByTagName('option');
	for (var i = 0; i < listOptionSelect.length; i++) {
		var j = parseInt(i) + 1;
		var currentPageNum = j * recordNum;
		listOptionSelect[i].innerHTML = currentPageNum;
		listOptionSelect[i].value = currentPageNum;
	}
};
var renderStockCompanyDeleteStaffButton = function (elem, value) {
	var id = value;
	var userName = elem.querySelectorAll('[snb-key=username]')[0].innerHTML;
	var loggedUserName = window.localStorage.getItem('loggedUserName');
	if (userName == loggedUserName) {
		elem.innerHTML = '';
	} else {
		elem.onclick = function () {
			er
				.confirm(function () {
					var request = {};
					request.id = id;
					shinobi.api
						.request(
							'/authenapi/StockComStaffManagementApi/deleteStaffFromGroup',
							JSON.stringify(request),
							function (response) {
								if (response == 'update success') {
									shinobi.notification.notification
										.info('Cập nhật thành công');
									elem.parentNode.remove();
								}
							});
				});
		}
	}
};
var gotoPublicPage = function (elem, data) {
	if (data.homepageurl) {
		var accountLink = publicAccountLink + data.homepageurl;
		elem.classList.add('has-redirect');
		elem.onclick = function () {
			window.location.href = accountLink;
		}
	}
};
var renderHasFee = function (cell, rowIndex, colIndex, allData) {
	var rowData = allData[rowIndex];
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var cellContent = '';
	// check data has post amount attribute
	if (value == 'false') {
		cellContent = shinobi.language.free;
	} else {
		if (rowData.hasOwnProperty('feeamount') == true) {
			cellContent = shinobi.aladinUtil
				.formatNumberValue(rowData.feeamount)
				+ ' đ';
		} else {
			cellContent = 'Có phí';
		}
	}
	cell.innerHTML = cellContent;
};
var renderPostType = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var cellContent = '';
	cellContent = shinobi.aladinUtil.convertPostTypeToVn(value);
	cell.innerHTML = cellContent;
};
var renderFullName = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var cellContent = '';
	cellContent = value;
	cell.innerHTML = cellContent;
};
var renderFirstNameLastName = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	removeAllChild(cell, function () {
		buildFirstNameLastNameDatalist(cell, value);
	});
};
var renderStockCompanyTreeTable = function (elem, value) {
	var level = value;
	var classLevel = 'level-' + level;
	elem.classList.add(classLevel);
	if (level == 1) {
		elem.parentNode.parentNode.parentNode.classList.remove('is-hidden');
	}
	var openButton = elem.parentNode.getElementsByClassName('open-button')[0];
	var closeButton = elem.parentNode.getElementsByClassName('close-button')[0];
	if (level == 2) {
		openButton.classList.add('is-hidden');
		closeButton.classList.add('is-hidden');
	}
	var tBody = document.getElementById('dataTable');
	openButton.onclick = function () {
		var childrenId = this.getAttribute('childrenid');
		this.classList.add('is-hidden');
		closeButton.classList.remove('is-hidden');
		var listChildren = tBody.querySelectorAll('[snb-key=parentid]');
		for (var i = 0; i < listChildren.length; i++) {
			if (listChildren[i].innerHTML == childrenId) {
				listChildren[i].parentNode.classList.remove('is-hidden');
			}
		}
	}
	closeButton.onclick = function () {
		var childrenId = this.getAttribute('childrenid');
		this.classList.add('is-hidden');
		openButton.classList.remove('is-hidden');
		var listChildren = tBody.querySelectorAll('[snb-key=parentid]');
		for (var i = 0; i < listChildren.length; i++) {
			if (listChildren[i].innerHTML == childrenId) {
				listChildren[i].parentNode.classList.add('is-hidden');
				var childrenCloseButton = listChildren[i].parentNode
					.getElementsByClassName('close-button')[0];
				childrenCloseButton.click();
				var childrenOpenButton = listChildren[i].parentNode
					.getElementsByClassName('open-button')[0];
				childrenOpenButton.classList.add('is-hidden');
			}
		}
	}
};
var renderStockCompanyTraderRegistrationInfo = function (elem, value) {
	var data = JSON.parse(value);
	var key = elem.getAttribute('snb-key-subkey');
	if (data[key]) {
		elem.innerHTML = data[key];
	}
};
var renderPostTitle = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var rowData = allData[rowIndex];
	var a = document.createElement('a');
	a.setAttribute('class', 'has-link');
	a.innerHTML = value;
	cell.appendChild(a);
	if (rowData.hasOwnProperty('posturl')) {
		a.setAttribute('href', rowData.posturl);
	}
};
var renderCheckRadio = function (elem, value) {
	var attr = elem.getAttribute('snb-value-attr');
	var checkedElem = document.querySelectorAll('[' + attr + '=' + value + ']')[0];
	checkedElem.checked = true;
};
var seenDetailOpenAccountForm = function (elem, value) {
	elem.onclick = function () {
		shinobi.stockcomrealaccountregistrationrender
			.getDetailData(
				value,
				function (data) {
					var openAccountDetailModal = document
						.getElementById('openAccountDetailModal');
					openAccountDetailModal.classList.add('is-active');
					shinobi.mapping.render('#openAccountDetailModal',
						JSON.stringify(data));
					document
						.getElementById('acceptPoliciesOpenTradingAccount').checked = true;
				});
	}
};
var renderCheckBoxList = function (elem, value) {
	var attr = elem.getAttribute('snb-value-attr');
	var listChecked = value.split(',');
	for (var i = 0; i < listChecked.length; i++) {
		var checkedElem = document.querySelectorAll('[' + attr + '='
			+ listChecked[i] + ']')[0];
		checkedElem.checked = true;
	}
};
var renderNation = function (elem, value) {
	var select = elem.getElementsByTagName('select')[0];
	select.value = value;
};
var removeOpenAccountFormButton = function (elem, value) {
	elem.onclick = function () {
		shinobi.stockcomrealaccountregistrationrender
			.showConfirmRemoveModal(function (statuscomment) {
				shinobi.stockcomrealaccountregistrationrender
					.sendRequestUpdate(elem, value, 'FAIL',
						statuscomment);
			});
	}
};
var acceptOpenAccountFormButton = function (elem, value) {
	elem.onclick = function () {
		er.confirm(function () {
			shinobi.stockcomrealaccountregistrationrender.sendRequestUpdate(
				elem, value, 'FINISHED', '');
		});
	}
};
var renderDate = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var contentCell = shinobi.aladinUtil.getFormatDate(value, 'dd-mm-yyyy');
	cell.setAttribute('class', 'date-time');
	cell.innerHTML = contentCell;
};
var renderFormatDate = function (elem, value) {
	var format = elem.getAttribute('snb-format');
	var contentCell = shinobi.aladinUtil.getFormatDate(value, format);
	elem.classList.add('date-time');
	elem.innerHTML = contentCell;
};
var renderDateTime = function (cell, rowIndex, colIndex, allData) {
	var value = cell.innerHTML;
	shinobi.aladinUtil.removeAllChild(cell);
	var contentCell = shinobi.aladinUtil.getFormatDate(value,
		'dd-mm-yyyy hh:mm');
	cell.setAttribute('class', 'date-time');
	cell.innerHTML = contentCell;
};
var getExpiredDate = function (elem, value) {
	var returnContent = shinobi.aladinUtil.remainDateWithCurrentDate(value);
	return returnContent;
};
var renderJoinDateDatalist = function (elem, value) {
	elem.innerHTML = getExpiredDate(elem, value);
};
var renderExpireddateDatalist = function (elem, value) {
	if (value) {
		elem.innerHTML = '<p>Còn ' + getExpiredDate(elem, value)
			+ ' ngày nữa</p>';
	} else {
		elem.innerHTML = 'Dịch vụ miễn phí ';
	}
};
var convertRatingPointToStar = function (elem, value) {
	elem.innerHTML = value / 2;
};
var buildRating = function (elem, value) {
	elem.classList.add('is-flex');
	value = value / 2;
	var starIconHtmlString = '<span class="icon is-small has-text-warning"><i class="fas fa-star"></i></span>';
	var noneStarIconHtmlString = '<span class="icon is-small has-text-light"><i class="fas fa-star"></i></span>';
	var numberRating = value;
	if (value > 5) {
		numberRating = 5;
	}
	if (value < 0 || value == 0) {
		numberRating = 0;
	}
	var contentRating = '';
	for (var i = 0; i < numberRating; i++) {
		contentRating += starIconHtmlString;
	}
	for (var j = 0; j < (5 - numberRating); j++) {
		contentRating += noneStarIconHtmlString;
	}
	elem.innerHTML = contentRating;
};
var convertFequency = function (value) {
	var elemContent;
	switch (value) {
		case 'MONTHLY':
			elemContent = '1 Tháng';
			break;
		case 'QUATERLY':
			elemContent = '3 Tháng';
			break;
		case 'HALF_YEAR':
			elemContent = '6 Tháng';
			break;
		case 'ANNUALLY':
			elemContent = '12 Tháng';
			break;
		default:
			break;
	}
	return elemContent;
};
var renderFequencyDatalist = function (elem, value) {
	var elemContent = convertFequency(value);
	elem.innerHTML = elemContent;
};
var renderInfoButton = function (elem, value) {
	var a = document.createElement('a');
	a.setAttribute('class', 'button is-info is-small ');
	a.innerHTML = value;
	elem.appendChild(a);
};
var addUserOriginLogo = function (elem, data) {
	if (data.userorigin
		&& !elem.parentNode.parentNode.querySelector('.table-logo')
		&& data.userorigin != 'ALADIN_MEMBER'
		&& data.isshoworiginavatar == true) {
		var url = aladinLogo;
		var p = document.createElement('p');
		p.setAttribute('class', 'stock-company-image ');
		elem.parentNode.appendChild(p);
		elem.parentNode.classList.add('stock-company-chat-avatar-container');
		var img = document.createElement('img');
		p.appendChild(img);
		img.setAttribute('class', 'table-logo');
		switch (data.userorigin) {
			case 'DAS_STOCK_COMPANY':
				url = '/static/image/daslogo.png';
				break;
			default:
				break;
		}
		img.setAttribute('src', url);
	}
};
var buildAvatarDatalist = function (elem, value) {
	var p = document.createElement('p');
	if (elem.parentElement) {
		elem.parentElement.insertBefore(p, elem);
		p.appendChild(elem);
	}
	if (value == 'system') {
		elem.setAttribute('src', '/static/image/aladin.svg');
	} else {
		var userName = value;
		var request = {};
		request.username = userName;
		var data;
		// shinobi.api
		// .request(
		// '/api/UserApi/getAllUserInfo',
		// JSON.stringify(request),
		// function(response) {
		getAllUserInfo(
			request,
			function (response) {
				data = JSON.parse(response);
				if (data.avatarlink) {
					value = data.avatarlink;
				} else {
					value = 'https://image.aladin.finance/aladin.finance.public.file/517da259fc9feb05f65994fb850f09e4/useravatar.jpg';
				}
				elem.parentNode.classList.add('has-text-centered');
				elem.setAttribute('src', value);
				elem.setAttribute('title', data.firstname + ' '
					+ data.lastname);
				addUserOriginLogo(elem, data);
				gotoPublicPage(elem, data);
			});
	}
};
var getHeaderRenderKey = function (cell, row, col) {
	var table = cell.parentElement.parentElement.parentElement;
	var header = table.getElementsByTagName('thead')[0];
	if (header) {
		var headerCell = header.rows[0].cells[col];
		if (headerCell.hasAttribute('snb-colname')) {
			return headerCell.getAttribute('snb-colname');
		} else {
			return null;
		}
	} else {
		return null;
	}
};
var buildNickIdTable = function (cell, row, col, all) {
	var key = getHeaderRenderKey(cell, row, col);
	cell.innerHTML = '<div snb-key="' + key
		+ '" snb-render="buildNickIdDatalist"></div>';
	shinobi.mapping.renderElement(cell, all[row]);
};
var buildConnectButton = function (cell, rowIndex, colIndex, allData) {
	var currentData = allData[rowIndex];
	var a = document.createElement('a');
	a.setAttribute('class', 'button is-link is-small');
	a.innerHTML = 'Tiếp cận';
	shinobi.aladinUtil.removeAllChild(cell);
	cell.appendChild(a);
	shinobi.investorlistingrender.addEventFollowButton(a, currentData.username)
};
var renderCellTable = function (cell, rowIndex, colIndex, allData) {
	shinobi.fragmenttraderfollowerrender
		.renderCellFollowerTable(cell, colIndex);
};
var renderLimitButton = function (cell, rowIndex, colIndex) {
	var customerUsername = cell.innerHTML;
	cell.innerHTML = "";
	shinobi.fragmenttraderfollowerrender.renderLimitButtonFunction(cell,
		rowIndex, colIndex, customerUsername);
};
var formatNumber = function (cell, rowIndex, colIndex) {
	shinobi.aladinUtil.formatNumberRender(cell, rowIndex, colIndex);
};
var buildNickIdDatalist = function (elem, value) {
	if (value != 'system') {
		var userName = value;
		var request = {};
		request.username = userName;
		var data;
		// shinobi.api.request('/api/UserApi/getAllUserInfo',
		// JSON.stringify(request), function(
		// response) {
		getAllUserInfo(
			request,
			function (response) {
				data = JSON.parse(response);
				var chatSpan = document.createElement('span');
				chatSpan
					.setAttribute('class',
						'icon has-text-orange create-public-chat-icon tooltip is-hidden');
				chatSpan.setAttribute('data-tooltip', 'Trò chuyện');
				chatSpan.innerHTML = '<i class="far fa-comment-dots fa-lg"></i>';
				er.buildPublicChat(chatSpan, data.id);
				elem.appendChild(chatSpan);
				var span = document.createElement('span');
				span.classList.add('id-nick-container');
				span.innerHTML = '#' + data.id;
				elem.appendChild(span);
				// gotoPublicPage(elem, data);
			});
	}
};
var buildAvatarDatalistNoHref = function (elem, value) {
	var p = document.createElement('p');
	p.classList.add('margin-right-1rem');
	if (elem.parentElement) {
		elem.parentElement.insertBefore(p, elem);
		p.appendChild(elem);
	}
	if (value == 'system') {
		elem.setAttribute('src', '/static/image/aladin.svg');
	} else {
		var userName = value;
		var request = {};
		request.username = userName;
		var data;
		// shinobi.api
		// .request(
		// '/api/UserApi/getAllUserInfo',
		// JSON.stringify(request),
		// function(response) {
		getAllUserInfo(
			request,
			function (response) {
				data = JSON.parse(response);
				data = JSON.parse(response);
				if (data.avatarlink) {
					value = data.avatarlink;
				} else {
					value = 'https://image.aladin.finance/aladin.finance.public.file/517da259fc9feb05f65994fb850f09e4/useravatar.jpg';
				}
				elem.setAttribute('src', value);
				elem.setAttribute('title', data.firstname + ' '
					+ data.lastname);
				addUserOriginLogo(elem, data);
			});
	}
};
var buildHomePageUrlDatalist = function (elem, value) {
	var userName = value;
	var request = {};
	request.username = userName;
	var data;
	// shinobi.api.request('/api/UserApi/getAllUserInfo',
	// JSON.stringify(request), function(response) {
	getAllUserInfo(request, function (response) {
		data = JSON.parse(response);
		if (data.homepageurl) {
			var accountLink = publicAccountLink + data.homepageurl;
			elem.innerHTML = window.location.host + accountLink;
			elem.onclick = function () {
				window.location.href = accountLink;
			}
		}
	});
};
var buildFirstNameLastNameDatalist = function (elem, value) {
	if (value != 'system') {
		var userName = value;
		var request = {};
		request.username = userName;
		var data;
		// shinobi.api.request('/api/UserApi/getAllUserInfo',
		// JSON.stringify(request), function(
		// response) {
		getAllUserInfo(request, function (response) {
			data = JSON.parse(response);
			data = JSON.parse(response);
			var fullName = data.firstname + ' ' + data.lastname;
			elem.innerHTML = fullName;
			gotoPublicPage(elem, data);
		});
	}
};
var renderStockCompanyUpgradeRequestCommandButton = function (elem, value) {
	elem.onclick = function () {
		er.confirm(function () {
			var functionApi = elem.getAttribute('snb-function');
			var requestid = value;
			var api = "/authenapi/RequestUpgradeTraderOfStockCompanyApi/"
				+ functionApi;
			var request = {};
			request.requestid = requestid;
			shinobi.api.request(api, JSON.stringify(request),
				function (response) {
					if (response == 'update success') {
						shinobi.notification.notification
							.info('Cập nhật thành công');
						shinobi.stockcomtradersregistrationrender.datalist1
							.reloadApi(1);
					}
				});
		});
	}
};
var renderStockCompanyCustomerManagementButton = function (elem, value) {
	var link = '/private/stockcomtradersmanagementcustomer/' + value;
	elem.setAttribute('href', link);
};
var renderGoToPublicPageDatalist = function (elem, value) {
	var userName = value;
	var request = {};
	request.username = userName;
	var data;
	// shinobi.api.request('/api/UserApi/getAllUserInfo',
	// JSON.stringify(request), function(response) {
	getAllUserInfo(request, function (response) {
		data = JSON.parse(response);
		gotoPublicPage(elem, data);
	});
};
var buildFirstNameLastNameDatalistNoHref = function (elem, value) {
	var userName = value;
	var request = {};
	request.username = userName;
	var data;
	// shinobi.api.request('/api/UserApi/getAllUserInfo',
	// JSON.stringify(request), function(response) {
	getAllUserInfo(request, function (response) {
		data = JSON.parse(response);
		var fullName = data.firstname + ' ' + data.lastname;
		elem.innerHTML = fullName;
	});
};
var renderAvatar = function (cell, rowIndex, colIndex) {
	var value = cell.innerHTML;
	removeAllChild(cell, function () {
		var imge = document.createElement('img');
		imge.setAttribute('class', 'table-avatar');
		cell.appendChild(imge);
		buildAvatarDatalist(imge, value);
	});
};
var renderInvestingStrategy = function (elem, value) {
	if (value.trim() == '') {
		elem.innerHTML = 'Hiện chưa có!';
	} else {
		if (value.length > 400) {
			elem.innerHTML = value.slice(0, 400) + '...';
			var a = document.createElement('a');
			a.setAttribute('class', 'local-color');
			a.innerHTML = '[Xem thêm]';
			elem.appendChild(a);
		} else {
			elem.innerHTML = value;
		}
	}
};
var renderInvestingPeriodDataList = function (elem, value) {
	switch (value.trim()) {
		case 'MONTH_1':
			elem.innerHTML = '1 Tháng';
			break;
		case 'MONTH_1_3':
			elem.innerHTML = '1-3 Tháng';
			break;
		case 'MONTH_3_6':
			elem.innerHTML = '3-6 Tháng';
			break;
		case 'MONTH_6_12':
			elem.innerHTML = '6-12 Tháng';
			break;
		case 'YEAR_1_3':
			elem.innerHTML = '1-3 Năm';
			break;
		case 'YEAR_OVER_3':
			elem.innerHTML = 'Hơn 3 Năm';
			break;
		default:
			break;
	}
};
var renderInvestingPeriod = function (cell, rowIndex, colIndex) {
	var value = cell.innerHTML;
	removeAllChild(cell);
	renderInvestingPeriodDataList(cell, value);
};
var renderFormatNumber = function (cell, rowIndex, colIndex) {
	cell.innerHTML = Number(cell.innerHTML).format(0, 3, ',', '.');
};
var renderInvestingRisk = function (cell, rowIndex, colIndex) {
	var beginCell = '<div class="level width-50" ><input class="slider slider-width level-item" step="1" min="1" max="10" value="';
	var betweenCell = '" type="range" disabled="disabled"><span class="slider-value-padding level-item"> ';
	var endCell = '/10</span></div>';
	var valueCell = cell.innerHTML;
	cell.innerHTML = beginCell + valueCell + betweenCell + valueCell + endCell;
};
var renderHomePageUrl = function (elem, value) {
	var accountUrl = publicAccountLink + value;
	elem.setAttribute('href', accountUrl);
	elem.innerHTML = window.location.host + accountUrl;
};
var autoRedirectMobile = function () {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// Windows Phone must come first because its UA also contains
	// "Android"
	if (/android/i.test(userAgent)) {
		window.location.href = "https://play.google.com/store/apps/details?id=com.aladinmobile.aladin";
	}
	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
		window.location.href = "https://apps.apple.com/app/id1474783146";
	}
};
var setHrefElem = function (elem, link) {
	elem.style.cursor = "pointer";
	var title = elem.innerHTML;
	if (title) {
		elem.setAttribute('title', title.replace(/\s+/g, " "));
	}
	elem.onclick = function () {
		window.location.href = link;
	}
};
var renderHref = function (elem, value, attr) {
	var link = value;
	setHrefElem(elem, link);
};
var renderHrefWithUserType = function (elem, value, attr) {
	var userType = window.localStorage.getItem('loggedUserType');
	var link;
	if (userType == 'stock_com_admin') {
		link = '/private/stockcom' + value;
	} else {
		link = '/private/' + userType + value;
	}
	if (elem.hasAttribute('rs-hidden-with')) {
		var userTypeHidden = elem.getAttribute('rs-hidden-with');
		if (userType == userTypeHidden) {
			elem.classList.add('is-hidden');
		}
	}
	if (elem.hasAttribute('rs-parent-show-with')) {
		var userTypeShow = elem.getAttribute('rs-parent-show-with');
		if (userType == userTypeShow) {
			elem.parentNode.classList.remove('is-hidden');
		}
	}
	setHrefElem(elem, link);
};
var renderDashboardLastOrderAvatar = function (elem, value, attr) {
	var userName;
	if (value == 1 || value == 2) {
		userName = window.localStorage.getItem('loggedUserName');
	} else {
		userName = value;
	}
	buildAvatarDatalist(elem, userName);
};
var renderDashboardLastOrderFullName = function (elem, value) {
	var userName;
	if (value == 1 || value == 2) {
		userName = window.localStorage.getItem('loggedUserName');
	} else {
		userName = value;
	}
	buildFirstNameLastNameDatalist(elem, userName);
};
var renderOrderSideDataList = function (elem, value) {
	var elemContent = '';
	if (value == 'S') {
		elemContent = 'Bán';
	} else {
		elemContent = 'Mua';
	}
	elem.innerHTML = elemContent;
};
var getNumberOfSessionBack = function (rankingtype) {
	var returnValue = 1;
	switch (rankingtype) {
		case 'ONE_DAY':
			returnValue = 1;
			break;
		case 'ONE_WEEK':
			returnValue = 5;
			break;
		case 'ONE_MONTH':
			returnValue = 20;
			break;
		case 'THREE_MONTH':
			returnValue = 60;
			break;
		case 'SIX_MONTH':
			returnValue = 120;
			break;
		case 'ALL_TIME':
			returnValue = 100000;
			break;
		default:
			break;
	}
	return returnValue;
};
var renderChartAnalysisSimpleDatalist = function (elem, value) {
	var userName = value;
	var chartParams = {};
	chartParams.account__0__String = userName;
	chartParams.numberofsessionback__1__int = Number(
		Number(getNumberOfSessionBack(shinobi.investortraderlistingcontentheaderrender.currentTab)) + 1)
		.toString();
	var request = {};
	request.chartParams = chartParams;
	shinobi.api
		.request('/api/AladinChartApi/getChartData/ACCOUNT_ASSET_CHART',
			JSON.stringify(request), function (response) {
				var jsonArr = JSON.parse(response);
				var data = jsonArr;
				var dataChart = shinobi.chartadapter
					.convertDataSimpleChart(data);
				var chart = new shinobi.overviewareachart(elem);
				chart.createOverviewAreaChart(elem, '8rem', '12rem',
					dataChart);
			});
};
var customStylePagination = function (paginationContainer) {
	var pagiContainerParent = paginationContainer.parentNode;
	var style = pagiContainerParent.getAttribute('pagi-style');
	var setRecordContainer = paginationContainer
		.getElementsByClassName('set-pagination-record-number-container')[0];
	switch (style) {
		// case 'mini':
		// setRecordContainer.classList.add('is-hidden');
		// break;
		default:
			break;
	}
};
var renderChexbox = function (cell, row, col, all) {
	var value = cell.innerHTML;
	cell.innerHTML = "";
	var elem = document.createElement('p');
	elem.setAttribute('class', 'has-text-centered');
	if (["PENDING", "PARTIAL_MATCHED"].includes(value)) {
		var checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('snb-key-checkbox', all[row].systemorderid);
		elem.appendChild(checkbox);
		cell.appendChild(elem);
	}
};
var getUserInfo = function (callback) {
	var url = "/authenapi/SystemUserApi/getInfoLogin";
	var request = {};
	shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
		console.log(res);
		res = JSON.parse(res);
		if (callback) {
			callback(res);
		}
	});
};
var getUserInfoNotCache = function (callback) {
	var url = "/authenapi/SystemUserApi/getInfoLogin";
	var request = {};
	shinobi.capi.request(url, JSON.stringify(request), function (res) {
		console.log(res);
		res = JSON.parse(res);
		if (callback) {
			callback(res);
		}
	});
};
var getRecordNumber = function (paginationContainerId) {
	var containerId;
	var paginationContainer;
	if (paginationContainerId) {
		var container = document.getElementById(paginationContainerId);
		paginationContainer = container.nextElementSibling
			.getElementsByClassName('table-pagination')[0];
	} else {
		containerId = 'table-pagination';
		paginationContainer = document.getElementById(containerId);
	}
	var parentNodePaginationContainer = paginationContainer.parentNode;
	var recordNum;
	var recodeNumAttr = 'record-num';
	if (parentNodePaginationContainer.hasAttribute(recodeNumAttr)) {
		recordNum = parentNodePaginationContainer.getAttribute(recodeNumAttr);
	} else {
		var recordNumSelect = paginationContainer
			.getElementsByClassName('shinobi-recordperpage')[0];
		recordNum = recordNumSelect.value;
	}
	customRecordPerPagePagination(paginationContainer, recordNum);
	customStylePagination(paginationContainer);
	return recordNum;
};
var setHrefHomePageUrl = function (elem, homePageUrl) {
	var ratingDetailPageLink = ratingDetailLink + homePageUrl;
	renderHref(elem, ratingDetailPageLink);
};
var renderDetailRatingPage = function (elem, value) {
	elem.innerHTML = 'Chi tiết đánh giá';
	elem.classList.add('has-link');
	setHrefHomePageUrl(elem, value);
};
var renderDashboardRatingDetailLink = function (elem, value, attr) {
	var homePageUrl = window.localStorage.getItem('loggedUserHomePage');
	setHrefHomePageUrl(elem, homePageUrl);
};
var addColorElem = function (elem, value, attr) {
	var valueElem = elem.innerHTML;
	if (value > 0) {
		elem.innerHTML = `<span class="up-value">${valueElem}</span>`
	}
	if (value == 0) {
		elem.innerHTML = `<span class="unchange-value">${valueElem}</span>`
	}
	if (value < 0) {
		elem.innerHTML = `<span class="down-value">${valueElem}</span>`
	}
};
var renderPercent = function (elem, value, attr) {
	elem.innerHTML = value + '%';
	addColorElem(elem, value, attr);
};
var renderPercentNoColor = function (elem, value, attr) {
	elem.innerHTML = value + '%';
};
var renderProfitPercent = function (elem, value, attr) {
	renderPercent(elem, value, attr);
};
renderProfitpercent100NoColorTable = function (cell, row, col, all) {
	var value = cell.innerHTML;
	cell.innerHTML = '';
	cell.classList.add('has-text-right');
	renderProfitpercent100NoColor(cell, value, all[row])
};
var renderProfitpercent100Table = function (cell, row, col, all) {
	var value = cell.innerHTML;
	cell.innerHTML = '';
	cell.classList.add('has-text-right');
	renderProfitpercent100(cell, value, all[row])
};
var renderProfitpercent100 = function (elem, value, attr) {
	var profit = Math.round(Number(value) * 10000) / 100;
	renderPercent(elem, profit, attr);
};
var renderProfitpercent100NoColor = function (elem, value, attr) {
	var profit = Math.round(Number(value) * 10000) / 100;
	renderPercentNoColor(elem, profit, attr);
};
var renderformatNumberDatalist = function (elem, value, attr) {
	elem.classList.add('has-text-right');
	elem.innerHTML = format(value);
};
var renderProfit = function (elem, value, attr) {
	elem.innerHTML = format(value);
	addColorElem(elem, value, attr);
};
var renderProfitPercentTable = function (cell, rowIndex, colIndex) {
	cell.classList.add('has-text-right');
	var value = cell.innerHTML;
	removeAllChild(cell);
	renderProfitPercent(cell, value);
};
var renderOrderType = function (cell, row, col, all) {
	var value = cell.innerHTML;
	var listOrderType = {
		LO: 'Lệnh thường',
		CONDITION: 'Lệnh điều kiện',
		CANCEL: 'Hủy lệnh',
		EDIT: 'Sửa lệnh '
	}
	cell.classList.add('has-text-left');
	if (listOrderType[value]) {
		cell.innerHTML = listOrderType[value];
	} else {
		cell.innerHTML = value;
	}
};
var renderOrderTypeDatalist = function (elem, value, all) {
	var listOrderType = {
		LO: 'Lệnh thường',
		CONDITION: 'Lệnh điều kiện',
		CANCEL: 'Hủy lệnh',
		EDIT: 'Sửa lệnh '
	}
	elem.classList.add('has-text-left');
	if (listOrderType[value]) {
		elem.innerHTML = listOrderType[value];
	} else {
		elem.innerHTML = value;
	}
};
var renderNumberPriceTable = function (cell, row, col, all) {
	var value = cell.innerHTML;
	renderNumberPrice(cell, value, all[row]);
};
var renderNumberPrice = function (elem, value, all) {
	elem.parentNode.classList.add('has-text-right');
	elem.innerHTML = value;
};
var renderOrderBuy = function (cell, row, col, all) {
	cell.classList.add('has-text-centered')
	var value = cell.innerHTML;
	var listOrderType = {
		'BUY': 'Mua',
		'SELL': 'Bán',

	};

	if (listOrderType[value]) {
		cell.innerHTML = listOrderType[value];
	} else {

		cell.innerHTML = value;
	}
};
var getListStockSymbol = function (selector) {
	var selectorSearchStock = '#searchstocsympol';
	if (selector) {
		selectorSearchStock = selector;
	}
	console.log('selector', selector);
	var input = document.querySelector(selectorSearchStock);
	input.addEventListener('input', function () {
		input.value = input.value.toUpperCase();
	});

	new shinobi.autocomplete(selectorSearchStock, {
		onSearch: (input, resolve) => {
			if (input.length < 1) { return [] }
			var url = "/api/PriceBoardApi/findDataList";
			var request = {
				"recordPerPage": "20",
				"pageNum": 1,
				"filters": [{ 'colname': 'stocksymbol', 'operator': 'like', 'value': input }]
			}

			shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
				var array = JSON.parse(res).data;
				resolve(array);
			});
		},
		autoSelect: true,
		onSubmit: result => {
			document.querySelector(selectorSearchStock).value = result.stocksymbol.toUpperCase();
		},
		getResultValue: result => {
			return result.stocksymbol.toUpperCase();
		},

		renderResult: (result, props) => {
			return `
          <li ${props}>
              <div class="title has-text-primary is-size-5">
             ${result.stocksymbol}
              </div>
              <div class="subtitle">${result.securityname}</div>
          </li>`
		},
	});
};
var renderOrderTypeStatus = function (cell, row, col, all) {
	cell.classList.add('has-text-left');
	var value = cell.innerHTML;
	var listOrderType = {
		'NEW': 'Mới',
		'INPROCESS': 'Đang xử lý',
		'SUCCESS': 'Thành công',
		'PENDING': 'Chờ khớp',
		'MATCHED': 'Đã khớp',
		'EDITED': 'Đã sửa',
		'CANCELED': 'Đã hủy',
		'ERROR': 'Lỗi'

	};

	if (listOrderType[value]) {
		cell.innerHTML = listOrderType[value];
	} else {

		cell.innerHTML = value;
	}
};
var renderStockPriceDatalist = function (elem, value) {
	elem.innerHTML = value / 1000;
};
var renderStockPriceTable = function (cell, row, col, all) {
	renderStockPriceDatalist(cell, cell.innerHTML);
};
var renderProfitTable = function (cell, rowIndex, colIndex) {
	var value = cell.innerHTML;
	removeAllChild(cell);
	renderProfit(cell, value);
};
var getUserNameInUrl = function (callback) {
	var pathnameListItem = window.location.pathname.split('/');
	var nick = pathnameListItem[pathnameListItem.length - 1];
	var getUserNameRequest = {};
	getUserNameRequest.pageurl = nick;
	var returnValue;
	shinobi.api.request('/api/UserApi/getUsernameFromHomePage', JSON
		.stringify(getUserNameRequest), function (response) {
			var jsonArr = JSON.parse(response);
			if (jsonArr.username) {
				window.localStorage.setItem('currentUserDetail', jsonArr.username);
				callback(jsonArr.username);
			} else {
				shinobi.notification.notification
					.error('Không tìm thấy người dùng!');
				return false;
			}
			return returnValue;
		});
};
var getPathnameSplitIndex = function (index) {
	var pathName = window.location.pathname;
	var pathNameSplit = pathName.split('/');
	var content;
	if (index < 0) {
		content = pathNameSplit[pathNameSplit.length + index];
	}
	if (index == "length") {
		content = pathNameSplit.length;
	}
	if (index > 0) {
		content = pathNameSplit[index];
	}
	return content;
};
var renderPublicUserAssetInfo = function (querySelectorPatern, traderName) {
	var request = {};
	request.username = traderName;
	shinobi.api.request('/api/ViewUserPublicAssetApi/getUserPublicAssetInfo',
		JSON.stringify(request), function (response) {
			var jsonArr = JSON.parse(response);
			var data = JSON.stringify(jsonArr);
			shinobi.mapping.render(querySelectorPatern, data);
		});
};
var renderPublicUserInfo = function (querySelectorPatern, traderName) {
	var request = {};
	request.username = traderName;
	// shinobi.api.request('/api/UserApi/getAllUserInfo',
	// JSON.stringify(request), function(response) {
	getAllUserInfo(request, function (response) {
		var jsonArr = JSON.parse(response);
		var data = JSON.stringify(jsonArr);
		shinobi.mapping.render(querySelectorPatern, data);
	});
};
var getPublicUserInfo = function (traderName, callback) {
	var request = {};
	request.username = traderName;
	// shinobi.api.request('/api/UserApi/getAllUserInfo',
	// JSON.stringify(request), function(response) {
	getAllUserInfo(request, function (response) {
		var jsonArr = JSON.parse(response);
		if (typeof callback == 'function') {
			callback(jsonArr);
		}
	})
};
var changeFeeType = function (value) {
	var content;
	switch (value) {
		case 'isfollowcopytrade':
		case 'COPY_TRADE':
			content = 'Copy trade';
			break;
		case 'TRAINING':
			content = 'Đào tạo';
			break;
		case 'isfollowblog':
		case 'INVESTING_BLOG':
			content = 'Blog đầu tư';
			break;
		case 'EVENT':
			content = 'Sự kiện';
			break;
		case 'ORTHER':
			content = 'Phí khác';
			break;
		case 'TRADER_POST_FEE':
			content = 'Phí bài viết';
			break;
		case 'COPY_TRADE_FREQUENT_FEE':
			content = 'Phí CopyTrade';
			break;
		default:
			content = 'Phí dịch vụ không xác định';
			break;
	}
	return content;
};
var changeOrderStatus = function (value) {
	var content;
	switch (value) {
		case 'INPROCESS':
			content = 'Copy trade';
			break;
		case 'TRAINING':
			content = 'Đào tạo';
			break;
		case 'isfollowblog':
		case 'INVESTING_BLOG':
			content = 'Blog đầu tư';
			break;
		case 'EVENT':
			content = 'Sự kiện';
			break;
		case 'ORTHER':
			content = 'Phí khác';
			break;
		case 'TRADER_POST_FEE':
			content = 'Phí bài viết';
			break;
		case 'COPY_TRADE_FREQUENT_FEE':
			content = 'Phí CopyTrade';
			break;
		default:
			content = 'Phí dịch vụ không xác định';
			break;
	}
	return content;
};
var renderFeeTypeDatalist = function (elem, value, attr) {
	var content = changeFeeType(value);
	elem.innerHTML = content;
};
var renderFeeTypeTable = function (cell, row, col, allData) {
	var value = cell.innerHTML;
	cell.innerHTML = '';
	renderFeeTypeDatalist(cell, value);
};
var buildTransStatus = function (cell, rowindex, colindex, allData) {
	cell.innerHTML = shinobi.aladinUtil.changeTransStatus(cell.innerHTML);
	var rowData = allData[rowindex];
	if (rowData.orthercomment.trim() != '') {
		var span = document.createElement('span');
		span.setAttribute('class',
			'tooltip is-tooltip-multiline icon has-text-warning');
		span.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
		span.setAttribute('data-tooltip', rowData.orthercomment.trim());
		cell.appendChild(span);
	}
};
var renderSettlementCode = function (elem, value) {
	elem.innerHTML = value;
	var orderId = elem.parentNode.querySelectorAll('[snb-key=orderid]')[0].innerHTML;
	var aTag = elem.parentNode;
	var userType = window.localStorage.getItem("loggedUserType");
	var pageurl = "accountrequestserviceformmanage";
	aTag.setAttribute("href", "/private/" + userType + pageurl + "/" + orderId);
};
var gotoOrderDetail = function (elem, value) {
};
var renderAmountDatalist = function (elem, value, attr) {
	if (value == 0) {
		elem.innerHTML = shinobi.language.free;
	} else {
		elem.innerHTML = format(value);
	}
};
var removeAllClassListInList = function (listElem, classList) {
	for (var i = 0; i < listElem.length; i++) {
		for (var j = 0; j < classList.length; j++) {
			listElem[i].classList.remove(classList[j]);
		}
	}
};
var addAllClassListInList = function (listElem, classList) {
	for (var i = 0; i < listElem.length; i++) {
		for (var j = 0; j < classList.length; j++) {
			listElem[i].classList.add(classList[j]);
		}
	}
};
var renderCopyTradeActionDatalist = function (elem, value, attr) {
	var content;
	switch (value) {
		case 'AUTOMATICAL':
			content = 'Tự đặt lệnh';
			break;
		case 'MANUAL':
			content = 'Thông báo đặt lệnh';
			break;
		default:
			break;
	}
	elem.innerHTML = content;
};
var goToPageFollowUserType = function (investorPageLink, traderPageLink) {
	var userType = window.localStorage.getItem('loggedUserType');
	if (userType == 'investor') {
		window.location.href = investorPageLink;
	} else {
		window.location.href = traderPageLink;
	}
};
var goToPageWithUserType = function (elem, pageGeneralName, beforeGeneralName,
	afterGeneralName) {
	var userType = window.localStorage.getItem('loggedUserType');
	var url = pageGeneralName;
	if (!beforeGeneralName && !afterGeneralName) {
		url = '/private/' + userType + pageGeneralName;
	}
	if (beforeGeneralName) {
		url = beforeGeneralName + url;
	}
	if (afterGeneralName) {
		url = url + afterGeneralName;
	}
	elem.onclick = function () {
		window.location.href = url;
	}
};
var er = {
	'addEventDropdown': function (id) {
		var container = document.getElementById(id);
		var button = container.querySelector('[aria-controls=dropdown-menu]');
		button.onclick = function () {
			container.classList.toggle('is-active');
		}
	},
	'buildPublicChat': function (elem, invitedUser) {
		er
			.checkAuthen(function (response) {
				if (JSON.parse(response) == null) {
					elem.classList.remove('is-hidden');
					elem.onclick = function () {
						shinobi.notification.notification
							.error(er.suggestLogin);
					}
				} else {
					if (invitedUser != 'system') {
						var loggedUserName = (JSON.parse(response))['username'];
						if (loggedUserName != invitedUser) {
							er
								.getPublicChatInfo(
									invitedUser,
									function (publicRoomChatInfo) {
										var data = JSON
											.parse(publicRoomChatInfo);
										if (data.chatroom) {
											elem.classList
												.remove('is-hidden');
											var roomId = data.chatroom['roomid'];
											elem.setAttribute(
												'roomid',
												roomId);
										} else {
											if (data.contactstatus != 'BLOCKED_STRANGER'
												&& data.contactstatus != 'NOT_TRADER_AND_INVESTOR') {
												elem
													.setAttribute(
														'inviteduser',
														invitedUser);
												elem.classList
													.remove('is-hidden');
											} else {
												elem.classList
													.add('tooltip');
												elem
													.setAttribute(
														'data-tooltip',
														'Không thể chat với người dùng chặn bạn hoặc bị chặn');
												elem.classList
													.replace(
														'has-text-orange',
														'has-text-grey');
												elem.innerHTML = '<i class="fa fa-comment-slash"></i>';
											}
										}
										elem.onclick = function () {
											if (this
												.hasAttribute('roomid')) {
												er
													.activeChatRoom(this
														.getAttribute('roomid'));
											} else if (this
												.hasAttribute('inviteduser')) {
												er
													.createStrangerContactRoomChat(
														this,
														invitedUser);
											}
										}
									});
						}
					}
				}
			});
	},
	'getPublicChatInfo': function (value, callback) {
		var request = {};
		request.inviteduser = value;
		shinobi.api.request(
			'/authenapi/ChatRoomManagementApi/getContactStatusInfo', JSON
				.stringify(request), function (response) {
					if (typeof callback == 'function') {
						callback(response);
					}
				});
	},
	'createStrangerContactRoomChat': function (elem, inviteduser) {
		var request = {};
		request.inviteduser = inviteduser;
		shinobi.api
			.request(
				'/authenapi/ChatRoomManagementApi/createStrangerContactRoomChat',
				JSON.stringify(request), function (response) {
					var data = JSON.parse(response);
					if (data.roomid) {
						var roomId = data.roomid;
						elem.setAttribute('roomid', roomId);
						elem.onclick();
					}
				});
	},
	'getValueBulmaCalendar': function (elem, param) {
		if (elem.value.trim() == '') {
			return false;
		} else {
			var returnObject = {};
			if (param.hasOwnProperty('isRange') == true) {
				if (elem.value.split('-')[0] && elem.value.split('-')[1]) {
					var startDate = elem.value.split('-')[0].trim().replace(
						/\//g, '-');
					var endDate = elem.value.split('-')[1].trim().replace(
						/\//g, '-');
					returnObject.startdate = startDate;
					returnObject.enddate = endDate;
					return returnObject;
				}
			}
		}
	},
	'renderValueBulmaCalendar': function (elem, value) {
		var info = elem.getAttribute('id') + '-info-render';
		var infoElem = document.getElementsByClassName(info)[0];
		if (infoElem.hasAttribute('is-range')) {
			if (infoElem.getAttribute('is-range') == 'true') {
				var startDate = infoElem.getAttribute('startdate');
				var endDate = infoElem.getAttribute('enddate');
				var startDateInput = elem.parentElement
					.querySelectorAll('.datetimepicker-dummy-input')[0];
				var endDateInput = elem.parentElement
					.querySelectorAll('.datetimepicker-dummy-input')[1];
				var startDateFormat = shinobi.aladinUtil.getFormatDate(
					startDate, 'dd/mm/yyyy');
				var endDateFormat = shinobi.aladinUtil.getFormatDate(endDate,
					'dd/mm/yyyy');
				startDateInput.value = startDateFormat;
				endDateInput.value = endDateFormat;
				elem.value = startDateFormat + ' - ' + endDateFormat;
			}
		}
	},
	'activeChatRoom': function (roomid) {
		var chatBoxColumn = document.getElementById('chatBoxColumn');
		chatBoxColumn.classList.remove('is-hidden');
		var chatMenuButton = document.getElementById('chatMenuButton');
		chatMenuButton.click();
		var listRoomChat = document.getElementById('listRoomChat');
		var listLi = listRoomChat.getElementsByClassName('room-chat');
		setTimeout(function () {
			for (var i = 0; i < listLi.length; i++) {
				if (listLi[i].getAttribute('id') == roomid) {
					listLi[i].click();
				}
			}
		}, 1000);
	},
	'investorRegistration': {
		'investorRegistration': '/page/investorregistration'
	},
	'login': {
		'login': '/page/login',
	},
	'traderlistingpage': {
		'traderlistingpage': '/page/traderlisting',
	},
	'investorlisting': {
		'investorlisting': '/page/investorlisting',
	},
	'suggestLogin': 'Bạn cần đăng nhập để thực hiện thao tác này!',
	'convertUsingServiceToVn': function (value) {
		var content;
		switch (value) {
			case 'NEED_TO_EXTEND':
				content = 'Gia hạn dịch vụ';
				break;
			case 'NEED_TO_SETTLE':
				content = 'Thanh toán dịch vụ';
				break;
			default:
				content = '';
				break;
		}
		return content;
	},
	'convertStringToDate': function (time) {
		return new Date(Date.parse(time.replace('-', '/').replace('-', '/')));
	},
	'buildChatTime': function (time) {
		var inputDate = er.convertStringToDate(time);
		var currentDate = new Date();
		var formatInput = shinobi.aladinUtil.getFormatDate(inputDate,
			'mm-dd-yyyy');
		var formatCurrent = shinobi.aladinUtil.getFormatDate(currentDate,
			'mm-dd-yyyy');
		if (formatInput == formatCurrent) {
			var inputHour = shinobi.aladinUtil
				.getFormatDate(inputDate, 'hh:mm');
			return inputHour;
		} else {
			var inputDateHour = shinobi.aladinUtil.getFormatDate(inputDate,
				'dd-mm-yyyy hh:mm');
			return inputDateHour;
		}
	},
	'renderServiceUsingStatus': function (elem, value) {
		if (value) {
			var content = er.convertUsingServiceToVn(value);
			elem.innerHTML = content;
		}
	},
	'reFormatDate': function (input, inputFormat, outputFormat) {
		var date = input.substring(inputFormat.indexOf('d'), inputFormat
			.lastIndexOf('d') + 1);
		var month = input.substring(inputFormat.indexOf('m'), inputFormat
			.lastIndexOf('m') + 1);
		var year = input.substring(inputFormat.indexOf('y'), inputFormat
			.lastIndexOf('y') + 1);
		var outPut = outputFormat.replace('dd', date).replace('mm', month)
			.replace('yyyy', year);
		return outPut;
	},
	'renderCopyTradeStatus': function (elem, value) {
		var request = {};
		request.feeid = value;
		request.publisher = elem.parentNode
			.querySelectorAll('[snb-key=publisher]')[0].innerHTML;
		shinobi.api
			.request(
				'/authenapi/ServiceUsingManagementApi/getCopyTradeServiceUsingDetailStatus',
				JSON.stringify(request),
				function (response) {
					var jsonArr = JSON.parse(response);
					if (jsonArr.serviceusingstatus == 'FREE_SERVICE') {
						elem.innerHTML = 'Dịch vụ miễn phí';
					} else if (jsonArr.serviceusingstatus == 'EXECUTING_PORTFOLIO') {
						elem.innerHTML = 'Đang xử lí';
					}
					if (jsonArr.serviceusingstatus == 'NEED_TO_SETTLE') {
						elem.innerHTML = '<p><a class="button open-order-button is-small is-link">Cần thanh toán</a></p>';
						elem
							.getElementsByClassName('open-order-button')[0].onclick = function () {
								shinobi.fragmentselectfollowrelationtypemodalrender
									.redirectPaymentPage(value);
							}
						var removeButton = document.createElement('a');
						removeButton.setAttribute('class',
							'button is-text is-small');
						removeButton.innerHTML = 'Xóa đơn hàng';
						elem.appendChild(removeButton);
						removeButton.onclick = function () {
							var data = jsonArr.followdetail;
							var requestDelete = {};
							requestDelete.feetype = data.feetype;
							requestDelete.subscriber = data.subscriber;
							requestDelete.publisher = data.publisher;
							shinobi.api
								.request(
									'/authenapi/AladinProductOrderApi/deleteServiceOrder',
									JSON
										.stringify(requestDelete),
									function (response) {
										if (response == 'update success') {
											shinobi.notification.notification
												.info('Xóa đơn hàng thành công');
											removeButton.parentNode.parentNode.classList
												.add('is-hidden');
										}
									});
						}
					} else if (jsonArr.serviceusingstatus == 'NEED_TO_EXTEND') {
						var exetendbutton = document.createElement('a');
						exetendbutton.setAttribute('class',
							'button  is-danger is-small');
						exetendbutton.innerHTML = 'Gia hạn';
						elem.appendChild(exetendbutton);
						var note = document.createElement('p');
						note.setAttribute('class', ' has-text-danger ');
						note.innerHTML = 'Còn ' + jsonArr.remainday
							+ ' ngày nữa';
						elem.appendChild(note);
						exetendbutton.onclick = function () {
							shinobi.fragmentextendrelationmodalrender
								.build(elem, jsonArr.followdetail);
						}
					} else {
						var data = jsonArr.followdetail;
						shinobi.fragmentaccountfollowingtraderender
							.buildServiceTimeContainer(elem, data);
					}
				});
	},
	'renderUnFollowButton': function (elem, value) {
		var request = {};
		request.feeid = value;
		request.publisher = elem.parentNode
			.querySelectorAll('[snb-key=publisher]')[0].innerHTML;
		shinobi.api
			.request(
				'/authenapi/ServiceUsingManagementApi/getCopyTradeServiceUsingDetailStatus',
				JSON.stringify(request),
				function (response) {
					if (JSON.parse(response).followdetail.isactive == true) {
						shinobi.fragmentaccountfollowingtraderender
							.buildUnFollowService(elem, JSON
								.parse(response).followdetail);
					}
				});
	},
	'renderDetailRating': function (elem, value, attr) {
		var spanStarContainer = document.createElement('span');
		spanStarContainer.setAttribute('class', 'star-container');
		elem.appendChild(spanStarContainer);
		var spanNumberRating = document.createElement('span');
		spanNumberRating.setAttribute('class', 'count-rating-container');
		elem.appendChild(spanNumberRating);
		var userName = value;
		var request = {};
		request.username = userName;
		shinobi.api.request('/api/ViewTraderRatingApi/getUserOverViewRating',
			JSON.stringify(request), function (response) {
				var jsonArr = JSON.parse(response);
				var averageratingpoint = jsonArr.averageratingpoint;
				er.buildRating(spanStarContainer, averageratingpoint);
				spanNumberRating.innerHTML = '('
					+ jsonArr.totalratingmember + ')';
				spanNumberRating.onclick = function () {
					window.location.href = '/page/ratingdetail/'
						+ jsonArr.homepageurl;
				}
			});
	},
	'getCurrentDayOfWeek': function () {
		var toDay = new Date();
		var currentDayOfWeek = toDay.getDay();
		// Sunday - Saturday : 0 - 6
		return currentDayOfWeek;
		// expected output: 2
	},
	'getParentNodeWithKey': function (elem, key, callback) {
		if (elem.hasAttribute(key)) {
			if (typeof callback == 'function') {
				callback(elem);
			}
		} else {
			if (elem.parentElement) {
				er.getParentNodeWithKey(elem.parentElement, key, callback);
			}
		}
	},
	'buildRating': function (elem, value) {
		value = value / 2;
		var starIconHtmlString = '<span class="icon is-small has-text-warning"><i class="fas fa-star"></i></span>';
		var noneStarIconHtmlString = '<span class="icon is-small has-text-light"><i class="fas fa-star"></i></span>';
		var numberRating = value;
		if (value > 5) {
			numberRating = 5;
		}
		if (value < 0 || value == 0) {
			numberRating = 0;
		}
		var contentRating = '';
		for (var i = 0; i < numberRating; i++) {
			contentRating += starIconHtmlString;
		}
		for (var j = 0; j < (5 - numberRating); j++) {
			contentRating += noneStarIconHtmlString;
		}
		elem.innerHTML = contentRating;
	},
	'renderUserType': function (elem, value, attr) {
		var userType = window.localStorage.getItem('loggedUserType');
		er.convertUserTypeDatalist(elem, userType);
	},
	'convertUserTypeDatalist': function (elem, value) {
		var content;
		switch (value.toLowerCase()) {
			case 'trader':
				content = 'Nhà tư vấn';
				break;
			case 'investor':
				content = 'Nhà đầu tư';
				break;
			case 'stock_com_admin':
				content = 'Tổ chức hợp tác';
				break;
			default:
				break;
		}
		elem.innerHTML = content;
	},
	'addEventFollowTable': function (cell, rowIndex, colIndex) {
		var value = cell.innerHTML;
		removeAllChild(cell);
		var a = document.createElement('a');
		a.setAttribute('class', 'button is-link  is-small');
		a.innerHTML = 'Theo';
		cell.appendChild(a);
		shinobi.fragmentselectfollowrelationtypemodalrender.addEventFollow(a,
			value);
	},
	'renderFreeOrUnFreeAmount': function (elem, value, attr) {
		var container = elem.parentNode.parentNode.parentNode.parentNode;
		var publisher = container.querySelectorAll('[snb-key=publisher]')[0].innerHTML;
		var feetype = container.querySelectorAll('[snb-key=feetype]')[0].innerHTML;
		var request = {};
		request.traderusername = publisher;
		request.feetype = feetype;
		shinobi.api
			.request(
				'/authenapi/TraderBuildFeeScheduleApi/checkTraderContainsUnFreeFeeSchedule',
				JSON.stringify(request), function (response) {
					var content;
					if (response == "true") {
						content = "Có phí";
					} else {
						content = shinobi.language.free;
					}
					elem.innerHTML = content;
				});
	},
	'getValueNumberCleaveFormat': function (elem) {
		return elem.value.trim().replace(/,/g, '');
	},
	'formatNameChatContainerHeader': function (elem, value) {
		var content = value;
		/*
		 * if (value.length > 15) {
		 * 
		 * content = value.slice(0, 12) + '...'; }
		 */
		elem.innerHTML = content;
	},
	'renderFeeValue': function (elem, value, attr) {
		var feeAmount = elem.parentNode.querySelectorAll('[snb-key=amount]')[0].innerHTML;
		var feeFequency = value;
		var content = 'Dịch vụ miễn phí';
		if (feeAmount > 0) {
			content = format(feeAmount) + '/' + convertFequency(feeFequency);
		}
		elem.innerHTML = content;
	},
	'checkAuthen': function (callback) {
		if (!shinobi.global.checkAuthen) {
			if (!shinobi.global.isCheckAuthen) {
				if (shinobi.global.isCheckAuthen == false) {
					setTimeout(function () {
						er.checkAuthen(callback);
					}, 10);
				} else {
					var request = {};
					shinobi.global.isCheckAuthen = false;
					shinobi.api.request('/api/UserApi/checkAuthen', JSON
						.stringify(request), function (response) {
							shinobi.global.checkAuthen = response;
							shinobi.global.isCheckAuthen = true;
							callback(response);
						});
				}
			} else {
				callback(shinobi.global.checkAuthen);
			}
		} else {
			callback(shinobi.global.checkAuthen);
		}
	},
	'renderPostStatusDatalist': function (elem, value, attr) {
		var content;
		var classList;
		switch (value) {
			case 'WAITING_FOR_AUDIT':
				content = 'Chờ duyệt';
				classList = 'is-light';
				break;
			case 'AVAILABLE':
				content = 'Đã duyệt';
				classList = 'is-success';
				break;
			case 'REJECTED':
				content = 'Từ chối';
				classList = 'is-danger';
				break;
			default:
				break;
		}
		elem.innerHTML = content;
		elem.classList.add(classList);
	},
	'activePathTabs': function () {
		var listTabs = document.querySelectorAll('.tabs.active-pathname-tabs');
		for (var i = 0; i < listTabs.length; i++) {
			var currentTab = listTabs[i].querySelector('[href='
				+ window.location.pathname.replace(/\//g, '\\/') + ']');
			if (currentTab) {
				currentTab.parentElement.classList.add('is-active');
			}
		}
	},
	'getFormatDatePickerInput': function (datepickerId, format) {
		var input = document.getElementById(datepickerId + '-inputDivID');
		var dateValue = input.value;
		var date = dateValue.split('-')[0];
		var month = dateValue.split('-')[1];
		var year = dateValue.split('-')[2];
		var dateString = month + '-' + date + '-' + year;
		return shinobi.aladinUtil.getFormatDate(dateString, format);
	},
	'getDatePickerValue': function (item) {
		var format = 'yyyy-mm-dd';
		var input = document.getElementById(item.id + '-inputDivID');
		var dateValue = input.value;
		var date = dateValue.split('-')[0];
		var month = dateValue.split('-')[1];
		var year = dateValue.split('-')[2];
		var dateString = year + '-' + month + '-' + date;
		return dateString;
		// return shinobi.aladinUtil.getFormatDate(dateString, format);
		// return er.getFormatDatePickerInput(item.id, format);
	},
	'renderFeeIconFromListFeeType': function (elem, value) {
		var jsonArr = JSON.parse(value);
		for (var i = 0; i < jsonArr.length; i++) {
			var currentData = jsonArr[i][0];
			var iconLink;
			if (currentData.feetype) {
				var iconSpanContainer = document.createElement('span');
				iconSpanContainer.setAttribute('class', 'service-icon tooltip');
				iconSpanContainer.setAttribute('data-tooltip',
					changeFeeType(currentData.feetype));
				var imageContainer = document.createElement('img');
				iconSpanContainer.appendChild(imageContainer);
				switch (currentData.feetype) {
					case 'INVESTING_BLOG':
						iconLink = blogIconImageLink;
						break;
					case 'COPY_TRADE':
						iconLink = copyTradeIconImageLink;
						break;
					default:
						break;
				}
				imageContainer.setAttribute('src', iconLink);
				elem.appendChild(iconSpanContainer);
			}
		}
	},
	'getListFeeIcon': function (elem, value) {
		er
			.checkAuthen(function (response) {
				if (response != 'null') {
					var request = {};
					request.traderusername = value;
					shinobi.api
						.request(
							'/authenapi/TraderCustomerApi/getAllServiceCustomerIsFollowing',
							JSON.stringify(request), function (
								response) {
							er.renderFeeIconFromListFeeType(
								elem, response);
						});
				}
			});
	},
	'listingTimeFrame': function (value) {
		var content;
		switch (value) {
			case 'ONE_DAY':
				content = 'phiên gần nhất';
				break;
			case 'ONE_WEEK':
				content = 'tuần';
				break;
			case 'ONE_MONTH':
				content = 'tháng';
				break;
			case 'THREE_MONTH':
				content = 'ba tháng';
				break;
			case 'SIX_MONTH':
				content = 'sáu tháng';
				break;
			case 'ONE_YEAR':
				content = 'một năm';
				break;
			default:
				break;
		}
		return 'Xếp hạng ' + content;
	},
	'postFiterConvert': function (value) {
		var content;
		switch (value) {
			case 'allpost':
				content = 'Tất cả bài viết';
				break;
			case 'hasfeepost':
				content = 'Bài viết có phí';
				break;
			case 'freepost':
				content = 'Bài viết miễn phí';
				break;
			case 'purchased':
				content = 'Bài viết đã mua';
				break;
			default:
				break;
		}
		return content;
	},
	'renderAdminPostCheckUrl': function (elem, value, attr) {
		if (value.trim == '') {
			return;
		} else {
			var url = value;
			var pageCheckUrl = url.replace(blogPostPageUrl,
				adminPostCheckPageUrl);
			var container = elem.parentNode;
			var adminPostCheckButtonElemList = container
				.querySelectorAll('[snb-target="goToPostCheckPage"');
			for (var i = 0; i < adminPostCheckButtonElemList.length; i++) {
				adminPostCheckButtonElemList[i].onclick = function () {
					window.location.href = pageCheckUrl;
				}
			}
		}
	},
	'createSimpleBar': function (patern) {
		var listElem = document.querySelectorAll(patern);
		for (var i = 0; i < listElem.length; i++) {
			var item = new SimpleBar(listElem[i]);
		}
	},
	'confirm': function (callback, options) {
		var confirmPanel = document.getElementById('confirmPanel');
		shinobi.aladinUtil.modalEventListener(confirmPanel);
		if (options) {
			if (options.title) {
				confirmPanel.getElementsByClassName('modal-card-title')[0].innerHTML = options.title;
			}
			if (options.content) {
				confirmPanel.getElementsByClassName('modal-card-body')[0].innerHTML = options.content;
			}
			if (options.yescontent) {
				confirmPanel.getElementsByClassName('yes')[0].innerHTML = options.yescontent;
			}
			if (options.nocontent) {
				confirmPanel.getElementsByClassName('cancel')[0].innerHTML = options.nocontent;
			}
			if (options.modalsize) {
				confirmPanel.classList.add(options.modalsize);
			}
			if (options.initfunction) {
				options.initfunction(confirmPanel);
			}
		} else {
			confirmPanel.getElementsByClassName('modal-card-title')[0].innerHTML = 'Cảnh báo';
			confirmPanel.getElementsByClassName('modal-card-body')[0].innerHTML = 'Bạn chắc chắn?';
			confirmPanel.getElementsByClassName('yes')[0].innerHTML = 'Xác nhận';
			confirmPanel.getElementsByClassName('cancel')[0].innerHTML = 'Hủy';
		}
		confirmPanel.classList.add('is-active');
		var yes = confirmPanel.getElementsByClassName('yes')[0];
		yes.focus();
		yes.onclick = function () {
			if (typeof callback == 'function') {
				confirmPanel.classList.remove('is-active');
				callback();
			}
		}
	},
	'runSnbReload': function (elem) {
		if (elem.hasAttribute('snb-reload')) {
			var reloadFunction = elem.getAttribute('snb-reload');
			if (elem.hasAttribute('snb-reload-key')) {
				var reloadKey = elem.getAttribute('snb-reload-key');
				if (reloadKey == 'this') {
					var reloadKeyValue = elem;
					eval(reloadFunction)(reloadKeyValue);
				}
			} else {
				eval(reloadFunction)();
			}
		}
	},
	'renderListFeeIsActive': function (elem, value) {
		var content = '';
		var listFee = elem.parentNode
			.querySelectorAll('[snb-render-key=feeType]');
		for (var i = 0; i < listFee.length; i++) {
			if (listFee[i].innerHTML == "true") {
				var feeType = listFee[i].getAttribute('snb-key');
				content = content + '/' + changeFeeType(feeType);
			}
		}
		content = content.slice(1, content.length);
		elem.innerHTML = content;
	},
	'addEventTabs': function (patern, renderType) {
		var elemList = document.querySelectorAll(patern);
		switch (renderType) {
			case 'hrefUserType':
				er.addEventHrefUserType(patern, elemList);
				break;
			default:
				break;
		}
	},
	'addEventHrefUserType': function (patern, elemList) {
		var item = elemList[0];
		var listTab = item.querySelectorAll('[snb-tab]');
		var json = {};
		var userType = window.localStorage.getItem('loggedUserType');
		for (var i = 0; i < listTab.length; i++) {
			var tab = listTab[i];
			if (tab.hasAttribute('snb-tab')) {
				var value = tab.getAttribute('snb-tab');
				json[value] = value;
				json[value + 'href'] = '/private/' + userType + value;
			}
		}
		shinobi.mapping.render(patern, JSON.stringify(json))
	},
	'renderCurrentCashPlaceHolder': function (elem, value) {
		elem.setAttribute('placeholder', 'Vốn khả dụng: ' + format(value));
	},
	'renderCopyTradeMessage': function (elem, value) {
		var copytradeSettingMessageContainer = document
			.getElementById('copytradeSettingMessageContainer');
		var copytradecapital = document.getElementById('copytradecapital');
		if (value.trim() == '') {
			copytradeSettingMessageContainer.classList.add('is-hidden');
		} else {
			copytradeSettingMessageContainer.classList.remove('is-hidden');
		}
		var currentCash = elem.parentNode
			.querySelectorAll('[snb-key=currentcash')[0].innerHTML;
		if (Number(currentCash) < 100000) {
			copytradecapital.classList.add('is-danger');
			copytradecapital.disabled = true;
		} else {
			copytradecapital.classList.remove('is-danger');
			copytradecapital.disabled = false;
		}
		elem.innerHTML = value;
	},
	'renderMaxQuantity': function (elem, value) {
		if (isNaN(Number(value))) {
			elem.parentNode.classList.add('is-hidden');
		} else {
			elem.parentNode.classList.remove('is-hidden');
			elem.innerHTML = format(value);
		}
	},
	'renderPriceDatalist': function (elem, value) {
		if (value == 0) {
			elem.innerHTML = shinobi.language.free;
		} else {
			elem.innerHTML = format(value) + 'VNĐ';
		}
	},
	'showDownloadFileModal': function () {
		var confirmDownloadFileModal = document
			.getElementById('confirmDownloadFileModal');
		confirmDownloadFileModal.classList.add('is-active');
		var button = confirmDownloadFileModal.querySelector('.button.is-white');
		// button.classList.remove('is-hidden');
		button.classList.add('is-loading');
		var shinobinotification = document
			.getElementById('shinobinotification');
		setTimeout(function () {
			if (shinobinotification.getAttribute('class').includes(
				'errormessage')) {
				confirmDownloadFileModal.classList.remove('is-active');
			}
		}, 2000);
	},
	'renderDownloadFileModal': function (response) {
		var confirmDownloadFileModal = document
			.getElementById('confirmDownloadFileModal');
		confirmDownloadFileModal.classList.add('is-active');
		var button = confirmDownloadFileModal
			.getElementsByClassName('is-loading')[0];
		if (response == 'update success') {
			// button.classList.add('is-hidden');
			button.classList.remove('is-loading');
			button.innerHTML = response;
		} else {
			confirmDownloadFileModal.classList.remove('is-active');
		}
	},
	'renderRemovePinLevel': function (elem, value) {
		var pinLevel = value;
		/* if (pinLevel != 1) { */
		elem.classList.remove('is-hidden');
		elem.onclick = function () {
			if (confirm('Xác nhận xóa đánh dấu')) {
				var postId = elem.parentNode
					.querySelectorAll('[snb-key=postid]')[0].innerHTML;
				var request = {};
				request.postid = postId;
				shinobi.api
					.request(
						'/authenapi/SystemAuditTraderPostApi/deletePinedTraderPost',
						JSON.stringify(request), function (response) {
							if (response == 'update success') {
								shinobi.notification.notification
									.info('Cập nhật thành công!');
								location.reload()
							}
						});
			}
		}
		/* } */
	},
	'renderDatePicker': function (elem, value) {
		var input = elem.getElementsByClassName('inputDivClass')[0];
		input.value = shinobi.aladinUtil.getFormatDate(value, 'dd-mm-yyyy');
	},
	'changeAllKeyChildren': function (array, keysMap, callback) {
		for (var i = 0; i < array.length; i++) {
			// var item = jsonArr[i];
			er.renameKeys(keysMap, array[i]);
			if (array[i].children && array[i].children.length != 0) {
				er.changeAllKeyChildren(array[i].children, keysMap);
			}
		}
		if (typeof callback == 'function') {
			callback(array);
		}
	},
	'renameKeys': function (keysMap, obj) {
		var listOldKey = Object.keys(keysMap);
		var listNewKey = Object.values(keysMap);
		for (var i = 0; i < listOldKey.length; i++) {
			var oldkey = listOldKey[i];
			var newKey = listNewKey[i];
			var oldkeyValue = obj[oldkey];
			obj[newKey] = oldkeyValue;
		}
	},
	'getAllObjectMenu': function (resultArray, sourceArray) {
		for (var i = 0; i < sourceArray.length; i++) {
			resultArray.push(sourceArray[i]);
			if (sourceArray[i].children && sourceArray[i].children.length != 0) {
				er.getAllObjectMenu(resultArray, sourceArray[i].children);
			}
		}
	},
	'getTokenValue': function (input) {
		var numberInput = Number(input.slice(1, input.length - 1));
		var LastNumberInput = Number(numberInput).toString().split('').pop();
		var returnValue = numberInput >>> LastNumberInput;
		return returnValue;
	},
	'encodeURIComponent': function (uri) {
		var uri_enc = encodeURIComponent(uri);
		return uri_enc;
	},
	'decodeURIComponent': function (uri_enc) {
		var uri = encodeURIComponent(uri_enc);
		return uri;
	},
	'addEventSearchUser': function (elemId) {
		var elem = document.getElementById(elemId);
		if (elem.getAttribute('type') == 'tags') {
			var interval = setInterval(function () {
				var inputBox = elem.nextElementSibling;
				if (inputBox) {
					var input = inputBox.getElementsByTagName('input')[0];
					er.addEventSearchUserElem(input, elem);
					clearInterval(interval);
				}
			}, 100);
		} else {
			er.addEventSearchUserElem(elem, elem);
		}
	},
	'addResultList': function (elem, data, elemInputFirstDeclare) {
		function insertAfter(el, referenceNode) {
			referenceNode.parentNode
				.insertBefore(el, referenceNode.nextSibling);
		}
		var container;
		if (elem.parentNode.getElementsByClassName('result-absolute-container').length > 0) {
			container = elem.parentNode
				.getElementsByClassName('result-absolute-container')[0];
		} else {
			container = document.createElement('div');
			container.setAttribute('class', 'result-absolute-container');
			insertAfter(container, elem);
		}
		container.parentNode.classList.add('is-relative');
		if (data.length == 0) {
			container.remove();
			elem.setAttribute('refid', '');
		} else {
			container.innerHTML = '';
			for (var i = 0; i < data.length; i++) {
				if (i < 3) {
					elem.setAttribute('refid', data[i].id);
					var record = document.createElement('div');
					record.setAttribute('class', 'level is-marginless');
					record.innerHTML = '<div class="level-left chat-avatar"><img src="'
						+ data[i].avatarlink
						+ '" class="chat-room-avatar margin-right-05rem"></div><div class="level-item ">'
						+ data[i].firstname
						+ ' '
						+ data[i].lastname
						+ '</div>';
					container.appendChild(record);
				}
			}
			elem.onblur = function () {
				container.classList.add('is-hidden');
			}
			elem.onclick = function () {
				container.classList.remove('is-hidden');
			}
		}
	},
	'addEventSearchUserElem': function (elem, elemInputFirstDeclare) {
		var api = '/api/UserApi/searchUserById';
		elem.onkeyup = function () {
			var value = elem.value.trim();
			if (value != '') {
				var request = {};
				request.searchkey = value;
				shinobi.api.request(api, JSON.stringify(request), function (
					response) {
					var jsonArr = JSON.parse(response);
					er.addResultList(elem, jsonArr, elemInputFirstDeclare);
				});
			} else {
				er.addResultList(elem, [], elemInputFirstDeclare);
			}
		}
	},
};
