shinobi.selfemployedaccountrender = {
    systemsubaccount: '',
    colNames: '',
    build: function () {
        shinobi.selfemployedaccountrender.activeTab();
        shinobi.selfemployedaccountrender.renderCreateActiveModal();
        shinobi.selfemployedaccountrender.renderModalButtons();
        shinobi.selfemployedaccountrender.createFirstAccount();

        shinobi.selfemployedaccountrender.renderSelfEmployedAccountSelect(
            function () {
                shinobi.selfemployedaccountrender.checkSeflEmployedAccountData();
                shinobi.selfemployedaccountrender.renderForTable();
                shinobi.selfemployedaccountrender.getUnallocatedPercent();
                shinobi.selfemployedaccountrender.addEventCheckAccountSelect();
            }
        );

        shinobi.selfemployedaccountrender.createMultivalueStructure();
    },

    activeTab: function () {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;
            var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="/private/selfemployedaccount"`);
            tab.classList.add("is-active");
        });
    },

    renderMoreButton: function (cell, row, col, all) {
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
                    <a class="dropdown-item pr-4" onclick="shinobi.selfemployedaccountrender.renderModifyButton()">
                        Chỉnh sửa
                    </a>
                    <a class="dropdown-item pr-4">
                        Xoá
                    </a>
                </div>
              </div>
            </div>
          </div>`

        var dropdown = cell.querySelector('.dropdown');
        dropdown.onclick = function () {
            dropdown.classList.toggle('is-active');
        };
    },

    renderCreateActiveModal: function () {
        shinobi.selfemployedaccountrender.activeModal("#allocateAccount", "#addAccountModal", "Phân bổ tài khoản");
        shinobi.selfemployedaccountrender.activeModal("#allocateFirstAccount", "#addAccountModal", "Phân bổ tài khoản");
        shinobi.selfemployedaccountrender.activeModal("#addAccountButton", "#addSelfEmployedAccountModal", "Thêm tài khoản tự doanh");
    },

    activeModal: function (activeButton, activeModal, titleModal) {
        var object = this;
        var button = document.querySelector(activeButton);
        button.onclick = function () {
            object.getListPm1NotAllotment();
            shinobi.mapping.clear(activeModal)

            var modal = document.querySelector(activeModal);
            modal.classList.add("is-active");
            shinobi.selfemployedaccountrender.settingCreateAccountModal(activeModal, titleModal);
            shinobi.selfemployedaccountrender.setUpPasswordInput(activeModal);
        }
    },

    settingCreateAccountModal: function (activeModal, titleModal) {
        var buttonCreate = document.querySelector(activeModal + " #createModal");
        var buttonSave = document.querySelector(activeModal + " #saveModal");

        buttonCreate.style.display = "block";
        buttonSave.style.display = "none";

        var title = document.querySelector(activeModal + " .modal-card-title");
        title.innerText = titleModal;
    },

    renderModifyButton: function () {
        shinobi.selfemployedaccountrender.getListPm1NotAllotment();
        var modal = document.querySelector("#addAccountModal");
        modal.classList.add("is-active");

        modal = "#addAccountModal";
        shinobi.selfemployedaccountrender.settingModifyAccountModal(modal);
        shinobi.selfemployedaccountrender.setUpPasswordInput(modal);
    },

    settingModifyAccountModal: function (modal) {
        var buttonCreate = document.querySelector(modal + " #createModal");
        var buttonSave = document.querySelector(modal + " #saveModal");

        buttonCreate.style.display = "none";
        buttonSave.style.display = "block";

        var title = document.querySelector(modal + " .modal-card-title");
        title.innerText = "username";
    },

    setUpPasswordInput: function (activeModal) {
        var inputLoginPassword = document.querySelector(activeModal + " #loginPassword input");
        var inputOrderPassword = document.querySelector(activeModal + " #orderPassword input");
        var buttonLoginPassword = document.querySelector(activeModal + " #loginPassword .button");
        var buttonOrderPassword = document.querySelector(activeModal + " #orderPassword .button");

        if (inputLoginPassword && inputOrderPassword) {
            shinobi.selfemployedaccountrender.showPassword(buttonLoginPassword, inputLoginPassword);
        }
        if (buttonLoginPassword && buttonOrderPassword) {
            shinobi.selfemployedaccountrender.showPassword(buttonOrderPassword, inputOrderPassword);
        }
    },

    showPassword: function (showButton, input) {
        input.setAttribute("type", "password");
        showButton.innerHTML = `<i class="fas fa-eye-slash"></i>`;

        showButton.onclick = function () {
            var value = input.getAttribute("type");
            if (value == "password") {
                input.setAttribute("type", "text");
                showButton.innerHTML = `<i class="fas fa-eye"></i>`;
            } else {
                input.setAttribute("type", "password");
                showButton.innerHTML = `<i class="fas fa-eye-slash"></i>`;
            }
        };
    },

    getListPm1NotAllotment: function () {
        var url = "/authenapi/PmManagementApi/findDataList";
        var allocationaccount = document.getElementById('selfemplyedaccountselection').value;
        var idDatalist = "listpmusername";
        var request = {
            recordPerPage: getRecordNumber(idDatalist),
        }
        if (!shinobi.selfemployedaccountrender.listPMUserName) {
            var datalist = new shinobi.datalist(idDatalist);
            shinobi.selfemployedaccountrender.listPMUserName = datalist
        };

        // datalist.staticfilters = [
        //     {
        //         "colname": "systemsubaccount", "operator": "=", "value": allocationaccount
        //     }]
        shinobi.selfemployedaccountrender.listPMUserName.initLoadApi(url, request);
    },
    renderFullnameAllocation: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.firstname + " " + all.lastname
    },
    renderModalButtons: function () {
        shinobi.selfemployedaccountrender.renderModelAllotment("#addAccountModal");
        shinobi.selfemployedaccountrender.renderModalEvent("#addSelfEmployedAccountModal");
    },


    renderModalEvent: function (modal) {
        shinobi.selfemployedaccountrender.renderEventCreateButton(modal);
        shinobi.selfemployedaccountrender.renderEventSaveButton(modal);
    },
    renderEventCreateButton: function (modal, json) {
        var url = "/authenapi/StockComAccountRegistrationApi/createAdminUser";
        var create = document.querySelector(modal + " #createModal");
        create.onclick = function () {
            shinobi.selfemployedaccountrender.getValueUser(modal, function (json) {
                listJson = {
                    "stockcom": json.stockcom,
                    "account": json.account,
                    "username": json.account,
                    "password": json.password,
                    "pincode": json.pincode,
                    "userid": "",
                    "name": json.name,
                };

                shinobi.notification.notification.loading();
                shinobi.api.request(url, JSON.stringify(listJson), function (res) {
                    shinobi.notification.notification.loaded();
                    shinobi.notification.notification.info('Thêm tài khoản thành công!');
                    setTimeout(function () {
                        window.location.reload();
                    }, 100)
                });
            });
        };
    },

    renderEventSaveButton: function (modal) {
        var create = document.querySelector(modal + " #saveModal");
        create.onclick = function () {
            shinobi.fragmentfindandaddaccountmanagementrender.getValue(modal, function (json) {
                console.log(json);
            });
        };
    },
    renderModelAllotment: function (modal) {
        var object = this;
        shinobi.selfemployedaccountrender.renderEventSaveAllotmentButton(modal);
        shinobi.selfemployedaccountrender.renderEventCreateAllotmentButton(modal);

    },
    renderEventSaveAllotmentButton: function (modal, json) {
        var object = this;
        var url = "/authenapi/AllocationManagementApi/setOriginSubAccountAllocation";
        var create = document.querySelector(modal + " #createModal");
        create.onclick = function () {
            shinobi.selfemployedaccountrender.getValue(modal, function (json) {

                var select = document.getElementById('selfemplyedaccountselection');
                var value = select.value;
                var optionChild = select.querySelector(`[value="${value}"]`);
                var subValue = optionChild.getAttribute('sub-value');
                var systemSubaccount = subValue;
                listJson = {
                    'systemsubaccount': systemSubaccount,
                    "startdate": json.startdate,
                    "enddate": json.enddate,
                    "profitcommisionratio": Number(json.profitcommisionratio) / 100,
                    "pmusername": json.pmusername,
                    "allocationratio": Number(json.allocationratio) / 100,

                };
                shinobi.notification.notification.loading();
                shinobi.api.request(url, JSON.stringify(listJson), function (res) {
                    shinobi.notification.notification.loaded();
                    shinobi.notification.notification.info('Thêm tài khoản thành công!');
                    setTimeout(function () {
                        window.location.reload();
                    }, 100)
                });
            });

        };
    },

    renderEventCreateAllotmentButton: function (modal) {
        var create = document.querySelector(modal + " #saveModal");
        create.onclick = function () {
            shinobi.fragmentfindandaddaccountmanagementrender.getValue(modal, function (json) {
                console.log(json);
            });
        };
    },


    getValue: function (selector, callback) {
        shinobi.mapping.getValue(selector, function (request) {
            !Object.values(request).includes("") ? callback(request) : shinobi.util.fillInputMessage();
        }, {
            checkEmpty: true,
        })
    },

    getValueUser: function (selector, callback) {
        shinobi.mapping.getValue(selector, function (request) {
            listJson = {
                "stockcom": request.stockcom,
                "account": request.account,
                "username": request.account,
                "password": request.password,
                "pincode": request.pincode,
                "name": request.name,
            };
            var json = listJson;

            delete json['pincode'];
            !Object.values(json).includes("") ? callback(listJson) : shinobi.util.fillInputMessage();
        }, {
            checkEmpty: true,
        })
    },

    createFirstAccount: function () {
        var button = document.querySelector("#addFirstAccountButton");
        button.onclick = function () {
            var modal = document.querySelector("#addSelfEmployedAccountModal");
            modal.classList.add("is-active");

            modal = "#addSelfEmployedAccountModal";
            shinobi.selfemployedaccountrender.settingCreateAccountModal(modal, "Thêm tài khoản tự doanh");
            shinobi.selfemployedaccountrender.setUpPasswordInput(modal);
        }
    },

    checkSeflEmployedAccountData: function () {
        shinobi.api.request("/authenapi/StockComAccountApi/getListOriginStockComAccount", '{}', function (res) {
            var data = JSON.parse(res);

            var table = document.querySelector("#selfEmployedTable");
            var noTable = document.querySelector("#noSelfEmployedAccount");
            shinobi.selfemployedaccountrender.checkDataRenderTable(data, table, noTable, true);
        });
    },

    checkAllotmentAccountData: function () {
        shinobi.selfemployedaccountrender.listDataLinkedPM(function (elem) {
            var request = {
                "recordPerPage": "5",
                "pageNum": 1,
                "filters": [
                    {
                        "colname": "systemsubaccount",
                        "operator": "=",
                        "value": elem.systemsubaccount,
                    }, {
                        "colname": "isactive",
                        "operator": "=",
                        "value": "true"
                    }
                ],
                "sorts": [],
            };
            var url = "/authenapi/OriginStockComAccountManagementApi/findDataList";

            shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
                res = JSON.parse(res);

                var table = document.querySelector("#allotmentTable");
                var noTable = document.querySelector("#noAccountPMTable");

                shinobi.selfemployedaccountrender.checkDataRenderTable(res.data, table, noTable, false);
            });
        });
    },

    listDataLinkedPM: function (callback) {
        var select = document.getElementById("selfemplyedaccountselection");
        var valueSelect = select.value;
        var request = {
            "systemaccount": valueSelect,
        };
        shinobi.cacheapi.request("/authenapi/StockComSubAccountApi/getListSubAccount", JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            res.forEach(elem => {
                if (valueSelect == elem.systemaccount) {
                    callback(elem);
                    return;
                }
            });
        });
    },

    checkDataRenderTable: function (data, dataTable, nullTable, options) {
        console.log(data, data.length, (data.length));
        if (data.length) {

            if (data.length != 0) {
                dataTable.classList.remove("is-hidden");
                if (options) {
                    shinobi.selfemployedaccountrender.checkAllotmentAccountData();
                }
            }
        } else {
            nullTable.classList.remove("is-hidden");
        }
    },

    renderForTable: function () {
        var object = this;
        object.renderCompanySelect();
    },

    renderCompanySelect: function (idSelect = 'companyName') {
        var datalistId = idSelect;
        var url = "/api/StockComInfoApi/findDataList";

        var datalist = new shinobi.datalist(datalistId);

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
            pageNum: 1,
        }
        datalist.initLoadApi(url, request);

        // shinobi.api.request(url, JSON.stringify(request), function (res) {
        //     res = JSON.parse(res);
        //     datalist.renderTable(res.data);
        // });
    },

    renderFullname: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.fullname
        elem.setAttribute('sub-value', all.tradingsubaccount)
    },

    renderFullnameStockCompany: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.fullname
        // elem.setAttribute('sub-value', all.tradingsubaccount);
        console.log('all', all, 'VALUE', value);
    },
    renderSelfEmployedAccountSelect: function (callback) {
        var datalistId = "selfemplyedaccountselection";
        var url = "/authenapi/StockComAccountApi/getListOriginStockComAccount";

        if (!shinobi.selfemployedaccountrender.dataSelfEmplyedAccountSelection) {
            var datalist = new shinobi.datalist(datalistId);
            shinobi.selfemployedaccountrender.dataSelfEmplyedAccountSelection = datalist;
        }

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
            pageNum: 1,
        }
        // datalist.initLoadApi(url, request);

        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            datalist.renderTable(res);

            let interval = setInterval(() => {
                (!shinobi.selfemployedaccountrender.dataSelfEmplyedAccountSelection.tableContainerNode) && clearInterval(interval);
                let optionList = datalist.tableNode.querySelectorAll('option');
                if (optionList.length >= res.length) {
                    shinobi.selfemployedaccountrender.selectLocalStorage();
                    res.forEach(item => {
                        if (document.querySelector("#selfemplyedaccountselection").value == item.systemaccount) {
                            shinobi.selfemployedaccountrender.checkChildAccount(item.systemaccount, item);
                            console.log('item account', item);
                            if (item.tradingsubaccount) {
                                shinobi.selfemployedaccountrender.renderLinkedPMTable(item.tradingsubaccount);
                            }
                            if (item.tradingsubaccount) {
                                shinobi.selfemployedaccountrender.checkPMAccount(true, item.tradingsubaccount);
                                shinobi.selfemployedaccountrender.getUnallocatedPercent();
                                shinobi.selfemployedaccountrender.getinfoUserAccount(item.tradingsubaccount)
                            } else {
                                shinobi.selfemployedaccountrender.checkPMAccount(false, "NoItem");
                            }
                        };
                    });

                    clearInterval(interval);
                }

            }, 100);

            if (callback) {
                callback();
            }
        });
    },

    checkChildAccount: function (requestValue, item, callback, disableReload) {
        console.log("requestValue", requestValue, "item", item);
        var url = "/authenapi/StockComAccountApi/checkHasConfigTradingSubAccount"
        var request = {
            "systemaccount": requestValue
        };
        console.log('requestValue', requestValue);
        window.localStorage.valueSelfEmployedAccountSelect = requestValue;
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            var bool = JSON.parse(res);

            if (!bool) {
                shinobi.selfemployedaccountrender.loadListChildAccount(requestValue, item, callback, disableReload);
            } else {
                if (callback) {
                    callback();
                };
            }
        });
    },

    loadListChildAccount: function (requestValue, item, callback, disableReload) {
        var object = this;
        var tableId = "checkAccountUserModal";

        if (!object.colNames) {
            var colNames = shinobi.tableHelper.getColname(tableId);
        }
        var renders = shinobi.tableHelper.getRender(tableId);

        var url = '/authenapi/StockComSubAccountApi/getListSubAccount';
        var request = {
            "systemaccount": requestValue,
        };

        if (!shinobi.selfemployedaccountrender.checkaccountusermodal) {
            shinobi.selfemployedaccountrender.checkaccountusermodal = new shinobi.table(tableId);
        }

        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.selfemployedaccountrender.checkaccountusermodal.renderTable(colNames, JSON.parse(res), renders);
        })

        var titleModal = document.querySelector("#confirmDealAccountModal header .has-fullname");
        var notiModal = document.querySelector("#confirmDealAccountModal section .has-fullname");
        if (item.fullname) {
            titleModal.innerHTML = `Cấu hình tài khoản ${item.fullname}`
            notiModal.innerHTML = `*Xác định tài khoản giao dịch của ${item.fullname}`
        } else {
            titleModal.innerHTML = `Cấu hình tài khoản ${item.name}`
            notiModal.innerHTML = `*Xác định tài khoản giao dịch của ${item.name}`
        }


        var confirmDealAccountModal = document.getElementById("confirmDealAccountModal");
        confirmDealAccountModal.classList.add("is-active");
        shinobi.selfemployedaccountrender.stopOutModal(confirmDealAccountModal);
        shinobi.selfemployedaccountrender.submitChildAccount(requestValue, item, disableReload, callback);
    },

    stopOutModal: function (modalSelector) {
        console.log(modalSelector);
        var background = modalSelector.querySelector(".modal-background")
        if (modalSelector.classList.contains("is-active")) {
            background.onclick = function () {
                shinobi.notification.notification.error("Vui lòng cấu hình trước khi tắt cửa sổ");
            }
        }
    },

    chooseDealAccount: function (cell, row, col, all) {
        value = cell.innerHTML;
        if (row == 0) {
            cell.innerHTML = `
            <div class="has-text-centered">
                <label class="radio">
                    <input type="radio" name="dealAccount" snb-key="systemsubaccount" radio-value="${value}" checked>
                </label>
            </div>`
        } else {
            cell.innerHTML = `
            <div class="has-text-centered">
                <label class="radio">
                    <input type="radio" name="dealAccount" snb-key="systemsubaccount" radio-value="${value}">
                </label>
            </div>`
        }
    },

    inputFeeForDealAccount: function (cell, row, col, all) {
        cell.innerHTML =
            `
        <input class="input is-small has-text-right feeDealAccountInput" snb-key="feeInput">
        `
    },

    inputTaxForDealAccount: function (cell, row, col, all) {
        cell.innerHTML =
            `
        <input class="input is-small has-text-right taxDealAccountInput" snb-key="taxInput">
        `
    },

    getValueDealAccountModal: function (selector, callback) {
        shinobi.mapping.getValue(selector, function (request) {
            var modal = document.querySelector(selector);
            console.log("selector", selector, modal);
            var json = request;
            // delete json['feeInput'];
            // delete json['taxInput'];

            !Object.values(json).includes("") ? callback(request) : shinobi.util.fillInputMessage();
        }, {
            checkEmpty: true,
        })
    },

    submitChildAccount: function (requestValue, item, disableReload, callback) {
        var button = document.querySelector("#confirmDealAccount");
        button.onclick = function () {
            shinobi.selfemployedaccountrender.getValueDealAccountModal("#confirmDealAccountModal", function (json) {

                var request = shinobi.selfemployedaccountrender.getRequestRowSelectedTableSubAccount(requestValue, json);
                shinobi.selfemployedaccountrender.getRequestAllRowTableSubAccount(requestValue, json, item, function (requestAll) {

                    shinobi.selfemployedaccountrender.systemsubaccount = request.systemsubaccount;
                    if (json.systemsubaccount) {
                        shinobi.selfemployedaccountrender.getUpdatePersonalTradingConfig(request, requestAll, disableReload, callback);
                    } else {
                        shinobi.notification.notification.error('Vui lòng chọn tài khoản giao dịch!');
                    }
                });


            });
        }
    },

    getRequestRowSelectedTableSubAccount: function (requestValue, json) {
        var request = {
            "systemaccount": requestValue,
            "systemsubaccount": json.systemsubaccount,
        };
        return request;
    },

    getRequestAllRowTableSubAccount: function (requestValue, json, item, callback) {
        console.log('item item', item);
        shinobi.selfemployedaccountrender.getinfoUserAccount(item.tradingsubaccount, function (info) {
            // console.log('info', info, info.account);
            var jsonList = [];
            for (var index = 0; index < index + 1; index++) {
                var array = [];
                var snbList = document.querySelectorAll(`#checkAccountUserModal [rowid="${index}"] [snb-key]`)
                if (snbList.length) {
                    snbList.forEach(snb => {
                        var radioV = snb.getAttribute("radio-value");
                        if (radioV) {
                            array.push(radioV);
                        } else {
                            array.push(snb.value);
                        };
                    });
                    var stringBancode = {
                        "bancode": JSON.stringify(shinobi.selfemployedaccountrender.getBanCode()),
                    }

                    if (isNaN(Number(array[1]))) {
                        jsonList = [];
                        break;
                    }

                    if (isNaN(Number(array[2]))) {
                        jsonList = [];
                        break;
                    }

                    if (!item.stockcompany) {
                        item.stockcompany = item.stockcom;
                    }

                    // if (!item.account) {

                    // }

                    console.log("requestValue list", requestValue);

                    var request = {
                        "account": item.account,
                        "systemaccount": requestValue,
                        "systemsubaccount": array[0],
                        "stockcom": item.stockcompany,
                        "fee": Number(array[1]) / 100,
                        "tax": Number(array[2]) / 100,
                        "bancode": JSON.stringify(stringBancode),
                    };

                    console.log(request);

                    jsonList.push(request);
                } else { break; }
            }
            if (callback) {
                callback(jsonList)
            }
        });

    },

    getUpdatePersonalTradingConfig: function (request, requestAll, disableReload, callback) {
        console.log("rq updatePersonalTradingConfig", requestAll);

        if (requestAll.length) {
            requestAll = {
                "subaccountlist": requestAll,
            }

            shinobi.api.request("/authenapi/StockComAccountApi/updatePersonalTradingConfig", JSON.stringify(requestAll), function (res) {
                shinobi.notification.notification.loaded();
                console.log("Cập nhật thuế phí", res);
                if (res == "update success") {
                    shinobi.notification.notification.info('Cập nhật thuế phí thành công!');
                    setTimeout(function () {
                        shinobi.selfemployedaccountrender.getInfoConfigTradingSubAccount(request, disableReload, callback);
                    }, 1000)
                } else {
                    shinobi.notification.notification.error('Cập nhật thuế phí thất bại!');
                }
            });
        } else {
            shinobi.notification.notification.error('Giá trị nhập chưa đúng!');
        }
    },

    getInfoConfigTradingSubAccount: function (request, disableReload, callback) {
        console.log("rq configTradingSubAccount", request);

        shinobi.api.request("/authenapi/StockComAccountApi/configTradingSubAccount", JSON.stringify(request), function (res) {
            shinobi.notification.notification.loaded();
            shinobi.notification.notification.info('Cấu hình tài khoản thành công!');
            if (!disableReload) {
                setTimeout(function () {
                    window.location.reload();
                }, 2000)
            } else {
                document.getElementById('confirmDealAccountModal').classList.remove('is-active');
                if (callback) {
                    callback(request.systemsubaccount);
                }
            }
        });
    },

    addEventCheckAccountSelect: function () {
        var select = document.querySelector("#selfemplyedaccountselection");
        select.onchange = function () {
            var datalistId = "selfemplyedaccountselection";
            var url = "/authenapi/StockComAccountApi/getListOriginStockComAccount";

            var request = {
                recordPerPage: shinobi.util.getRecordNumber(datalistId),
            }

            shinobi.api.request(url, JSON.stringify(request), function (res) {
                res = JSON.parse(res);

                res.forEach(item => {
                    if (document.querySelector("#selfemplyedaccountselection").value == item.systemaccount) {
                        shinobi.selfemployedaccountrender.checkChildAccount(item.systemaccount, item);
                        if (item.tradingsubaccount) {
                            shinobi.selfemployedaccountrender.renderLinkedPMTable(item.tradingsubaccount);
                        }
                        if (item.tradingsubaccount) {
                            shinobi.selfemployedaccountrender.checkPMAccount(true, item.tradingsubaccount);
                            shinobi.selfemployedaccountrender.getUnallocatedPercent();
                            shinobi.selfemployedaccountrender.getinfoUserAccount(item.tradingsubaccount)
                        } else {
                            shinobi.selfemployedaccountrender.checkPMAccount(false, "NoItem");
                        }
                    };
                })
            });
        }
    },

    checkPMAccount: function (boolean, tradingsubaccount) {
        var nullTable = document.querySelector("#noAccountPMTable");
        var dataTable = document.querySelector("#allotmentTable");
        if (boolean) {
            var url = "/authenapi/OriginStockComAccountManagementApi/findDataList"
            var request = {
                "recordPerPage": "5",
                "pageNum": 1,
                "filters": [
                    {
                        "colname": "systemsubaccount",
                        "operator": "=",
                        "value": tradingsubaccount,
                    }, {
                        "colname": "isactive",
                        "operator": "=",
                        "value": "true"
                    }
                ],
                "sorts": []
            }

            shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
                json = JSON.parse(res);
                if ((json.data).length) {
                    nullTable.classList.add("is-hidden");
                    dataTable.classList.remove("is-hidden");
                } else {
                    nullTable.classList.remove("is-hidden");
                    dataTable.classList.add("is-hidden");
                }
            });
        } else {
            nullTable.classList.remove("is-hidden");
            dataTable.classList.add("is-hidden");
        }
    },

    renderLinkedPMTable: function (systemsubaccount) {
        var datalistId = "linkedpmaccounttable";
        var url = "/authenapi/OriginStockComAccountManagementApi/findDataList";

        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        var datalist = new shinobi.table(datalistId);
        shinobi.selfemployedaccountrender.table1 = datalist;
        // datalist.staticsorts = sortDefault;
        datalist.staticfilters = [
            {
                "colname": "systemsubaccount",
                "operator": "=",
                "value": systemsubaccount,
            }, {
                "colname": "isactive",
                "operator": "=",
                "value": "true",
            }
        ];

        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        }

        let hiddenWarningSection = (datalistInput) => {
            let section = document.getElementById('noAccountPMTable');
            setTimeout(
                function () {
                    (datalistInput.tableRows.length > 0) ?
                        section.classList.add('is-hidden')
                        :
                        section.classList.remove('is-hidden')
                }, 300);
        }

        datalist.initLoadApi(url, request, colNames, renders, {
            callback: () => hiddenWarningSection(datalist)
        });
    },

    selectLocalStorage: function () {
        var valueLocal = window.localStorage.valueSelfEmployedAccountSelect;
        var select = document.querySelector("#selfemplyedaccountselection");
        var optionList = select.querySelectorAll('option');
        optionList.forEach(elem => {
            if (valueLocal == elem.value) {
                select.value = valueLocal;
            }
        })

    },

    getUnallocatedPercent: function () {
        var unallocatedPercent = document.getElementById("unallocatedPercent");

        var selector = document.getElementById("selfemplyedaccountselection");
        var valueSelector = selector.value;

        var optionList = selector.querySelectorAll("option");
        optionList.forEach(item => {
            var value = item.getAttribute("value");
            var subValue = item.getAttribute("sub-value");

            if (value == valueSelector) {
                if (subValue == "undefined") {
                    subValue = "";
                }

                if (subValue) {
                    var url = "/authenapi/AllocationManagementApi/getTradingUnallocatedRatio"
                    var request = {
                        "systemsubaccount": subValue,
                    }
                    shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
                        var percent = Number(res) * 100;
                        unallocatedPercent.innerHTML = `${shinobi.util.formatNumber(percent)}%`;
                    });
                }
            }
        });
    },

    getinfoUserAccount: function (subAccount, callback) {
        var url = '/authenapi/StockComAccountApi/getStockComAccountInfo';
        var request = {
            "recordPerPage": "10", "pageNum": 1,
            systemsubaccount: subAccount,
        };
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            res = JSON.parse(res);
            console.log(res);
            var elem = document.getElementById('nameuser');
            shinobi.mapping.renderElement(elem, res);
            if (callback) {
                callback(res);
            }
        });
    },

    createMultivalueStructure: function () {
        shinobi.selfemployedaccountrender.multivalueinput = new shinobi.multivalueinput(
            'input[snb-key="bancode"]', {
            buildSearch: function (object) {
                object.inputSearch.setAttribute('placeholder', 'Thêm mã');
                object.inputSearch.setAttribute('type', 'text');
                new shinobi.autocomplete('#selectorInputSearch', {
                    onSearch: (input, resolve) => {
                        input = input.toUpperCase();
                        var inputContainer = document.getElementById("selectorInputSearch");
                        inputContainer.value = inputContainer.value.toUpperCase();

                        if (input.length < 1) { resolve([]) }
                        var url = "/api/PriceBoardApi/findDataList";
                        var request = {
                            "recordPerPage": "20",
                            "pageNum": 1,
                            "filters": [{ 'colname': 'stocksymbol', 'operator': 'like', 'value': input }]
                        }

                        shinobi.api.request(url, JSON.stringify(request), function (res) {
                            var array = JSON.parse(res).data;
                            resolve(array);
                        });


                    },
                    autoSelect: true,
                    getResultValue: result => {
                        return result.stocksymbol.toUpperCase();
                    },
                    onSubmit: (result) => {
                        object.appendChildItem(result, object);
                        object.inputSearch.value = '';
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
            renderItem: function (result) {
                result = JSON.parse(result).stocksymbol;
                return result;
            },
        });
    },

    appendChildItem: function (object) {
        var result = object.inputSearch.value.trim();
        if (result.length >= 3) {
            object.appendChildItem(result, object);
            object.inputSearch.value = '';
        }
    },

    getStockList: function (input) {
        if (input.trim() == '') {
            return [];
        } else {
            var list = input.split(',');
            list.forEach(function (item, index) {
                list[index] = item.substring(1, item.length - 1);
            })
            return list;
        }
    },

    renderListInput: function (elem, value, all) {
        var object = shinobi.selfemployedaccountrender.multivalueinput;
        elem.value = value;
        var listItem = value;
        shinobi.selfemployedaccountrender.resetElemMultivalue();

        listItem.forEach(result => {
            shinobi.selfemployedaccountrender.multivalueinput.appendChildItem(result, object);
        });
    },

    getBanCode: function () {
        var arrayResult = [];
        var result = shinobi.selfemployedaccountrender.multivalueinput.result;
        result.forEach(elem => {
            try {
                elem = JSON.parse(elem);
                elem = elem.stocksymbol
                arrayResult.push(elem);
            } catch (e) { }
        });
        return arrayResult;
    },
};