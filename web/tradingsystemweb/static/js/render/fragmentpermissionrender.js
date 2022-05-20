shinobi.fragmentpermissionrender = {

	'build' : function() {

		var pathName = window.location.pathname;
		var pathNameSplit = pathName.split('/');

		console.log(pathNameSplit.length)

		if (pathNameSplit.length > 3) {

			var notificationContent = '';

			for (var i = 3; i < pathNameSplit.length; i++) {

				notificationContent += '/' + pathNameSplit[i];

				console.log(notificationContent)
			}

			var messageContent = document
					.getElementById('messageContentPermissionId');
			messageContent.innerHTML = ' ' + notificationContent;
		}
	}

};