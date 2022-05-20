shinobi.loginrender = {
	init : function() {
		shinobi.loginrender.redirectIndex();
	},
	redirectIndex : function(){
		window.location.href = '/';
	},
	gotoLoginPage : function(){
		window.location.href = '/page/login';
	},
};