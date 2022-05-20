shinobi.cashmanagementrender = {
    build: function () {
        var object = this;

    },

    renderTable: function () {
        var tableId = "tablestockmanagement"
        var url = "";

        var colNames = shinobi.tableHelper.getColname(tableId);
        var renders = shinobi.tableHelper.getRender(tableId);

        if (!shinobi.cashmanagementrender.cashManagementTable) {
            shinobi.cashmanagementrender.cashManagementTable = new shinobi.table(tableId);
        }

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(tableId),
        }

        shinobi.cashmanagementrender.cashManagementTable.initLoadApi(url, request, colNames, renders);
    },

    renderOptionsButton: function (cell, row, col, all) {
        cell.innerHTML = `
        <div class="has-text-centered">
            <div class="button is-secondary addCash">Nạp tiền</div>
            <div class="button is-primary cashDividend">Cổ tức tiền mặt</div>
        </div>
        `;

        var buttonCashDividend = cell.querySelector(".cashDividend");
        buttonCashDividend.onclick = function () {
            console.log("switch url transfer page");
            window.location.href =
                `/private/accountmanagementdetail?systemsubaccount=${all[row].systemsubaccount}&systemaccount=${all[row].systemaccount}`;
        };
    },
};