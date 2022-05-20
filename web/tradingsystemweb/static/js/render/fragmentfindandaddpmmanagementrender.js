shinobi.fragmentfindandaddpmmanagementrender = {
    build: function () {
        shinobi.fragmentfindandaddpmmanagementrender.activeModal();
        shinobi.fragmentfindandaddpmmanagementrender.activeTab();
        shinobi.fragmentfindandaddpmmanagementrender.activeMenu();
        shinobi.fragmentfindandaddpmmanagementrender.renderEventCreateButton();
        shinobi.fragmentfindandaddpmmanagementrender.renderEventSaveButton();
        shinobi.fragmentfindandaddpmmanagementrender.renderAutocompleteSearchingBar();

        var inputLoginPassword = document.querySelector("#addAccountModal #loginPassword input");
        var buttonLoginPassword = document.querySelector("#addAccountModal #loginPassword .button");
        shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonLoginPassword, inputLoginPassword);
    },

    activeModal: function () {
        var button = document.querySelector("#addAccountButton");
        button.onclick = function () {
            var modal = document.querySelector("#addAccountModal");
            modal.classList.add("is-active");
            shinobi.fragmentfindandaddpmmanagementrender.settingCreateAccountModal();
        }
    },

    settingCreateAccountModal: function () {
        var buttonCreate = document.querySelector("#addAccountModal #createModal");
        var buttonSave = document.querySelector("#addAccountModal #saveModal");

        buttonCreate.style.display = "block";
        buttonSave.style.display = "none";

        var title = document.querySelector("#addAccountModal .modal-card-title");
        title.innerText = "Thêm tài khoản PM";
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

    getValue: function (selector, callback) {
        shinobi.mapping.getValue(selector, function (request) {
            var invitedby = request.invitedby;
            // var json = request;
            delete request['invitedby'];
            var callbackFnc = function (data) {
                if (invitedby) {
                    data.invitedby = invitedby;
                }
                callback(data);
            };
            !Object.values(request).includes("") ? callbackFnc(request) : shinobi.util.fillInputMessage();

        }, {
            checkEmpty: true,
        })
    },

    renderEventCreateButton: function () {
        var object = this;
        var url = "/authenapi/PmManagementApi/createPmUser";
        var create = document.querySelector("#addAccountModal #createModal");
        create.onclick = function () {
            shinobi.fragmentfindandaddpmmanagementrender.getValue("#addAccountModal", function (json) {
                json.isvalidated = 'true';
                console.log(json);
                shinobi.api.request(url, JSON.stringify(json), function (res) {
                    shinobi.notification.notification.info('Tạo tài khoản PM thành công !');
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                });
            });
        };
    },


    renderEventSaveButton: function () {
        var create = document.querySelector("#addAccountModal #saveModal");
        create.onclick = function () {
            shinobi.fragmentfindandaddpmmanagementrender.getValue("#addAccountModal", function (json) {
                console.log(json);
            });
        };
    },

    renderAutocompleteSearchingBar: function () {
        new shinobi.autocomplete('#autocomplete', {
            onSearch: (input, resolve) => {

                console.log('search');
                if (input.length < 1) { return [] }

                var request = {
                    "filters": [{
                        "colname": "loginusername",
                        "operator": "like",
                        "value": input,
                    }],
                    "sorts": [],
                }
                shinobi.api.request("/authenapi/PmManagementApi/findDataList", JSON.stringify(request), function (res) {
                    data = JSON.parse(res).data;
                    resolve(data);

                });
            },
            renderResult: (result, props) => {
                return `
                <li ${props}>
                    <div class="is-flex">
                        <div>#${result.loginusername}</div>
                        <div><${result.firstname} ${result.lastname}></div>
                    </div>
                </li>`
            },
            onSubmit: (result) => {
                var input = document.getElementById("autocomplete");
                input.value = result.loginusername;

                shinobi.pmmanagementrender.pmmanagementboard.staticfilters = [{
                    "colname": "loginusername",
                    "operator": "=",
                    "value": result.loginusername,
                }];

                shinobi.pmmanagementrender.pmmanagementboard.reloadApi();
            },
        });
    },
};
