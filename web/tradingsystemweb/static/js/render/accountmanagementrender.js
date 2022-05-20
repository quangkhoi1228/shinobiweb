shinobi.accountmanagementrender = {
  build: function () {
    var object = this;
    object.changeNameCreateButton();
    object.addEventActiveModal();
    shinobi.fragmentfindandaddaccountmanagementrender.build();

    object.renderDataCustomerTable();
    object.activeFirstModal();

    shinobi.selfemployedaccountrender.createMultivalueStructure();
  },
  stopReload: function () {
    window.onbeforeunload = function (event) {
      event.returnValue = "";
    };
  },
  addEventActiveModal: function () {
    var object = this;
    var buttonAddUser = document.getElementById('addAccountButton');
    buttonAddUser.onclick = function () {
      var firstModal = document.getElementById('addAccountUserModal');
      firstModal.classList.add('is-active');
      object.activeFirstModal();
    };
  },
  setupPassword: function () {
    var inputLoginPassword = document.querySelector("#addAccountUserModal #loginPassword input");
    var inputOrderPassword = document.querySelector("#addAccountUserModal #orderPassword input");
    var buttonLoginPassword = document.querySelector("#addAccountUserModal #loginPassword .button");
    var buttonOrderPassword = document.querySelector("#addAccountUserModal #orderPassword .button");
    shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonLoginPassword, inputLoginPassword);
    shinobi.fragmentfindandaddaccountmanagementrender.showPassword(buttonOrderPassword, inputOrderPassword);
  },
  activeFirstModal: function () {
    var object = this;
    var firstModal = document.getElementById('addAccountUserModal');
    var buttonCreate = firstModal.querySelector('.button.create');
    shinobi.selfemployedaccountrender.renderCompanySelect('companyNameaccount');

    shinobi.accountmanagementrender.setupPassword();
    var callback = function (request) {
      var urlCreate = "/authenapi/StockComAccountRegistrationApi/createStockComAccount";
      console.log("request client", request);
      shinobi.api.request(urlCreate, JSON.stringify(request), function (res) {
        res = JSON.parse(res);
        console.log("create json", res);
        setTimeout(function () {
          shinobi.notification.notification.loaded();
          if (firstModal.classList.contains('is-active')) {
            firstModal.classList.remove('is-active');
          }
          object.stopReload();
          shinobi.selfemployedaccountrender.checkChildAccount(res, request, function (systemsubaccount) {
            console.log("request", request)
            setTimeout(function () {
              object.activeThirdModel(res, systemsubaccount);
            }, 1000);

          }, 'disableReload');
        }, 2000);

      });
    };
    buttonCreate.onclick = function () {
      shinobi.notification.notification.loading();
      shinobi.mapping.getValueElement(firstModal, function (json) {
        var request = {
          "stockcom": json.stockcom,
          "account": json.usernameaccount,
          "username": json.usernameaccount,
          "password": json.password,
          "pincode": json.pincode,
          "name": json.name
        }
        var requestMachine = request;
        delete requestMachine['pincode'];
        console.log(json, requestMachine);
        !Object.values(requestMachine).includes("") ? callback(request) : shinobi.util.fillInputMessage();
      }, {
        checkEmpty: true
      });
    }


  },
  activeThirdModel: function (account, systemsubaccount) {
    var object = this;
    var urlSubmit = "/authenapi/AllocationManagementApi/setClientAllocation";
    var thirdModal = document.getElementById('addAccountAllocationModal');
    var selectPm = 'listpmusernameallocation';
    var subAccount = shinobi.selfemployedaccountrender.systemsubaccount;
    var systemSubAccount = subAccount;
    if (!subAccount) {
      systemSubAccount = systemsubaccount;
    }

    if (window.onbeforeunload == null) {
      object.stopReload();
    }

    var buttonCreate = thirdModal.querySelector('.button.create');

    thirdModal.classList.add('is-active');
    shinobi.selfemployedaccountrender.stopOutModal(thirdModal);
    shinobi.fragmentfindandaddaccountmanagementrender.getListPMAllotment(selectPm);
    buttonCreate.onclick = function () {

      shinobi.mapping.getValueElement(thirdModal, function (json) {
        var request = {};
        request.systemsubaccount = systemSubAccount;
        request.startdate = json.startdate;
        request.enddate = json.enddate;
        request.profitcommisionratio = Number(json.profitcommisionratio) / 100;
        request.managementfeeratio = Number(json.managementfeeratio) / 100;
        if (json.pmusername != 'admin') {
          request.pmusername = json.pmusername;
          request.allocationratio = Number(json.allocationratio) / 100;
        }
        console.log(request);
        shinobi.api.request(urlSubmit, JSON.stringify(request), function (res) {
          shinobi.notification.notification.info('Cập nhật thành công !');
          window.onbeforeunload = null;
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        })
      })
    }


  },

  renderMoreButton: function (cell, row, col, all) {
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
                Gia hạn đầu tư
              </a>
              <a  class="dropdown-item pr-4 select-value" >
                Xem chi tiết
              </a>
              <a class="dropdown-item pr-4">
                Xoá
              </a>
            </div>
          </div>
        </div>
      </div>`
    var select = cell.querySelector('.select-value');
    shinobi.accountmanagementrender.sethrefSeeDetailAccount(select, value, all[row]);
    var dropdown = cell.querySelector('.dropdown');
    dropdown.onclick = function () {
      dropdown.classList.toggle('is-active');
    }
  },
  sethrefSeeDetailAccount: function (elem, systemsubaccount, all) {
    var href = '/private/accountmanagementdetail?' + 'systemsubaccount=' + systemsubaccount + "&systemaccount=" + all.systemaccount;
    elem.setAttribute('href', href);
  },

  changeNameCreateButton: function () {
    var createButton = document.querySelector("#addAccountButton");
    createButton.innerText = "Thêm tài khoản KH";
  },

  renderDataCustomerTable: function (systemsubaccount) {
    var datalistId = "dataCustomerTable";
    var url = "/authenapi/ClientStockComAccountManagementApi/findDataList";

    var colNames = shinobi.tableHelper.getColname(datalistId);
    var renders = shinobi.tableHelper.getRender(datalistId);

    if (!shinobi.accountmanagementrender.dataCustomerTable) {
      var datalist = new shinobi.table(datalistId);
      shinobi.accountmanagementrender.dataCustomerTable = datalist;
    }

    // datalist.staticsorts = sortDefault;
    // datalist.staticfilters = filterDefault;

    var request = {
      recordPerPage: shinobi.util.getRecordNumber(datalistId),
    }

    shinobi.accountmanagementrender.dataCustomerTable.initLoadApi(url, request, colNames, renders);
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

  checkConfigClientAccount: function (cell, row, col, all) {
    if (!all[row].hasOwnProperty("systemsubaccount")) {
      cell.innerHTML = `
      <div class="">
        <span class="has-text-danger has-text-weight-bold is-italic">Chưa cấu hình TK giao dịch</span> 
      </div>
      `
    } else if (!all[row].hasOwnProperty("enddate")) {
      cell.innerHTML = `
        <div class="">
          <span class="has-text-danger has-text-weight-bold is-italic">Chưa phân bổ TK</span> 
        </div>
        `
    } else {
      cell.innerHTML = `
      <div class="">
        <span class="has-text-success is-italic">Đã thiết lập</span> 
      </div>
      `
    }
  },
};
