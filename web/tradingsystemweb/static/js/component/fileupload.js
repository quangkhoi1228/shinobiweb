shinobi.fileupload = {
	'filelist': [],
	'register': function (uploadElemId, elemevent, uploadpoint, beforeupload,
		callback) {

		var uploadElem = document.getElementById(uploadElemId);
		shinobi.fileupload.registerElement(uploadElem, elemevent, uploadpoint,
			beforeupload, callback);

	},
	'registerElement': function (uploadElem, elemevent, uploadpoint,
		beforeupload, callback, option) {
		if (option && option.hasOwnProperty('type')) {
			if (option.type == 'public') {
				var sessionid = '###'
				if (elemevent == "change") {
					uploadElem
						.addEventListener(
							elemevent,
							function () {

								shinobi.notification.notification
									.loading();
								var type = shinobi.fileupload
									.isImage(uploadElem.files[0].type);

								var fileListIndex = beforeupload(type);

								var formData = new FormData();

								formData
									.append(
										"file",
										uploadElem.files[0]);
								formData.append("session",
									sessionid);
								formData.append(
									"fileindex",
									fileListIndex);

								shinobi.fileupload
									.uploadFile(
										formData,
										uploadpoint,
										callback);
							});
				} else if (elemevent == "paste") {
					uploadElem
						.addEventListener(
							elemevent,
							function (e) {
								shinobi.notification.notification
									.loading();
								var formData = new FormData();

								var file = e.clipboardData.files[0];

								if (Object.prototype.toString
									.call(file) === '[object File]') {
									var type = shinobi.fileupload
										.isImage(file.type);

									var fileListIndex = beforeupload(type);

									formData
										.append(
											"file",
											e.clipboardData.files[0]);
									formData.append(
										"session",
										sessionid);
									formData.append(
										"fileindex",
										fileListIndex);

									shinobi.fileupload
										.uploadFile(
											formData,
											uploadpoint,
											callback);
								}

							});
				} else if (elemevent == "drop") {
					uploadElem.addEventListener(elemevent,
						function (e) {
							shinobi.notification.notification
								.loading();
							beforeupload();

							var formData = new FormData();

							formData.append("file",
								e.dataTransfer.files[0]);
							formData.append("session",
								sessionid);

							shinobi.fileupload.uploadFile(
								formData, uploadpoint,
								callback);
						});
				}
			}

		}
		else {
			var userApi = (shinobi.hasOwnProperty('coreapi') && shinobi.coreapi.hasOwnProperty('userApi')) ? shinobi.coreapi.userApi : "/authenapi/userapi/";
			if (shinobi.hasOwnProperty('coreapi') && shinobi.coreapi.hasOwnProperty('getSessionIdApi')) {
				userApi = shinobi.coreapi.getSessionIdApi;
			}
			var request = {};
			shinobi.api
				.request(userApi + 'getSessionId'
					,
					JSON.stringify(request),
					function (response) {
						var json = JSON.parse(response);
						var sessionid = json.sessionid;

						if (elemevent == "change") {
							uploadElem
								.addEventListener(
									elemevent,
									function () {

										shinobi.notification.notification
											.loading();
										var type = shinobi.fileupload
											.isImage(uploadElem.files[0].type);

										var fileListIndex = beforeupload(type);

										var formData = new FormData();

										formData
											.append(
												"file",
												uploadElem.files[0]);
										formData.append("session",
											sessionid);
										formData.append(
											"fileindex",
											fileListIndex);

										shinobi.fileupload
											.uploadFile(
												formData,
												uploadpoint,
												callback);
									});
						} else if (elemevent == "paste") {
							uploadElem
								.addEventListener(
									elemevent,
									function (e) {
										shinobi.notification.notification
											.loading();
										var formData = new FormData();

										var file = e.clipboardData.files[0];

										if (Object.prototype.toString
											.call(file) === '[object File]') {
											var type = shinobi.fileupload
												.isImage(file.type);

											var fileListIndex = beforeupload(type);

											formData
												.append(
													"file",
													e.clipboardData.files[0]);
											formData.append(
												"session",
												sessionid);
											formData.append(
												"fileindex",
												fileListIndex);

											shinobi.fileupload
												.uploadFile(
													formData,
													uploadpoint,
													callback);
										}

									});
						} else if (elemevent == "drop") {
							uploadElem.addEventListener(elemevent,
								function (e) {
									shinobi.notification.notification
										.loading();
									beforeupload();

									var formData = new FormData();

									formData.append("file",
										e.dataTransfer.files[0]);
									formData.append("session",
										sessionid);

									shinobi.fileupload.uploadFile(
										formData, uploadpoint,
										callback);
								});
						}

					});
		}

	},
	'uploadFile': function (formData, uploadpoint, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				shinobi.notification.notification.loaded();
				try {
					var json = JSON.parse(xhr.responseText);
					callback(json);

				} catch (e) {
					shinobi.notification.notification
						.error('Có lỗi vui lòng thử lại');
				}

				// var avatar = document.getElementById("avatar");
				// avatar.setAttribute("src", json.content);
			}
		};

		var hostname = window.location.hostname;
		var protocol = window.location.protocol;

		if (shinobi.hasOwnProperty('fileuploadconfig') && shinobi.fileuploadconfig.hasOwnProperty('uploadDomain')) {
			var uploadDomain = shinobi.fileuploadconfig.uploadDomain;
			xhr.open("POST", uploadDomain + uploadpoint, true);
		} else if (shinobi.hasOwnProperty('fileuploadconfig') && shinobi.fileuploadconfig.hasOwnProperty('uploadDomainProcess')
		) {
			uploadDomain = shinobi.fileuploadconfig.uploadDomainProcess();
			xhr.open("POST", uploadDomain + uploadpoint, true);
		} else {
			if (hostname == "localhost") {
				xhr.open("POST", "http://localhost:9999/" + uploadpoint, true);
			} else if (hostname === "www.aladin.finance") {
				xhr.open("POST", protocol + "//uploadfile.aladin.finance" + "/"
					+ uploadpoint, true);
			} else if (hostname === "chonso.cbv.com.vn") {
				xhr.open("POST", protocol + "//uploadfile.cbv.com.vn" + "/"
					+ uploadpoint, true);
			} else {
				xhr.open("POST", protocol + "//uploadfile." + hostname + "/"
					+ uploadpoint, true);
			}
		}

		xhr.withCredentials = true;
		xhr.send(formData);

	},
	'isImage': function (type) {
		if ('image/png' == type || 'image/jpeg' == type || 'image/gif' == type) {
			return true;
		} else {
			return false;
		}
	}

};