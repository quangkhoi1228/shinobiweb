shinobi.datalist = (function() {

    // private static variable
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

    var sortDescIcon = "<i class='fas fa-sort-down'></i>";
    var sortAscIcon = "<i class='fas fa-sort-up'></i>";
    var sortIcon = "<i class='fas fa-sort'></i>";

    // constructor
    var constructor = function(tableid) {

        this.loadingContainer = '';

        this.url = "";

        this.colNames = [];

        this.filters = [];

        this.staticfilters = [];

        this.sorts = [];

        this.paramsList = '';

        this.staticsorts = [];

        this.renders = [];

        this.tableRows = [];

        this.pageNum = 1;

        this.recordPerPage = 10;

        this.pageTotal = 10;

        this.rowTotal = 10;

        this.tableNode = document.getElementById(tableid);

        this.tableContainerNode = this.tableNode.parentNode;

        this.sampleNode = this.tableNode.querySelector("[snb-datalist-parent=" + this.tableNode
            .getAttribute("snb-datalist-node") +
            "]");

        this.pageNumNode = this.tableContainerNode
            .querySelector(curPagePaginationClass);

        this.recordPerPageNode = this.tableContainerNode
            .querySelector(recordPerPageClass);

        this.getColnames = function() {
            var table = document.getElementById(tableid);

            var colNames = table.querySelectorAll("[" + colnameAttribute + "]");

            var headerColnames = [];
            for (var i = 0; i < colNames.length; i++) {
                var colElem = colNames[i];
                headerColnames[i] = colElem.getAttribute(colnameAttribute);
            }

            return headerColnames;
        };

        this.registerSorts = function() {
            var sortElems = this.tableNode.querySelectorAll("[" + sortAttribute +
                "]");

            for (var i = 0; i < sortElems.length; i++) {
                var sortElem = sortElems[i];

                this.registerSort(sortElem);
            }
        };

        this.registerPagination = function() {

            var parentNode = this.tableNode.parentNode;

            this.paginationContainer = parentNode
                .querySelector(paginationClass);
        };

        this.updatePagination = function(data) {

            shinobi.mapping.renderElement(this.paginationContainer, JSON
                .parse(data));

            if (JSON.parse(data).pageNum) {

                var currentPage = this.paginationContainer
                    .querySelectorAll(curPagePaginationClass)[0];
                if (JSON.parse(data).pageTotal == 0) {

                    currentPage.value = 0;

                } else {

                    currentPage.value = JSON.parse(data).pageNum;

                }
            }

        };

        this.registerSort = function(sortElem) {

            var table = this;

            sortElem.addEventListener("click", function() {
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

        this.getSorts = function() {
            this.sorts = [];

            this.sorts = this.sorts.concat(this.staticsorts);

            var sortElems = this.tableNode.querySelectorAll("[" + sortAttribute +
                "]");

            for (var i = 0; i < sortElems.length; i++) {
                var sortElem = sortElems[i];

                var colName = sortElem.parentNode
                    .getAttribute(colnameAttribute);
                var currentSortValue = sortElem.getAttribute(sortAttribute);

                if ("" !== currentSortValue) {
                    var sort = {};
                    sort.colname = colName;
                    sort.value = currentSortValue;

                    this.sorts.push(sort);
                }

            }

        };

        this.registerHeaders = function() {
            var tableElem = document.getElementById(tableid);
            var headers = tableElem.querySelectorAll("[" + colcontrolAttribute +
                "]");

            for (var i = 0; i < headers.length; i++) {
                var header = headers[i];

                this.registerHeader(header);
            }
        };

        this.registerHeader = function(header) {
            var title = header.innerHTML;

            var table = this;

            header.addEventListener("dblclick", function() {

                var childNode = this.childNodes[0];

                if (childNode.nodeType == 3) {

                    if (this.querySelector("input") !== null) {
                        // this.innerHTML = title;
                        table.removeFilterControls(this);

                        table.resetPageNum();

                        table.reloadApi(table.pageNum);

                        return;
                    }

                    var select = document.createElement("select");
                    table.addFilterToElement(select, this);

                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("value", "");
                    input.style.width = this.offsetWidth + "px";

                    // this.removeChild(this.childNodes[0]);
                    this.appendChild(document.createElement("br"));
                    this.appendChild(select);
                    this.appendChild(input);
                }
            });

            header.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    var currentvalue = this.querySelector("input").value;

                    if (currentvalue == "") {
                        // this.innerHTML = title;
                        table.removeFilterControls(this);
                    }

                    table.resetPageNum();

                    table.reloadApi(table.pageNum);

                }
            });

        };

        this.removeFilterControls = function(elem) {
            var br = elem.querySelector("br");
            var select = elem.querySelector("select");
            var input = elem.querySelector("input");

            elem.removeChild(br);
            elem.removeChild(select);
            elem.removeChild(input);
        };

        this.resetPageNum = function() {
            this.pageNum = 1;
            this.pageNumNode.value = 1;
        };

        this.addFilterToElement = function(select, node) {

            var datatype = node.getAttribute("snb-datatype");

            var textArr = [];
            var valueArr = [];

            if (datatype === "number") {
                textArr = ["=", ">", ">=", "<", "<="];
                valueArr = ["equal", ">", ">=", "<", "<="];
            } else {
                textArr = ["=", "like"];
                valueArr = ["equal", "like"];
            }

            for (var i = 0; i < textArr.length; i++) {
                var option = document.createElement("option");
                option.text = textArr[i];
                option.value = valueArr[i];
                select.appendChild(option);
            }

        };

        this.registerRecordPerPage = function() {
            var table = this;

            this.recordPerPageNode.addEventListener("change", function() {
                table.resetPageNum();
                table.reloadApi(table.pageNum);
            });
        };

        this.registerPrevPagination = function() {

            var parentNode = this.tableNode.parentNode;

            var prevPagination = parentNode.querySelector(prevPaginationClass);

            var table = this;

            prevPagination.addEventListener("click", function() {
                var currentPageNode = parentNode
                    .querySelector(curPagePaginationClass);
                var currentPage = currentPageNode.value;

                if (currentPage > 1) {
                    var pageNum = currentPage - 1;

                    currentPageNode.value = pageNum;

                    table.reloadApi(pageNum);
                }

            });

        };

        this.registerNextPagination = function() {
            var parentNode = this.tableNode.parentNode;

            var nextPagination = parentNode.querySelector(nextPaginationClass);

            var table = this;

            nextPagination.addEventListener("click", function() {
                var currentPageNode = parentNode
                    .querySelector(curPagePaginationClass);
                var currentPage = Number(currentPageNode.value);

                if (currentPage < table.pageTotal) {
                    var pageNum = currentPage + 1;
                    currentPageNode.value = pageNum;

                    table.reloadApi(pageNum);
                }
            });
        };

        this.registerCurrentPageEvent = function() {
            var parentNode = this.tableNode.parentNode;

            var currentPageNode = parentNode
                .querySelector(curPagePaginationClass);

            var table = this;
            currentPageNode.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    var curPageNum = Number(currentPageNode.value);

                    if (curPageNum > 0 && curPageNum <= table.pageTotal) {
                        table.reloadApi(curPageNum);
                    }
                }
            });

        };

        this.registerPagination();

        this.registerPrevPagination();
        this.registerNextPagination();
        this.registerCurrentPageEvent();
        this.registerRecordPerPage();

        this.viewDetailPanelId = "";

        // public instance method
        this.renderTable = function(list, callback, options) {


            var table = this;
            var containerNodeValue = this.tableNode
                .getAttribute("snb-datalist-node");


            // if (childNode) {
            // 	table.sampleNode = childNode;
            // }

            table.clear();

            var childNode = this.tableNode
                .querySelector("[snb-datalist-parent=" + containerNodeValue +
                    "]");

            if (childNode) {
                table.tableNode.removeChild(childNode);
            }
            childNode = table.sampleNode;
            var currentlength = 0;
            if (options && options.hasOwnProperty('lazyload') && options.lazyload == true) {
                var lazyloadSplitDataLength = (options.hasOwnProperty('lazyloadSplitDataLength')) ? options.lazyloadSplitDataLength : 20;
                var lazySplitDataInterval = (options.hasOwnProperty('lazySplitDataInterval')) ? options.lazySplitDataInterval : 20;

                table.insertListInterval = setInterval(function() {
                    var listData;
                    if (list.length < lazyloadSplitDataLength) {
                        listData = list;
                        list = [];
                    } else {
                        listData = list.splice(0, lazyloadSplitDataLength);
                    }
                    currentlength += listData.length;
                    table.renderTableListData(listData, childNode, options);

                    if (list.length == 0) {
                        clearInterval(table.insertListInterval);
                    }

                }, lazySplitDataInterval);

            } else {

                table.renderTableListData(list, childNode);
            }

            if (list.length == 0) {
                table.tableNode.innerHTML = '<i>Chưa có dữ liệu</i>';
            }

            // this.updatePageTotal();

            if (typeof callback === 'function') {
                callback();
            }

        };

        this.renderTableListData = function(list, childNode, options) {
            for (var i = 0; i < list.length; i++) {
                var clonedNode = childNode.cloneNode(true);
                var json = list[i];
                clonedNode.setAttribute("rowid", i);
                shinobi.mapping.renderElement(clonedNode, json);
                if (options && options.hasOwnProperty('insertType')) {
                    if (options['insertType'] == 'start') {
                        this.tableNode.insertBefore(clonedNode, this.tableNode.firstElementChild);
                    } else {
                        this.tableNode.appendChild(clonedNode);
                    }
                } else {
                    this.tableNode.appendChild(clonedNode);
                }
            }
        };

        this.initLoadApi = function(url, request, callback) {
            if (this.tableNode.tagName == 'TBODY') {
                this.loadingContainer = this.tableContainerNode;
            } else {
                this.loadingContainer = this.tableNode;
            }
            this.loadingContainer.classList.add('snb-datalist-item-container');
            var table = this;
            request.pageNum = 1;

            this.filters = this.filters.concat(this.staticfilters);
            this.sorts = this.sorts.concat(this.staticsorts);

            request.filters = this.filters;
            request.sorts = this.sorts;

            if (this.paramsList != '') {

                request.paramsList = this.paramsList;
            }

            table.loading();

            shinobi.api.request(url, JSON.stringify(request), function(data) {
                var content = JSON.parse(data);

                var tableContent = content.data;

                table.url = url;
                table.rowTotal = content.rowTotal;
                table.pageNum = content.pageNum;
                table.recordPerPage = content.recordPerPage;
                table.pageTotal = content.pageTotal;
                table.tableRows = tableContent;

                table.loaded();

                table.renderTable(tableContent, callback);

                table.updatePagination(data);
            });
        };

        this.reloadApi = function(pageNum, callback) {

            var table = this;

            this.getTableFilters();
            this.getSorts();
            this.recordPerPage = this.recordPerPageNode.value;

            var request = {};
            request.recordPerPage = this.recordPerPage;
            request.pageNum = (pageNum) ? pageNum : this.pageNum;
            request.filters = this.filters;
            request.sorts = this.sorts;

            if (this.paramsList != '') {

                request.paramsList = this.paramsList;
            }
            // add loading animation when call api
            // table.clear();
            table.loading();
            shinobi.api.request(this.url, JSON.stringify(request), function(
                data) {
                var content = JSON.parse(data);
                var tableContent = content.data;
                table.rowTotal = content.rowTotal;
                table.pageNum = content.pageNum;
                table.recordPerPage = content.recordPerPage;
                table.pageTotal = content.pageTotal;
                table.tableRows = tableContent;

                if (table.pageNum <= table.pageTotal ||
                    (table.pageTotal == 0 && table.pageNum == 1)) {
                    table.loaded();
                    table.renderTable(tableContent, callback);

                    table.updatePagination(data);

                } else {
                    table.reloadApi(table.pageTotal);
                }

            });
        };

        this.loading = function() {
            if (this.sampleNode != '') {
                this.sampleNode.classList.add('is-hidden');
            }

            this.changeState('loading');
        };
        this.loaded = function() {
            if (this.sampleNode != '') {
                this.sampleNode.classList.remove('is-hidden');
            }
            this.changeState('loaded');
        };

        this.changeState = function(action) {
            var buttonPrimary = document.querySelector('.button.is-primary');
            var primaryColor = (buttonPrimary) ? shinobi.util.getComputedProperty(buttonPrimary, 'background-color') : '#555';
            var style = document.createElement('style');
            style.setAttribute('class', 'table-node-loading-inline-style');
            style.innerHTML = `.is-borderless{
				border: none;
			}
			@-webkit-keyframes spin {
				0% {
					-webkit-transform: rotate(0deg);
				}
		
				100% {
					-webkit-transform: rotate(360deg);
				}
			}
		
			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
		
				100% {
					transform: rotate(360deg);
				}
			}
		
			.snb-datalist-item-container.is-loading {
				position: relative;
				min-height: 5rem;
			}
		
			.snb-datalist-item-container.is-loading::before {
				position: absolute;
				content: '';
				width: 100%;
				height: 100%;
				background: #ddd;
				z-index: 1;
				opacity: 0.3;
			}
		
			.snb-datalist-item-container.is-loading::after {
				position: absolute;
				content: '';
				border: 7px solid white;
				border-radius: 50%;
				border-top: 7px solid ${primaryColor};
				width: 4rem;
				height: 4rem;
				-webkit-animation: spin 2s linear infinite;
				animation: spin 1s linear infinite;
				left: calc(48% - 8px);
				top: calc(48% - 8px);
				z-index: 2;
			}
			`;

            var table = this;
            // var listClass = ['button', 'is-loading', 'is-primary',
            // 	'is-borderless', 'is-outlined'];
            table.tableNode.appendChild(style);
            if (action == 'loading') {
                table.loadingContainer.classList
                    .add('is-loading');
            } else {
                table.loadingContainer.classList
                    .remove('is-loading');
            }
            // listClass.forEach(function (classItem) {

            // 	(action == 'loading') ? table.tableNode.classList
            // 		.add(classItem) : table.tableNode.classList
            // 			.remove(classItem);
            // });

        };

        // public instance method
        this.clear = function() {

            clearInterval(this.insertListInterval);

            var node = this.tableNode;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }

            node.appendChild(this.sampleNode);

        };

        this.updatePageTotal = function() {

            var parentNode = this.tableNode.parentNode;
            var pageTotalNode = parentNode.querySelector(pageTotalClass);

            pageTotalNode.innerHTML = this.pageTotal;

            if (this.pageNum > this.pageTotal) {
                this.pageNum = this.pageTotal;

                var pageNumNode = parentNode
                    .querySelector(curPagePaginationClass);
                pageNumNode.value = this.pageNum;
            }
        }

        // public instance method
        this.getRowObject = function(rowid) {
            return this.tableRows[rowid];
        };

        this.getTableFilters = function() {
            var table = document.getElementById(tableid);
            var headerFilters = table
                .querySelectorAll("[snb-header-control] > input");

            this.filters = [];

            this.filters = this.filters.concat(this.staticfilters);

            this.pageNum = 1;

            for (var i = 0; i < headerFilters.length; i++) {
                var inputElem = headerFilters[i];
                var currentvalue = inputElem.value;
                var parentNode = inputElem.parentNode;

                var select = parentNode.querySelector("select");
                var operator = select.options[select.selectedIndex].value;

                var filter = {};
                filter.colname = parentNode.getAttribute(colnameAttribute);
                filter.operator = operator;
                filter.value = currentvalue;

                if (currentvalue !== "") {
                    this.filters.push(filter);
                }

            }

        };

        // public instance method
        this.viewDetailRender = function(cell, rowindex, colindex, tableRows) {
            var button = document.createElement("a");
            button.setAttribute("class", "button is-small");
            button.innerHTML = "<span class='icon'> <i class='fa fa-search'></i></span>";
            cell.appendChild(button);

            var rowid = cell.getAttribute("rowid");

            var rowNode = cell.parentNode;

            var viewDetailPanelId = rowNode.getAttribute(detailIdKey);

            var rowObject = tableRows[rowid];

            button.addEventListener("click", function() {

                shinobi.mapping.render("#" + viewDetailPanelId, JSON
                    .stringify(rowObject));

            });
        }; // end viewDetailRender

    }; // end constructor

    // public static method
    constructor.staticmethod = {
        'hello': function() {

        }
    }

    return constructor;
})();