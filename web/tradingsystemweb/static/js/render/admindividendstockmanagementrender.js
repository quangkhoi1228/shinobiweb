shinobi.admindividendstockmanagementrender = {
    table: '',
    build: function () {
        var object = this;
        object.loadTable();
    },
    renderListStock: function (cell, row, col, all) {
        var username = cell.innerHTML;
        var idTable = `tablestockcom${row}${col}`;
        cell.innerHTML = "";
        // var listStock = all[row].liststock;
        var listStock = ['ACB', 'VNM', 'TTF', 'ANV'];
        cell.innerHTML = listStock.toString();
        var dropdown = document.createElement('div');
        dropdown.setAttribute('class', 'button-eye-fixed');
        dropdown.innerHTML = `  
        <div class="dropdown ">
        <div class="dropdown-trigger">
            <button class="button  is-borderless" aria-haspopup="true"
                aria-controls="dropdown-menu3">
                <p class="icon " data-tooltip="Xem chi tiết">
                    <i class="far fa-eye"></i>

                </p>
            </button>
        </div>
        <div class="dropdown-menu min-width-table">
            <div class="dropdown-content">
                <table id="${idTable}" class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th> Mã CP </th>
                            <th>KL</th>
                            <th>Ngày phát sinh</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>1</td>
                        <td>ACB</td>
                        <td>10,000</td>
                        <td>29-12-2022 13:59</td>
                    </tr>
                </table>
            </div>
        </div>`
        cell.appendChild(dropdown);
        shinobi.initbulma.addEventDropdown();
    },
    loadTable: function (systemsubaccount) {
        var object = this;
        var datalistId = 'tablestockmanagement';
        var url = "/authenapi/ClientAccountDetailApi/findDataList";
        var request = {
            recordPerPage: shinobi.util.getRecordNumber(datalistId),
        }
        var colNames = shinobi.tableHelper.getColname(datalistId);
        var renders = shinobi.tableHelper.getRender(datalistId);

        object.table = new shinobi.table(datalistId);
        object.table.staticfilters = [];
        object.table.initLoadApi(url, request, colNames, renders);
    },
    renderButtonExecute: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.innerHTML = `
            <div>
                <button class="button is-small is-link">Xử lý</button>
            </div>
        `
    }
};