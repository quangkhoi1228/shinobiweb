Number.prototype.format = function (n, x, s, c) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace(".", c) : num).replace(new RegExp(re, "g"), "$&" + (s || ","));
};

shinobi.tableHelper = {
  mappingRender: {
    renderFirstNameLastName: {
      functionName: "getfullname",
      param: "this",
    },
  },
  colnameAttribute: "snb-colname",
  renderAttribute: "snb-render",
  colcontrolAttribute: "snb-header-control",
  sortAttribute: "snb-sort",
  sortIcon: "<i class='fas fa-sort'></i>",
  sortDescIcon: "<i class='fas fa-sort-down'></i>",
  sortAscIcon: "<i class='fas fa-sort-up'></i>",

  getRender: function (tableId) {
    var table = document.getElementById(tableId);

    var colnameAttributeQuery = "[" + shinobi.tableHelper.colnameAttribute + "]";

    var tHead = table.tHead;
    var listColumnHasColname = tHead.querySelectorAll(colnameAttributeQuery);

    var render = [];
    for (var i = 0; i < listColumnHasColname.length; i++) {
      var item = listColumnHasColname[i];
      if (item.hasAttribute(shinobi.tableHelper.renderAttribute)) {
        var renderFunction = item.getAttribute(shinobi.tableHelper.renderAttribute);

        render[item.cellIndex] = renderFunction;
      }
    }

    return render;
  },

  addAttributeColname: function (colElem) {
    if (colElem.hasAttribute(shinobi.tableHelper.colcontrolAttribute)) {
      var sortElem = colElem.querySelector("[snb-sort]");

      if (!sortElem) {
        var span = document.createElement("span");
        span.setAttribute(shinobi.tableHelper.sortAttribute, "");

        span.innerHTML = shinobi.tableHelper.sortIcon;

        colElem.appendChild(span);
      }

      if (colElem.getAttribute(shinobi.tableHelper.colcontrolAttribute).includes("2")) {
        var filter = document.createElement("span");
        filter.setAttribute("snb-filter", "");
        var filterIcon = document.createElement("i");
        filterIcon.setAttribute("class", "fal fa-sm fa-filter");
        filter.appendChild(filterIcon);
        colElem.appendChild(filter);
      }
    }
  },

  getColname: function (tableId) {
    var table = document.getElementById(tableId);

    var headerColnames = [];

    var listTr = table.tHead.rows;
    for (var indexTr = 0; indexTr < listTr.length; indexTr++) {
      var tr = listTr[indexTr];
      var listTh = tr.cells;
      for (let th of listTh) {
        var key;
        var colspan = th.colSpan;
        if (th.hasAttribute(shinobi.tableHelper.colnameAttribute)) {
          key = th.getAttribute(shinobi.tableHelper.colnameAttribute);
          shinobi.tableHelper.addAttributeColname(th);
        } else {
          key = null;
        }
        if (indexTr == 0) {
          for (var i = 0; i < colspan; i++) {
            headerColnames.push(key);
          }
        } else {
          for (var j = 0; j < colspan; j++) {
            headerColnames[headerColnames.indexOf(null) + j] = key;
          }
        }
      }
    }

    return headerColnames;
  },

  buildSort: function (table) {
    var staticSort = table.staticsorts;
    table.getSorts();

    var sort = table.sorts;

    var listKey = [];

    for (var i = 0; i < sort.length; i++) {
      listKey.push(sort[i].colname);
    }

    var allSort = sort;

    for (var j = 0; j < staticSort.length; j++) {
      if (!listKey.includes(staticSort[j].colname)) {
        allSort.push(staticSort[j]);
      }
    }

    return allSort;
  },

  changeSortIconHeader: function (table) {
    for (var i = 0; i < table.allSorts.length; i++) {
      var key = table.allSorts[i].colname;

      var colnameAttributeQuery =
        "[" + shinobi.tableHelper.colnameAttribute + "=" + key + "]>[" + shinobi.tableHelper.sortAttribute + "]";

      var listHeaderSortIcon = table.tableNode.tHead.querySelectorAll(colnameAttributeQuery);

      for (var j = 0; j < listHeaderSortIcon.length; j++) {
        listHeaderSortIcon[j].classList.add("is-visible");
        listHeaderSortIcon[j].setAttribute("snb-sort", table.allSorts[i].value);

        if (table.allSorts[i].value == "asc") {
          listHeaderSortIcon[j].innerHTML = shinobi.tableHelper.sortAscIcon;
        }
        if (table.allSorts[i].value == "desc") {
          listHeaderSortIcon[j].innerHTML = shinobi.tableHelper.sortDescIcon;
        }
      }
    }
  },
  getRenderExcelFunction: function (cellHeader) {
    var renderName = cellHeader.getAttribute(shinobi.tableHelper.renderAttribute);

    var allFunction = shinobi.tableHelper.mappingRender;

    var functionObject = allFunction[renderName.toString()];

    var returnObject = {};

    if (functionObject) {
      returnObject.result = true;

      if (functionObject.param == "this") {
        var content = {};
        content.rendername = functionObject.functionName;
        content.inputlist = [];
        content.inputlist.push(cellHeader.getAttribute(shinobi.tableHelper.colnameAttribute));

        returnObject.content = content;
      }
    } else {
      returnObject.result = false;
    }

    return returnObject;
  },
};

