var erLib = {

	'data' : [],

	'reportLink' : '/static/report/',

	'renderCheckbox' : function(elem, row, col) {

		elem.innerHTML = '<label class="checkbox"><input type="checkbox"></label>';

	},

	'renderAllowDenyTable' : function(cell, row, col) {

		if (cell.innerHTML == 'allow') {

			cell.innerHTML = 'Cho phép';
		}
		if (cell.innerHTML == 'deny') {

			cell.innerHTML = 'Chặn';
		}
	},

	'showConfirmModal' : function(callback) {

		var confirmPanel = document.getElementById('confirmPanel');

		confirmPanel.classList.add('is-active');

		var yesButton = confirmPanel.getElementsByClassName('yes')[0];

		yesButton.onclick = function() {

			confirmPanel.classList.remove('is-active');

			callback();
		}

	},

	'createDataTreeRelation' : function(data, dataParent, callback) {

		if (!dataParent) {

			data.name = data.id;

		} else {

			var currentId = data.id;

			data.name = currentId;
			data.id = dataParent.id + '/' + currentId;

		}

		for (var i = 0; i < data.children.length; i++) {

			erLib.createDataTreeRelation(data.children[i], data);
		}

		if (typeof callback == 'function') {

			callback(data);
		}
	},

	'getFullPathSelectedNodeTree' : function(tree, callback) {

		var data = tree.treeNodes;

		var result = [];

		erLib.getFullPathSelected(result, data, '');

		callback(result);

	},

	'getFullPathSelected' : function(result, data, callback) {

		for (var i = 0; i < data.length; i++) {

			if (data[i].status == 2) {

				result.push(data[i].id);

			}

			if (data[i].status == 1) {

				erLib.getFullPathSelected(result, data[i].children, callback);
			}

		}

		if (typeof callback == 'function') {

			callback(result);
		}

	},

	'getFullAreaTreeData' : function(callback) {

		var request = {};

		shinobi.api.request(
				'/authenapi/AgencyWorkingAreaApi/getAreaDistributionAsTree',
				JSON.stringify(request), function(response) {

					var jsonArr = JSON.parse(response);

					if (typeof callback == 'function') {

						callback(jsonArr);
					}
				});
	},

	'getAgencyAreaTreeData' : function(requestInput, callback) {

		var request = requestInput;

		shinobi.api.request(
				'/authenapi/AgencyWorkingAreaApi/getAreaDistributionAsTree',
				JSON.stringify(request), function(response) {

					var jsonArr = JSON.parse(response);

					if (typeof callback == 'function') {

						callback(jsonArr);
					}
				});
	},

	'createFullAreaTree' : function(patern, callback) {

		erLib.getListProvinceDataTree(function(provinceData) {

			for (var i = 0; i < provinceData.length; i++) {

				erLib.getListDicTristDataTree(provinceData, i, function(
						dictristData) {

					for (var j = 0; j < dictristData.length; j++) {

						erLib.getListPrecinctDataTree(dictristData, j,
								function() {

									shinobi.createstafftreerender.tree = erLib
											.createTree(patern, provinceData);

									var container = document
											.querySelectorAll(patern)[0];

									shinobi.createstafftreerender
											.closeAllNode(container);

									if (typeof callback == 'function') {

										callback(tree);
									}

								});

					}

				});
			}

		});

	},

	'createTree' : function(patern, data) {

		var tree = new Tree(patern, {

			// root data
			data : data,
			loaded : function() {

				// pre-selected nodes
				// this.values = [ 'HCM_TPH', 'HCM_006_0009' ];

				// disabled nodes
				// this.disables = [ '1-1-1', '1-1-1', '1-1-2' ]

			}

		});

		return tree;
	},

	'getListPrecinctDataTree' : function(currentData, i, callback) {

		var item = currentData[i];

		var districtValue = item.id;

		var request = {};
		request.columnname = 'district';
		request.columnvalue = districtValue;

		shinobi.api.request(
				'/authenapi/AgencyWorkingAreaApi/getAreaDistributionAsTree',
				JSON.stringify(request), function(response) {

					var precinctData = JSON.parse(response);

					currentData[i].children = precinctData;

					if (typeof callback == 'function') {

						callback(precinctData);
					}

					return currentData;
				});
	},

	'getListDicTristDataTree' : function(currentData, i, callback) {

		var item = currentData[i];

		var provinceValue = item.id;

		var request = {};
		request.columnname = 'province';
		request.columnvalue = provinceValue;

		shinobi.api.request(
				'/authenapi/AgencyWorkingAreaApi/getAreaDistributionAsTree',
				JSON.stringify(request), function(response) {

					var dictristData = JSON.parse(response);

					currentData[i].children = dictristData;

					if (typeof callback == 'function') {

						callback(dictristData);
					}

					return currentData;
				});
	},

	'getListProvinceDataTree' : function(callback) {

		var request = {};

		request.columnname = 'province';

		shinobi.api.request(
				'/authenapi/AgencyWorkingAreaApi/getDefaultValueListAsTree',
				JSON.stringify(request), function(response) {

					var provinceData = JSON.parse(response);

					if (typeof callback == 'function') {

						callback(provinceData);
					}

					return provinceData;

				});
	},

	'getFileName' : function(elem, value) {

		var linkFile = value;
		var linkFileSplit = linkFile.split('/');

		elem.innerHTML = linkFileSplit[linkFileSplit.length - 1];
	},

	'renderDownloadFile' : function(elem, value) {

		var linkFile = value;
		var linkFileSplit = linkFile.split('/');

		elem.setAttribute('href', erLib.reportLink
				+ linkFileSplit[linkFileSplit.length - 1]);

		setTimeout(function() {

			elem.focus();

		}, 200);

		elem.onclick = function() {

			var modalId = elem.getAttribute('modal-parent');

			var modal = document.getElementById(modalId);
			modal.classList.remove('is-active');

		}

	},

	'addEventSelectAll' : function(selectAllCheckboxId, tableId) {

		var selectAllCheckBoxHeader = document
				.getElementById(selectAllCheckboxId);
		selectAllCheckBoxHeader.onchange = function() {

			var table = document.getElementById(tableId);

			var body = table.getElementsByTagName('tbody')[0];

			var listRow = body.getElementsByTagName('tr');

			for (var i = 0; i < listRow.length; i++) {

				var item = listRow[i];

				var listTd = item.getElementsByTagName('td');

				var checkbox = item.querySelectorAll('[type=checkbox]')[0];

				if (this.checked) {
					checkbox.checked = true;
				} else {

					checkbox.checked = false;
				}
			}

		}
	},

	'hiddenCommandButton' : function(className) {

		var commandGroup = document.getElementById('buttonGroup');

		var button = commandGroup.getElementsByClassName(className)[0];

		button.classList.add('is-hidden');

	},

	'addEventRemoveRowTable' : function(elem, row, col, controlApi) {

		var value = elem.innerHTML;

		removeAllChild(elem);

		erLib.addEventRemoveRowDatalist(elem, value, controlApi);
	},

	'addEventRemoveRowDatalist' : function(elem, value, controlApi) {

		var button = document.createElement('a');
		button.setAttribute('class', 'button is-danger is-small');
		button.innerHTML = '<span class="icon"><i class="fa fa-times"></i></span><span>Xóa</span>';
		elem.appendChild(button);

		button.onclick = function() {

			var id = value;

			var request = {};

			request.id = id;

			shinobi.api.request(controlApi, JSON.stringify(request), function(
					response) {

				erLib.removeMessage(response);
				location.reload();

			});
		}

	},

	'createMessage' : function(response) {

		if (response == 'update success') {

			shinobi.notification.notification.info('Tạo mới thành công');

		}
	},

	'renderCellChangeStaffValue' : function(elem, row, col, allData) {

		erLib.renderNodeChangeValueListener(elem, function() {

			var input = elem.getElementsByTagName('input')[0];

			var inputId = row + 'StaffId';

			input.setAttribute('list', 'fragmentStaffIdDatalist');

			var agency = allData[row].agency;

			erLib.renderDataListStaff('fragmentStaffIdDatalist', agency);
		});
	},

	'updateMessage' : function(response, callback) {

		if (response == 'update success') {

			shinobi.notification.notification.info('Cập nhật thành công');

			if (typeof callback == 'function') {

				callback();
			}

		}
	},

	'removeMessage' : function(response) {

		if (response == 'update success') {

			shinobi.notification.notification.info('Xóa thành công');

		}
	},

	'renderUserTypeTable' : function(elem, row, col) {

		var value = elem.innerHTML;

		erLib.renderUserTypeDatalist(elem, value);
	},

	'renderUserTypeDatalist' : function(elem, value) {

		var content;
		switch (value.toLowerCase()) {

		case 'shop':
			content = 'Đại lý';
			break;

		case 'agency':
			content = 'Pháp nhân';
			break;

		case 'staff':
			content = 'Nhân viên';
			break;

		case 'mobi_hcm_2':
			content = 'Mobifone';
			break;
		case 'system':
			content = 'Quản trị hệ thống';
			break;

		default:
			break;
		}

		elem.innerHTML = content;
		// elem.innerHTML = value;
	},

	'renderOrderResultTable' : function(elem, row, col) {

		var value = elem.innerHTML;

		erLib.renderOrderResultDatalist(elem, value);
	},

	'renderOrderResultDatalist' : function(elem, value) {

		var content;
		switch (value.toLowerCase()) {

		case 'inprocess':
			content = 'Đang xử lí';
			break;

		case 'fail':
			content = 'Thất bại';
			break;

		case 'success':
			content = 'Thành công';
			break;

		default:
			content = value;
			break;
		}

		elem.innerHTML = content;
		// elem.innerHTML = value;
	},

	'notiFillInput' : function() {

		shinobi.notification.notification.error('Điền đầy đủ thông tin');
	},

	'addStartDateEndDateRequest' : function(request, callback) {

		var fromDate = document.getElementById('fromDate-inputDivID');
		var toDate = document.getElementById('toDate-inputDivID');

		if (fromDate.value.trim() == '' || toDate.value.trim() == '') {

			erLib.notiFillDateInput();

		} else {

			request.startdate = er.getFormatDatePickerInput('fromDate',
					'yyyy-mm-dd');
			request.enddate = er.getFormatDatePickerInput('toDate',
					'yyyy-mm-dd');

			if (typeof callback == 'function') {

				callback(request);
			}

		}
	},

	'notiFillDateInput' : function() {

		shinobi.notification.notification.error('Chưa điền từ ngày đến ngày');
	},

	'createTableListener' : function(tableIdOrBodyId) {

		var container = document.getElementById(tableIdOrBodyId);

		var listNode = container.getElementsByTagName('td');

		for (var i = 0; i < listNode.length; i++) {

			erLib.renderNodeChangeValueListener(listNode[i]);
		}

	},

	'renderCellChangeValue' : function(elem, rowIndex, colIndex, callback) {

		if (typeof callback == 'function') {

			erLib.renderNodeChangeValueListener(elem, callback);
		} else {

			erLib.renderNodeChangeValueListener(elem);
		}

	},

	'renderHasSendProfileContentTable' : function(cell, row, col, allData) {

		var content = 'Đã nộp';

		if (!allData[row].staffsendprofiledate) {

			content = 'Chưa nộp';
		}

		cell.innerHTML = content;

	},

	'addHasSendProfileSelect' : function(cell, callback) {

		cell.innerHTML = '';

		var selectContainer = document.createElement('div');
		selectContainer.setAttribute('class', 'select is-fullwidth');
		selectContainer.setAttribute('snb-key', 'isprofilesent');
		selectContainer.innerHTML = '  <select class="profile-send-select"> <option value="true">Đã nộp</option> <option value="false">Chưa nộp</option>  </select>';

		cell.appendChild(selectContainer);

		return selectContainer.getElementsByTagName('select')[0];

	},

	'renderHasSendProfileTable' : function(cell, row, col, allData) {

		// if (allData[row].orderresult && allData[row].orderresult ==
		// "SUCCESS") {

		erLib.addHasSendProfileSelect(cell);

		var select = cell.getElementsByTagName('select')[0];

		if (allData[row].orderresult == 'SUCCESS') {

			if (allData[row].staffsendprofiledate) {

				select.value = 'true';

			} else {

				select.value = 'false';

			}

		} else {

			select.value = 'false';

			select.disabled = true;
		}

		select.onchange = function() {

			var row = cell.parentNode;

			var checkBox = row.querySelectorAll('[type=checkbox]')[0];

			if (checkBox) {

				checkBox.checked = true;
			}

		}
		// }

		// else {
		//
		// erLib.renderHasSendProfileContentTable(cell, row, col, allData);
		// }

	},

	'renderNodeChangeValueListener' : function(elem, callback, ortherFunction) {

		elem.ondblclick = function() {

			var currentValue = elem.innerText;

			elem.classList.add('table-change-value-cell');

			var inputChange = elem
					.getElementsByClassName('table-change-value-input')[0];

			var input;

			if (!inputChange) {

				input = document.createElement('input');
				input.setAttribute('class',
						'input is-small table-change-value-input');

			} else {

				input = inputChange;
			}

			// input.value = currentValue;

			elem.appendChild(input);

			input.focus();

			if (typeof callback == 'function') {

				callback(input);
			}

			input.onchange = function() {

				if (typeof ortherFunction == 'function') {

					ortherFunction();
				}

				elem.classList.remove('table-change-value-cell');

				var newValue = input.value;

				input.remove();

				if (newValue.trim() == '') {

					elem.innerHTML = currentValue;

				} else {

					elem.innerHTML = newValue;

				}

			}

			input.addEventListener('keypress', function(e) {
				var key = e.which || e.keyCode;
				if (key === 13) {

					if (typeof ortherFunction == 'function') {
						ortherFunction();
					}

					elem.classList.remove('table-change-value-cell');

					var newValue = input.value;

					input.remove();

					if (newValue.trim() == '') {

						elem.innerHTML = currentValue;

					} else {

						elem.innerHTML = newValue;

					}
				}
			});

		}
	},

	'createButtonEvent' : function(callback) {

		var commandGroup = document.getElementById('buttonGroup');

		var createButton = commandGroup.getElementsByClassName('createButton')[0];

		createButton.onclick = function() {

			callback();
		}
	},

	'updateButtonEvent' : function(callback) {

		var commandGroup = document.getElementById('buttonGroup');

		var createButton = commandGroup.getElementsByClassName('updateButton')[0];

		createButton.onclick = function() {

			callback();
		}
	},

	'getSelectFormShopcodeValue' : function(elemId, requestName, listRequest) {

		var elem = document.getElementById(elemId);

		var value = elem.value;

		if (value != 'ALL') {

			var tempObject = {};

			tempObject.columnname = requestName;

			tempObject.columnvalue = value.split('-')[0];

			if (elem.hasAttribute('user-level')) {

				tempObject.userlevel = elem.getAttribute('user-level');
			}

			listRequest.push(tempObject);

		}
	},

	'renderShopCodeCheckGroup' : function(elemId, columnName) {

		var datalistName = elemId;

		var request = {};

		request.columnname = columnName;

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist
				.initLoadApi(
						"/authenapi/AgencyWorkingAreaApi/getDefaultValueListAfterCheckGroup",
						request);
	},

	'renderShopCode' : function(elemId) {

		var datalistName = elemId;

		var request = {};

		request.columnname = 'shopcode';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getDefaultValueList", request);
	},
	'renderStatusCodeDetail' : function(elemId) {

		var datalistName = elemId;

		var request = {};

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/OrderStatusCodeApi/getListStatusCodeWithCodeValue",
				request);
	},

	'renderObjectReport' : function(elemId) {

		var datalistName = elemId;

		var request = {};

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist
				.initLoadApi(
						"/authenapi/ExportTotalCommissionToExcelFileApi/getListShopAndAgency",
						request);
	},

	'renderShopCodeOfAgency' : function(elemId, agency, callback) {

		var datalistName = elemId;

		var request = {};

		request.columnvalue = agency;

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getListShopOfAgencyWorking",
				request);

		if (typeof callback == 'function') {

			callback();
		}
		return datalist;
	},

	'renderShopCodeOfAgencyHasAllValue' : function(elemId, agency) {

		var datalistName = elemId;

		var request = {};

		request.columnvalue = agency;
		request.getallvalue = 'ALL';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getListShopOfAgencyWorking",
				request);

		return datalist;
	},

	'renderEmtyCell' : function(cell, row, col) {

		cell.innerHTML = '';
	},

	'renderRemoveCell' : function(cell, row, col) {

		cell.classList.add('is-hidden');
	},

	'renderAgency' : function(elemId, callback) {

		var datalistName = elemId;

		var request = {};

		request.columnname = 'agency';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getDefaultValueList", request,
				callback);
	},

	'renderAgencyOfShopcode' : function(elemId, shopcode, callback) {

		var datalistName = elemId;

		var request = {};

		request.columnname = 'agency';
		request.columnvalue = shopcode;

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getListAgencyOfShopWorking",
				request, callback);
	},
	'renderAgencyOfShopcodeHasAllValue' : function(elemId, shopcode, callback) {

		var datalistName = elemId;

		var request = {};

		request.columnname = 'agency';
		request.columnvalue = shopcode;
		request.getallvalue = 'ALL';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getListAgencyOfShopWorking",
				request, callback);
	},

	'getListAgency' : function(callback) {

		var request = {};

		request.columnname = 'agency';

		shinobi.api.request(
				"/authenapi/AgencyWorkingAreaApi/getDefaultValueList", JSON
						.stringify(request), function(response) {

					var jsonArr = JSON.parse(response);
					callback(jsonArr.data);

				});
	},

	'convertListToTreeNode' : function(list, textMap, idMap, hasChildren) {

		var result = [];

		for (var i = 0; i < list.length; i++) {

			var item = list[i];

			var tempObject = {};

			tempObject.text = item[textMap];
			tempObject.id = item[idMap];

			if (hasChildren) {

				tempObject.children = [];
			}

			result.push(tempObject);
		}

		return result;
	},

	'renderProvince' : function(elemId, callback) {

		var datalistName = elemId;

		var request = {};

		request.columnname = 'province';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getDefaultValueList", request,
				callback);
	},

	'renderDistrictListener' : function(districtId, provinceSelectId, callback) {

		var districtSelectDatalist = erLib.renderDistrict(districtId, document
				.getElementById(provinceSelectId).value, function() {

			callback();

			var provinceSelect = document.getElementById(provinceSelectId);

			provinceSelect.onchange = function() {

				var datalistElem = document.getElementById(districtId);

				removeAllChild(datalistElem);

				datalistElem.appendChild(districtSelectDatalist.sampleNode);

				erLib.renderDistrict(districtId, this.value);

			}
		});
	},

	'renderDistrict' : function(elemId, provinceValue, callback) {

		var elem = document.getElementById(elemId);

		elem.disabled = false;
		var datalistName = elemId;

		var request = {};

		request.columnname = 'province';
		request.columnvalue = provinceValue;

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getAreaDistribution", request,
				callback);

		return datalist;

	},

	'renderShopcodeHasAllValue' : function(elemId, callback) {

		var elem = document.getElementById(elemId);

		elem.disabled = false;
		var datalistName = elemId;

		var request = {};

		request.columnname = 'shopcode';

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist
				.initLoadApi(
						"/authenapi/AgencyWorkingAreaApi/getDefaultValueListWithAllValue",
						request, callback);

		return datalist;

	},

	'renderStaffInputListenner' : function(staffInputId, agencySelectId) {

		var controlElem = document.getElementById(agencySelectId);

		setTimeout(function() {

			var controlValue = controlElem.value;

			erLib.createStaffInputDatalist(staffInputId, controlValue);
		}, 2000)

		controlElem.onchange = function() {

			var currentValue = this.value;

			erLib.createStaffInputDatalist(staffInputId, currentValue);
		}
	},

	'createStaffInputDatalist' : function(inputId, controlValue) {

		var datalistId = inputId + 'Datalist';

		var datalistIdContainer = datalistId + 'Container';

		var currentDatalist = document.getElementById(datalistIdContainer);
		if (currentDatalist) {

			currentDatalist.remove();
		}

		var tempDatalist = document.getElementById('tempDataList');

		var cloneDatalist = tempDatalist.cloneNode(true);

		cloneDatalist.getElementsByTagName('datalist')[0].innerHTML = '<option  snb-datalist-parent="staffInputDatalist" snb-key="columnvalue"></option>';

		cloneDatalist.setAttribute('id', datalistIdContainer);

		document.getElementsByTagName('main')[0].appendChild(cloneDatalist);

		var input = document.getElementById(inputId);

		input.setAttribute('list', datalistId);

		input.value = '';

		var datalist = cloneDatalist.getElementsByTagName('datalist')[0];
		datalist.setAttribute('id', datalistId);
		datalist.setAttribute('snb-datalist-node', datalistId);

		var option = cloneDatalist.getElementsByTagName('option')[0];
		option.setAttribute('snb-datalist-parent', datalistId);
		option.setAttribute('snb-key', 'columnvalue');

		var datalist = erLib.renderDataListStaff(datalistId, controlValue);

		return datalist;

	},

	'getStaffList' : function(agencyObject, callback) {

		var request = {};

		request.agency = agencyObject.id;

		shinobi.api.request("/authenapi/StaffAreaDistributionApi/getStaffList",
				JSON.stringify(request), function(response) {

					var jsonArr = JSON.parse(response);
					var listStaff = jsonArr.data;

					var listStaffData = erLib.convertListToTreeNode(listStaff,
							'columnname', 'columnvalue', false);

					agencyObject.children = listStaffData;

					callback(agencyObject);

				});
	},

	'renderDataListStaff' : function(datalistId, controlValue) {

		var option = document.createElement('option');
		option.setAttribute('snb-datalist-parent', datalistId);
		option.setAttribute('snb-key', 'columnvalue');

		var datalist = document.getElementById(datalistId);

		removeAllChild(datalist);
		datalist.appendChild(option);

		var request = {};

		request.agency = controlValue;

		request.recordPerPage = getRecordNumber(datalistId);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistId);

		datalist.initLoadApi(
				"/authenapi/StaffAreaDistributionApi/getStaffList", request);

		return datalist;

	},

	'renderDataListOrderStatus' : function(datalistId, controlValue) {

		var option = document.createElement('option');
		option.setAttribute('snb-datalist-parent', datalistId);
		option.setAttribute('snb-key', 'orderstatus');
		option.setAttribute('snb-key-innerhtml', 'orderstatus');
		option.setAttribute('snb-key-result', 'orderresult');

		var datalist = document.getElementById(datalistId);

		removeAllChild(datalist);
		datalist.appendChild(option);

		var request = {};

		request.agency = controlValue;

		request.recordPerPage = getRecordNumber(datalistId);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistId);

		datalist.initLoadApi("/authenapi/OrderStatusCodeApi/getListStatusCode",
				request);

	},

	'renderWardListener' : function(wardId, districtSelectId) {

		var wardSelectDatalist = erLib.renderWard(wardId, document
				.getElementById(districtSelectId).value, function() {

			var districtSelect = document.getElementById(districtSelectId);

			districtSelect.onchange = function() {

				var datalistElem = document.getElementById(wardId);

				removeAllChild(datalistElem);

				datalistElem.appendChild(wardSelectDatalist.sampleNode);

				erLib.renderWard(wardId, this.value);

			}
		});
	},

	'renderWard' : function(elemId, districtValue, callback) {

		var elem = document.getElementById(elemId);

		elem.disabled = false;
		var datalistName = elemId;

		var request = {};

		request.columnname = 'district';
		request.columnvalue = districtValue;

		request.recordPerPage = getRecordNumber(datalistName);

		request.pageNum = 1;

		var datalist = new shinobi.datalist(datalistName);

		var sort = {};
		sort.colname = "createddate";
		sort.value = "desc";

		// datalist.staticsorts[0] = sort;

		datalist.initLoadApi(
				"/authenapi/AgencyWorkingAreaApi/getAreaDistribution", request,
				callback);

		return datalist;
	},
};