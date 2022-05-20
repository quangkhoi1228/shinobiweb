shinobi.fragmentfindandaddaccountmanagementrender = {
    build: function () {
        // shinobi.fragmentfindandaddaccountmanagementrender.activeModal();
        shinobi.fragmentfindandaddaccountmanagementrender.activeTab();
        shinobi.fragmentfindandaddaccountmanagementrender.activeMenu();
        shinobi.fragmentfindandaddaccountmanagementrender.renderEventCreateButton();
        shinobi.fragmentfindandaddaccountmanagementrender.renderEventSaveButton();
        shinobi.fragmentfindandaddaccountmanagementrender.renderAutocompleteSearchingBar();
    }, getListPMAllotment: function (id = 'listpmusername') {
        var url = "/authenapi/PmManagementApi/findDataList";
        var idDatalist = id;
        var request = {
            recordPerPage: getRecordNumber(idDatalist),
        }
        var datalist = new shinobi.datalist(idDatalist);
        // datalist.staticfilters = [
        //     {
        //         "colname": "systemsubaccount", "operator": "=", "value": allocationaccount
        //     }]
        datalist.initLoadApi(url, request, function () {
            var select = document.getElementById(idDatalist);
            var option = document.createElement('option');
            option.setAttribute('value', 'admin');
            option.innerHTML = "Không có";
            option.selected = true;
            select.insertBefore(option, select.firstChild);
        });
    },
    renderFullnameAllocation: function (elem, value, all) {
        elem.setAttribute("value", value);
        elem.innerHTML = all.firstname + " " + all.lastname
    },

    activeModal: function () {
        var button = document.querySelector("#addAccountButton");
        button.onclick = function () {
            shinobi.selfemployedaccountrender.renderCompanySelect();
            var modal = document.querySelector("#addAccountModal");
            modal.classList.add("is-active");
            shinobi.fragmentfindandaddaccountmanagementrender.getListPMAllotment();
            shinobi.fragmentfindandaddaccountmanagementrender.settingCreateAccountModal();
            shinobi.fragmentfindandaddaccountmanagementrender.setUpPasswordInput();
        }
    },

    settingCreateAccountModal: function () {
        var buttonCreate = document.querySelector("#addAccountModal #createModal");
        var buttonSave = document.querySelector("#addAccountModal #saveModal");

        buttonCreate.style.display = "block";
        buttonSave.style.display = "none";

        var title = document.querySelector("#addAccountModal .modal-card-title");
        title.innerText = "Thêm tài khoản Khách hàng";
    },

    activeTab: function () {
        var pathname = window.location.pathname;
        var tab = document.querySelector(`.tabs-portfolio [href="${pathname}"]`);
        tab.parentNode.classList.add("is-active");
    },

    activeMenu: function () {
        var menu = document.querySelector(".menu-left .menu-list .is-active");
        if (menu) {
            menu.classList.remove("is-active");
        }

        var activeMenu = document.querySelector(`.menu-left .menu-list [href="/private/accountmanagement"]`);
        activeMenu.classList.add("is-active");
    },

    setUpPasswordInput: function () {
        var inputLoginPassword = document.querySelector("#addAccountModal #loginPassword input");
        var inputOrderPassword = document.querySelector("#addAccountModal #orderPassword input");
        var buttonLoginPassword = document.querySelector("#addAccountModal #loginPassword .button");
        var buttonOrderPassword = document.querySelector("#addAccountModal #orderPassword .button");

        shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonLoginPassword, inputLoginPassword);
        shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonOrderPassword, inputOrderPassword);
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

    getValue: function (selector, callback) {

        shinobi.mapping.getValue(selector, function (request) {
            console.log('allocationratio', request);
            var json = request;
            delete json['pincode'];
            delete json['allocationratio'];

            !Object.values(json).includes("") ? callback(request) : shinobi.util.fillInputMessage();
        }, {
            checkEmpty: true,
        })
    },

    renderEventCreateButton: function () {
        var object = this;
        var create = document.querySelector("#addAccountModal #createModal");
        create.onclick = function () {
            object.getValue("#addAccountModal", function (json) {
                console.log(json);
                object.createAccount(json, function () {
                    object.addAllocationAccount(json);
                });

            });
        };
    },
    createAccount: function (json, callback) {
        var url = "/authenapi/StockComAccountRegistrationApi/createStockComAccount";
        var request = {
            "stockcom": json.stockcom,
            "account": json.usernameaccount,
            "username": json.usernameaccount,
            "password": json.password,
            "pincode": json.pincode,
            // "userid": json.stockcom,
            "name": json.name,
            "identitynumber": json.identitynumber,
            "email": json.email,
            "phonenumber": json.phonenumber,
        };
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            if (callback) {
                // callback();
                console.log('callback')
            }
        })
    },
    addAllocationAccount: function (json) {
        var url = "/authenapi/StockComAccountRegistrationApi/createStockComAccount";
        var request = {
            "stockcom": json.stockcom,
            "account": json.username,
            "username": json.username,
            "password": json.password,
            "pincode": json.pincode,
            // "userid": json.stockcom,
            "name": json.name,
            "identitynumber": json.identitynumber,
            "email": json.email,
            "phonenumber": json.phonenumber,
        }
        console.log(request);
    },

    renderEventSaveButton: function () {
        var create = document.querySelector("#addAccountModal #saveModal");
        create.onclick = function () {
            shinobi.fragmentfindandaddaccountmanagementrender.getValue("#addAccountModal", function (json) {
                console.log(json);
            });
        };
    },

    renderAutocompleteSearchingBar: function () {
        // var accounts = [
        //     { id: '1333', username: 'PM1', createddate: '10/02/2022' },
        //     { id: '1222', username: 'PM2', createddate: '10/02/2022' },
        //     { id: '3111', username: 'PM3', createddate: '10/02/2022' },
        // ];

        new shinobi.autocomplete('#searchpmuser', {
            onSearch: (input, resolve) => {

                console.log('search');
                if (input.length < 1) { return [] }

                var request = {
                    "filters": [{
                        "colname": "account",
                        "operator": "like",
                        "value": input,
                    }],
                    "sorts": [],
                }
                shinobi.api.request("/authenapi/ClientStockComAccountManagementApi/findDataList", JSON.stringify(request), function (res) {
                    console.log(JSON.parse(res));
                    data = JSON.parse(res).data;
                    resolve(data);
                });
                // var arr = [];
                // accounts.forEach(item => {
                //     if ((item.username.toLowerCase().startsWith(input.toLowerCase()))
                //         || ((item.id.toLowerCase().startsWith(input.toLowerCase())))) {
                //         arr.push(item);
                //     }
                // })
                // resolve(arr);
            },
            renderResult: (result, props) => {
                return `
                <li ${props}>
                    <div class="is-flex">
                        <div>#${result.account}</div>
                    </div>
                </li>`
            },
            onSubmit: (result) => {
                var input = document.getElementById("searchpmuser");
                input.value = result.account;

                shinobi.accountmanagementrender.dataCustomerTable.staticfilters = [{
                    "colname": "account",
                    "operator": "=",
                    "value": result.account,
                }];

                shinobi.accountmanagementrender.dataCustomerTable.reloadApi();
            },
        });
    },
};
