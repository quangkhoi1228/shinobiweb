shinobi.fragmentlogin = {
	href: window.location.href,
	classButtonControlSelector: 'fragment-login-button-control',
	listButtonControl: [],
	classLogoutButtonSelector: 'logout-button',
	classLoggedUserNameButtonSelector: 'logged-username-button',
	modal: '',
	modalId: 'fragmentLogin',
	init: function () {
		//add event redirect to origin page when login done
		shinobi.fragmentlogin.addEventClickLoginButton();
		shinobi.fragmentlogin.checkHasLogged(function () {
			shinobi.fragmentlogin.modal = document
				.getElementById(shinobi.fragmentlogin.modalId);
			shinobi.fragmentlogin.addEventButtonModal();
			shinobi.fragmentlogin.addEventLogout();
			shinobi.fragmentlogin.changeLoggedState();
			shinobi.fragmentlogin.showLoginSignUpButton();
		});

	},

	addEventClickLoginButton: function () {
		var loginButtons = document.querySelectorAll('.is-login-button');
		if (window.location.pathname != '/page/login') {
			loginButtons.forEach(function (button) {
				button.setAttribute('href', '/page/login?originpage=' + window.location.pathname);

			})
		}
	},

	showLoginSignUpButton: function () {
		if (JSON.stringify(document.body.classList).includes('not-logged')) {

			var signupButton = document.querySelector('.is-signup-button');
			signupButton.classList.remove('is-hidden');

			var loginButton = document.querySelector('.is-login-button');
			loginButton.classList.remove('is-hidden');
		}
	},

	loadGoogleAndFacebookLib: function () {
		window.fbAsyncInit = function () {
			FB.init({
				appId: '515882212152388',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v3.2'
			});
		};

		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},

	changeLoggedState: function () {
		shinobi.coreapi.reCheckAuthen(function (username) {

			if (username) {
				document.body.classList.add('has-logged');
				document.body.classList.remove('not-logged');

			} else {
				document.body.classList.remove('has-logged');
				document.body.classList.add('not-logged');
			}

		});
	},

	addEventLogout: function () {
		var listLogoutButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classLogoutButtonSelector);
		for (var k = 0; k < listLogoutButton.length; k++) {
			listLogoutButton[k].onclick = function () {
				shinobi.fragmentloginextension.logoutProcess(function () {
					shinobi.fragmentlogin.logoutProcess();
				});

			}

		}
	},

	logoutProcess: function () {
		shinobi.xhradapter.getResource('/logout', function (response) {

		});

		var listSignUpButton = document
			.getElementsByClassName(shinobi.fragmentsignup.classButtonControlSelector);
		for (var i = 0; i < listSignUpButton.length; i++) {
			listSignUpButton[i].classList.remove('is-hidden');
		}

		var listLogInButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classButtonControlSelector);
		for (var j = 0; j < listLogInButton.length; j++) {
			listLogInButton[j].classList.remove('is-hidden');
		}

		var listLogoutButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classLogoutButtonSelector);
		for (var k = 0; k < listLogoutButton.length; k++) {
			listLogoutButton[k].classList.remove('is-logged');
		}

		var listLoggedUserNameButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classLoggedUserNameButtonSelector);
		for (var l = 0; l < listLoggedUserNameButton.length; l++) {
			listLoggedUserNameButton[l].classList.remove('is-logged');
			listLoggedUserNameButton[l].classList.remove('is-logged');
			listLoggedUserNameButton[l].innerHTML = '';

		}

		shinobi.cacheapi.clear();
		// when clear cache => check authen has reload `
		shinobi.fragmentlogin.changeLoggedState();
		window.location.href = '/';

	},

	checkHasLogged: function (callback) {
		shinobi.coreapi.checkAuthen(function (sessionId) {
			if (sessionId) {
				shinobi.fragmentlogin.hasLoginProcess();
				shinobi.fragmentloginextension.loginProcess();
			}

			if (typeof callback == 'function') {
				callback();
			}
		});
	},

	addEventButtonModal: function () {

		shinobi.fragmentlogin.addEventLoginButton();

	},

	addEventLoginButton: function () {
		var listSelector = ['.username-input', '.password-input',
			'.login-button'];
		listSelector.forEach(function (selector) {
			var elem = shinobi.fragmentlogin.modal.querySelector(selector);
			var tagName = elem.tagName;
			switch (tagName) {
				case 'INPUT':
					shinobi.fragmentlogin.addEventLoginWhenEnter(elem);
					break;
				case 'A':
				case 'BUTTON':
					shinobi.fragmentlogin.addEventLoginWhenEnter(elem);
					shinobi.fragmentlogin.addEventLoginWhenClick(elem);
					break;
				default:
					shinobi.fragmentlogin.addEventLoginWhenClick(elem);
					break;
			}

		});

	},

	addEventLoginWhenClick: function (elem) {
		elem.onclick = function () {
			shinobi.fragmentlogin.login();
		}
	},
	addEventLoginWhenEnter: function (elem) {
		elem.addEventListener('keypress', function (e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				shinobi.fragmentlogin.login();
			}
		});
	},
	login: function () {
		var username = document.getElementsByClassName('username-input')[0];
		var password = document.getElementsByClassName('password-input')[0];
		if (username.value.trim() == "" || password.value.trim() == "") {
			shinobi.notification.notification.error("Nhập đầy đủ thông tin!");
			return;
		} else {
			var request = {};
			request.username = username.value.trim();
			request.password = shinobi.util.sha256(password.value.trim());
			request.secureinfo = "";
			shinobi.fragmentlogin.requestLogin(request, "/login");

		}
	},
	requestLogin: function (request, loginurl) {
		shinobi.notification.notification.loading();
		shinobi.api.request(loginurl, JSON.stringify(request), function (data) {
			shinobi.notification.notification.loaded();
			if (data == "authen success") {
//				shinobi.fragmentlogin.close();
				shinobi.fragmentlogin.hasLoginProcess();
				shinobi.fragmentloginextension.loginProcess();

			} else {
				shinobi.notification.notification
					.error("Tài khoản hoặc mật khẩu sai!!!");
				return;
			}
		});

	},

	hasLoginProcess: function () {
		// hidden all sign in and sign up button
		var listSignUpButton = document
			.getElementsByClassName(shinobi.fragmentsignup.classButtonControlSelector);
		for (var i = 0; i < listSignUpButton.length; i++) {
			listSignUpButton[i].classList.add('is-hidden');
		}

		var listLogInButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classButtonControlSelector);
		for (var j = 0; j < listLogInButton.length; j++) {
			listLogInButton[j].classList.add('is-hidden');
		}

		var listLogoutButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classLogoutButtonSelector);
		for (var k = 0; k < listLogoutButton.length; k++) {
			listLogoutButton[k].classList.add('is-logged');
		}

		var listLoggedUserNameButton = document
			.getElementsByClassName(shinobi.fragmentlogin.classLoggedUserNameButtonSelector);
		for (var l = 0; l < listLoggedUserNameButton.length; l++) {
			listLoggedUserNameButton[l].classList.add('is-logged');
			listLoggedUserNameButton[l].classList.add('is-loading');

		}

		shinobi.fragmentlogin.changeLoggedState();

	},
};