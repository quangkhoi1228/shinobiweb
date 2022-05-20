shinobi.ordermanagementrender = {
    table: '',
    build: function() {
        shinobi.ordermanagementrender.renderTable();
    },
    renderTable: function() {
        var idTable = 'dataContainer';

        var url = shinobi.coreapi.inprocessOrderApi + 'findDataList';
        var request = {};

        request.recordPerPage = shinobi.util.getRecordNumber(idTable);

        var colNames = shinobi.tableHelper.getColname(idTable);
        var renders = shinobi.tableHelper.getRender(idTable);

        shinobi.ordermanagementrender.table = new shinobi.table(idTable);

        shinobi.ordermanagementrender.table.staticfilters = [];

        var sorts = [];
        sorts[0] = { "colname": "createddate", "value": "desc" };
        shinobi.ordermanagementrender.table.staticsorts = sorts;

        shinobi.ordermanagementrender.table.initLoadApi(url, request, colNames, renders);

    },
    renderButtonCancelOrder: function(cell, row, col, all) {
        var value = cell.innerHTML;
        cell.innerHTML = '';

        var button = document.createElement('a');
        button.setAttribute('class', 'button is-small is-danger');
        button.innerHTML = 'Hủy';

        button.onclick = function() {
            shinobi.notification.notification.loading();
            var url = shinobi.coreapi.systemOrderManagement + 'forceCancelOrder';
            var request = {};
            request.orderid = value;

            shinobi.api.request(url, JSON.stringify(request), function(re) {

                shinobi.ordermanagementrender.table.reloadApi();

            });


        }

        cell.appendChild(button);
    }


};