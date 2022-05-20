shinobi.accountefficiencyuserrender = {
    build: function (systemsubaccount) {
        var object = this;
        object.renderAccountEfficiencyUser(systemsubaccount);
    },

    renderAccountEfficiencyUser: function (valueAccount) {
        var datalistId = "tableaccountefficiency";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        if (!shinobi.accountefficiencyuserrender.tableaccountefficiency) {
            shinobi.accountefficiencyuserrender.tableaccountefficiency = new shinobi.table(datalistId);
        }

        var url = '/authenapi/SystemUserApi/getInvestmentEfficiency';
        var request = { "allocationaccount": valueAccount };

        shinobi.notification.notification.loading();
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.notification.notification.loaded();
            shinobi.accountefficiencyuserrender.tableaccountefficiency.clear();
            data = JSON.parse(res);
            shinobi.accountefficiencyuserrender.tableaccountefficiency.renderTable(colNames, data, renders);
        });
    },
};