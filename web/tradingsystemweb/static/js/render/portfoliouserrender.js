shinobi.portfoliouserrender = {
    table: '',
    tableHistory: '',
    build: function (value) {
        shinobi.portfoliouserrender.renderTableAssetUser(value);
        shinobi.portfoliouserrender.renderTableAssetUserHistory(value);
    },

    rebuildOnChangeSelect: function (value) {

    },

    reloadPortfolioUser() {
        if (shinobi.portfoliouserrender.table.hasOwnProperty('reloadApi')) {
            shinobi.portfoliouserrender.table.reloadApi();
        }

    },

    renderTableAssetUser: function (valueAccount) {
        console.log("valueAccount", valueAccount);
        var object = this;
        var datalistId = "tablematchingorderdate";
        var url = "/authenapi/StockComOrderApi/findDataList";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        // if (!object.table) {
        shinobi.portfoliouserrender.table = new shinobi.table(datalistId);
        // datalist.staticsorts = sortDefault;
        // datalist.staticfilters = filterDefault;

        var request = {
            "allocationaccount": valueAccount,
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        };

        shinobi.portfoliouserrender.table.initLoadApi(url, request, colNames, renders, {
            callback: function () {
                var refreshBtn = document.getElementById('refreshportfolio');
                refreshBtn.onclick = function () {
                    shinobi.portfoliouserrender.table.paramsRequestList = { "allocationaccount": valueAccount };
                    shinobi.portfoliouserrender.table.reloadApi(1, { loading: false });
                };
            },
        });

    },

    renderTableAssetUserHistory: function (valueAccount) {
        var object = this;
        var datalistId = "tablematchingorderhistory";
        var url = "/authenapi/StockComOrderHistoryApi/findDataList";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        // if (!object.table) {
        shinobi.portfoliouserrender.tableHistory = new shinobi.table(datalistId);
        // datalist.staticsorts = sortDefault;
        // datalist.staticfilters = filterDefault;

        console.log(valueAccount);
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        };

        shinobi.portfoliouserrender.tableHistory.staticfilters = [
            {
                "colname": "allocationaccount",
                "operator": "=",
                "value": valueAccount
            },
        ];


        shinobi.portfoliouserrender.tableHistory.initLoadApi(url, request, colNames, renders, {
            // callback: function () {
            //     var refreshBtn = document.getElementById('refreshportfolio');
            //     refreshBtn.onclick = function () {
            //         shinobi.portfoliouserrender.table.paramsRequestList = { "allocationaccount": valueAccount };
            //         shinobi.portfoliouserrender.table.reloadApi(1, { loading: false });
            //     };
            // },
        });

    },

    snbRenderButton: function (cell, row, col, all) {
        if (all[row].status == "PENDING" || all[row].status == "PARTIAL_MATCHED") {
            value = cell.innerHTML;
            cell.innerHTML = `
            <div class="is-flex is-justify-content-space-between">
                <div class="has-text-left">    
                    <button class="cancel-button is-danger has-bsd button is-small">
                        Huỷ
                    </button>
                </div>
                <div class="has-text-right">    
                    <button class="see-detail button is-small">
                        <span><i class="fas fa-ellipsis-v"></i></span>
                    </button>
                </div>
            </div>`
            console.log(all[row].status);
            var detailButton = cell.querySelector(".see-detail");
            detailButton.onclick = function () {
                shinobi.portfoliouserrender.openModalDetail(value, all[row])
            };

            var cancelButton = cell.querySelector(".cancel-button");
            cancelButton.onclick = function () {
                shinobi.notification.confirm(function () {
                    shinobi.portfoliouserrender.cancelOrder(all[row].systemorderid);
                }, {
                    title: 'Xác nhận',
                    content: "Bạn muốn xác nhận hủy lệnh?",
                    yesConent: "Xác nhận",
                })
            };
        } else {
            value = cell.innerHTML;
            cell.innerHTML = `
                <div class="has-text-right">    
                    <button class="see-detail button is-small">
                        <span><i class="fas fa-ellipsis-v"></i></span>
                    </button>
                </div>`
            console.log(all[row].status);
            var button = cell.querySelector(".see-detail");
            button.onclick = function () {
                shinobi.portfoliouserrender.openModalDetail(value, all[row])
            };
        }
    },

    cancelOrder: function(array) {
        var url = "/authenapi/CreateSignalApi/cancelSignal";
        var selectSubAccount = document.getElementById('selectPM').value;
        var cancelArray = [
            array
        ]
        var request = {
            allocationaccount: selectSubAccount,
            ordertype: "CANCEL",
            signaltype: "COPYTRADE",
            orderlist: cancelArray,
        }
        console.log("console", request, "->", cancelArray);
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.notification.notification.info('Hủy lệnh thành công !');
            shinobi.portfoliouserrender.build(selectSubAccount);
        })
    },

    openModalDetail: function (value, data) {
        var modal = document.getElementById("modalOrderDate");
        modal.classList.add("is-active");

        shinobi.mapping.renderElement(modal, data);
    },
};