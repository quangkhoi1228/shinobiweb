shinobi.adminlistuserreceivedividendsrender = {
    table: '',
    build: function () {
        var object = this;
        object.activeTabs();
        object.activeFullFilters();
        object.loadData();
        object.setUpCalenderDate();
        getListStockSymbol('#autocomplete');
        object.filterDividendsStock();
    },
    activeFullFilters: function () {
        var container = document.getElementById("searchingByFilter");
        var accountSearch = container.querySelector("#searchByAccount");
        accountSearch.classList.remove("is-hidden");
    },
    activeTabs: function () {
        var tab = document.getElementById('adminlistuserreceivedividends');
        tab.classList.add('is-active');
        document.querySelector('[href="/private/dividendmanagement"]').classList.add('is-active');
    },
    renderUpdateVolumeStock: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.classList.add('has-text-right');
        cell.innerHTML = `
        ${shinobi.util.formatNumber(value)} <p class="icon has-text-link update" data-tooltip="Cập nhật"><i
                                class="fal fa-sync"></i></p>`;
        var button = cell.querySelector('.update');

        button.onclick = function () {
            var username = value;
            var fullname = all[row].fullname;
            var stock = all[row].stock;
            stock = "TTF";
            shinobi.adminlistuserreceivedividendsrender.updateVolumeBuy(username, fullname, stock);
        };

    },
    updateVolumeBuy: function (username, fullname, stock) {
        var url = '';
        shinobi.notification.confirm(function () {
            shinobi.mapping.getValue("#modalFlexible", function (data) {
                console.log('data send', data, 'username', username);
                var request = data;
                // shinobi.api.request(url, JSON.stringify(request), function () {
                //     setTimeout(function () {
                //         shinobi.adminlistuserreceivedividendsrender.table.reloadApi();
                //     }, 2000);
                // })

            });
        }, {
            title: "Cập nhật CP thực hiện quyền",
            content: `
            <div  class="level is-size-6 mb-2">
                <div class="level-item">
                    <span>Tên KH: </span> <span class="font-weight-bold">${fullname} </span>
                </div>
            <div class="level-item">
                <span class"pl-4">Mã CK: </span> <span class="font-weight-bold">${stock} </span>    
            </div>
           
           
            </div>
            <div id="modalFlexible" class="field">
             <label for="" class="label">Số cổ phiếu:</label>
             <div class="control">
                <input snb-key="volume" value="0" type="text" class="input" snb-preprocess="shinobi.render.getNumberCleaveInput">
             </div>
        </div>
            `,
        });
        shinobi.util.createNumberCleaveInput("#modalFlexible input");
    },
    loadData: function (systemsubaccount) {
        var object = this;
        var datalistId = 'tabledividend';
        var url = "/authenapi/ClientAccountDetailApi/findDataList";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        }
        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        object.table = new shinobi.table(datalistId);
        object.table.staticfilters = [];
        object.table.initLoadApi(url, request, colNames, renders);
    },

    setUpCalenderDate: function () {
        var object = this;
        object.setLabelCalendarPicker("#searchingByFilter #searchinghistory input")
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
                    if (data.account) {
                        dataFilters.push({
                            "colname": "fullname", "operator": "=", "value": data.account
                        });
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