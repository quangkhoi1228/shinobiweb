shinobi.ordercommandmanagementrender = {
    calendar: '',
    build: function () {
        shinobi.ordercommandmanagementrender.activeTab();

        // erase 
        // shinobi.ordercommandmanagementrender.renderMoreButton();
        // shinobi.ordercommandmanagementrender.renderChildOrderCommand();
        shinobi.ordercommandmanagementrender.renderOrderCommandTable();
        shinobi.ordercommandmanagementrender.renderSelfEmployedSelector();
        // shinobi.ordercommandmanagementrender.renderPmSelector();
        shinobi.ordercommandmanagementrender.renderSearchingButton();
        shinobi.ordercommandmanagementrender.setLabelCalendarPicker();
        shinobi.ordercommandmanagementrender.renderAutocompleteSearchingBar();
        shinobi.ordercommandmanagementrender.reloadApiFilterButton();
    },

    activeTab: function () {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;
            var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="/private/ordercommandmanagement"`);
            tab.classList.add("is-active");
        });
    },

    renderMoreButton: function (cell, row, col, all) {
        var seeDetailOrderButton =
            `
        <a class="dropdown-item see-detail-order pr-4">
            Chi tiết lệnh
        </a>
        `

        cell.innerHTML = `
              <div class="has-text-centered">    
                <div class="dropdown is-right more-button">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span><i class="fas fa-ellipsis-v"></i></span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item pr-4" onclick="shinobi.ordercommandmodal.openModalAddChildCommand()">
                            Thêm lệnh
                        </a>
                        ${seeDetailOrderButton}
                        <a class="dropdown-item pr-4">
                            Xoá
                        </a>
                    </div>
                  </div>
                </div>
            </div>`

        var button = cell.querySelector(".see-detail-order");
        button.onclick = function () {
            shinobi.ordercommandmanagementrender.modalSeeDetailOrderCommand(all[row]);
        };

        var dropdown = cell.querySelector('.dropdown');
        dropdown.onclick = function () {
            dropdown.classList.toggle('is-active');
        };
    },

    renderChildOrderCommand: function (cell, row, col, all) {
        cell.innerHTML = `
            <div class="button is-borderless has-background-transparent is-fullwidth level">
                <div class="has-margin-block-auto">${all[row].fullname}</div>
                <div class="has-margin-block-auto pl-2" value="closed">               
                    <i class="fal fa-angle-down"></i>
                </div>
            </div>
        `
        shinobi.ordercommandmanagementrender.renderChildDetailButton(cell, row, col, all);
    },

    renderSeeDetail: function (elem) {

    },

    renderOrderCommandTable: function () {
        var idTable = "linkedpmaccounttable";

        var colNames = shinobi.tableHelper.getColname(idTable);
        var renders = shinobi.tableHelper.getRender(idTable);

        url = "/authenapi/OriginalSignalHistoryApi/findDataList";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(idTable),
        };

        if (!shinobi.ordercommandmanagementrender.ordercommandTable) {
            var table = new shinobi.table(idTable);
            shinobi.ordercommandmanagementrender.ordercommandTable = table;
        }

        shinobi.ordercommandmanagementrender.ordercommandTable.staticsorts = [{
            "colname": "createddate",
            "value": "desc"
        }];

        shinobi.ordercommandmanagementrender.ordercommandTable.initLoadApi(url, request, colNames, renders);
    },

    renderChildDetailButton: function (cell, row, col, all) {
        var button = cell.children[0];
        button.onclick = function () {
            var icon = button.children[1];
            var type = icon.getAttribute("value");
            if (type == 'closed') {
                icon.innerHTML = `<i class="fal fa-angle-up"></i>`;
                icon.setAttribute("value", "opened");

                var parent = cell.parentNode;
                parent.classList.add("is-active");

                shinobi.ordercommandmanagementrender.renderChildDetailBar(cell, row, col, all);
            } else {
                icon.innerHTML = `<i class="fal fa-angle-down"></i>`;
                icon.setAttribute("value", "closed");
                var parent = cell.parentNode;
                parent.classList.remove("is-active");
                shinobi.ordercommandmanagementrender.renderChildDetailBar(cell, row, col, all);
            };
        };
    },

    setValueForEachTrTable: function () {
        var trList = document.querySelectorAll("#linkedpmaccounttable tr");
        for (var n = 0; n < trList.length; n++) {
            trList[n].setAttribute("value", n);
        };
    },

    getDataForChildButton: function (cell, row, col, all, options) {
        var url = "/authenapi/SignalListApi/getSignalList";
        var request = {
            "filters": [{
                "colname": "originalsignalid",
                "operator": "=",
                "value": all[row].originalsignalid
            }],
            "sorts": [],
        }
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            var data = res.data;
            if (data.length) {
                if (options == "actived") {
                    shinobi.ordercommandmanagementrender.renderDataForChildTable(cell, cell.parentNode.parentNode, data);
                } else {
                    shinobi.ordercommandmanagementrender.deleteChildData(cell, data);
                };
            } else {
                console.log("Data is null");
            };
        });
    },

    renderChildDetailBar: function (cell, row, col, all) {
        var parent = cell.parentNode;
        var check = parent.classList.contains("is-active");
        if (check) {
            shinobi.ordercommandmanagementrender.getDataForChildButton(cell, row, col, all, "actived");
        } else {
            shinobi.ordercommandmanagementrender.getDataForChildButton(cell, row, col, all, "");
        };
    },

    renderDataForChildTable: function (cell, tbody, data) {
        for (var index = 0; index < data.length; index++) {
            var tr = document.createElement("tr");
            tr.setAttribute("class", "child-container");
            tr.innerHTML = `
                <td snb-key="fullname" snb-render="shinobi.ordercommandmanagementrender.renderChildChildFullName">                </td>
                <td snb-key="createddate" snb-render="shinobi.roottemplate.renderElemTextCentered">             </td>
                <td snb-key="allocationaccount" snb-render="shinobi.roottemplate.renderElemTextCentered">       </td>
                <td snb-key="allocationratio" snb-render="shinobi.roottemplate.renderElemTextCentered">         </td>
                <td snb-key="orderid" snb-render="shinobi.roottemplate.renderElemTextCentered">                 </td>
                <td snb-key="stockcode" snb-render="shinobi.roottemplate.renderElemTextCentered">               </td>
                <td snb-key="price" snb-render="shinobi.roottemplate.renderElemTextCentered">                   </td>
                <td snb-key="volume" snb-render="shinobi.roottemplate.renderElemTextCentered">                  </td>
                <td class="has-text-centered" snb-key="status" snb-render="shinobi.ordercommandmanagementrender.renderStatusChildSetting">                  </td>
                <td snb-key="description" snb-render="shinobi.ordercommandmanagementrender.formatDescription">        </td>
                <td snb-key="allocationaccount" snb-render="shinobi.ordercommandmanagementrender.renderMoreChildButton"></td>`;
            tbody.appendChild(tr);
            shinobi.mapping.renderElement(tr, data[index]);
            cell.parentNode.parentNode.insertBefore(tr, cell.parentNode.nextSibling);
        };
    },

    renderChildChildFullName(elem, value, all) {
        elem.innerHTML = `<div class="button is-borderless has-background-transparent is-fullwidth level has-padding-left-2rem">
                        ${value}
                        </div>`
    },

    formatDescription: function (elem, value, all) {
        value = shinobi.ordercommandmanagementrender.renderNoticeSub(value);

        elem.innerHTML = `<div class="order-command-notice is-italic"> ${value} </div>`;
    },

    renderMoreChildButton: function (elem, value, all) {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;
            var seeDetail = `<a class="container-href is-hidden"></a>`;

            if (usertype == "PMALADIN") {
                seeDetail = `
                <a class="dropdown-item pr-4 container-href">
                    Xem thêm
                </a>`
            };

            var seeDetailOrderButton =
                `
            <a class="dropdown-item see-detail-order pr-4">
                Chi tiết lệnh
            </a>
            `;

            elem.innerHTML = `
            <div class="has-text-centered">    
              <div class="dropdown is-up is-right more-button">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span><i class="fas fa-ellipsis-v"></i></span>
                  </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                        <a class="dropdown-item pr-4" onclick="shinobi.ordercommandmodal.ModifyModalAddChildCommand()">
                          Chỉnh sửa
                        </a>
                        ${seeDetailOrderButton}
                        ${seeDetail}
                        <a class="dropdown-item pr-4">
                          Xoá
                        </a>
                    </div>
                </div>
              </div>
            </div>`

            var setHref = elem.querySelector(".container-href");
            console.log(setHref);

            var button = elem.querySelector(".see-detail-order");
            button.onclick = function () {
                shinobi.ordercommandmanagementrender.modalSeeDetailOrderCommand(all);
            };

            setHref.onclick = function () {
                shinobi.ordercommandmanagementrender.transferTradingPage(all.allocationaccount);
            };

            var dropdown = elem.querySelector('.dropdown');
            dropdown.onclick = function () {
                dropdown.classList.toggle('is-active');
            };

            console.log("usertype", usertype, "seeDetail", seeDetail);
        });
    },

    transferTradingPage: function (allocationaccount) {
        window.location.href = `/private/tradingsystem?allocationaccount=${allocationaccount}`;
    },

    deleteChildData: function (cell, data) {
        var parent = cell.parentNode;

        for (var index = 0; index < data.length; index++) {
            var nextRow = parent.nextSibling;
            var check = nextRow.classList.contains("child-container");
            if (check) {
                nextRow.remove();
            };
        };
    },

    renderSelfEmployedSelector: function () {
        var datalistId = "selfemplyedaccountselection";
        var url = "/authenapi/StockComAccountApi/getListOriginStockComAccount";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        };
        var datalist = new shinobi.datalist(datalistId);

        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            datalist.renderTable(res);
        });
    },

    renderPmSelector: function () {
        var datalistId = "pmaccountselection";
        var url = "/authenapi/SystemUserApi/getUserInfo";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        };
        var datalist = new shinobi.datalist(datalistId);

        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            datalist.renderTable(res.data);
        });
    },

    renderFullname: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.fullname;
    },

    renderName: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.name;
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

    renderSearchingButton: function () {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;

            if (usertype == "PMALADIN") {
                shinobi.ordercommandmanagementrender.renderSearchingButtonPMAladin();
            } else if (usertype == "SUPERADMIN") {
                shinobi.ordercommandmanagementrender.renderSearchingButtonSuperAdmin();
            }
        });
    },

    renderSearchingButtonPMAladin: function () {
        document.getElementById("pmListSearch").classList.add("is-hidden");

        var button = document.getElementById("searchOrderCommand");
        button.onclick = function () {
            var selfemplyedaccount = document.getElementById("selfemplyedaccountselection").value;
            var historydate;

            if (selfemplyedaccount) {
                console.log("searched");
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
                shinobi.ordercommandmanagementrender.reloadOrderCommandTable(null, selfemplyedaccount, historydate.beginDate, historydate.endDate, "PMALADIN")
            }
        };
    },

    renderSearchingButtonSuperAdmin: function () {
        var button = document.getElementById("searchOrderCommand");
        button.onclick = function () {
            var selfemplyedaccount = document.getElementById("selfemplyedaccountselection").value;
            var pmaccount = document.getElementById("autocomplete").getAttribute('value');
            var historydate;

            if (selfemplyedaccount) {
                console.log("searched");
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
                shinobi.ordercommandmanagementrender.reloadOrderCommandTable(pmaccount, selfemplyedaccount, historydate.beginDate, historydate.endDate, "SUPERADMIN")
            }
        };
    },

    reloadOrderCommandTable: function (pmaccount, selfemplyedaccount, beginDate, endDate, type) {
        if (type == "SUPERADMIN") {
            shinobi.ordercommandmanagementrender.reloadOrderCommandTableAsSuperAdmin(pmaccount, selfemplyedaccount, beginDate, endDate);
        }
        if (type == "PMALADIN") {
            shinobi.ordercommandmanagementrender.reloadOrderCommandTableAsPMAladin(selfemplyedaccount, beginDate, endDate);
        }
    },

    reloadOrderCommandTableAsSuperAdmin(pmaccount, selfemplyedaccount, beginDate, endDate) {
        var dataFilters = [];

        dataFilters.push({
            "colname": "allocationaccount",
            "operator": "=",
            "value": selfemplyedaccount,
        });
        if (beginDate) {
            dataFilters.push({
                "colname": "createddate",
                "operator": ">=",
                "value": beginDate,
            });
            if (endDate) {
                dataFilters.push({
                    "colname": "createddate",
                    "operator": "<=",
                    "value": endDate,
                });
            }
        }
        if (pmaccount) {
            dataFilters.push({
                "colname": "placedby",
                "operator": "=",
                "value": pmaccount,
            });
        };
        shinobi.ordercommandmanagementrender.ordercommandTable.staticfilters = dataFilters;
        shinobi.ordercommandmanagementrender.ordercommandTable.reloadApi();
        shinobi.ordercommandmanagementrender.renderFilterButton(true);
    },

    reloadOrderCommandTableAsPMAladin(selfemplyedaccount, beginDate, endDate) {
        if (endDate) {
            shinobi.ordercommandmanagementrender.ordercommandTable.staticfilters = [{
                "colname": "allocationaccount",
                "operator": "like",
                "value": selfemplyedaccount,
            }, {
                "colname": "createddate",
                "operator": ">=",
                "value": beginDate,
            }, {
                "colname": "createddate",
                "operator": "<=",
                "value": endDate,
            }];
        } else {
            shinobi.ordercommandmanagementrender.ordercommandTable.staticfilters = [{
                "colname": "allocationaccount",
                "operator": "like",
                "value": selfemplyedaccount,
            }];
        }
        shinobi.ordercommandmanagementrender.ordercommandTable.reloadApi();
        shinobi.ordercommandmanagementrender.renderFilterButton(true);
    },

    renderAutocompleteSearchingBar: function () {
        // var accounts = [
        //     { id: '1333', username: 'PM1', createddate: '10/02/2022' },
        //     { id: '1222', username: 'PM2', createddate: '10/02/2022' },
        //     { id: '3111', username: 'PM3', createddate: '10/02/2022' },
        // ];

        new shinobi.autocomplete('#autocomplete', {
            onSearch: (input, resolve) => {
                if (input.length < 1) { return [] }

                var request = {
                    "filters": [{
                        "colname": "name",
                        "operator": "like",
                        "value": input,
                    }],
                    "sorts": [],
                }
                shinobi.api.request("/authenapi/SystemUserApi/getUserInfo", JSON.stringify(request), function (res) {
                    data = JSON.parse(res).data;
                    resolve(data);
                });
            },

            renderResult: (result, props) => {
                console.log(result)
                return `
                <li ${props}>
                    <div class="is-flex">
                        <div>${result.name}</div>
                    </div>
                </li>`
            },
            onSubmit: (result) => {
                var input = document.getElementById("autocomplete");
                input.value = result.name;
                input.setAttribute('value', result.username)
            },
        });
    },

    renderStatusSetting: function (cell, row, col, all) {
        switch (all[row].status) {
            case 'EXECUTED':
                all[row].status = "Đã xử lý";
                break;
            case 'INVALID':
                all[row].status = "Không hợp lệ";
                break;
            case 'INPROCESS':
                all[row].status = "Đang xử lý";
                break;


        };
        cell.innerHTML = `<div class="has-text-centered">${all[row].status}</div>`;
    },

    childStatusOrder: {
        "SUCCESS": "Thành công",
        "ERROR": "Thất bại",
        "PENDING": "Chưa xử lý",
        "CANCELED": "Đã huỷ",
    },

    renderStatusChildSetting: function (elem, value, all) {
        if (shinobi.ordercommandmanagementrender.childStatusOrder[`${value}`]) {
            value = shinobi.ordercommandmanagementrender.childStatusOrder[`${value}`];
        };

        if (value == "Thành công") {
            elem.innerHTML = `<div class="has-text-success">${value}</div>`;
        } else if (value == "Thất bại") {
            elem.innerHTML = `<div class="has-text-danger">${value}</div>`;
        } else {
            elem.innerHTML = `<div class="">${value}</div>`;
        }
    },

    noticeOrder: {
        'INVALID_ORIGINAL_SIGNAL': "Tín hiệu gốc không hợp lệ",
        'INVALID_SIGNAL_TYPE': "Loại tín hiệu không hợp lệ",
        'INVALID_USER_PLACING_SIGNAL': "User không được phép đặt lệnh",
        'INVALID_STOCK_CODE': "Mã chứng khoán không hợp lệ",
        'INVALID_PRICE': "Giá không hợp lệ",
        'INVALID_PRICE_STEP': "Bước gía không hợp lệ",
        'ORDER_VOLUME_MUST_BE_GREATER_THAN_MIN_VOLUME': "Khối lượng lệnh phải lớn hơn 100",
        'ORDER_PRICE_MUST_LIES_INSIDE_INTERVAL': "Giá đặt phải nằm trong khoảng giá",
        'ORDER_VOLUME_MUST_BE_GREATER_THAN_ZERO': "Khối lượng lệnh phải lớn hơn 0",
        'INVALID_VOLUME_STEP': "Bước khối lượng không hợp lệ - Khối lượng theo lô 100",
        'INVALID_ORDER_SIDE': "Side không hợp lệ - MUA / BÁN",
        'INVALID_ORDER_TYPE': "Loại không hợp lệ - MUA / BÁN",
        'TRADING_GROUP_NOT_FOUND': "Không tìm thấy nhóm lệnh",
        'STOCK_CODE_NOT_IN_PORTFOLIO': "Mã chứng khoán không có trong danh mục",
        'SIGNAL_VOLUME_MORE_THAN_PORTFOLIO': "Khối lượng lệnh lớn hơn khối lượng thực trong danh mục",
        'SIGNAL_VALUE_MORE_THAN_PURCHASING_POWER': "Sức mua không đủ",
        'CAN_NOT_FIND_ORIGINAL_SIGNAL': "Không tìm thấy tín hiệu gốc",
        'NOT_YOUR_SIGNAL': "Không phải tín hiệu của bạn",
        'CAN_NOT_FIND_ORDER': "Không tìm thấy lệnh",
        'DO_NOT_HAVE_SIGNAL_TO_CANCEL': "Không có lệnh để hủy",
        'CAN_NOT_CREATE_COPYTRADE_SIGNAL_TO_PM_BY_PMALADIN': "Không thể đánh copytrade trên tài khoản PM bằng PMAladin",
        'PLACE_VPS_NORMAL_ORDER_FAILURE': "Không thể đặt lệnh trên VPS",
        'CANCEL_VPS_ORDER_FAILURE': "Huỷ lệnh VPS thất bại",
        'THIS_STOCK_IS_RESTRICTED_FROM_TRADING_FOR_THIS_ACCOUNT': "Mã chứng khoán bị giới hạn giao dịch trên tài khoản này",
        'CALL_VPS_PROXY_API_FAILURE': "Không thể call API của VPS",
    },

    renderNoticeSub: function (value) {
        if (shinobi.ordercommandmanagementrender.noticeOrder[`${value}`]) {
            value = shinobi.ordercommandmanagementrender.noticeOrder[`${value}`];
        };

        return value;
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
            shinobi.ordercommandmanagementrender.ordercommandTable.staticfilters = [];

            shinobi.ordercommandmanagementrender.ordercommandTable.reloadApi();

            shinobi.ordercommandmanagementrender.renderFilterButton(false);
        };
    },

    modalSeeDetailOrderCommand: function (data) {
        var modal = document.getElementById("seeDetailOrderModal");
        modal.classList.add("is-active");

        var listSnbkey = document.querySelectorAll("#seeDetailOrderModal [snb-key]");
        listSnbkey.forEach(function (elem) {
            elem.innerHTML = "";
        });

        shinobi.mapping.renderElement(modal, data);
    },

    subSideLeftDetailOrder: function (elem, value, all) {
        var mappingValue = {
            BUY: 'MUA',
            SELL: 'BÁN',
        };

        if (mappingValue[`${value}`]) {
            value = mappingValue[`${value}`];
        };

        elem.innerHTML = `
        <div class="has-text-left">${value}</div>
        `;

        if (value == "MUA") {
            elem.querySelector("div").style.color = "#48c78e";
        } else if (value == "BÁN") {
            elem.querySelector("div").style.color = "#f14668";
        }
    },
};