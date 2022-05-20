shinobi.gui = (function () {
  var constructor = function (url, option) {
    this.editors = [];
    this.tableId = "dataTable";
    this.detailPanelId = "detailpanel";
    this.buttonGroupId = "buttonGroup";
    this.apiurl = url;
    this.option = option;
    this.detailPanelElem = document.getElementById(this.detailPanelId);
    shinobi.tableHelper.getColname(this.tableId);
    this.tableObject = new shinobi.table(this.tableId);

    this.loadTable = function () {
      // this.tableObject = new shinobi.table(this.tableId);
      this.tableObject.viewDetailPanelId = this.detailPanelId;

      var colNames = this.tableObject.getColnames(this.tableId);
      var tableId = this.tableId;
      var renders = shinobi.tableHelper.getRender(tableId);
      if (!renders[0]) {
        renders[0] = this.tableObject.viewDetailRender;
      }

      var request = {};
      var recordNumber = shinobi.util.getRecordNumber(this.tableId);
      request.recordPerPage = isNaN(recordNumber) ? 10 : recordNumber;

      if (
        option != null &&
        option.hasOwnProperty["tableObjectOption"] &&
        option.tableObjectOption != null &&
        typeof option.tableObjectOption.staticfilters !== "undefined" &&
        option.tableObjectOption.staticfilters != null
      ) {
        this.tableObject.staticfilters = option.tableObjectOption.staticfilters;
      }

      var sort = {};
      sort.colname = "id";
      sort.value = "desc";

      this.tableObject.staticsorts[0] = sort;

      if (
        option != null &&
        option.hasOwnProperty["tableObjectOption"] &&
        option.tableObjectOption != null &&
        typeof option.tableObjectOption.hasCheckDuplicateFilterColumn !== "undefined" &&
        option.tableObjectOption.hasCheckDuplicateFilterColumn != null &&
        typeof option.tableObjectOption.checkDuplicateFilterColumnList !== "undefined" &&
        option.tableObjectOption.checkDuplicateFilterColumnList != null
      ) {
        this.tableObject.hasCheckDuplicateFilterColumn = option.tableObjectOption.hasCheckDuplicateFilterColumn;
        this.tableObject.checkDuplicateFilterColumnList = option.tableObjectOption.checkDuplicateFilterColumnList;
      }

      this.tableObject.initLoadApi(this.apiurl + "/findDataListExport", request, colNames, renders);

      return this;
    };

    this.createElem = function (nodetype, classlist) {
      var elem = document.createElement(nodetype);
      elem.classList.add(classlist);
      return elem;
    };

    this.buildViewPanelObject = function () {
      var object = this;
      var formElem = document.getElementById(this.detailPanelId);

      var snbElems = formElem.querySelectorAll("[snb-key]");

      var result = {};
      snbElems.forEach(function (elem) {
        var colname = elem.getAttribute("snb-key");

        if (elem.hasAttribute("snb-preprocess")) {
          shinobi.mapping.getValueElement(object.detailPanelElem, function (jsonMapping) {
            result[colname] = eval(elem.getAttribute("snb-preprocess"))(elem.value, {
              elem: elem,
              gui: object,
              all: jsonMapping,
            });
          });
        } else if (elem.hasAttribute("snb-editor-index")) {
          result[colname] = shinobiEditors[elem.getAttribute("snb-editor-index")].getData();
        } else if (elem.hasAttribute("snb-datatype")) {
          var datatype = elem.getAttribute("snb-datatype");

          if (datatype == "number") {
            result[colname] = Number(elem.value);
          }
        } else {
          result[colname] = elem.value;
        }
      });

      return result;
    };

    this.registerCreateButton = function () {
      var list = document.getElementById(this.buttonGroupId).getElementsByClassName("createButton");
      var gui = this;
      var createButton = list[0];
      var hasButton = true;
      if (option && option.hasOwnProperty("isHiddenCreateButton") && option["isHiddenCreateButton"] == true) {
        hasButton = false;
        createButton.classList.add("is-hidden");
      }

      if (hasButton) {
        createButton.onclick = function () {
          shinobi.mapping.getValue("#" + gui.detailPanelId, function (jsonMapping) {
            shinobi.notification.confirm(function () {
              gui.createProcess(jsonMapping);
            });
          });
        };
      }
    };

    this.createProcess = function (jsonMapping) {
      var gui = this;
      if (option && option.hasOwnProperty("createFunction")) {
        option["createFunction"](gui, jsonMapping);
        return;
      }
      if (option && option.hasOwnProperty("checkEmpty") && option["checkEmpty"]) {
        shinobi.mapping.getValueElement(
          gui.detailPanelElem,
          function (reJsonMapping) {
            delete reJsonMapping["id"];
            Object.values(reJsonMapping).includes("")
              ? shinobi.util.fillInputMessage()
              : gui.sendCreateRequest(jsonMapping);
          },
          {
            checkEmpty: true,
          }
        );
        return;
      }

      gui.sendCreateRequest(jsonMapping);
    };

    this.sendCreateRequest = function (jsonMapping) {
      var gui = this;
      delete jsonMapping.id;
      shinobi.notification.notification.loading();
      shinobi.api.request(gui.apiurl + "/create", JSON.stringify(jsonMapping), function (content) {
        shinobi.notification.notification.info(content);

        gui.loadTable();
      });
    };
    this.registerDeleteButton = function () {
      var list = document.getElementById(this.buttonGroupId).getElementsByClassName("deleteButton");
      var deleteButton = list[0];
      var gui = this;
      var hasButton = true;
      if (option && option.hasOwnProperty("isHiddenDeleteButton") && option["isHiddenDeleteButton"] == true) {
        hasButton = false;
        deleteButton.classList.add("is-hidden");
      }

      if (hasButton) {
        deleteButton.onclick = function () {
          gui.checkDetailPanelJsonHasId(gui, function (jsonMapping) {
            if (option && option.hasOwnProperty("deleteFunction")) {
              option["deleteFunction"](gui, jsonMapping);
            } else {
              shinobi.notification.notification.loading();
              shinobi.api.request(gui.apiurl + "/remove", JSON.stringify(jsonMapping), function (content) {
                shinobi.notification.notification.info(content);
                gui.loadTable();
              });
            }
          });
        };
      }
    };

    this.registerUpdateButton = function () {
      var updateButton = document.getElementById(this.buttonGroupId).getElementsByClassName("updateButton")[0];

      var gui = this;
      var hasButton = true;
      if (option && option.hasOwnProperty("isHiddenUpdateButton") && option["isHiddenUpdateButton"] == true) {
        hasButton = false;
        updateButton.classList.add("is-hidden");
      }
      if (hasButton) {
        updateButton.onclick = function () {
          gui.checkDetailPanelJsonHasId(gui, function (jsonMapping) {
            if (option && option.hasOwnProperty("updateFunction")) {
              option["updateFunction"](gui, jsonMapping);
            } else {
              gui.updateProcess(jsonMapping);
            }
          });
        };
      }
    };

    this.updateProcess = function (jsonMapping) {
      var gui = this;
      if (option && option.hasOwnProperty("updateFunction")) {
        option["updateFunction"](gui, jsonMapping);
        return;
      }
      if (option && option.hasOwnProperty("checkEmpty") && option["checkEmpty"]) {
        shinobi.mapping.getValueElement(
          gui.detailPanelElem,
          function (reJsonMapping) {
            Object.values(reJsonMapping).includes("")
              ? shinobi.util.fillInputMessage()
              : gui.sendUpdateRequest(jsonMapping);
          },
          {
            checkEmpty: true,
          }
        );
        return;
      }

      gui.sendUpdateRequest(jsonMapping);
    };

    this.sendUpdateRequest = function (jsonMapping) {
      var gui = this;
      shinobi.notification.notification.loading();

      shinobi.api.request(gui.apiurl + "/merge", JSON.stringify(jsonMapping), function (content) {
        shinobi.notification.notification.info(content);
        gui.loadTable();
      });
    };
    this.checkDetailPanelJsonHasId = function (gui, callback) {
      shinobi.mapping.getValue("#" + gui.detailPanelId, function (jsonMapping) {
        if (jsonMapping.hasOwnProperty("id") && jsonMapping["id"].trim() != "") {
          shinobi.notification.confirm(function () {
            if (typeof callback == "function") {
              callback(jsonMapping);
            }
          });
        } else {
          shinobi.notification.notification.error("Chưa chọn record nào trong danh sách để thao tác");
        }
      });
    };

    this.registerRefreshButton = function () {
      var list = document.getElementById(this.buttonGroupId).getElementsByClassName("refreshButton");

      var refreshButton = list[0];

      var table = this.tableObject;
      refreshButton.addEventListener("click", function () {
        location.reload();
      });
    };

    this.loadAll = function () {
      this.loadTable();
      this.registerCreateButton();
      this.registerRefreshButton();
      this.registerDeleteButton();
      this.registerUpdateButton();
    };
  };

  return constructor;
})();
