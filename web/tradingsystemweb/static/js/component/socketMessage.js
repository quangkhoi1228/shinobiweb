shinobi.message = {
	'socket': '',
	'url': "",
	'chatInqueue': [],
	'notificationInqueue': [],
	'sessionid': "",
	'readyToSend': false,
	'option': null,
	'connect': function (url, callback, option) {

		this.url = url;
		this.option = option;
		// if (typeof shinobi.message.socket == 'object' && shinobi.message.socket.close == 'function') {
		// 	shinobi.message.socket.close();
		// }
		shinobi.message.socket = new WebSocket(shinobi.message.url);
		// if (option && option.hasOwnProperty('sendInit')) {
		// 	var message = {};
		// 	message.type = "register";
		// 	message.content = shinobi.message.sessionid;
		// 	shinobi.message.socket.send(JSON.stringify(message));
		// 	console.log("send register message");

		// 	shinobi.message.socket.readyToSend = true;

		// 	setTimeout(function () {
		// 		if (typeof callback == 'function') {

		// 			callback();
		// 		}

		// 	}, 1000);
		// }

		this.socket.addEventListener('open', function (event) {
			console.log("open connection");
			var object = this;
			var message = {};
			message.type = "register";
			if (shinobi.message.sessionid == '') {
				shinobi.message.connectSocketServer(callback);
			} else {

				message.content = shinobi.message.sessionid;
				object.send(JSON.stringify(message));
				console.log("send register message");

				object.readyToSend = true;

				setTimeout(function () {
					if (typeof callback == 'function') {

						callback();
					}

				}, 1000);

			}

		});

		this.socket.addEventListener('message', function (event) {
			shinobi.message.inputMessageHandler(event);
		});

		this.socket.addEventListener('close', function () {
			console.log("connection closed");
			setTimeout(shinobi.message.connect(shinobi.message.url), 1000);
		});

	},
	'connectSocketServer': function (callback) {
		var requestSessonId = {};

		shinobi.api.request("/authenapi/UserInfoApi/getSessionid", JSON
			.stringify(requestSessonId), function (response) {

				var jsonResponse = JSON.parse(response);

				var sessionId = jsonResponse.sessionid;

				shinobi.message.sessionid = sessionId;

				if (callback) {
					// shinobi.message.socket.close();

					// shinobi.message.connect(shinobi.config.current.imserver);
					console.log("connect socket server success");

					callback();
				}

			});

	},
	'inputMessageHandler': function (event) {

		var response = event.data;
		var data = JSON.parse(response);

		shinobi.socketmanager.socketMessage.private.push(data);

	},
	'sendMessage': function (message) {
		this.socket.send(message);
	},
};
