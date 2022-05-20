shinobi.xhradapter = {
	'getResource' : function(url, callback) {
		this.accessResource("GET", url, callback);
	},
	'accessResource' : function(method, url, callback) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(xhttp.responseText);
			}
		};
		xhttp.open(method, url, true);
		xhttp.send();
	},
	'login' : function(username, password, callback) {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(xhttp.responseText);
			}
		};

		xhttp.open("POST", "/login", true);
		xhttp.setRequestHeader('username', username);
		xhttp.setRequestHeader('password', password);
		xhttp.send();
	}
};
