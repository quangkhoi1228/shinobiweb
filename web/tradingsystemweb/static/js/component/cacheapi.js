shinobi.cacheapi = {
	cache : {},
	request : function(url, param, callback, option) {
		var cacheKey = url + '_' + JSON.stringify(param);
		if (shinobi.cacheapi.cache.hasOwnProperty(cacheKey)) {
			var currentCacheData = shinobi.cacheapi.cache[cacheKey];
			(currentCacheData == false) ? setTimeout(function() {
				shinobi.cacheapi.request(url, param, callback)
			}, 10) : callback(shinobi.cacheapi.cache[cacheKey]);

		} else {
			shinobi.cacheapi.cache[cacheKey] = false;
			shinobi.api.request(url, param, function(response) {
				shinobi.cacheapi.cache[cacheKey] = response;

				if (option && option.hasOwnProperty('cacheExpired')) {
					setTimeout(function() {
						delete shinobi.cacheapi.cache[cacheKey];
					}, option['cacheExpired'])
				}
				callback(response);
			});
		}
	},
	clearKey : function(url, param, option) {
		var tempSymbol = '_';
		var cacheKey = url + tempSymbol;
		if (param) {
			cacheKey += JSON.stringify(param);
			if (shinobi.cacheapi.cache.hasOwnProperty(cacheKey)) {
				delete shinobi.cacheapi.cache[cacheKey];
			}
		} else {
			var listKeyRef = Object.keys(shinobi.cacheapi.cache).filter(
					function(item) {
						return item.includes(url + tempSymbol);
					});

			listKeyRef.forEach(function(key) {
				delete shinobi.cacheapi.cache[key];

			})
		}

	},
	clear : function() {
		shinobi.cacheapi.cache = {};
	},

};