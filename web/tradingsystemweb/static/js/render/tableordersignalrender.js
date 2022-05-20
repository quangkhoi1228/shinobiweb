shinobi.tableordersignalrender = {
    orderSignalTable: '',
    build: function (systemsubaccount) {
        var object = this;
        object.renderTableAssetUser(systemsubaccount);

    },

    renderTableAssetUser: function (valueAccount) {
        var datalistId = "tableordersignal";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        if (!shinobi.tableordersignalrender.orderSignalTable) {
            shinobi.tableordersignalrender.orderSignalTable = new shinobi.table(datalistId);
        }

        var url = '/authenapi/SignalListApi/getSignalList';
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        };

        shinobi.tableordersignalrender.orderSignalTable.staticfilters = [
            {
                'colname': 'allocationaccount',
                'operator': '=',
                'value': `${valueAccount}`,

            }
        ];

        shinobi.tableordersignalrender.orderSignalTable.initLoadApi(url, request, colNames, renders);
    },

    renderStatusChildSetting: function (cell, row, col, all) {
        var value = cell.innerHTML;

        if (shinobi.ordercommandmanagementrender.childStatusOrder[`${value}`]) {
            value = shinobi.ordercommandmanagementrender.childStatusOrder[`${value}`];
        };

        if (value == "Thành công") {
            cell.innerHTML = `<div class="has-text-centered has-text-success">${value}</div>`;
        } else if (value == "Thất bại") {
            cell.innerHTML = `<div class="has-text-centered has-text-danger">${value}</div>`;
        } else {
            cell.innerHTML = `<div class="has-text-centered">${value}</div>`;
        }
    },

    formatDescription: function (cell, row, col, all) {
        var value = cell.innerHTML;
        value = shinobi.ordercommandmanagementrender.renderNoticeSub(value);

        cell.innerHTML = `<div class="order-command-notice is-italic"> ${value} </div>`;
    },

    formatFullname: function (cell, row, col, all) {
        var value = cell.innerHTML;

        cell.innerHTML = `<div class="has-text-centered" value="${value}"> ${all[row].fullname} </div>`;
    },
};