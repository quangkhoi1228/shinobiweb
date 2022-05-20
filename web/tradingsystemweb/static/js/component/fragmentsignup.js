shinobi.fragmentsignup = {
	classButtonControlSelector : 'fragment-sign-up-button-control',
	listButtonControl : [],
	modal : '',
	modalId : 'fragmentSignUp',
	intlTelInput : '',
	hasCheckTrashMail : true,
	init : function() {

		shinobi.fragmentsignup.modal = document
				.getElementById(shinobi.fragmentsignup.modalId);
		shinobi.fragmentsignup.addEventListButtonControl();
		shinobi.fragmentsignup.renderSelectPhoneTelephoneInput();
		shinobi.fragmentsignup.addEventButtonModal();

	},

	renderSelectPhoneTelephoneInput : function() {

		var input = shinobi.fragmentsignup.modal
				.getElementsByClassName('phone-number-input')[0];
		shinobi.fragmentsignup.intlTelInput = window.intlTelInput(input, {
			// allowDropdown: false,
			// autoHideDialCode: false,
			autoPlaceholder : "off",
			dropdownContainer : document.body,
			// excludeCountries: ["us"],
			// formatOnDisplay: false,
			// geoIpLookup: function(callback) {
			// $.get("http://ipinfo.io", function() {},
			// "jsonp").always(function(resp) {
			// var countryCode = (resp && resp.country) ? resp.country : "";
			// callback(countryCode);
			// });
			// },
			// hiddenInput: "full_number",
			initialCountry : "vn",
			// localizedCountries: { 'de': 'Deutschland' },
			// nationalMode: false,
			// onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
			// placeholderNumberType: "MOBILE",
			// preferredCountries: ['cn', 'jp'],
			// separateDialCode: true,
			utilsScript : "/static/js/library/intlTelInputUtil.js",
		});
	},

	addEventButtonModal : function() {
		shinobi.fragmentsignup.addEventSignUpButton();
		shinobi.fragmentsignup.signUpWithFacebook();
		shinobi.fragmentsignup.signUpWithGoogle();

	},

	signUpWithGoogle : function() {
		var button = shinobi.fragmentsignup.modal
				.querySelector('.google-button');
		gapi
				.load(
						'auth2',
						function() {
							// Retrieve the singleton for the GoogleAuth library
							// and set up the client.
							var auth2 = gapi.auth2
									.init({
										client_id : '92469729159-a402g2mqs9o0bje69k6gr2lheun6beer.apps.googleusercontent.com',
										cookiepolicy : 'single_host_origin',

									});

							auth2
									.attachClickHandler(
											button,
											{},
											function(googleUser) {

												var profile = googleUser
														.getBasicProfile();

												var accessToken;
												if (googleUser.Zi) {
													accessToken = googleUser.Zi.access_token;
												}
												if (googleUser.tc) {
													accessToken = googleUser.tc.access_token;
												}
												if (accessToken) {
													var password = shinobi.util
															.sha256(accessToken);
													var phonenumber = Math
															.floor(Math
																	.random()
																	* (999999999 - 100000000)
																	+ 100000000);

													var lastName = (googleUser.w3) ? googleUser.w3.ofa
															: googleUser.Pt.CU;
													var firstName = (googleUser.w3) ? googleUser.w3.wea
															: googleUser.Pt.BW;
													var username = (googleUser.El) ? googleUser.El
															: googleUser.Ca;
													var mappingJson = {
														lastname : lastName,
														firstname : firstName,
														email : profile
																.getEmail(),
														phonenumber : phonenumber,
														password : password,
														confirmPassword : password,
														username : "gg_"
																+ username,
														acceptRule : true,
													};

													var formContainer = shinobi.fragmentsignup.modal
															.getElementsByClassName('form-container')[0];

													shinobi.mapping
															.renderElement(
																	formContainer,
																	mappingJson);
													var signUpOption = {
														method : 'google',
														data : mappingJson,
													};
													shinobi.fragmentsignup
															.signup(signUpOption);

												} else {
													shinobi.notification.notification
															.error('Không thể kết nối với Google');
												}

											}, function(error) {
												alert(JSON.stringify(error,
														undefined, 2));
											});
						});
	},

	signUpWithFacebook : function() {
		var button = shinobi.fragmentsignup.modal
				.querySelector('.facebook-button');
		button.onclick = function() {
			FB
					.login(
							function(responseLogin) {
								if (responseLogin.authResponse) {
									var authResponse = responseLogin.authResponse;
									var accessToken = authResponse.accessToken;
									var userID = authResponse.userID;

									FB
											.api(
													'/' + userID,
													'GET',
													{
														"fields" : "id,first_name, last_name,birthday,email,hometown,location"
													},
													function(response) {

														var password = shinobi.util
																.sha256(accessToken);
														var phonenumber = Math
																.floor(Math
																		.random()
																		* (999999999 - 100000000)
																		+ 100000000);

														var mappingJson = {
															lastname : response.last_name,
															firstname : response.first_name,
															email : response.email,
															phonenumber : phonenumber,
															password : password,
															confirmPassword : password,
															username : "fb_"
																	+ userID,
															acceptRule : true,
														};

														var formContainer = shinobi.fragmentsignup.modal
																.getElementsByClassName('form-container')[0];
														shinobi.mapping
																.renderElement(
																		formContainer,
																		mappingJson);
														var signUpOption = {
															method : 'facebook',
															data : mappingJson,
														};
														shinobi.fragmentsignup
																.signup(signUpOption);

													});
								} else {
									shinobi.notification.notification
											.error('Không thể kết nối với Facebook');
								}

							},
							{
								scope : 'user_birthday, email, user_hometown, user_gender, user_location'
							});
		}
	},

	addEventSignUpButton : function() {

		var signUpButton = shinobi.fragmentsignup.modal
				.querySelector('.signup-button');
		shinobi.fragmentsignup.addEventWhenClick(signUpButton);
		shinobi.fragmentsignup.addEventWhenEnter(signUpButton);
	},

	addEventWhenClick : function(elem) {
		elem.onclick = function() {
			shinobi.fragmentsignup.signup();
		}
	},
	addEventWhenEnter : function(elem) {
		elem.addEventListener('keypress', function(e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				shinobi.fragmentsignup.signup();
			}
		});
	},
	signup : function(signUpOption) {

		var request = shinobi.fragmentsignup.getInput();

		shinobi.fragmentsignup.checkInput(request, function(signUpRequest) {

			shinobi.fragmentsignup.sendRequest(signUpRequest);
		}, signUpOption);
	},

	sendRequest : function(signUpRequest) {
		shinobi.notification.notification.loading();
		shinobi.api.request(shinobi.coreapi.userApi + "createNewUser", JSON
				.stringify(signUpRequest), function(signUpResponse) {
			if (signUpResponse == 'update success') {
				shinobi.notification.notification.loaded();
				shinobi.fragmentsignup.checkMailProcess(signUpRequest);
				shinobi.fragmentsignup.showCheckMailModal(signUpRequest);
				shinobi.fragmentsignup.close()

			}
		});
	},

	showCheckMailModal : function(request) {
		var content = '<p>Xin chào <b>'
				+ request['lastname']
				+ ' '
				+ request['firstname']
				+ '</b>,<br>'
				+ 'Chúng tôi đã gửi mã xác nhận đến email: <b>'
				+ request['email']
				+ '</b><br>Vui lòng xác nhận địa chỉ email để hoàn tất đăng ký tài khoản.<br>Trân trọng. </p>';
		shinobi.notification.confirm(function() {

		}, {
			title : 'Xác nhận email',
			content : content,
			ishiddenfooter : true,
			modalsize : 'is-medium',
		});
	},
	checkMailProcess : function(signUpRequest) {
		if (shinobi.fragmentsignup.hasCheckTrashMail) {
			shinobi.api.request(shinobi.coreapi.mailApi + "sendMail", JSON
					.stringify(signUpRequest), function(sendMailResponse) {

			});
		}
	},

	getInput : function() {
		var formContainer = shinobi.fragmentsignup.modal
				.getElementsByClassName('form-container')[0];

		var listSnbKey = formContainer.querySelectorAll('[snb-key]');
		var request = {};
		for (var i = 0; i < listSnbKey.length; i++) {

			var key = listSnbKey[i].getAttribute('snb-key');
			var value = shinobi.util.getValueInput(listSnbKey[i]);
			request[key] = value;

		}
		return request;
	},

	checkInput : function(request, callback, signUpOption) {

		var formContainer = shinobi.fragmentsignup.modal
				.getElementsByClassName('form-container')[0];
		var hasFillAllInput = true;
		var entries = Object.entries(request);
		entries
				.forEach(function(item) {
					var key = item[0];
					var value = item[1];
					var elem = formContainer.querySelector('[snb-key="' + key
							+ '"]');
					if (typeof value == 'string' && value == ''
							|| typeof value == 'boolean' && value == false) {
						shinobi.notification.notification
								.error('Nhập đầy đủ thông tin và đồng ý các điều khoản');
						elem.classList.add('is-danger');
						hasFillAllInput = false;
					} else {
						elem.classList.remove('is-danger');
					}

				});

		if (hasFillAllInput) {
			if (request['password'] == request['confirmPassword']) {
				request['password'] = shinobi.util.sha256(request['password']);
				request['confirmPassword'] = shinobi.util
						.sha256(request['confirmPassword']);
				request['phonereligion'] = shinobi.fragmentsignup
						.getInternationalTelephoneCode();
				request['country'] = shinobi.fragmentsignup
						.getInternationalTelephoneCountry();
				if (signUpOption) {
					var method = signUpOption['method'];
					switch (method) {
					case 'google':
					case 'facebook':
						request['username'] = signUpOption['data']['username'];
						break;
					default:
						request['username'] = request['email'];
						break;
					}
				} else {
					request['username'] = request['email'];
				}

				if (typeof callback == 'function') {
					callback(request);
				}
			} else {
				shinobi.notification.notification
						.error('Xác nhận mật khẩu không trùng khớp');
			}
		}
	},

	getInternationalTelephoneCode : function() {
		return shinobi.util
				.getInternationalTelephoneCode(shinobi.fragmentsignup.intlTelInput);
	},
	getInternationalTelephoneCountry : function() {
		return shinobi.util
				.getInternationalTelephoneCountry(shinobi.fragmentsignup.intlTelInput);
	},

	addEventListButtonControl : function() {
		shinobi.fragmentsignup.listButtonControl = document
				.getElementsByClassName(shinobi.fragmentsignup.classButtonControlSelector);

		for (var i = 0; i < shinobi.fragmentsignup.listButtonControl.length; i++) {
			var button = shinobi.fragmentsignup.listButtonControl[i];
			button.onclick = function() {
				// hidden login modal
				shinobi.fragmentlogin.close();
				// show sign up modal
				shinobi.fragmentsignup.open();
			}
		}

	},
	open : function() {
		if (shinobi.fragmentsignup.modal != '') {
			shinobi.fragmentsignup.modal.classList.add('is-active');
		}

	},

	close : function() {
		if (shinobi.fragmentsignup.modal != '') {
			shinobi.fragmentsignup.modal.classList.remove('is-active');
		}
	},
};