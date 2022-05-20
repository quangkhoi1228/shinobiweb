shinobi.pmmanagementrender = {
  build: function () {
    shinobi.pmmanagementrender.changeNameCreateButton();
    shinobi.pmmanagementrender.renderPMTableData();
  },
  shaPassword: function (value) {
    return shinobi.util.sha256(value);
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
                <a class="dropdown-item pr-4 editPMAccount">
                    Chỉnh sửa thông tin
                </a>
                <a class="dropdown-item pr-4 editPMPassword">
                    Chỉnh sửa mật khẩu
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
    }

    var editPMAccount = cell.querySelector(".editPMAccount")
    editPMAccount.onclick = function () {
      shinobi.pmmanagementrender.renderModifyButton(all[row]);
    }

    var editPMPassword = cell.querySelector(".editPMPassword")
    editPMPassword.onclick = function () {
      shinobi.pmmanagementrender.renderModifyPasswordButton(all[row]);
    }
  },
  renderModifyButton: function (data) {
    var modal = document.querySelector("#addAccountModal");
    modal.classList.add("is-active");

    shinobi.pmmanagementrender.settingModifyAccountModal(data);
  },

  renderModifyPasswordButton: function (data) {
    var modal = document.querySelector("#changePasswordPMModal");
    modal.classList.add("is-active");

    shinobi.pmmanagementrender.settingModifyPasswordModal(data);
  },

  settingModifyAccountModal: function (data) {
    console.log(data);
    var buttonCreate = document.querySelector("#addAccountModal #createModal");
    var buttonSave = document.querySelector("#addAccountModal #saveModal");

    buttonCreate.style.display = "none";
    buttonSave.style.display = "block";

    var title = document.querySelector("#addAccountModal .modal-card-title");
    title.innerText = "Chỉnh sửa tài khoản " + data.firstname + " " + data.lastname;

    var selector = document.getElementById("addAccountModal");
    shinobi.mapping.renderElement(selector, data);

    buttonSave.onclick = function () {
      shinobi.pmmanagementrender.modifyInfoPMUser(data);
    };
  },

  settingModifyPasswordModal: function (data) {
    var title = document.querySelector("#changePasswordPMModal .modal-card-title");
    title.innerText = "Chỉnh sửa mật khẩu cho " + data.firstname + " " + data.lastname;

    var inputOldPassword = document.querySelector("#changePasswordPMModal #loginOldPassword input");
    var inputNewPassword = document.querySelector("#changePasswordPMModal #loginNewPassword input");
    var buttonOldPassword = document.querySelector("#changePasswordPMModal #loginOldPassword .button");
    var buttonNewPassword = document.querySelector("#changePasswordPMModal #loginNewPassword .button");

    shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonOldPassword, inputOldPassword);
    shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonNewPassword, inputNewPassword);

    var buttonSave = document.querySelector("#changePasswordPMModal #changePassword");
    buttonSave.onclick = function () {
      shinobi.pmmanagementrender.modifyPasswordPMUser(data);
    };
  },

  modifyInfoPMUser: function (data) {
    var url = "/authenapi/PmManagementApi/modifyPMInfo";
    shinobi.pmmanagementrender.getValuePMUser("#addAccountModal", function (json) {
      json.username = data.username;
      shinobi.api.request(url, JSON.stringify(json), function (res) {
        shinobi.notification.notification.info('Chỉnh sửa tài khoản PM thành công!');
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      });
    });
  },

  modifyPasswordPMUser: function (data) {
    var url = "/authenapi/PmManagementApi/changePassword";
    shinobi.pmmanagementrender.getValue("#changePasswordPMModal", function (json) {
      json.username = data.username;
      shinobi.api.request(url, JSON.stringify(json), function (res) {
        shinobi.notification.notification.info('Chỉnh sửa mật khẩu PM thành công!');
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      });
    });
  },

  getValue: function (selector, callback) {
    shinobi.mapping.getValue(selector, function (request) {
      !Object.values(request).includes("") ? callback(request) : shinobi.util.fillInputMessage();
    }, {
      checkEmpty: true,
    })
  },

  getValuePMUser: function (selector, callback) {
    shinobi.mapping.getValue(selector, function (request) {
      var json = {
        // "username": username,
        "firstname": request.firstname,
        "lastname": request.lastname,
        "identitynumber": request.identitynumber,
        "phonenumber": request.phonenumber,
      };
      console.log(json);
      !Object.values(json).includes("") ? callback(json) : shinobi.util.fillInputMessage();
    }, {
      checkEmpty: true,
    })
  },
  changeNameCreateButton: function () {
    var createButton = document.querySelector("#addAccountButton");
    createButton.innerText = "Thêm tài khoản PM";
  },

  renderPMTableData: function () {
    var datalistId = "pmmanagementboard";
    var url = "/authenapi/PmManagementApi/findDataList";

    var colNames = shinobi.tableHelper.getColname(datalistId);
    var renders = shinobi.tableHelper.getRender(datalistId);

    if (!shinobi.pmmanagementrender.pmmanagementboard) {
      var datalist = new shinobi.table(datalistId);
      shinobi.pmmanagementrender.pmmanagementboard = datalist;
    }

    shinobi.pmmanagementrender.pmmanagementboard.staticsorts = [{
      "colname": "createddate",
      "value": "desc"
    }];
    // datalist.staticfilters = filterDefault;

    var request = {
      recordPerPage: shinobi.util.getRecordNumber(datalistId),
    }
    shinobi.pmmanagementrender.pmmanagementboard.initLoadApi(url, request, colNames, renders);
  },
  renderFullname: function (cell, row, col, all) {
    console.log(all);
    cell.innerHTML = `${all[row].firstname} ${all[row].lastname}`;
  },
};
