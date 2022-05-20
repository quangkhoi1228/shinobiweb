shinobi.coreapi = {
    logo: '<span class="title is-2">CFV</span>',
    lotteryResultApi: "/api/LotteryResultApi/",
    lotteryStatisticApi: "/api/LotteryStatisticApi/",
    userApi: "/api/UserApi/",
    menuNotiApi: "/authenapi/MenuNotiApi/",
    productApi: "/api/ProductApi/",
    getSessionIdApi: "/authenapi/userapi/",

    getLoggedUser: function () {
        shinobi.coreapi.checkAuthen();
    },
    checkAuthen: function (callback) {
        var request = {};
        shinobi.cacheapi.request(shinobi.coreapi.userApi + "checkAuthen", JSON.stringify(request), function (response) {
            var data = JSON.parse(response);

            if (typeof callback == "function") {
                data ? callback(data["username"]) : callback(false);
            }
        });
    },
    checkNotCacheAuthen: function (callback) {
        var request = {};
        shinobi.api.request(shinobi.coreapi.userApi + "checkAuthen", JSON.stringify(request), function (response) {
            var data = JSON.parse(response);

            if (typeof callback == "function") {
                data ? callback(data["username"]) : callback(false);
            }
        });
    },

    requestAuthen: function (callback) {
        shinobi.coreapi.checkAuthen(function (username) {
            if (typeof callback == "function") {
                username ? callback(username) : shinobi.notification.notification.error("Vui lòng đăng nhập để thao tác");
            }
        });
    },
    reCheckAuthen: function (callback) {
        var key = shinobi.coreapi.userApi + "checkAuthen";
        if (typeof shinobi.cacheapi.cache == "object") {
            shinobi.cacheapi.clearKey(key);
        }
        shinobi.coreapi.checkAuthen(callback);
    },
    getSessionId: function (callback) {
        var request = {};
        shinobi.api.request(shinobi.coreapi.systemUserApi + "getSessionId", JSON.stringify(request), function (response) {
            if (typeof callback == "function") {
                var data = JSON.parse(response);
                if (data.hasOwnProperty("sessionid")) {
                    data["sessionid"] != -1 ? callback(data["sessionid"]) : callback(false);
                } else {
                    callback(false);
                }
            }
        });
    },
    getUserInfo: function (callback) {
        shinobi.coreapi.checkAuthen(function (username) {
            var userInfoRequest = {
                username: username,
            };
            shinobi.cacheapi.request(
                shinobi.coreapi.userApi + "getAllUserInfo",
                JSON.stringify(userInfoRequest),
                function (response) {
                    if (typeof callback == "function") {
                        callback(response);
                    }
                }
            );
        });
    },
    getLoggedUserInfo: function (callback) {
        shinobi.coreapi.checkAuthen(function (username) {
            var userInfoRequest = {
                username: username,
            };
            shinobi.cacheapi.request(
                shinobi.coreapi.loggedUserApi + "getAllUserInfo",
                JSON.stringify(userInfoRequest),
                function (response) {
                    if (typeof callback == "function") {
                        callback(response);
                    }
                }
            );
        });
    },
};