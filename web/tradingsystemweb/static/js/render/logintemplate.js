shinobi.logintemplate = {
    build: function () {
        // autoRedirectMobile();
        shinobi.logintemplate.redirectDashboardWhenLogged();
        // shinobi.logintemplate.redirectDownloadAppMobile();
        shinobi.logintemplate.checkHasNoti();
        var submit = document.getElementById("submit");

        submit.addEventListener("click", function () {
            shinobi.logintemplate.login();
        });

        shinobi.logintemplate.autoCompleteWhenNewAccount();
        shinobi.logintemplate.sendOTPCode();
        document.querySelector('#ipUsername').addEventListener('keypress',
            function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) {
                    shinobi.logintemplate.login();
                }
            });
        document.querySelector('#ipPassword').addEventListener('keypress',
            function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) {
                    shinobi.logintemplate.login();
                }
            });
        document.querySelector('#ipOtpCode').addEventListener('keypress',
            function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) {
                    shinobi.logintemplate.login();
                }
            });



    },
    autoCompleteWhenNewAccount: function () {
        var search = shinobi.util.getAllSearchInPath();
        var username = document.getElementById('ipUsername');
        var password = document.getElementById('ipPassword');

        if (search.hasOwnProperty('loginname')) {

            username.value = search.loginname;

        }
    },
    'redirectDownloadAppMobile': function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains
        // "Android"
        if (/android/i.test(userAgent)) {
            window.location.href = "https://play.google.com/store/apps/details?id=com.aladinmobile.aladin";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = "https://apps.apple.com/app/id1474783146";
        }
    },
    'checkHasNoti': function () {
        var search = window.location.search.split('?');
        for (var i = 0; i < search.length; i++) {
            var key = 'noti=';
            if (search[i].includes(key)) {
                var content = search[i].replace(key, '');
                if (content == 'registrationsuccess') {
                    shinobi.notification.notification
                        .info('Mở tài khoản thành công. Vui lòng đăng nhập lại. ');
                }
            }
        }
    },
    'redirectDashboardWhenLogged': function () {
        shinobi.coreapi
            .checkNotCacheAuthen(function (response) {
                // console.log(response);

                if (response) {
                    shinobi.logintemplate.redirectAffterLogin();
                }
            });
    },
    redirectAffterLogin: function () {
        getUserInfo(function (res) {
            if (res.usertype == "SUPERADMIN") {
                window.location.pathname = "/private/selfemployedaccount";
            } else {
                if (res.usertype == "PM") {
                    window.location.pathname = "/private/tradingsystem";
                } else {
                    if (res.usertype == "PMALADIN") {
                        window.location.pathname = "/private/tradingsystem";
                    }

                }

            }
        })
    },
    login: function () {
        var username = document.getElementById('ipUsername');
        var password = document.getElementById('ipPassword');
        var otpcode = document.getElementById('ipOtpCode');

        if (username.value.trim() == "" || password.value.trim() == "" || otpcode.value.trim() == "") {
            [
                {
                    input: username,
                    name: 'Tên đăng nhập'
                },
                {
                    input: password,
                    name: 'Mật khẩu'
                },
                {
                    input: otpcode,
                    name: 'OTP'
                },
            ].forEach((item) => {
                if (item.input.value.trim() == "") {
                    shinobi.notification.notification
                        .error(`Vui lòng nhập đầy đủ thông tin ${item.name}!!`);
                }
            })
            return;
        } else {
            var login = {};
            login.username = username.value.trim();
            login.password = shinobi.util.sha256(password.value.trim());
            login.secureinfo = otpcode.value.trim();
            shinobi.notification.notification.loading();
            shinobi.logintemplate.requestLogin(login, "/login");
        }
    },
    requestLogin: function (login, loginurl) {

        shinobi.api
            .request(
                loginurl,
                JSON.stringify(login),
                function (data) {
                    if (data == "authen success") {
                        var request = {};
                        shinobi.logintemplate.redirectAffterLogin();
                    } else {
                        shinobi.notification.notification
                            .error("Tài khoản hoặc mật khẩu sai!!!");
                        return;
                    }
                });

    },
    sendOTPCode: function () {
        var sendButton = document.getElementById("sendOTPLogin");
        sendButton.onclick = function () {
            var username = document.getElementById("ipUsername").value;
            if (username) {
                var url = "/api/AuthenLoginByOptEmailApi/sendOtp"
                var request = {
                    "username": username,
                }
                shinobi.api.request(url, JSON.stringify(request), function (res) {
                    console.log(res);
                    shinobi.notification.notification.info("Gửi thành công!")
                });
            } else {
                shinobi.notification.notification.error("Cần nhập tên đăng nhập để gửi mã OTP!")
            }
        };
    },
};