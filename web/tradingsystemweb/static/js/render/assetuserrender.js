shinobi.assetuserrender = {
    portfolioTable: '',
    build: function (systemsubaccount) {
        var object = this;
        shinobi.assetuserrender.renderTableAssetUser(systemsubaccount);
        object.getAssetUser(systemsubaccount);
        object.addEventReloadAssetButton(systemsubaccount);

    },

    addEventReloadAssetButton(allocationAccount) {
        let button = document.getElementById('updateAllocationAccountAssetButton');
        button.onclick = function () {
            allocationAccount = document.getElementById("selectPM").value;
            shinobi.assetuserrender.getAssetUser(allocationAccount);
            shinobi.assetuserrender.renderTableAssetUser(allocationAccount);
        }
    },
    getAssetUser: function (value) {
        var url = '/authenapi/SystemUserApi/getAssetInfo';
        var asset = '#assetvalue'
        var request = { "allocationaccount": value };
        shinobi.notification.notification.loading();
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.mapping.clear(asset);
            shinobi.notification.notification.loaded();
            shinobi.mapping.render(asset, res);

        });
    },

    renderTableAssetUser: function (valueAccount) {
        var datalistId = "tableassetorder";
        // var url = "/authenapi/SystemUserApi/getUserStockProfolio";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        if (!shinobi.assetuserrender.portfolioTable.hasOwnProperty('reloadApi')) {
            shinobi.assetuserrender.portfolioTable = new shinobi.table(datalistId);
        }
        // datalist.staticsorts = sortDefault;
        // datalist.staticfilters = filterDefault;

        // var request = {
        //     "account": valueAccount,
        //     recordPerPage: shinobi.util.getRecordNumber(datalistId),
        // }
        // datalist.initLoadApi(url, request, colNames, renders);

        var url = '/authenapi/SystemUserApi/getAssetInfo';
        var request = { "allocationaccount": valueAccount };

        shinobi.notification.notification.loading();
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.notification.notification.loaded();
            shinobi.assetuserrender.portfolioTable.clear();
            let portfolio = JSON.parse(res)['portfolio'];
            shinobi.assetuserrender.portfolioTable.renderTable(colNames, portfolio, renders);
        });
    },

    snbRenderButton: function (cell, row, col, all) {

        cell.innerHTML = `
        <div class="has-text-centered">
            <div class="buttons are-small is-centered">
                <div class="button is-danger has-bsd is-borderless is-size-7">Bán</div>
            </div>
        </div>
        `
    },
};