shinobi.table = (function () {
  // private static variable
  var count = 0;
  var paginationClass = ".table-pagination";
  var prevPaginationClass = ".shinobi-pagination-prev";
  var curPagePaginationClass = ".shinobi-pagination-curpage";
  var nextPaginationClass = ".shinobi-pagination-next";
  var pageTotalClass = ".shinobi-page-total";
  var recordPerPageClass = ".shinobi-recordperpage";
  var detailIdKey = "snb-detailid";
  var colnameAttribute = "snb-colname";
  var colcontrolAttribute = "snb-header-control";
  var sortAttribute = "snb-sort";
  var exportExcelAttribute = "snb-export-excel";

  var sortDescIcon = "<i class='fas fa-sort-down'></i>";
  var sortAscIcon = "<i class='fas fa-sort-up'></i>";
  var sortIcon = "<i class='fas fa-sort'></i>";

  // constructor
  var constructor = function (tableid) {
    this.url = "";

    this.colNames = [];

    this.filters = [];

    this.staticfilters = [];

    this.sorts = [];

    this.allSorts = [];

    this.staticsorts = [];

    this.paramsRequestList = {};

    this.renders = [];

    this.tableRows = [];

    this.pageNum = 1;

    this.recordPerPage = 10;

    this.pageTotal = 10;

    this.rowTotal = 10;

    this.currentId = -1;

    this.lastRequest = {};

    this.exportExcel = false;

    this.options = null;

    this.tableNode = document.getElementById(tableid);

    this.tableContainerNode = this.tableNode.parentNode;

    this.pageNumNode = this.tableContainerNode.querySelector(curPagePaginationClass);

    this.recordPerPageNode = this.tableContainerNode.querySelector(recordPerPageClass);

    this.apiName = "";

    this.getColnames = function () {
      var table = document.getElementById(tableid);

      var headerColnames = [];

      var listTr = table.tHead.rows;
      for (var indexTr = 0; indexTr < listTr.length; indexTr++) {
        var tr = listTr[indexTr];
        var listTh = tr.cells;

        for (var indexTh = 0; indexTh < listTh.length; indexTh++) {
          var th = listTh[indexTh];
          var key;

          var colspan = th.colSpan;

          if (th.hasAttribute(colnameAttribute)) {
            key = th.getAttribute(colnameAttribute);
          } else {
            key = null;
          }

          if (indexTr == 0) {
            for (var i = 0; i < colspan; i++) {
              headerColnames.push(key);
            }
          } else {
            for (var j = 0; j < colspan; j++) {
              headerColnames[headerColnames.indexOf(null) + j] = key;
            }
          }
        }
      }

      return headerColnames;
    };

    this.registerSorts = function () {
      var sortElems = this.tableNode.querySelectorAll("[" + sortAttribute + "]");

      for (var i = 0; i < sortElems.length; i++) {
        var sortElem = sortElems[i];

        this.registerSort(sortElem);
      }
    };

    this.registerSort = function (sortElem) {
      var table = this;

      sortElem.addEventListener("click", function () {
        var currentSortValue = this.getAttribute(sortAttribute);

        var colName = this.parentNode.getAttribute(colnameAttribute);

        if ("" === currentSortValue) {
          this.setAttribute(sortAttribute, "asc");
          this.innerHTML = sortAscIcon;
          this.classList.add("is-visible");
        } else if ("asc" === currentSortValue) {
          this.setAttribute(sortAttribute, "desc");
          this.innerHTML = sortDescIcon;
          this.classList.add("is-visible");
        } else {
          this.setAttribute(sortAttribute, "");
          this.innerHTML = sortIcon;
          this.classList.remove("is-visible");
        }

        table.reloadApi(table.pageNum);
      });
    };

    this.getSorts = function () {
      this.sorts = [];

      // this.sorts = this.sorts.concat(this.staticsorts);

      var sortElems = this.tableNode.querySelectorAll("[" + sortAttribute + "]");

      for (var i = 0; i < sortElems.length; i++) {
        var sortElem = sortElems[i];

        var colName = sortElem.parentNode.getAttribute(colnameAttribute);
        var currentSortValue = sortElem.getAttribute(sortAttribute);

        if ("" !== currentSortValue) {
          var sort = {};
          sort.colname = colName;
          sort.value = currentSortValue;

          this.sorts.push(sort);
        }
      }
    };

    this.registerHeaders = function () {
      var tableElem = document.getElementById(tableid);
      var headers = tableElem.querySelectorAll("[" + colcontrolAttribute + "]");
      var object = this;
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        if (header.getAttribute(colcontrolAttribute).includes("2")) {
          object.registerHeader(header);
        }
      }
    };

    this.registerHeader = function (header) {
      var title = header.innerHTML;

      var table = this;

      header.addEventListener("dblclick", function () {
        table.addEventFilterHeader(table, header);
      });

      var filter = header.querySelector("[snb-filter]");

      if (filter) {
        filter.onclick = function () {
          table.addEventFilterHeader(table, header);
        };
      }

      header.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          var currentvalue = this.querySelector("input").value;

          if (currentvalue && currentvalue == "") {
            // this.innerHTML = title;
            table.removeFilterControls(this);
          }

          table.resetPageNum();

          table.reloadApi(table.pageNum);
        }
      });
    };

    this.addEventFilterHeader = function (table, th) {
      //sử dụng snb-filter-builder để custom input filter - có 2 biến đầu vào của hàm th và options
      //sử dung snb-filter-get-value để lấy dữ liệu custom - có 2 biến đầu vào của hàm th và options
      if (th.hasAttribute('snb-filter-builder')) {
        eval(th.getAttribute('snb-filter-builder'))(th, {
          tableObject: table
        });
      } else {
        var childNode = th.childNodes[0];

        if (childNode.nodeType == 3) {
          if (th.querySelector("input") !== null) {
            // this.innerHTML = title;
            table.removeFilterControls(th);

            table.resetPageNum();

            table.reloadApi(table.pageNum);

            return;
          }

          var select = document.createElement("select");
          table.addFilterToElement(select, th);

          var input = document.createElement("input");
          input.setAttribute("class", "input is-small");
          th.hasAttribute("snb-datatype") && th.getAttribute("snb-datatype") == "date"
            ? input.setAttribute("type", "date")
            : input.setAttribute("type", "text");
          input.setAttribute("value", "");
          // input.style.width = th.offsetWidth + "px";

          var div = document.createElement("div");
          div.setAttribute("class", "select is-small");

          // this.removeChild(this.childNodes[0]);
          th.appendChild(document.createElement("br"));
          div.appendChild(select);
          var field = document.createElement("div");
          field.setAttribute("class", "field table-filter has-addons");
          var control1 = document.createElement("div");
          control1.setAttribute("class", "control");
          control1.appendChild(div);
          var control2 = document.createElement("div");
          control2.setAttribute("class", "control");
          control2.appendChild(input);
          field.appendChild(control1);
          field.appendChild(control2);
          th.appendChild(field);
        }
      }
    };

    this.createExportExcelButton = function () {
      var button = document.createElement("span");
      button.setAttribute("class", "button is-small is-light has-text-success is-pulled-right	");
      button.innerHTML = '<span class="icon"><i class="fa fa-file-excel"></i></span><span>Excel</span>';

      var lastTh = this.tableNode.tHead.lastElementChild.lastElementChild;

      lastTh.appendChild(button);

      this.exportExcelButton = button;
    };

    this.getMappingExcelColumn = function () {
      var listNode = this.listHeaderExportExcel;

      var mappingObject = {};

      for (var i = 0; i < listNode.length; i++) {
        var excelColumnName = listNode[i].getAttribute(exportExcelAttribute);

        var colName = listNode[i].getAttribute("snb-colname");

        if (!excelColumnName || excelColumnName.trim() == "") {
          mappingObject[colName] = listNode[i].innerText.trim();
        } else {
          mappingObject[colName] = excelColumnName.trim();
        }
      }
      return mappingObject;
    };

    this.getMappingExcelRenderColumn = function () {
      var listNode = this.listHeaderExportExcel;

      var mappingObject = {};

      for (var i = 0; i < listNode.length; i++) {
        if (listNode[i].hasAttribute("snb-render")) {
          var colName = listNode[i].getAttribute("snb-colname");
          var renderFunction = listNode[i].getAttribute("snb-render");

          if (renderFunction.trim() != "" && colName.trim() != "") {
            var renderExcelFunctionObject = shinobi.tableHelper.getRenderExcelFunction(listNode[i]);

            if (renderExcelFunctionObject.result) {
              mappingObject[colName] = renderExcelFunctionObject.content;
            }
          }
        }
      }

      return mappingObject;
    };

    this.addEventExportExcel = function () {
      var button = this.exportExcelButton;

      var table = this;

      if (this.listHeaderExportExcel.length == 0) {
        button.classList.add("is-hidden");
      }

      button.onclick = function () {
        shinobi.notification.notification.loading();

        // er.showDownloadFileModal();

        var request = {};
        request.filters = table.filters;
        request.sorts = table.allSorts;
        request.mappingcolumns = table.getMappingExcelColumn();
        request.rendercolumns = table.getMappingExcelRenderColumn();

        var urlSplit = table.url.split("/");
        var apiName = urlSplit[2];

        var url = "/exportfile/excel/" + apiName;

        shinobi.exportfile.request(url, JSON.stringify(request), "xlsx", function () {
          shinobi.notification.notification.loaded();
        });
      };
    };

    this.registerExportExcel = function () {
      var tableElem = document.getElementById(tableid);
      var listHeaderExportExcel = tableElem.querySelectorAll("[" + exportExcelAttribute + "]");
      if (listHeaderExportExcel && this.exportExcel) {
        this.listHeaderExportExcel = listHeaderExportExcel;

        this.createExportExcelButton();

        this.addEventExportExcel();
      }
    };

    this.removeFilterControls = function (elem) {
      var br = elem.querySelector("br");
      // var select = elem.querySelector(".select");
      // var input = elem.querySelector(".input");
      var field = elem.querySelector(".field.table-filter");
      elem.removeChild(br);
      // elem.removeChild(select);
      // elem.removeChild(input);
      elem.removeChild(field);
    };

    this.resetPageNum = function () {
      this.pageNum = 1;
      this.pageNumNode.value = 1;
    };

    this.addFilterToElement = function (select, node) {
      var datatype = node.getAttribute("snb-datatype");

      select.classList.add('default-filter-select-operator');

      var textArr = [];
      var valueArr = [];

      if (["number", "date"].includes(datatype)) {
        textArr = ["=", ">", ">=", "<", "<="];
        valueArr = ["equal", ">", ">=", "<", "<="];
      } else if (datatype === "boolean") {
        textArr = ["="];
        valueArr = ["equal"];
      } else {
        textArr = ["like", "="];
        valueArr = ["like", "equal"];
      }

      for (var i = 0; i < textArr.length; i++) {
        var option = document.createElement("option");
        option.text = textArr[i];
        option.value = valueArr[i];
        select.appendChild(option);
      }
    };

    this.registerRecordPerPage = function () {
      var table = this;

      var copyNode = this.recordPerPageNode.cloneNode(true);

      this.recordPerPageNode.parentNode.replaceChild(copyNode, this.recordPerPageNode);

      this.recordPerPageNode = copyNode;

      this.recordPerPageNode.addEventListener("change", function () {
        table.resetPageNum();
        table.reloadApi(table.pageNum);
      });
    };

    this.registerPagination = function () {
      var parentNode = this.tableNode.parentNode;

      this.paginationContainer = parentNode.querySelector(paginationClass);
    };

    this.updatePagination = function (data) {
      var content = JSON.parse(data);

      var table = this;

      table.rowTotal = content.rowTotal;
      table.pageNum = content.pageNum;
      table.recordPerPage = content.recordPerPage;
      table.pageTotal = content.pageTotal;

      shinobi.mapping.renderElement(this.paginationContainer, JSON.parse(data));

      if (JSON.parse(data).pageNum) {
        var currentPage = this.paginationContainer.querySelectorAll(curPagePaginationClass)[0];
        if (JSON.parse(data).pageTotal == 0) {
          currentPage.value = 0;
        } else {
          currentPage.value = JSON.parse(data).pageNum;
        }
      }
    };

    this.registerPrevPagination = function () {
      var parentNode = this.tableNode.parentNode;

      var prevPagination = parentNode.querySelector(prevPaginationClass);

      var copyNode = prevPagination.cloneNode(true);

      prevPagination.parentNode.replaceChild(copyNode, prevPagination);

      var table = this;

      copyNode.addEventListener("click", function () {
        var currentPageNode = parentNode.querySelector(curPagePaginationClass);
        var currentPage = currentPageNode.value;

        if (currentPage > 1) {
          var pageNum = currentPage - 1;

          currentPageNode.value = pageNum;

          table.reloadApi(pageNum);
        }
      });
    };

    this.registerNextPagination = function () {
      var parentNode = this.tableNode.parentNode;

      var nextPagination = parentNode.querySelector(nextPaginationClass);

      var copyNode = nextPagination.cloneNode(true);

      nextPagination.parentNode.replaceChild(copyNode, nextPagination);

      var table = this;

      copyNode.addEventListener("click", function () {
        var currentPageNode = parentNode.querySelector(curPagePaginationClass);
        var currentPage = Number(currentPageNode.value);

        if (currentPage < table.pageTotal) {
          var pageNum = currentPage + 1;
          currentPageNode.value = pageNum;

          table.reloadApi(pageNum);
        }
      });
    };

    this.registerCurrentPageEvent = function () {
      var parentNode = this.tableNode.parentNode;

      var currentPageNode = parentNode.querySelector(curPagePaginationClass);

      var copyNode = currentPageNode.cloneNode(true);

      currentPageNode.parentNode.replaceChild(copyNode, currentPageNode);

      var table = this;
      copyNode.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          var curPageNum = Number(copyNode.value);

          if (curPageNum > 0 && curPageNum <= table.pageTotal) {
            table.reloadApi(curPageNum);
          }
        }
      });
    };

    this.registerHeaders();
    this.registerPagination();
    this.registerCurrentPageEvent();
    this.registerPrevPagination();
    this.registerNextPagination();
    this.registerRecordPerPage();
    this.registerSorts();
    this.registerExportExcel();

    this.viewDetailPanelId = "";

    // public instance method
    this.renderTable = function (colnames, inputjson, render) {
      var table = document.getElementById(tableid);
      var tbody = table.getElementsByTagName("tbody")[0];

      // var rowArray = JSON.parse(inputjson);
      var rowArray = inputjson;

      this.tableRows = rowArray;

      for (var rowindex = 0; rowindex < rowArray.length; rowindex++) {
        var rowObject = rowArray[rowindex];
        var row = tbody.insertRow();

        if (this.viewDetailPanelId !== "") {
          row.setAttribute(detailIdKey, this.viewDetailPanelId);
        }

        for (var colindex in colnames) {
          var cell = row.insertCell(colindex);
          var value = rowObject[colnames[colindex]];

          if (typeof value != "undefined") {
            cell.innerHTML = value;
          }

          cell.setAttribute("rowid", rowindex);

          if (typeof render[colindex] != "undefined") {
            if (typeof render[colindex] == "function") {
              render[colindex](cell, rowindex, colindex, this.tableRows);
            }

            if (typeof render[colindex] == "string") {
              var option = {
                type: "table",
              };
              eval(render[colindex])(cell, rowindex, colindex, this.tableRows, option);
            }
          }
        }
      }
      var object = this;
      if (
        object.options != null &&
        object.options.hasOwnProperty("isFillBlankCell") &&
        object.options["isFillBlankCell"] == true
      ) {
        var blankRowCount = object.recordPerPage - object.tableRows.length;
        for (var j = 0; j < blankRowCount; j++) {
          let blankRow = tbody.insertRow();
          for (colindex in colnames) {
            var blankCell = blankRow.insertCell(colindex);
            blankCell.setAttribute("rowid", object.tableRows.length + j);
          }
        }
      }

      // this.updatePageTotal();

      if (object.options && object.options.hasOwnProperty("loadDataCallback")) {
        object.options.loadDataCallback();
      }
    };

    this.getCurrentPage = function () {
      var parentNode = this.tableNode.parentNode;

      var currentPageNode = parentNode.querySelector(curPagePaginationClass);
      var currentPage = Number(currentPageNode.value);

      return currentPage;
    };

    this.initLoadApi = function (url, request, colNames, renders, option) {
      // this.sorts = this.sorts.concat(this.staticsorts);

      var table = this;
      this.options = option;


      this.getTableFilters();

      this.filters = this.filters.concat(this.staticfilters);

      this.allSorts = shinobi.tableHelper.buildSort(this);
      this.sorts = [];
      // request.sorts = this.sorts;

      if (table.options && table.options.hasOwnProperty('beforeCallApiCallback')) {
        table.options.beforeCallApiCallback(table);
      }
      request.pageNum = 1;
      request.filters = this.filters;
      request.sorts = this.allSorts;
      Object.entries(table.paramsRequestList).forEach(function (entry) {
        request[entry[0]] = entry[1];
      });
      shinobi.api.request(url, JSON.stringify(request), function (data) {
        var content = JSON.parse(data);
        table.lastRequest.url = url;
        table.lastRequest.request = request;
        table.lastRequest.response = data;

        var tableContent = content.data;

        table.url = url;
        //
        // table.rowTotal = content.rowTotal;
        // table.pageNum = content.pageNum;
        // table.recordPerPage = content.recordPerPage;
        // table.pageTotal = content.pageTotal;

        table.colNames = colNames;
        table.renders = renders;

        shinobi.tableHelper.changeSortIconHeader(table);

        table.clear();
        table.updatePagination(data);
        table.renderTable(colNames, tableContent, renders);

        if (option && option.hasOwnProperty("callback")) {
          option.callback();
        }

        table.updatePagination(data);
      });
    };

    this.reloadApi = function (pageNum, reloadApiOptions) {
      if (!(reloadApiOptions && reloadApiOptions.hasOwnProperty("loading") && !reloadApiOptions["loading"])) {
        shinobi.notification.notification.loading();
      }
      var table = this;

      this.getTableFilters();
      this.getSorts();

      this.recordPerPage = this.recordPerPageNode.value;

      if (this.sorts.length == 0) {
        var sort = {};
        sort.colname = "id";
        sort.value = "desc";

        this.sorts[0] = sort;
      }

      var request = {};
      Object.entries(table.paramsRequestList).forEach(function (entry) {
        request[entry[0]] = entry[1];
      });
      request.recordPerPage = this.recordPerPage;

      if (pageNum) {
        request.pageNum = pageNum;
      } else {
        request.pageNum = this.getCurrentPage();
      }

      // check page number == 0
      if (request.pageNum == 0) {
        request.pageNum = 1;
      }


      this.allSorts = shinobi.tableHelper.buildSort(this);
      this.sorts = [];
      // request.sorts = this.sorts;
      if (table.options && table.options.hasOwnProperty('beforeCallApiCallback')) {
        table.options.beforeCallApiCallback(table);
      }
      request.filters = this.filters;
      request.sorts = this.allSorts;
      shinobi.api.request(this.url, JSON.stringify(request), function (data) {
        table.lastRequest.url = table.url;
        table.lastRequest.request = request;
        table.lastRequest.response = data;
        var content = JSON.parse(data);

        var tableContent = content.data;

        table.rowTotal = content.rowTotal;
        table.pageNum = content.pageNum;
        table.recordPerPage = content.recordPerPage;
        table.pageTotal = content.pageTotal;

        table.clear();
        table.updatePagination(data);
        table.renderTable(table.colNames, tableContent, table.renders);
        if (!(reloadApiOptions && reloadApiOptions.hasOwnProperty("loading") && !reloadApiOptions["loading"])) {
          shinobi.notification.notification.loaded();
        }
        if (reloadApiOptions && reloadApiOptions.hasOwnProperty("callback")) {
          reloadApiOptions.callback();
        }
      });
    };

    this.callApi = function (callback, pageNum, reloadApiOptions) {
      var table = this;

      this.getTableFilters();
      this.getSorts();

      this.recordPerPage = this.recordPerPageNode.value;

      if (this.sorts.length == 0) {
        var sort = {};
        sort.colname = "id";
        sort.value = "desc";

        this.sorts[0] = sort;
      }

      var request = {};
      Object.entries(table.paramsRequestList).forEach(function (entry) {
        request[entry[0]] = entry[1];
      });
      request.recordPerPage = this.recordPerPage;

      if (pageNum) {
        request.pageNum = pageNum;
      } else {
        request.pageNum = this.getCurrentPage();
      }

      // check page number == 0
      if (request.pageNum == 0) {
        request.pageNum = 1;
      }

      request.filters = this.filters;

      this.allSorts = shinobi.tableHelper.buildSort(this);
      this.sorts = [];
      // request.sorts = this.sorts;
      request.sorts = this.allSorts;

      shinobi.api.request(this.url, JSON.stringify(request), function (data) {
        var content = JSON.parse(data);
        callback(content);
      });
    };

    // public instance method
    this.clear = function () {
      var tableElem = document.getElementById(tableid);
      var tbody = tableElem.getElementsByTagName("tbody")[0];

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    };

    this.updatePageTotal = function () {
      var parentNode = this.tableNode.parentNode;
      var pageTotalNode = parentNode.querySelector(pageTotalClass);

      pageTotalNode.innerHTML = this.pageTotal;

      if (this.pageNum > this.pageTotal) {
        this.pageNum = this.pageTotal;

        var pageNumNode = parentNode.querySelector(curPagePaginationClass);
        pageNumNode.value = this.pageNum;
      }
    };
    // public instance method
    this.getRowObject = function (rowid) {
      return this.tableRows[rowid];
    };

    this.getTableFilters = function () {
      var table = document.getElementById(tableid);
      var tableObject = this;
      var headerFilters = table.querySelectorAll("[snb-header-control] .input, [snb-header-control] select:not(.default-filter-select-operator)");

      this.filters = [];

      this.filters = this.filters.concat(this.staticfilters);

      this.pageNum = 1;

      // for (var i = 0; i < headerFilters.length; i++) {
      for (var inputElem of headerFilters) {

        // var inputElem = headerFilters[i];
        var header = shinobi.util.getParentElementHasAttribute(inputElem, {
          type: "tagName",
          value: "TH",
        });
        var filter = {};
        if (header.hasAttribute('snb-filter-get-value')) {
          filter = eval(header.getAttribute('snb-filter-get-value'))(header, {
            tableObject: table
          })
        } else {

          var inputValue = inputElem.value.trim();
          var currentvalue = header.hasAttribute("snb-filter-preprocess")
            ? eval(header.getAttribute("snb-filter-preprocess"))(inputValue, {
              table: table,
              // input: headerFilters[i],
              input: inputElem,
              header: header,
            })
            : inputValue;
          var parentNode = inputElem.parentNode.parentNode.parentNode;

          var select = parentNode.querySelector("select");
          var operator = select.options[select.selectedIndex].value;

          filter = {};
          filter.colname = parentNode.getAttribute(colnameAttribute);
          filter.operator = operator;
          filter.value = currentvalue;
        }

        if (currentvalue !== "") {
          if (
            tableObject.hasOwnProperty("hasCheckDuplicateFilterColumn") &&
            tableObject.hasCheckDuplicateFilterColumn == true &&
            tableObject.hasOwnProperty("checkDuplicateFilterColumnList") &&
            tableObject.checkDuplicateFilterColumnList.includes(filter.colname)
          ) {
            var listFiltersNew = [];
            tableObject.filters.forEach(function (filterItem, index) {
              if (filterItem.colname != filter.colname) {
                listFiltersNew.push(filterItem);
              }
            });
            tableObject.filters = listFiltersNew;
          }
          if (filter.colname != null) {
            tableObject.filters.push(filter);
          }
        }
      }
    };

    // public instance method
    this.numberFormatRender = function (cell, rowindex, colindex, tableRows) {
      var value = Number(cell.innerHTML);
      cell.innerHTML = value.format(0, 3, ",", ".");
      cell.classList.add("has-text-right");
    };

    // public instance method
    this.inputableRender = function (cell, rowindex, colindex, tableRows) {
      var initValue = cell.innerHTML;

      cell.addEventListener("dblclick", function () {
        var childNode = this.childNodes[0];

        if (childNode.nodeType == 3) {
          var currentValue = this.innerHTML;
          var input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("value", currentValue);
          this.removeChild(this.childNodes[0]);
          this.appendChild(input);
        } else if (childNode.nodeType == 1) {
          var currentValue = childNode.value;
          this.innerHTML = currentValue;

          if (currentValue !== initValue) {
            this.classList.add("is-warning");
          } else {
            this.classList.remove("is-warning");
          }
        }
      });

      cell.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
          var childNode = this.childNodes[0];
          if (childNode.nodeType == 1) {
            var currentValue = childNode.value;
            this.innerHTML = currentValue;

            if (currentValue !== initValue) {
              this.classList.add("is-warning");
            } else {
              this.classList.remove("is-warning");
            }
          }
        }
      });

      cell.addEventListener("mouseover", function () {
        this.classList.add("is-light");
      });

      cell.addEventListener("mouseout", function () {
        this.classList.remove("is-light");
      });
    }; // end inputableRender

    // public instance method
    this.viewDetailRender = function (cell, rowindex, colindex, tableRows) {
      var button = document.createElement("a");
      button.setAttribute("class", "button is-small is-icon is-info");
      button.innerHTML = "<span class='icon'> <i class='fa fa-search'></i></span>";
      cell.appendChild(button);

      var rowid = cell.getAttribute("rowid");

      var rowNode = cell.parentNode;

      var viewDetailPanelId = rowNode.getAttribute(detailIdKey);

      var rowObject = tableRows[rowid];

      var table = this;

      button.addEventListener("click", function () {
        //hightlighting tr
        var paginationContainer = cell.parentElement.parentElement.parentElement.nextElementSibling;
        var style = paginationContainer.querySelector("style.shinobi-table-style");
        if (!style) {
          style = document.createElement("style");
          style.setAttribute("class", "shinobi-table-style");
          style.innerHTML = `.shinobi-table-row-hightlighting{background: #f1e8da !important;}`;
          paginationContainer.appendChild(style);
        }
        var rows = cell.parentElement.parentElement.querySelectorAll("tr");
        for (let row of rows) {
          row.classList.remove("shinobi-table-row-hightlighting");
        }
        cell.parentElement.classList.add("shinobi-table-row-hightlighting");

        shinobi.mapping.clear("#" + viewDetailPanelId);
        shinobi.mapping.render("#" + viewDetailPanelId, JSON.stringify(rowObject));
      });
    }; // end viewDetailRender
  }; // end constructor

  // public static method
  constructor.staticmethod = {
    hello: function () { },
  };

  return constructor;
})();
