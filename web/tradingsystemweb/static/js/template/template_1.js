shinobi.template_1 = {
    listBackground: ['staticpage-background1.jpg', 'staticpage-background2.jpg', 'staticpage-background3.jpg', 'staticpage-background4.jpg'],
    init: function () {
        var object = this;
        object.checkLogin();
        object.renderHeader();
    },

    checkLogin: function () {
        var object = this;
        shinobi.coreapi.checkAuthen(function () {
            object.getInfoLogin();
        })
    },
    getInfoLogin: function (callback) {
        var url = "/authenapi/SystemUserApi/getInfoLogin";
        var request = {};
        shinobi.cacheapi.request(url, JSON.stringify(request), function (res) {
            window.localStorage.infoUser = res;
            if (callback) {
                callback(window.localStorage.infoUser);
            }
        })
    },
    renderHeader: function () {
        var object = this;
        object.getInfoLogin(function (stringUser) {
            shinobi.mapping.render('#navbarBasicExample', stringUser);
        });
    },
};