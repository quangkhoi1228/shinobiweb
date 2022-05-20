shinobi.dynamicchart = (function () {

	// systax map data #{{key-json}}

	var constructor = function (chartId, options) {

		this.options = options;
		this.configChartId = '';
		this.chartId = chartId;
		this.isLoadChartData = false;
		this.chartData = {};
		this.isLoadConfigData = false;
		this.structureContent = {};
		this.chartStructure = "";
		this.chartStructureContent = {};
		this.configData = {};
		this.callback = '';
		this.chartRenderObject = {
			credits: {
				enabled: false
			},
		};

		this.loadOptions = function () {

			if (this.options.configChartId) {
				this.configChartId = this.options.configChartId;
			}

			if (this.options.callback) {
				this.callback = this.options.callback;
			}

			this.loadDataChart();

		};

		this.loadDataChart = function () {

			var chart = this;

			if (this.options.getData) {
				this.isLoadChartData = false;
				var url = this.options.getData.url;
				var request = JSON.stringify(this.options.getData.request);
				var callback = this.options.getData.callback;
				shinobi.api.request(url, request, function (response) {

					callback(response, function (chartData) {

						chart.isLoadChartData = true;
						chart.chartData = chartData;
					});

				});

			}

			this.loadConfigChart();

		};

		this.loadConfigChart = function () {

			var chart = this;
			var options = this.options;

			if (options.getConfig) {

				var loadConfigChartInterval = setInterval(
					function () {

						if (chart.isLoadChartData == true) {

							clearInterval(loadConfigChartInterval);

							chart.isLoadConfigData = false;
							var url = options.getConfig.url;
							var request = JSON
								.stringify(options.getConfig.request);
							var callback = options.getConfig.callback;
							shinobi.cacheapi
								.request(
									url,
									request,
									function (response) {

										// callback(response,
										// function(configData) {
										//
										// chart.isLoadConfigData =
										// true;
										// chart.configData =
										// configData;
										// });

										callback(
											response,
											function (
												structureContent) {

												chart.isLoadConfigData = true;
												chart.structureContent = structureContent;
											});

									});
						}

					}, 100);

			}

			this.renderChart();

		};

		this.renderChart = function () {

			var chart = this;

			var renderChartInterval = setInterval(function () {

				if (chart.isLoadChartData == true
					&& chart.isLoadConfigData == true) {

					clearInterval(renderChartInterval);

					chart.buildRenderChartObject();

					chart.reRender();

					if (typeof chart.createChartCallback == 'function') {

						chart.createChartCallback();
					}

				}
			}, 100);

		};

		this.reRender = function () {

			var chart = this;

			Highcharts.chart(chart.chartId, chart.chartRenderObject);

		};

		this.buildRenderChartObject = function () {

			var chart = this;

			this.chartStructure = this.structureContent['charttemplatecontent'];
			this.chartStructureContent = JSON
				.parse(this.structureContent['chartdetailcontent']);

			this.configData = this.chartStructure;

			this.fillStructureContent();

			chart.fillConfigAttributeValue();

			chart.fillRenderObjectConfigAttribute();

		};

		this.convertStringFunctionToFuntion = function (data) {

			var chart = this;

			var entries = Object.entries(data);

			for (var i = 0; i < entries.length; i++) {

				var key = entries[i][0];
				var value = entries[i][1];

				if (typeof value == 'object') {
					data[key] = chart.convertStringFunctionToFuntion(value);
				} else {

					if (typeof value == 'string'
						&& value.indexOf("function()") > -1)
						data[key] = eval("(" + value + ")");
				}

			}

			return data;

		};

		this.fillStructureContent = function () {

			var chart = this;

			// this.fillAttributeValue(chart.configData);

			var matchRegex = /\@{{.*?\}}/g;
			var replaceRegex = /[@{{}}]/g;

			var listMatch = chart.configData.match(matchRegex);
			if (listMatch) {

				for (var j = 0; j < listMatch.length; j++) {

					var mappingValueKey = listMatch[j]
						.replace(replaceRegex, "");

					var mappingValue = chart.chartStructureContent[mappingValueKey];

					mappingValue = chart.getMappingValue(mappingValue);

					chart.configData = chart.configData.replace(new RegExp(
						listMatch[j], 'g'), mappingValue);

				}
			}

		};

		this.fillConfigAttributeValue = function () {

			var chart = this;

			// this.fillAttributeValue(chart.configData);

			var matchRegex = /\#{{.*?\}}/g;
			var replaceRegex = /[#{{}}]/g;

			var listMatch = chart.configData.match(matchRegex);
			if (listMatch) {

				for (var j = 0; j < listMatch.length; j++) {

					var mappingValueKey = listMatch[j]
						.replace(replaceRegex, "");

					var mappingValue = chart.chartData[mappingValueKey];

					mappingValue = chart.getMappingValue(mappingValue);

					chart.configData = chart.configData.replace(new RegExp(
						listMatch[j], 'g'), mappingValue);

				}
			}

		};

		this.getMappingValue = function (input) {

			var mappingValueType = typeof input;
			var result;

			switch (mappingValueType) {

				case 'string':
					result = '\"' + input + '\"';
					break;
				case 'object':
					result = JSON.stringify(input);
					break;
				default:
					break;
			}

			return result;
		};

		this.fillAttributeValue = function (object) {

			var chart = this;

			if (typeof object == 'object') {

				var entries = Object.entries(object);

				for (var i = 0; i < entries.length; i++) {

					var key = entries[i][0];
					var value = entries[i][1];
					var typeValue = typeof value;

					switch (typeValue) {

						case 'object':
							chart.fillAttributeValue(object[key]);
							break;

						case 'string':

							var matchRegex = /\#{{.*?\}}/g;
							var replaceRegex = /[#{{}}]/g;

							var listMatch = value.match(matchRegex);

							if (listMatch && listMatch.length == 1
								&& value == listMatch[0]) {

								var mappingValueKey = listMatch[0].replace(
									replaceRegex, "");

								object[key] = chart.chartData[mappingValueKey];
							} else if (listMatch) {

								for (var j = 0; j < listMatch.length; j++) {

									mappingValueKey = listMatch[j].replace(
										replaceRegex, "");

									var mappingValue = chart.chartData[mappingValueKey];

									value = value.replace(new RegExp(listMatch[j],
										'g'), mappingValue);

									object[key] = value;
								}
							}

							break;

						default:
							break;
					}
				}

			}

		};

		this.fillRenderObjectConfigAttribute = function () {

			var data = JSON.parse(this.configData);

			var fullChartConfig = this.convertStringFunctionToFuntion(data)

			var entries = Object.entries(fullChartConfig);

			for (var i = 0; i < entries.length; i++) {

				this.chartRenderObject[entries[i][0]] = entries[i][1];

			}

			// this
			// .convertStringFunctionToFuntion(
			// data,
			// function(fullChartConfig) {
			//
			// var entries = Object.entries(fullChartConfig);
			//
			// // var entries =
			// // Object.entries(this.configData);
			//
			// for (var i = 0; i < entries.length; i++) {
			//
			// this.chartRenderObject[entries[i][0]] = entries[i][1];
			//
			// }
			// });

		};

		this.createChart = function (callback) {
			this.loadOptions();

			this.createChartCallback = callback;

		};

	};

	return constructor;
})();