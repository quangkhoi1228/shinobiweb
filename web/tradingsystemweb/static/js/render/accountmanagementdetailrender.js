shinobi.accountmanagementdetailrender = {
    table: '',
    build: function () {
        var object = this;
        object.createStruct(function (search) {
            object.getinfoUserAccount(search);
            object.loadData(search);
        });
        shinobi.selfemployedaccountrender.createMultivalueStructure();
    },
    loadData: function (systemsubaccount) {
        var object = this;
        var datalistId = 'linkedpmaccounttable';
        var url = "/authenapi/ClientAccountDetailApi/findDataList";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        }
        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        object.table = new shinobi.table(datalistId);
        object.table.staticfilters = [{
            'colname': 'systemsubaccount',
            'operator': '=',
            'value': systemsubaccount
        }];
        object.table.initLoadApi(url, request, colNames, renders);

        if (!systemsubaccount) {
            object.openModalWarning(object.configSystemSubAccount, "Người dùng chưa cấu hình tài khoản giao dịch.", "");
        }
    },
    createStruct: function (callback) {
        var search = shinobi.util.getAllSearchInPath();
        var systemSubaccount = search.systemsubaccount;
        document.getElementById('accountmanagement').classList.add('is-active');
        if (callback) {
            callback(systemSubaccount);
        }
    },
    getinfoUserAccount: function (subAccount) {
        var url = '/authenapi/StockComAccountApi/getStockComAccountInfo';
        var request = {
            "recordPerPage": "10", "pageNum": 1,
            systemsubaccount: subAccount,
        };
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            console.log("getinfoUserAccount", res);
            var elem = document.getElementById('nameuser');
            shinobi.mapping.renderElement(elem, res);
        });
    },

    checkConfigClientAccount: function (cell, row, col, all) {
        var object = shinobi.accountmanagementdetailrender;
        var value = cell.innerHTML;
        // if (!all[row].hasOwnProperty("systemsubaccount")) {
        //     var config = object.configSystemSubAccount;
        //     var warning = `Tài khoản ${all[row].fullname} chưa cấu hình tài khoản giao dịch.`

        //     shinobi.accountmanagementdetailrender.openModalWarning(config, warning, all[row]);
        // } else {
        if (!all[row].hasOwnProperty("enddate")) {
            var config = object.configAllocationCustomer;
            var warning = `Tài khoản ${all[row].fullname} chưa được phân bổ.`
            shinobi.accountmanagementdetailrender.openModalWarning(config, warning, all[row]);
        }
        // }
    },

    openModalWarning: function (configModal, warningNotification, data) {
        var warningContainer = document.getElementById("warningNotification");
        warningContainer.innerHTML = `
            <div>
                <div class="has-text-danger is-italic">${warningNotification}</div>
                <div class="has-text-danger has-text-weight-bold">Vui lòng cấu hình tài khoản</div>
            </div>
        `

        var modal = document.getElementById("warningConfigModal");
        modal.classList.add("is-active");
        button = modal.querySelector(".confirmConfig");
        button.onclick = function () {
            modal.classList.remove("is-active");
            configModal(data);
        }
    },

    configSystemSubAccount: function (data) {
        console.log("configSystemSubAccount");

        var systemaccountDomain = shinobi.util.getAllSearchInPath().systemaccount;

        shinobi.accountmanagementdetailrender.getInfoClientAccount(function (clientInfoList) {
            console.log("clientInfoList", clientInfoList);
            clientInfoList.forEach(clientInfo => {
                console.log("clientInfo", clientInfo);
                if (clientInfo.systemaccount == systemaccountDomain) {
                    shinobi.selfemployedaccountrender.checkChildAccount(systemaccountDomain, clientInfo, function (systemsubaccount) {
                        setTimeout(function () {
                            window.onbeforeunload = null;
                            window.location.href = '/private/accountmanagementdetail?' + 'systemsubaccount='
                                + systemsubaccount + "&systemaccount=" + systemaccountDomain;
                        }, 500);
                    }
                        , 'disableReload');
                }
            })
        });


    },

    getInfoClientAccount: function (callback) {
        var url = "/authenapi/ClientStockComAccountManagementApi/findDataList";
        var request = {}
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            data = res.data;

            if (callback) {
                callback(data);
            }
        });
    },

    configAllocationCustomer: function (data) {
        console.log("configAllocationCustomer");
        shinobi.accountmanagementrender.activeThirdModel('', data.systemsubaccount);
    },

    renderUpdateVolumeStock: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.classList.add('has-text-right');
        cell.innerHTML = `
            ${shinobi.util.formatNumber(value)} 
            <p class="icon has-text-link confirm" data-tooltip="Xác nhận tiền về">
            <i class="fal fa-search-dollar"></i>
        `;

        var button = cell.querySelector('.confirm');

        button.onclick = function () {
            var username = value;
            var fullname = all[row].fullname;
            var stock = all[row].stock;
            stock = "TTF";
            shinobi.accountmanagementdetailrender.updateVolumeBuy(username, fullname, stock, all[row]);
        };

    },

    updateVolumeBuy: function (username, fullname, stock, fulldata) {
        var url = '';
        shinobi.notification.confirm(function () {
            shinobi.mapping.getValue("#modalFlexible", function (data) {
                console.log('data send', data, 'username', username);
                var request = data;
                // shinobi.api.request(url, JSON.stringify(request), function () {
                //     setTimeout(function () {
                //         shinobi.accountmanagementdetailrender.table.reloadApi();
                //     }, 2000);
                // })

            });
        }, {
            title: "Xác nhận tiền về",
            content: `
            <div  class="level is-size-6 mb-2">
                <div class="level-item">
                    <span>Tên KH: </span> <span class="font-weight-bold">${fullname} </span>
                </div>
            <div class="level-item">
                <span class"pl-4">Mã CK: </span> <span class="font-weight-bold">${stock} </span>    
            </div>
           
            </div>
            <div class="field">
             <label for="" class="label">Số tiền: ${fulldata.cash}</label>
        </div>
            `,
        });
    },

    renderOtherOptionsLinkedPMTable: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.innerHTML = `
        <div class="has-text-centered">       
            <div class="dropdown is-up is-right more-button">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span><i class="fas fa-ellipsis-v"></i></span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item pr-4">
                            Tạm ngắt kết nối
                        </a>
                        <a class="dropdown-item pr-4">
                            Ngắt kết nối và tất toán
                        </a>
                    </div>
                </div>
            </div>
        </div>`

        var dropdown = cell.querySelector('.dropdown');
        dropdown.onclick = function () {
            dropdown.classList.toggle('is-active');
        }
    },
};