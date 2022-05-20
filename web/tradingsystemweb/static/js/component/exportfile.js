shinobi.exportfile = {
	exportFile: function (url, request, option) {
		shinobi.notification.notification.loading();
		shinobi.api.request(url, JSON.stringify(request), function (response) {
			shinobi.notification.notification.loaded();
			console.log(response);
			var data = JSON.parse(response);
			console.log(data);
			if (data.hasOwnProperty('linkfile')) {
				var modal = document.getElementById('confirmDownloadExcelFileModal');
				shinobi.mapping.renderElement(modal, data);
				modal.classList.add('is-active');
			} else {
				shinobi.notification.notification.error('Không tìm thấy file');
			}
			console.log(data);
		})
	},

	request: function (url, param, fileType, callback) {

		var request = new XMLHttpRequest();
		// var url =
		// "http://localhost:7979/exportfile/excel/VseBankTransLogApi";
		request.open('POST', url, true);
		request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded; charset=UTF-8');
		request.responseType = 'blob';

		request.onload = function (e) {
			// var fileName = "export.xlsx";
			var fileName = "export." + fileType;

			if (this.status === 200) {
				var blob = this.response;
				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveBlob(blob, fileName);
				} else {

					if (typeof callback == 'function') {

						callback();
					}

					var downloadLink = window.document.createElement('a');
					var contentTypeHeader = request
						.getResponseHeader("Content-Type");
					downloadLink.href = window.URL.createObjectURL(new Blob(
						[blob], {
						type: contentTypeHeader
					}));
					downloadLink.download = fileName;
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);

				}
			}
		};
		request.send(param);

	},
};