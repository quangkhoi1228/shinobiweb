shinobi.operationsmanagementrender = {
    build: function () {
        var object = this;
        object.activeTab();
        object.renderOperationsList();
        object.renderTypeSelector();
        object.renderSearchingButton();
        object.setLabelCalendarPicker();
        object.reloadApiFilterButton();
    },

    activeTab: function () {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;
            var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="/private/operationsmanagement"`);
            tab.classList.add("is-active");
        });
    },

    renderOperationsList: function () {
        let idTable = "dataContainer";
        var url = "/authenapi/UserAcivityApi/findDataList";

        var colNames = shinobi.tableHelper.getColname(idTable);
        var renders = shinobi.tableHelper.getRender(idTable);

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(idTable),
        };

        if (!shinobi.operationsmanagementrender.dataContainer) {
            shinobi.operationsmanagementrender.dataContainer = new shinobi.table(idTable);
        };

        shinobi.operationsmanagementrender.dataContainer.staticsorts = [{
            colname: "createddate",
            value: "desc",
        }];

        // shinobi.operationsmanagementrender.dataContainer.initLoadApi(url, request); // use for datalist
        shinobi.operationsmanagementrender.dataContainer.initLoadApi(url, request, colNames, renders);

        // shinobi.api.request(url, JSON.stringify(request), function (res) {
        //     res = JSON.parse(res);
        //     console.log(res);
        //     var data = res.data;

        //     // //CREATE VALUE TO FILTER DATE
        //     // var date = [];
        //     // var check;
        //     // data.forEach(elem => {
        //     //     var dayList = {
        //     //         createddate: `${new Date(elem.createddate).getDate()}/${new Date(elem.createddate).getMonth() + 1}/${new Date(elem.createddate).getFullYear()}`,
        //     //         outputdate: `${new Date(elem.createddate).getDate()} Tháng ${new Date(elem.createddate).getMonth() + 1}, ${new Date(elem.createddate).getFullYear()}`,
        //     //     };
        //     //     if (!check) {
        //     //         check = dayList.createddate;
        //     //         date.push(dayList);
        //     //     } else {
        //     //         if (check != dayList.createddate) {
        //     //             check = dayList.createddate;
        //     //             date.push(dayList);
        //     //         } else {

        //     //         };
        //     //     };
        //     // });
        //     // shinobi.operationsmanagementrender.dataContainer.renderTable(date);
        // });
    },

    renderNameOperations: function (cell, row, col, all) {
        value = cell.innerHTML;
        if (shinobi.operationsmanagementrender.titleOperation.hasOwnProperty(value)) {
            cell.innerHTML = shinobi.operationsmanagementrender.titleOperation[value];
        };

    },

    titleOperation: {
        "ALL": 'TẤT CẢ',
        "LOGIN": "ĐĂNG NHẬP",
        "LOGOUT": "ĐĂNG XUẤT",
        "SYSTEM_FORCE_LOGOUT_ALL": "ĐĂNG XUẤT TẤT CẢ",
        "CREATE_USER": "TẠO TÀI KHOẢN",
        "CREATE_STOCK_COM_ACCOUNT": "TẠO TÀI KHOẢN TỰ DOANH",
        "CONFIG_CLIENT_ALLOCATION": "CẤU HÌNH PHÂN BỔ KHÁCH HÀNG",
        "CONFIG_ORIGIN_ALLOCATION": "CẤU HÌNH PHÂN BỔ TỰ DOANH",
        "FOLLOW_TRADING": "THEO DÕI ĐẶT LỆNH",
        "UNFOLLOW_TRADING": "BỎ THEO DÕI ĐẶT LỆNH",
        "PLACE_ORIGINAL_SIGNAL": "ĐẶT LỆNH",
        "CANCEL_ORIGINAL_SIGNAL": "HỦY LỆNH",
        "FOLLOW_SIGNAL": "THEO TÍN HIỆU",
        "FOLLOW_CANCEL_SIGNAL": "THEO TÍN HIỆU HUỶ",
        "VPS_PAYMENT_AUDIT": "KIỂM TOÁN THANH TOÁN VPS",
        "CONFIG_INCREASE_ALLOCATION_AMOUNT_BY_CASH": "CẤU HÌNH TĂNG VỐN PHÂN BỔ CHO TIỂU KHOẢN",
        "INCREASE_ALLOCATION_AMOUNT_BY_CASH": "TĂNG VỐN PHÂN BỔ CHO TIỂU KHOẢN",
    },

    renderTypeSelector: function () {
        let datalistId = "titleoperationsselector";

        if (!shinobi.operationsmanagementrender.titleoperationsselector) {
            shinobi.operationsmanagementrender.titleoperationsselector = new shinobi.datalist(datalistId);
        };

        var listKeys = Object.entries(shinobi.operationsmanagementrender.titleOperation);
        for (var index = 0; index < listKeys.length; index++) {
            listKeys[index] = {
                value: listKeys[index][0],
                name: listKeys[index][1],
            };
        }

        shinobi.operationsmanagementrender.titleoperationsselector.renderTable(listKeys);
    },

    renderEachElemSelector: function (elem, value, all) {
        elem.innerHTML = all.name;
        elem.setAttribute('value', all.value);
    },

    renderSearchingButton: function () {
        var button = document.getElementById("searchingButton");
        button.onclick = function () {
            var selector = document.getElementById("titleoperationsselector").value;
            var historydate;

            if (selector) {
                try {
                    shinobi.mapping.getValue("#searchinghistory", function (res) {
                        historydate = res.date;
                        historydate.beginDate = shinobi.util.reverseFormatDate(historydate.beginDate, {
                            reverseFormat: "dd/MM/yyyy",
                            format: "yyyy-MM-dd",
                        });

                        historydate.endDate = shinobi.util.reverseFormatDate(historydate.endDate, {
                            reverseFormat: "dd/MM/yyyy",
                            format: "yyyy-MM-dd",
                        });
                    });
                } catch (e) {
                    historydate = {};
                }

                var dataFilters = [];
                if (selector != "ALL") {
                    dataFilters.push({
                        "colname": "name",
                        "operator": "=",
                        "value": selector,
                    });
                }
                if (historydate.beginDate) {
                    dataFilters.push({
                        "colname": "createddate",
                        "operator": ">=",
                        "value": historydate.beginDate,
                    });
                    if (historydate.endDate != 'NaN-NaN-NaN') {
                        dataFilters.push({
                            "colname": "createddate",
                            "operator": "<=",
                            "value": historydate.endDate,
                        });
                    };
                };
                console.log("dataFilters", dataFilters);
                shinobi.operationsmanagementrender.dataContainer.staticfilters = dataFilters;
                shinobi.operationsmanagementrender.dataContainer.reloadApi();
                shinobi.operationsmanagementrender.renderFilterButton(true);
            }
        };
    },

    setLabelCalendarPicker: function () {
        var object = this;
        var data = {
            start: `2000/1/1`,
            end: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        };
        object.calendar = bulmaCalendar.attach('[type="date"]',
            {
                'dateFormat': 'DD/MM/YYYY',
                'displayMode': 'dialog',
                closeOnOverlayClick: false,
                'startDate': new Date(data.start),
                'endDate': new Date(data.end),
            });

        // shinobi.util.setRangeCalendar('[snb-key="date"]', new Date(data.start), new Date(data.end));
    },


    renderFilterButton: function (show) {
        var cancelFilter = document.getElementById("cancelfilter");
        if (show) {
            cancelFilter.classList.remove("is-hidden");
        } else {
            cancelFilter.classList.add("is-hidden");
        }
    },

    reloadApiFilterButton: function () {
        var cancelFilter = document.getElementById("cancelfilter");
        cancelFilter.onclick = function () {
            shinobi.operationsmanagementrender.dataContainer.staticfilters = [];

            document.getElementById("titleoperationsselector").value = "ALL";

            shinobi.operationsmanagementrender.dataContainer.reloadApi();

            shinobi.operationsmanagementrender.renderFilterButton(false);
        };
    },
};