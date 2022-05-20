shinobi.fragmentchangepassword = {
	classButtonControlSelector : 'fragment-change-password-button-control',
	listButtonControl : [],
	modal : '',
	modalId : 'fragmentChangePassword',
	init : function() {
		shinobi.fragmentchangepassword.modal = document
				.getElementById(shinobi.fragmentchangepassword.modalId);
		shinobi.fragmentchangepassword.addEventListButtonControl();
		shinobi.fragmentchangepassword.addEventButtonModal();
		// shinobi.fragmentchangepassword.addEventLogout();
		// shinobi.fragmentchangepassword.changeLoggedState();

	},

	addEventButtonModal : function() {

		shinobi.fragmentchangepassword.addEventChangePasswordButton();
	},
	addEventChangePasswordButton : function() {
		var button = shinobi.fragmentchangepassword.modal
				.getElementsByClassName('submit-button')[0];

		shinobi.fragmentchangepassword.addEventButtonWhenClick(button);
		shinobi.fragmentchangepassword.addEventButtonWhenEnter(button);

	},

	addEventButtonWhenClick : function(elem) {
		elem.onclick = function() {
			shinobi.fragmentchangepassword.changePasswordProcess();
		}
	},
	addEventButtonWhenEnter : function(elem) {
		elem.addEventListener('keypress', function(e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				shinobi.fragmentchangepassword.changePasswordProcess();
			}
		});
	},
	changePasswordProcess : function() {
		var oldPasswordInput = shinobi.fragmentchangepassword.modal
				.getElementsByClassName('old-password-input')[0];
		var newPasswordInput = shinobi.fragmentchangepassword.modal
				.getElementsByClassName('new-password-input')[0];
		var confirmPasswordInput = shinobi.fragmentchangepassword.modal
				.getElementsByClassName('confirm-password-input')[0];
		if (confirmPasswordInput.value.trim() == ""
				|| newPasswordInput.value.trim() == ""
				|| oldPasswordInput.value.trim() == "") {
			shinobi.notification.notification.error("Nhập đầy đủ thông tin!");
			return;
		} else if (confirmPasswordInput.value.trim() != newPasswordInput.value
				.trim()) {
			shinobi.notification.notification
					.error("Mật khẩu mới và xác nhận mật khẩu không giống nhau!");
			return;

		} else {
			shinobi.notification.confirm(function() {
				var request = {};
				request.oldpassword = shinobi.util
						.sha256(oldPasswordInput.value.trim());
				request.newpassword = shinobi.util
						.sha256(newPasswordInput.value.trim());
				shinobi.fragmentchangepassword.sendRequest(request);
			}, {
				title : 'Xác nhận',
				content : 'Bạn chắc chắn',

			});

		}
	},
	sendRequest : function(request) {
		shinobi.notification.notification.loading();
		shinobi.api.request(shinobi.coreapi.userApi + 'changeUserPassword',
				JSON.stringify(request), function(response) {
					shinobi.notification.notification.loaded();

					if (response == "update success") {
						shinobi.notification.notification
								.info('Đổi mật khẩu thành công');
						shinobi.fragmentchangepassword.close();
					}
				});

	},

	addEventListButtonControl : function() {
		shinobi.fragmentchangepassword.listButtonControl = document
				.getElementsByClassName(shinobi.fragmentchangepassword.classButtonControlSelector);

		for (var i = 0; i < shinobi.fragmentchangepassword.listButtonControl.length; i++) {
			var button = shinobi.fragmentchangepassword.listButtonControl[i];
			button.onclick = function() {
				shinobi.fragmentchangepassword.open();
			}
		}

	},

	open : function() {
		if (shinobi.fragmentchangepassword.modal != '') {
			shinobi.fragmentchangepassword.modal.classList.add('is-active');

		}
	},

	close : function() {
		if (shinobi.fragmentchangepassword.modal != '') {
			shinobi.fragmentchangepassword.modal.classList.remove('is-active');
		}
	},
};