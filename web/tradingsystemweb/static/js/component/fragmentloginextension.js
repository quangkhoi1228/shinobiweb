shinobi.fragmentloginextension = {
	loginProcess: function () {
		// shinobi.loggedusertemplaterender.renderHeaderMenu();
		if (shinobi.socketmanager.privateWebSocket == '') {
			shinobi.socketmanager.init();
		}

	},
	logoutProcess: function (callback) {
		if (typeof callback == 'function') {
			callback();
		}
	},
};