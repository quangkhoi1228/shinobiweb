shinobi.fragmentforgotpassword = {
	classButtonControlSelector : 'fragment-forgot-password-button-control',
	listButtonControl : [],
	classLogoutButtonSelector : 'logout-button',
	classLoggedUserNameButtonSelector : 'logged-username-button',
	modal : '',
	modalId : 'fragmentForgotPassword',
	init : function() {

		shinobi.fragmentforgotpassword.modal = document
				.getElementById(shinobi.fragmentforgotpassword.modalId);
		shinobi.fragmentforgotpassword.modal
				.getElementsByClassName('note-field')[0].classList
				.add('is-hidden');
		shinobi.fragmentforgotpassword.addEventListButtonControl();
		shinobi.fragmentforgotpassword.addEventButtonModal();

	},

	addEventButtonModal : function() {

		shinobi.fragmentforgotpassword.addEventSubmitButton();

	},

	addEventSubmitButton : function() {
		var button = shinobi.fragmentforgotpassword.modal
				.getElementsByClassName('submit-button')[0];
		shinobi.fragmentforgotpassword.addEventWhenClick(button);
		shinobi.fragmentforgotpassword.addEventWhenEnter(button);

	},

	addEventWhenClick : function(elem) {
		elem.onclick = function() {
			shinobi.fragmentforgotpassword.request();
		}
	},
	addEventWhenEnter : function(elem) {
		elem.addEventListener('keypress', function(e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				shinobi.fragmentforgotpassword.request();
			}
		});
	},
	request : function() {
		var emailInput = shinobi.fragmentforgotpassword.modal
				.querySelector('input[snb-key="email"]');
		if (emailInput.value.trim() == "") {
			shinobi.notification.notification.error("Nhập đầy đủ thông tin!");
			return;
		} else {
			var request = {};
			request.email = emailInput.value.trim();
			shinobi.notification.notification.loading();
			shinobi.api.request(shinobi.coreapi.userApi
					+ 'sendForGetPasswordEmail', JSON.stringify(request),
					function(data) {
						if (data == "update success") {
							shinobi.notification.notification.loaded();
							shinobi.mapping.renderElement(
									shinobi.fragmentforgotpassword.modal,
									request);
						}
					});
		}
	},

	disableInputAndButton : function(elem, value, all) {
		elem.setAttribute('disabled', true);
	},

	showNoteField : function(elem, value, all) {
		elem.classList.remove('is-hidden');
	},
	addEventListButtonControl : function() {
		shinobi.fragmentforgotpassword.listButtonControl = document
				.getElementsByClassName(shinobi.fragmentforgotpassword.classButtonControlSelector);

		for (var i = 0; i < shinobi.fragmentforgotpassword.listButtonControl.length; i++) {
			var button = shinobi.fragmentforgotpassword.listButtonControl[i];
			button.onclick = function() {
				// hidden sign up modal
				shinobi.fragmentsignup.close();
				// show login modal
				shinobi.fragmentforgotpassword.open();
			}
		}

	},

	open : function() {
		if (shinobi.fragmentforgotpassword.modal != '') {
			shinobi.fragmentforgotpassword.modal.classList.add('is-active');

		}
	},

	close : function() {
		if (shinobi.fragmentforgotpassword.modal != '') {
			shinobi.fragmentforgotpassword.modal.classList.remove('is-active');
		}
	},
};