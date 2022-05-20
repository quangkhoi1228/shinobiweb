shinobi.portfoliousermenurender = {
    build: function () {
        var Object = this;
        shinobi.portfoliousermenurender.activeMenu();
        // shinobi.portfoliousermenurender.renderTables();
        shinobi.portfoliousermenurender.renderHiddenTable("#portfoliousermenu ul li");
        shinobi.portfoliousermenurender.renderHiddenTable("#tabsmatchingorder ul li");
    },


    activeMenu: function () {
        shinobi.portfoliousermenurender.renderActiveTab("#portfoliousermenu ul li");
        shinobi.portfoliousermenurender.renderActiveTab("#tabsmatchingorder ul li");

    },

    renderActiveTab: function (selector) {
        var listMenu = document.querySelectorAll(selector);
        var refreshBtn = document.getElementById('refreshportfolio');

        listMenu.forEach(elem => {
            elem.onclick = function () {
                listMenu.forEach(item => {
                    item.classList.remove("is-active");
                });
                elem.classList.add("is-active");
                shinobi.portfoliousermenurender.renderHiddenTable(selector);

                if (document.querySelector('#tabsmatchingorder [value="tablematchingorderhistory"]').classList.contains("is-active") == false) {
                    document.getElementById("searchinghistory").classList.add("is-hidden");
                    refreshBtn.classList.remove('is-hidden');

                } else {
                    document.getElementById("searchinghistory").classList.remove("is-hidden");
                    refreshBtn.classList.add('is-hidden');
                }
            };
        });
    },

    renderHiddenTable: function (selector) {
        var listMenu = document.querySelectorAll(selector);
        listMenu.forEach(elem => {
            var value = elem.getAttribute("value");
            var table = document.querySelector(`table#${value}`);
            table.parentNode.classList.add("is-hidden");
        });
        shinobi.portfoliousermenurender.renderVisibleTable(selector);
    },

    renderVisibleTable: function (selector) {
        var listTable = document.querySelectorAll(selector);
        listTable.forEach(elem => {
            if (elem.classList.contains("is-active") == true) {
                var value = elem.getAttribute("value");
                var table = document.querySelector(`table#${value}`);
                table.parentNode.classList.remove("is-hidden");

                shinobi.portfoliousermenurender.renderTables(value);
            }
        });
    },

    renderTables: function (value) {
        shinobi.portfoliousermenurender.renderPortFolioUser(value);
        shinobi.portfoliousermenurender.renderAssetUser(value);
        shinobi.portfoliousermenurender.renderAccountEfficiencyUser(value);
        shinobi.portfoliousermenurender.renderTableOrderSignal(value);
    },

    renderPortFolioUser: function (value) {
        if (value == "tablematchingorderdate") {
            console.log("Load Bảng Sổ lệnh Trong Ngày");
            // shinobi.portfoliouserrender.reloadPortfolioUser();
        };

        if (value == "tablematchingorderhistory") {
            console.log("Load Bảng Sổ lệnh Lịch Sử");
            // shinobi.portfoliouserrender.reloadPortfolioUser();
        };
    },

    renderAssetUser: function (value) {
        if (value == "tableassetorder") {
            console.log("Load Bảng Tài Sản");
            shinobi.assetuserrender.getAssetUser(shinobi.tradingsystemrender.getCurrentAllocationAccount());
        };
    },

    renderAccountEfficiencyUser: function (value) {
        if (value == "tableaccountefficiency") {
            console.log("Load Bảng Hiệu quả TK");
        };
    },

    renderTableOrderSignal: function (value) {
        if (value == "tableordersignal") {
            console.log("Load Bảng Tín Hiệu");
        };
    },
};