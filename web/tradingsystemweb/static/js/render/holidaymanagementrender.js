shinobi.holidaymanagementrender = {
    multivalueinput: '',
    init: function () {
        shinobi.holidaymanagementrender.createStructure(function () {
            shinobi.holidaymanagementrender.confirmOffDate();
            shinobi.holidaymanagementrender.activeTab();
        });
    },

    activeTab: function () {
        getUserInfo(function (response) {
            var infoUser = response;
            var usertype = infoUser.usertype;
            var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="/private/holidaymanagement"`);
            tab.classList.add("is-active");
        });
    },

    createStructure: function (callback) {
        shinobi.holidaymanagementrender.getDayoffList(function (response) {
            shinobi.holidaymanagementrender.multivalueinput = new shinobi.multivalueinput(
                'input[snb-key="datelist"]', {
                buildSearch: function (object) {

                    object.inputSearch.setAttribute('placeholder', 'Thêm ngày');
                    object.inputSearch.setAttribute('type', 'date');

                    shinobi.util.addEventEnter(object.inputSearch, function () {
                        shinobi.holidaymanagementrender.appendChildItem(object);
                    });
                    object.inputSearch.onblur = function () {
                        shinobi.holidaymanagementrender.appendChildItem(object);
                    };
                },
                renderItem: function (result) {
                    return shinobi.util.reverseFormatDate(result.substring(1, result.length - 1), {
                        format: 'dd/MM/yyyy',
                        reverseFormat: 'yyyy-MM-dd'
                    });
                },
                setListResult: function (input) {
                    var dateoffList = response;
                    return dateoffList;
                }
            });
        });

        if (callback) {
            callback();
        }
    },

    getDayoffList: function (callback) {
        shinobi.api.request("/authenapi/SystemConfigApi/getTradingOffDate", '{}', function (res) {
            res = JSON.parse(res);
            dateoff = JSON.parse(res).dateoff;

            if (callback) {
                callback(dateoff);
            }
        });
    },

    appendChildItem: function (object) {
        var result = object.inputSearch.value.trim();
        if (result.length >= 10) {
            object.appendChildItem(result, object);
            object.inputSearch.value = '';
        }
    },

    getDateList: function (input) {
        if (input.trim() == '') {
            return [];
        } else {
            var list = input.split(',');
            list.forEach(function (item, index) {
                console.log(item);
                list[index] = item.substring(1, item.length - 1);
            })
            return list;
        }
    },

    renderListInput: function (elem, value, all) {
        var object = shinobi.holidaymanagementrender.multivalueinput;
        elem.value = value;
        var listItem = value;
        shinobi.holidaymanagementrender.resetElemMultivalue();

        listItem.forEach(result => {
            shinobi.holidaymanagementrender.multivalueinput.appendChildItem(result, object);
        });

    },

    confirmOffDate: function () {
        var button = document.getElementById("confirm");
        button.onclick = function () {
            var result = shinobi.holidaymanagementrender.multivalueinput.result;
            var dateList = [];
            result.forEach(date => {
                date = JSON.parse(date);
                dateList.push(date);
            });

            var url = "/authenapi/SystemConfigApi/updateTradingOffDate";
            var request = {
                "tradingDateOffString": JSON.stringify(dateList),
            };

            shinobi.notification.notification.loading();
            if (request.tradingDateOffString != '[]') {
                shinobi.api.request(url, JSON.stringify(request), function (res) {
                    console.log(res);

                    if (res == 'update success') {
                        shinobi.notification.notification.loaded();
                        shinobi.notification.notification.info("Cập nhật thành công");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1500)
                    }
                })
            } else {
                shinobi.notification.notification.error("Ngày không hợp lệ!");
            }
        }
    },
};