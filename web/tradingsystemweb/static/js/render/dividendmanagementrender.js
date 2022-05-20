shinobi.dividendmanagementrender = {
    build: function () {
        var object = this;
        object.activeTab();
        object.setUpCalenderDate();
        object.renderAutocompleteStockSearchingBar();
        // object.renderAutocompleteAccountSearchingBar();
        object.filterDividendsStock();
        object.reloadApiFilterButton();

        object.getValueConfigOnModal();
        object.renderShowOrHiddenCheckBox();
        object.renderTableNonConfig();
        object.renderTableConfigged();
    },

    activeTab: function () {
        var pathname = window.location.pathname;
        var tab = document.querySelector(`.tabs-portfolio [href="${pathname}"]`);
        tab.parentNode.classList.add("is-active");

        document.querySelector("#searchingByFilter").setAttribute("style", "border-top-left-radius: 0;");
    },

    openConfigStockModal: function (data) {
        var modal = document.getElementById("configStockModal");
        modal.classList.add("is-active");

        var header = modal.querySelector(".modal-card-title");
        header.innerHTML = `Cấu hình mã cổ phiếu ${data.stockcode}`
        header.setAttribute("value", data.stockcode);
    },

    openConfigAgainStockModal: function (data) {
        var modal = document.getElementById("configStockModal");
        modal.classList.add("is-active");

        var header = modal.querySelector(".modal-card-title");
        header.innerHTML = `Cấu hình lại mã cổ phiếu ${data.stockcode}`
        header.setAttribute("value", data.stockcode);
    },

    renderConfigButtonForNotConfigTable: function (cell, row, col, all) {
        cell.classList.add("has-text-right");
        cell.innerHTML = `
            <div class="button has-bsd  is-small is-link mr-5">Cấu hình</div>
        `;

        var button = cell.querySelector(".button");
        button.onclick = function () {
            shinobi.dividendmanagementrender.openConfigStockModal(all[row]);
        };
    },

    renderConfigButtonForConfiggedTable: function (cell, row, col, all) {
        cell.classList.add("has-text-centered");
        cell.innerHTML = `
            <div class="button has-bsd  is-small is-link">Cấu hình lại</div>
        `;

        var button = cell.querySelector(".button");
        button.onclick = function () {
            shinobi.dividendmanagementrender.openConfigAgainStockModal(all[row]);
        };
    },

    setUpCalenderDate: function () {
        var object = this;
        object.setLabelCalendarPicker("#dividendConfig #searchinghistory input")
    },

    setLabelCalendarPicker: function (selector) {
        var object = this;
        var data = {
            start: `2000/1/1`,
            end: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        };
        object.calendar = bulmaCalendar.attach(selector,
            {
                'dateFormat': 'DD/MM/YYYY',
                'displayMode': 'dialog',
                closeOnOverlayClick: false,
                'startDate': new Date(data.start),
                'endDate': new Date(data.end),
            });

        // shinobi.util.setRangeCalendar('[snb-key="date"]', new Date(data.start), new Date(data.end));
    },

    renderAutocompleteStockSearchingBar: function () {
        new shinobi.autocomplete('#stockListSearch #autocomplete', {
            onSearch: (input, resolve) => {
                input = input.toUpperCase();

                if (input.length < 1) { resolve([]) }
                var url = "/api/PriceBoardApi/findDataList";
                var request = {
                    "filters": [{ 'colname': 'stocksymbol', 'operator': 'like', 'value': input }]
                }

                shinobi.api.request(url, JSON.stringify(request), function (res) {
                    var array = JSON.parse(res).data;
                    resolve(array);
                });
            },
            autoSelect: true,
            getResultValue: result => {
                return result.stocksymbol
            },
            onSubmit: (result) => {
                document.querySelector("#stockListSearch #autocomplete").value = result.stocksymbol;
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
    },

    getValueConfigOnModal: function () {
        var url = "/authenapi/DividendApi/configDividend";
        var request = {};

        var button = document.querySelector("#configStockModal #saveConfigModal");
        button.onclick = function () {
            var jsonCheckbox = shinobi.dividendmanagementrender.checkConfigCheckBox();
            if (Object.keys(jsonCheckbox).length) {
                shinobi.dividendmanagementrender.getValueConfig("#configStockModal #requiredContent", function (json) {
                    shinobi.notification.notification.loading();
                    var configData = Object.assign({}, jsonCheckbox, json);
                    var valueStockCode = document.querySelector("#configStockModal .modal-card-title").getAttribute("value");
                    configData.stockcode = valueStockCode;

                    //SET DEFAULT 
                    configData.cashratio = "1";

                    console.log("configData", configData);
                    request = configData;

                    shinobi.api.request(url, JSON.stringify(request), function (res) {
                        if (res == "update success") {
                            shinobi.notification.notification.info("Cấu hình thành công!");
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000)
                        } else {
                            shinobi.notification.notification.error("Cấu hình thất bại!");
                        }
                    })
                });
            } else {
                shinobi.notification.notification.error("Vui lòng chọn Loại sự kiện!");
            };
        };
    },

    checkConfigCheckBox: function () {
        var returnJson = {};
        var list = document.querySelectorAll(".checkbox.configdividend input");
        list.forEach(elem => {
            if (elem.checked) {
                var value = elem.getAttribute("value");
                var parent = document.querySelector(`.${value}`);
                returnJson[`${value}`] = true;

                var inputChildList = parent.querySelectorAll("[snb-key]");
                inputChildList.forEach(input => {
                    var key = input.getAttribute("snb-key");
                    var valueInput = input.value;
                    returnJson[`${key}`] = valueInput;
                });
            };
        });
        console.log("returnJson", returnJson);
        return returnJson;
    },

    getValueConfig: function (selector, callback) {
        shinobi.mapping.getValue(selector, function (request) {
            !Object.values(request).includes("") ? callback(request) : shinobi.util.fillInputMessage();
        }, {
            checkEmpty: true,
        })
    },

    renderShowOrHiddenCheckBox: function () {
        var list = document.querySelectorAll(".checkbox.configdividend input");
        list.forEach(elem => {
            elem.onclick = function () {
                var value = elem.getAttribute("value");
                if (elem.checked) {
                    var listInputContainer = document.querySelectorAll(`.input${value}`);
                    listInputContainer.forEach(elemInput => {
                        elemInput.classList.remove("is-hidden");
                    });
                } else {
                    var listInputContainer = document.querySelectorAll(`.input${value}`);
                    listInputContainer.forEach(elemInput => {
                        elemInput.classList.add("is-hidden");
                    });
                }
            }
        });
    },

    renderTableNonConfig: function () {
        var tableId = "dividendNotConfigTable"
        var url = "/authenapi/DividendApi/getNoneConfiguredList";

        var colNames = shinobi.tableHelper.getColname(tableId);
        var renders = shinobi.tableHelper.getRender(tableId);

        if (!shinobi.dividendmanagementrender.nonConfigTable) {
            shinobi.dividendmanagementrender.nonConfigTable = new shinobi.table(tableId);
        }

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(tableId),
        }

        shinobi.dividendmanagementrender.nonConfigTable.initLoadApi(url, request, colNames, renders);
    },

    renderTableConfigged: function () {
        var tableId = "dividendConfiggedTable"
        var url = "/authenapi/DividendApi/getAlreadyConfigList";

        var colNames = shinobi.tableHelper.getColname(tableId);
        var renders = shinobi.tableHelper.getRender(tableId);

        if (!shinobi.dividendmanagementrender.configgedTable) {
            shinobi.dividendmanagementrender.configgedTable = new shinobi.table(tableId);
        }

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(tableId),
        }

        shinobi.dividendmanagementrender.configgedTable.initLoadApi(url, request, colNames, renders);
    },

    renderCashDividendDescription: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.classList.add("has-text-right");

        if (all[row].cashdividend || all[row].cashdividend == "true") {
            cell.innerHTML = `${JSON.parse(value).ratio}`;
        }
    },

    renderStockdividendDescription: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.classList.add("has-text-right");

        if (all[row].stockdividend || all[row].stockdividend == "true") {
            cell.innerHTML = `${JSON.parse(value).stockDividendBasis} Cổ : ${JSON.parse(value).stockDividendReward} Cổ`;
        }
    },

    renderCallOptiondDescription: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.classList.add("has-text-right");

        if (all[row].calloption || all[row].calloption == "true") {
            cell.innerHTML = `${JSON.parse(value).callOptionsBasis} Cổ : ${JSON.parse(value).callOptionsReward} Cổ`;
        }
    },

    filterDividendsStock: function () {
        var idContainer = '#searchingByFilter';
        var buttonFilter = document.getElementById('searchOrderCommand');
        buttonFilter.onclick = function () {
            shinobi.mapping.getValue(idContainer, function (data) {
                console.log('data', data);
                var dataFilters = [];
                if (data.stocksymbol) {
                    dataFilters.push({
                        "colname": "stockcode", "operator": "=", "value": data.stocksymbol
                    });

                    if (data.date.beginDate) {
                        dataFilters.push({
                            "colname": "detectdate", "operator": ">=", "value": data.date.beginDate
                        });
                        if (data.date.endDate != 'NaN-NaN-NaN') {
                            dataFilters.push({
                                "colname": "detectdate", "operator": "<=", "value": data.date.endDate
                            });
                        }
                    }
                    console.log('dataFilters', dataFilters);
                    shinobi.dividendmanagementrender.filterAndReloadTwoTable(dataFilters);
                    shinobi.operationsmanagementrender.renderFilterButton(true);
                } else {
                    shinobi.notification.notification.error("Vui lòng nhập mã cần tìm kiếm!");
                }
            })
        }
    },

    reloadApiFilterButton: function () {
        var cancelFilter = document.getElementById("cancelfilter");
        cancelFilter.onclick = function () {
            var dataFilters = [];
            shinobi.dividendmanagementrender.filterAndReloadTwoTable(dataFilters);

            shinobi.operationsmanagementrender.renderFilterButton(false);
        };
    },

    filterAndReloadTwoTable: function (dataFilters) {
        shinobi.dividendmanagementrender.configgedTable.staticfilters = dataFilters;
        shinobi.dividendmanagementrender.nonConfigTable.staticfilters = dataFilters;

        shinobi.dividendmanagementrender.configgedTable.reloadApi();
        shinobi.dividendmanagementrender.nonConfigTable.reloadApi();
    },
};