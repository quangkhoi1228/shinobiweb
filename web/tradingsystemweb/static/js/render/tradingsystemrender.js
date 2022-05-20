shinobi.tradingsystemrender = {
  listOrder: [
    'LO',
    'ATO',
    'ATC',
    'MP'
  ],
  currentStock: "",
  tableStocComOrder: "",
  interval: '',
  currentPrice: '',
  classSell: 'is-active-sell',
  classBuy: 'is-active-buy',
  stepVolume: 100,
  contentOrderBuy: 'MUA',
  contentOrderSell: ' BÁN',
  init: function () {
    var object = this;
    var fieldSetVolume = '#setvolume';
    var fielSetPrice = '#setprice'

    object.addEventStepVolume(fieldSetVolume);
    object.addEventStepPrice(fielSetPrice);
    object.addDropdowMenu();
    shinobi.portfoliousermenurender.build();
    object.addEventActiveBuySell();
    object.addEventSearchUser();
    object.addEventSearchStock();
    // document.querySelector('#indexlink a').classList.add('is-active');
    object.activeTab();
    object.getAllVirtualSubaccount();
    object.initTradingviewStock('VNINDEX');
    shinobi.stocomorderrender.build();
    object.setUpOrderValueTab();
    object.activeSelectOptionCopytrade();
    object.renderRadioButtonEvent();

    object.createStruct(function () {

      object.submitOrderCommand();

    });
  },
  createStruct: function (callback) {
    var selectTypeCopyTrade = document.getElementById('selecttypeorder');
    getUserInfo(function (res) {
      if (res.usertype == "PM") {
        selectTypeCopyTrade.value = 'COPYTRADE';

      }
      if (callback) {
        callback();
      }
    })

  },
  activeSelectOptionCopytrade: function () {
    var selectCopytrade = document.getElementById('containerselectcompytrade');
    getUserInfo(function (res) {
      if (res.usertype == "PMALADIN") {
        selectCopytrade.classList.remove('is-hidden');
      }
    })
  },
  activeTab: function () {
    getUserInfo(function (response) {
      var infoUser = response;
      var usertype = infoUser.usertype;
      var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="/private/tradingsystem"`);
      tab.classList.add("is-active");
    });
  },
  setCurrentPrice: function (elem, value, all) {
    shinobi.tradingsystemrender.currentPrice = value;
  },
  getInput: function (callback) {
    var object = this;
    shinobi.mapping.getValue('#containertrading', function (json) {

      var request = {};
      var allocationaccount = document.getElementById('selectPM').value;
      var side = object.getOrderType();
      request.allocationaccount = allocationaccount;
      request.side = side;
      request.stockcode = json.stocksymbol;
      if (isNaN(json.currentprice)) {
        request.ordertype = json.currentprice;
        request.price = json.currentprice;
      } else {
        request.ordertype = "LO";
        request.price = json.currentprice;
      }
      request.volume = json.currentweight;
      request.signaltype = json.signaltype;
      if (request.stockcode == '') {
        shinobi.notification.notification.error('Vui lòng nhập mã chứng khoán !');
      } else {
        if (request.currentprice == '') {
          shinobi.notification.notification.error('Vui lòng nhập giá mua bán !');

        } else {
          if (request.volume == '') {
            shinobi.notification.notification.error('Vui lòng nhập khối lượng');
          } else {
            callback(request);
          }
        }
      }
    });
  },
  getOrderType: function () {
    var object = this;
    var container = document.getElementById('containertrading');

    if (container.classList.contains(object.classBuy)) {
      return 'BUY';
    } else {
      return "SELL"
    }

  },
  getAllVirtualSubaccount: function () {
    var object = this;

    var url = "/authenapi/SystemUserApi/getListAllocationAccount";
    var selectSubaccount = document.getElementById('selectPM');
    var request = {};
    shinobi.api.request(url, JSON.stringify(request), function (res) {
      res = JSON.parse(res).data;
      res.forEach(item => {
        var option = document.createElement('option');
        option.setAttribute('value', item.account);
        option.innerHTML = item.fullname;
        selectSubaccount.appendChild(option);
      });
      if (selectSubaccount.value) {
        var allocationaccount = shinobi.util.getAllSearchInPath().allocationaccount;
        if (allocationaccount) {
          document.getElementById('selectPM').value = allocationaccount;
          var jumpId = "portfoliousermenu";
          if (jumpId) {
            var elem = document.getElementById(jumpId);
            var newOffset = elem.offsetTop - Number(shinobi.util.getFontSize()) * 4;
            var offset = newOffset > 0 ? newOffset : 0;
            document.body.scrollTop = offset;
            document.documentElement.scrollTop = offset;
          }

          var orderSignal = document.querySelector('#portfoliousermenu [value="tableordersignal"]');
          orderSignal.click();
        };

        object.addEventSelectChange();
      }
    });
  },
  addEventSelectChange: function () {
    var object = this;
    var select = document.getElementById('selectPM');
    shinobi.tradingsystemrender.setCurrentAllocationAccount(select.value);
    setInterval(() => {
      var select = document.getElementById('selectPM');
      var value = select.value;
      if (value) {
        object.getValuePurchasingPower(select.value);
      };
    }, 1000);
    shinobi.portfoliouserrender.build(select.value);
    shinobi.tableordersignalrender.build(select.value);
    shinobi.assetuserrender.build(select.value);
    shinobi.accountefficiencyuserrender.build(select.value);
    shinobi.tradingsystemrender.updateAllocationAccountInfo(select.value);
    select.onchange = function () {
      object.updatePage(select.value);
    };
  },
  updatePage: function (value) {
    shinobi.tradingsystemrender.setCurrentAllocationAccount(value);
    shinobi.portfoliouserrender.table.paramsRequestList = { "allocationaccount": value };
    shinobi.portfoliouserrender.table.reloadApi(1, { loading: false });

    shinobi.portfoliouserrender.tableHistory.paramsRequestList = { "allocationaccount": value };
    shinobi.portfoliouserrender.tableHistory.staticfilters = [
      {
        "colname": "allocationaccount",
        "operator": "=",
        "value": value
      },
    ];
    shinobi.portfoliouserrender.tableHistory.reloadApi(1, { loading: false });

    shinobi.accountefficiencyuserrender.renderAccountEfficiencyUser(value);

    shinobi.tableordersignalrender.build(value);
    shinobi.tradingsystemrender.updateAllocationAccountInfo(value);

    document.getElementById('updateAllocationAccountAssetButton').click();
  },

  setCurrentAllocationAccount(value) {
    localStorage.setItem('currentAllocationAccount', value);
  },

  getCurrentAllocationAccount() {
    return localStorage.getItem('currentAllocationAccount');
  },

  updateAllocationAccountInfo(value) {
    shinobi.mapping.clear('#PMInfoPanel');
    shinobi.cacheapi.request('/authenapi/AllocationAccountRelatedInfoApi/getFollowingPMInfo',
      JSON.stringify({ "allocationaccount": value }),
      (res) => {
        let data = JSON.parse(res);
        shinobi.mapping.render('#PMInfoPanel', res);
      });

    shinobi.mapping.clear('#allocationAccountInfo');
    shinobi.cacheapi.request('/authenapi/AllocationAccountRelatedInfoApi/getStockComAccountAndAllocationInfo',
      JSON.stringify({ "allocationaccount": value }),
      (res) => {
        let data = JSON.parse(res);
        console.log(data);
        shinobi.mapping.render('#allocationAccountInfo', res);
      });
  },

  getValuePurchasingPower: function (account) {
    var elem = document.getElementById('couldbuy');
    var url = "/authenapi/SystemUserApi/getPuchasingPower";
    // account = 'VPS_318467_N_1';
    var request = { "account": account };
    shinobi.api.request(url, JSON.stringify(request), function (res) {
      elem.innerHTML = shinobi.util.formatNumber(res);
    });
  },
  getValueStocsympol: function () {
    var object = this;


    interval = setInterval(function () {
      if (object.currentStock) {
        var url = "/api/PriceBoardApi/findDataList";
        var request = {
          "recordPerPage": "20",
          "pageNum": 1,
          "filters": [{ 'colname': 'stocksymbol', 'operator': '=', 'value': object.currentStock }]
        };

        shinobi.api.request(url, JSON.stringify(request), function (res) {
          object.getInfoStocSympol(res);
          object.getInfo3PriceStock(res);
        });
      }
    },
      1000)

  },
  getInfoStocSympol: function (res) {
    var object = this;

    var infoStocksympol = document.getElementById('infostocsympol');
    var data = JSON.parse(res).data[0];
    shinobi.mapping.renderElement(infoStocksympol, data);

  },
  getInfo3PriceStock: function (res) {
    var object = this;

    var info3PriceStock = document.getElementById('pricestocksympol');
    var data = JSON.parse(res).data[0];
    shinobi.mapping.renderElement(info3PriceStock, data);
  },

  formatPrice: function (elem, value, all) {
    elem.innerHTML = value;
    if (value == all.ceiling) {
      elem.parentNode.classList.add('ceiling-value');
    } else {
      if (value == all.floor) {
        elem.parentNode.classList.add('floor-value');
      } else {
        if (value == all.priorcloseprice) {
          elem.parentNode.classList.add('reference-value');
        } else {
          if (Number(value) > Number(all.priorcloseprice)) {

            elem.parentNode.classList.add('up-value');
          } else {

            elem.parentNode.classList.add('down-value');
          }
        }
      }
    }
    var value = Number(value);

  },
  addTimeLoadAll: function (container, callback) {
    var url = '/authenapi/SystemReportApi/getInitDateFilter';
    // shinobi.api.request(url, '{}', function (response) {
    //   var data = JSON.parse(response);
    //   shinobi.util.setRangeCalendar('[snb-key="date"]', new Date(data.start), new Date(data.end));

    response = {
      "start": '2021-21-05 10:00',
      'end': '2021-21-06 10:00'
    };
    shinobi.util.setRangeCalendar('[snb-key="date"]', new Date(response.start), new Date(response.end));

    // shinobi.mapping.renderElement(container, json);
    if (callback) {
      callback();
    }

    // });
  },

  addEventSearchUser: function () {
    var object = this;
    var url = "/authenapi/SystemUserApi/getListAllocationAccount";
    var request = {};
    shinobi.api.request(url, JSON.stringify(request), function (res) {
      var data = JSON.parse(res).data;


      new shinobi.autocomplete('#autocompletesearchstocksymbol', {
        onSearch: (input, resolve) => {
          if (input.length < 1) { return [] }

          var arr = data.filter(item => item.fullname.toLowerCase().includes(input.toLowerCase()))
          resolve(arr);
        },

        onSubmit: result => {
          var select = document.getElementById('selectPM');
          var search = document.getElementById('autocompletesearchstocksymbol');
          search.value = '';
          select.value = result.account;
          object.updatePage(result.account);

        },
        renderResult: (result, props) => {
          return `
          <li ${props}>
              <div class="title has-text-primary is-size-6">
               ${result.fullname}
              </div>
          </li>`
        },
      });
    });

  },
  addEventSearchStock: function (selector) {
    var object = this;
    var selectorSearchStock = '#searchstocsympol';
    if (selector) {
      selectorSearchStock = selector;
    }
    var input = document.querySelector(selectorSearchStock + ' input');
    input.addEventListener('input', function () {
      input.value = input.value.toUpperCase();
    });
    input.addEventListener('focusout', function () {
      var value = input.value;
      object.initTradingviewStock(value);
      object.currentStock = value;
    });
    object.getValueStocsympol();

    input.onchange = function () {
      var stockInfoElem = document.getElementById('infostocsympol');
      if (this.value.trim() == "") {
        stockInfoElem.classList.add('is-hidden');
      } else {
        stockInfoElem.classList.remove('is-hidden');
      }
    }
    new Autocomplete(selectorSearchStock, {
      search: input => {
        if (input.length < 1) { return [] }
        var url = "/api/PriceBoardApi/findDataList";
        var request = {
          "recordPerPage": "20",
          "pageNum": 1,
          "filters": [{ 'colname': 'stocksymbol', 'operator': 'like', 'value': input }]
        }
        var list = new Promise(resolve => {
          shinobi.api.request(url, JSON.stringify(request), function (res) {
            var array = JSON.parse(res).data;

            resolve(array);
          });
        });

        return list;
      },
      autoSelect: true,

      getResultValue: result => {
        return result.stocksymbol.toUpperCase();
      },
      onSubmit: result => {
        object.currentStock = result.stocksymbol;
        object.initTradingviewStock(result.stocksymbol);
        // object.getValueStocsympol(result.stocksymbol);

        var stockInfoElem = document.getElementById('infostocsympol');
        if (result.stocksymbol == "") {
          stockInfoElem.classList.add('is-hidden');
        } else {
          stockInfoElem.classList.remove('is-hidden');
        }
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
  initTradingviewStock: function (stocksymbol) {
    var embledTradingview = document.getElementById('tradingviewstock');
    var url = "https://chart.aladin.finance/web/index.html?symbol=" + stocksymbol;
    var src = embledTradingview.getAttribute('src');

    if (src != url) {
      embledTradingview.setAttribute('src', url);
    }
  },
  addDropdowMenu: function () {
    var object = this;
    object.currentPrice = 10;

    var dropdowMenuList = document.querySelector('#dropdown-menu .dropdown-content');
    var dropdown = document.querySelector('#dropdown-menu').parentNode;
    var valueCurrent = document.querySelector('#setprice .current-value');
    object.listOrder.forEach(value => {
      var item = document.createElement('a');
      item.setAttribute('class', 'dropdown-item');
      item.innerHTML = value;

      item.onclick = function () {
        if (value != 'LO') {
          valueCurrent.value = value;
        }
        else {
          valueCurrent.value = object.currentPrice;
        }
        dropdown.classList.remove('is-active');
      };
      dropdowMenuList.appendChild(item);
    });
  },
  submitOrderCommand: function () {
    var object = this;

    var buttonSubmit = document.getElementById('buttontrading');
    buttonSubmit.onclick = function () {
      object.getInput(function (request) {
        var modal = document.getElementById("orderCommandConfirmModal");
        shinobi.mapping.renderElement(modal, request);
        document.getElementById("orderCommandConfirmModal").classList.add("is-active");
        console.log(request);
        object.confirmOrderCommandConfirmModal(request);
        object.renderSourceSellFunction(request);
      }
      );
    };
  },
  confirmOrderCommandConfirmModal: function (request) {
    var confirm = document.getElementById("confirmOrderModal");
    var inputOther = document.getElementById("otherOptionInput");

    confirm.onclick = function () {
      if (document.getElementById("otherOptionSourceContainer")) {
        shinobi.mapping.getValue("#otherOptionSourceContainer", function (radioValue) {
          shinobi.cacheapi.request("/authenapi/AllocationAccountRelatedInfoApi/getStockComAccountAndAllocationInfo", `{allocationaccount: ${request.allocationaccount}}`, function (res) {
            var data = JSON.parse(res);
            console.log(data);
            getUserInfo(function (userinfores) {
              console.log("getUserInfo", userinfores);
              if (userinfores.usertype == "PMALADIN") {
                if (request.side == "SELL") {
                  if (radioValue.typeModal == "OTHER") {
                    request.beneficiary = {
                      beneficiary: radioValue.typeModal,
                      value: inputOther.value,
                    };
                  } else {
                    if (radioValue.typeModal == "PMALADIN") {
                      request.beneficiary = {
                        beneficiary: radioValue.typeModal,
                        value: userinfores.username,
                      };
                    } else {
                      request.beneficiary = {
                        beneficiary: radioValue.typeModal,
                        value: data.pm,
                      };
                    }
                    inputOther.value = "none";
                  }
                } else {
                  inputOther.value = "none";
                  if (request.beneficiary) {
                    delete request.beneficiary;
                  }
                }
              } else {
                inputOther.value = "none";
              }
              console.log("REQUEST", request);
              if (inputOther.value) {
                shinobi.tradingsystemrender.sendApiConfirmOrder(request);
              } else {
                shinobi.notification.notification.error('Vui lòng nhập giá trị nguồn!');
              }
            })
          });
        });
      }
    }
  },

  sendApiConfirmOrder: function (request) {
    var object = this;
    var url = "/authenapi/CreateSignalApi/createNormalSignal";

    shinobi.api.request(url, JSON.stringify(request), function (respone) {
      shinobi.notification.notification.info('Đặt lệnh thành công');
      object.clearPrice();

      document.getElementById("orderCommandConfirmModal").classList.remove("is-active");
    })
  },

  renderAccountName: function (elem, value, all) {
    var url = "/authenapi/AllocationAccountRelatedInfoApi/getStockComAccountAndAllocationInfo"
    shinobi.cacheapi.request(url, `{allocationaccount: ${value}}`, function (res) {
      var data = JSON.parse(res);
      elem.innerHTML = data.systemaccountname;
    });
  },
  renderPMAcountName: function (elem, value, all) {
    var url = "/authenapi/AllocationAccountRelatedInfoApi/getStockComAccountAndAllocationInfo"
    shinobi.cacheapi.request(url, `{allocationaccount: ${value}}`, function (res) {
      var data = JSON.parse(res);
      elem.innerHTML = `(Tải khoản ${data.pmfullname})`;
      elem.setAttribute("value", data.pm);
    });
  },
  renderRadioButtonEvent: function () {
    var radioOther = document.getElementById("otherOptionInput").parentNode;
    var listRadio = document.querySelectorAll('#otherOptionSourceContainer [snb-key="typeModal"]');

    listRadio.forEach(radioButton => {
      radioButton.onclick = function () {
        if (radioButton.checked) {
          if (radioButton.getAttribute("radio-value") == "OTHER") {
            radioOther.classList.remove("is-hidden");
            radioOther.querySelector("input").value = "";
          } else {
            radioOther.classList.add("is-hidden");
            radioOther.querySelector("input").value = "";
          }
        }
      }
    });
  },
  renderSourceSellFunction: function (request) {
    getUserInfo(function (res) {
      var source = document.querySelector("#orderCommandConfirmModal .field.is-flex");
      if (res.usertype == "PMALADIN") {
        if (request.side == "BUY") {
          if (!source.classList.contains("is-hidden")) {
            source.classList.add("is-hidden");
          }
        } else if (request.side == "SELL") {
          if (source.classList.contains("is-hidden")) {
            source.classList.remove("is-hidden");
          }
        }
      } else {
        if (source) {
          source.classList.add("is-hidden");
        }
      }
    })
  },
  renderSideColor: function (elem, value, all) {
    if (value == "BUY") {
      elem.innerHTML = `<span class="has-text-success">MUA</span>`
    } else if (value == "SELL") {
      elem.innerHTML = `<span class="has-text-danger">BÁN</span>`
    }
  },
  clearPrice: function () {
    var stock = document.querySelector('#searchstocsympol input');
    stock.value = '';
    var price = document.getElementById('orderPriceTab');
    price.value = "";
    var volume = document.getElementById('currentweight');
    volume.value = "";

  },
  addEventStepPrice: function (selector) {
    var object = this;
    object.currentPrice = 10;
    var selector = document.querySelector(selector);
    var buttonNext = selector.querySelector('.step-next-button');
    var buttonPre = selector.querySelector('.step-pre-button');
    var currentValue = selector.querySelector('.current-value');

    buttonNext.onclick = function () {
      var valueCurrent = currentValue.value;

      if (valueCurrent != 0) {

        valueCurrent = shinobi.render.removeFormatNumber(valueCurrent);
        valueCurrent = parseFloat(valueCurrent);
        if (!isNaN(valueCurrent)) {
          var step = object.getStepPrice(valueCurrent);
          var value = valueCurrent + step;
          value = Math.round(value * 100) / 100
          currentValue.value = value;
        }
      } else {
        currentValue.value = object.currentPrice;
      }
    }
    buttonPre.onclick = function () {
      var valueCurrent = currentValue.value;

      valueCurrent = shinobi.render.removeFormatNumber(valueCurrent);
      valueCurrent = Number(valueCurrent);
      if (valueCurrent >= 0 && !isNaN(valueCurrent)) {
        var step = object.getStepPrice(valueCurrent);
        var value = valueCurrent - step;
        value = Math.round(value * 100) / 100
        currentValue.value = value;
      }

    }
  },
  getStepPrice: function (value, stockExchange) {
    var step = '';
    if (stockExchange != "HOSE") {
      if (value >= 0 && value < 10) {
        step = 0.01;
      }
      else {
        if (value >= 10 && value <= 50) {
          step = 0.05;
        } else {
          step = 0.1;
        }
      }
    } else {
      step = 0.1;
    }
    return step;
  },
  addEventStepVolume: function (selector) {
    var object = this;
    var selector = document.querySelector(selector);
    var buttonNext = selector.querySelector('.step-next-button');
    var buttonPre = selector.querySelector('.step-pre-button');
    var currentValue = selector.querySelector('.current-value');

    buttonNext.onclick = function () {
      var valueCurrent = currentValue.value;

      valueCurrent = shinobi.render.removeFormatNumber(valueCurrent);
      valueCurrent = Number(valueCurrent);
      currentValue.value = shinobi.util.formatNumber(valueCurrent + object.stepVolume);

    }
    buttonPre.onclick = function () {
      var valueCurrent = currentValue.value;

      valueCurrent = shinobi.render.removeFormatNumber(valueCurrent);
      valueCurrent = Number(valueCurrent);
      if (valueCurrent >= object.stepVolume) {
        currentValue.value = shinobi.util.formatNumber(valueCurrent - object.stepVolume);
      }

    }
  },
  addEventActiveBuySell: function () {
    var object = this;
    var buttonBuy = document.querySelector('.button-outline .button.buy');
    var buttonSell = document.querySelector('.button-outline .button.sell');
    var containerTrading = document.getElementById('containertrading');
    var buttonSubmit = document.getElementById('buttontrading');

    buttonSubmit.innerHTML = object.contentOrderBuy;
    buttonBuy.onclick = function () {
      buttonBuy.parentNode.classList.add(object.classBuy);
      buttonSell.parentNode.classList.remove(object.classSell);

      buttonSubmit.classList.add('buy');
      buttonSubmit.classList.remove('sell');
      buttonSubmit.innerHTML = object.contentOrderBuy;

      containerTrading.classList.add(object.classBuy);
      containerTrading.classList.remove(object.classSell);
    };
    buttonSell.onclick = function () {
      buttonBuy.parentNode.classList.remove(object.classBuy);
      buttonSell.parentNode.classList.add(object.classSell);

      buttonSubmit.classList.remove('buy');
      buttonSubmit.classList.add('sell');
      buttonSubmit.innerHTML = object.contentOrderSell;


      containerTrading.classList.add(object.classSell);
      containerTrading.classList.remove(object.classBuy);
    };
  },
  setUpOrderValueTab: function () {
    var input = document.querySelector("#setprice #orderPriceTab");
    var output = document.querySelector("#setvolume #orderVolumeTab");
    input.addEventListener('input', function (inputValue) {
      var account = document.getElementById("selectPM").value;
      var url = "/authenapi/StockPriceInfoApi/getMaxVolumnOrder";
      var request = {
        "account": account,
        "price": inputValue.target.value,
      };

      if (inputValue.target.value > 0) {
        shinobi.api.request(url, JSON.stringify(request), function (res) {
          var orderValue = JSON.parse(res);

          var orderRenderedValue = shinobi.util.formatNumber(orderValue);
          output.innerText = orderRenderedValue;
        });
      } else {
        output.innerText = "";
      }
    });
  },

  getOrderSideInfo(json, orderSideKey) {
    let mappingValue = {
      BUY: { text: 'MUA', classList: ['order-side', 'buy-side'] },
      SELL: { text: 'BÁN', classList: ['order-side', 'sell-side'] },
    };
    let text = "";
    let classList = [];
    if (json.hasOwnProperty(orderSideKey)) {
      text = json[orderSideKey];
      if (mappingValue.hasOwnProperty(text)) {
        let currentMappingItem = mappingValue[text];
        text = currentMappingItem.text;
        classList = currentMappingItem.classList;
      }

    }
    return { text, classList };

  },

  renderOrderSide: function (cell, row, col, all) {
    let data = all[row];
    let orderSideKey = 'side';
    let orderSideInfo = shinobi.tradingsystemrender.getOrderSideInfo(data, orderSideKey);
    cell.innerHTML = orderSideInfo.text;
    cell.classList.add(...orderSideInfo.classList);
  },
  renderOrderSideDataList: function (elem, value, all) {
    let data = all;
    let orderSideKey = 'side';
    let orderSideInfo = shinobi.tradingsystemrender.getOrderSideInfo(data, orderSideKey);
    elem.innerHTML = orderSideInfo.text;
    elem.classList.add(...orderSideInfo.classList);
  },
  renderOrderStockCode(cell, row, col, all) {
    let data = all[row];
    let orderSideKey = 'side';
    let orderSideInfo = shinobi.tradingsystemrender.getOrderSideInfo(data, orderSideKey);
    cell.classList.add(...orderSideInfo.classList);
  },

  renderOrderTypeStatus(cell, row, col, all) {
    cell.classList.add('has-text-left');
    var value = cell.innerHTML;
    var listOrderType = {
      'NEW': { text: 'Mới', icon: '/static/image/pending.jpg' },
      'INPROCESS': { text: 'Đang xử lý', icon: '/static/image/pending.jpg' },
      'SUCCESS': { text: 'Thành công', icon: '/static/image/matched.jpg' },
      'PENDING': { text: 'Chờ khớp', icon: '/static/image/pending.jpg' },
      'MATCHED': { text: 'Đã khớp', icon: '/static/image/matched.jpg' },
      'EDITED': { text: 'Đã sửa', icon: '/static/image/pending.jpg' },
      'CANCELED': { text: 'Đã hủy', icon: '/static/image/cancel.jpg' },
      'ERROR': { text: 'Lỗi', icon: '/static/image/.jpg' },
      'PARTIAL_MATCHED': { text: 'Khớp một phần', icon: '/static/image/partialmatched.jpg' },
      'PARTIAL_MATCHED_REST_CANCELLED': { text: 'Khớp một phần, hủy phần còn lại', icon: '/static/image/partialmatchedpartialcancel.jpg' },
    };

    if (listOrderType.hasOwnProperty(value)) {
      let renderObject = listOrderType[value];
      cell.innerHTML = `<div class="level has-text-left" style="
                            justify-content: left;
                        ">
                          <span class="level-left"><img class="icon is-small" src="${renderObject.icon}"></span>
                          <span class="level-item is-narrow ml-1"> ${renderObject.text}</span>
                        </div>`;
    } else {
      cell.innerHTML = value;
    }
  },

  renderOrderTypeStatusDatalist(elem, value, all) {
    elem.classList.add('has-text-left');
    var listOrderType = {
      'NEW': { text: 'Mới', icon: '/static/image/pending.jpg' },
      'INPROCESS': { text: 'Đang xử lý', icon: '/static/image/pending.jpg' },
      'SUCCESS': { text: 'Thành công', icon: '/static/image/matched.jpg' },
      'PENDING': { text: 'Chờ khớp', icon: '/static/image/pending.jpg' },
      'MATCHED': { text: 'Đã khớp', icon: '/static/image/matched.jpg' },
      'EDITED': { text: 'Đã sửa', icon: '/static/image/pending.jpg' },
      'CANCELED': { text: 'Đã hủy', icon: '/static/image/cancel.jpg' },
      'ERROR': { text: 'Lỗi', icon: '/static/image/.jpg' },
      'PARTIAL_MATCHED': { text: 'Khớp một phần', icon: '/static/image/partialmatched.jpg' },
      'PARTIAL_MATCHED_REST_CANCELLED': { text: 'Khớp một phần, hủy phần còn lại', icon: '/static/image/partialmatchedpartialcancel.jpg' },
    };

    if (listOrderType.hasOwnProperty(value)) {
      let renderObject = listOrderType[value];
      elem.innerHTML = `<div class="level has-text-left" style="
                            justify-content: left;
                        ">&nbsp
                          <span class="level-left"><img class="icon is-small" src="${renderObject.icon}"></span>
                          <span class="level-item is-narrow ml-1"> ${renderObject.text}</span>
                        </div>`;
    } else {
      elem.innerHTML = value;
    }
  },

  titleDetailOrder: function (elem, value, all) {
    if (value) {
      elem.innerHTML = `Chi tiết lệnh (Đã huỷ lúc ${value})`;
    } else {
      elem.innerHTML = `Chi tiết lệnh`;
    }
  },

  showPriceConfirm: function (elem, value, all) {
    console.log("all", all);
    elem.innerHTML = format(value * 1000);
  },

  showVolumeConfirm: function (elem, value, all) {
    elem.innerHTML = format((all.price * 1000) * all.volume);
  },
};
