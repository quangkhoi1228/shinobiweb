shinobi.setnewpasswordrender = {

	build: function () {

		var submitButton = document.getElementById("submitButton");

		document.querySelector('#ipRepassword').addEventListener('keypress',
			function (e) {
				var key = e.which || e.keyCode;
				if (key === 13) {
					shinobi.setnewpasswordrender.submit();

				}
			});

		submitButton.onclick = function () {
			shinobi.setnewpasswordrender.submit();
		}

	},

	submit: function () {

		var ipPassword = document.getElementById("ipPassword");
		var ipRepassword = document.getElementById("ipRepassword");

		var password = ipPassword.value.trim();
		var rePassword = ipRepassword.value.trim();

		if (password == "" || rePassword == "") {

			alert("Vui lòng nhập đầy đủ thông tin!");
			return;
		} else {

			var checkInput = shinobi.setnewpasswordrender.checkInput(password,
				rePassword);

			if (checkInput == false) {

				return;
			} else {

				var pathname = window.location.pathname;

				var listPathnameSplit = pathname.split("/");

				var id = listPathnameSplit[3];

				var setcode = listPathnameSplit[4];

				var request = {};

				request.password = shinobi.util.sha256(password);
				request.verifypassword = shinobi.util.sha256(rePassword);
				request.id = id;
				request.randomstring = setcode;

				shinobi.api
					.request(
						"/api/UserApi/sendRequestRecoveryPassword",
						JSON.stringify(request),
						function (response) {
							shinobi.notification.notification
								.info("Đặt lại mật khẩu thành công!");

							window.location.href = "/page/index";

						});
			}
		}
	},

	checkInput: function (password, rePassword) {

		if (password.trim() != rePassword.trim()) {

			alert("Mật khẩu và xác nhận mật khẩu không giống nhau!");

			return false;
		}

		if (password.trim().value < 4 || password.trim().value > 15
			|| rePassword.trim().value < 4 || rePassword.trim().value > 15) {

			alert("Độ dài mật khẩu không hợp lệ! Chiều dài từ 4 đến 15 kí tự tối thiểu 2 chữ cái và 2 con số!");

			return false;
		}

		var passwordString = password.toString();

		console.log(passwordString)
		var countNumberInPassword = shinobi.util
			.countNumberInInput(passwordString);
		var countTextCharacterInPassword = shinobi.util
			.countTextCharacterInInput(passwordString);

		if (countNumberInPassword < 2 || countTextCharacterInPassword < 2) {

			alert("Mật khẩu không hợp lệ! Tối thiểu 2 chữ cái và 2 con số!");

			return false;

		}

		return true;

	}
};