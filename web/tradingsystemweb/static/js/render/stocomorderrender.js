shinobi.stocomorderrender = {
    build: function () {
        var object = this;
        object.toggerCheckboxOrder();
        object.addEventCancelOrder();
    },
    addEventCancelOrder: function () {
        var object = this;
        var buttonCancel = document.getElementById('cancelorderbutton');
        var array = [];
        buttonCancel.onclick = function () {
            shinobi.notification.confirm(function () {
                var checkALl = document.getElementById('tickallorder');

                var listCheckbox = document.querySelectorAll('[snb-key-checkbox]');
                if (checkALl.checked) {
                    array.push('ALL');
                } else {
                    listCheckbox.forEach(input => {
                        if (input.checked) {
                            var value = input.getAttribute('snb-key-checkbox');
                            array.push(value);
                        }
                    })
                }
                object.cancelOrder(array);
            }, {
                title: 'Xác nhận',
                content: "Bạn muốn xác nhận hủy lệnh?",
                yesConent: "Xác nhận",
            })


        };
    },
    cancelOrder: function (list) {
        var url = "/authenapi/CreateSignalApi/cancelSignal";
        var selectSubAccount = document.getElementById('selectPM').value;
        var request = {
            allocationaccount: selectSubAccount,
            ordertype: "CANCEL",
            signaltype: "COPYTRADE",
            orderlist: list
        }
        shinobi.api.request(url, JSON.stringify(request), function (res) {
            shinobi.notification.notification.info('Hủy lệnh thành công !');
            shinobi.portfoliouserrender.build(selectSubAccount);

        })
    },
    toggerCheckboxOrder: function () {
        var elem = document.getElementById('tickallorder');
        elem.onchange = function () {
            console.log('change');
            var listCheckbox = document.querySelectorAll('[snb-key-checkbox]');
            console.log(listCheckbox);
            listCheckbox.forEach(input => {
                if (elem.checked) {
                    input.checked = true
                } else {
                    input.checked = false

                }
            })

        };

    },
};