shinobi.forgotpasswordrender = {
	
	submitButtonSelector : '#submit',
	containerSelector : '.is-forgot-password',
	
	'init' : function(){
		shinobi.forgotpasswordrender.addEventSubmit();
	},	
	
	'addEventSubmit' : function() {
		var submitButton = document.querySelector(shinobi.forgotpasswordrender.submitButtonSelector);
		shinobi.forgotpasswordrender.addEventWhenClick(submitButton);
		shinobi.forgotpasswordrender.addEventWhenEnter(submitButton);
	},

	'addEventWhenClick' : function(elem) {
		elem.onclick = function() {
			shinobi.forgotpasswordrender.request();
		}
	},

	'addEventWhenEnter' : function(elem) {
		elem.addEventListener('keypress', function(e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				shinobi.forgotpasswordrender.request();
			}
		});
	},

	'request' : function() {
		var emailInput = document.querySelector('input[snb-key="email"]');
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
							shinobi.mapping.renderElement(document
									.querySelector(shinobi.forgotpasswordrender.containerSelector),
									request);
						}
					});
		}
	},
	
	'showNoteField' : function(elem, value, all) {
		elem.classList.remove('is-hidden');
	},

	'disableInputAndButton' : function(elem, value, all) {
		elem.setAttribute('disabled', true);
		var submitButton = document.querySelector(shinobi.forgotpasswordrender.submitButtonSelector);
		submitButton.setAttribute('disabled', true);
	},
};