shinobi.chartadapter = {

	'convertDataPieChart': function (data) {

		var returnData = [];

		var dataObject = data[0];

		var xNameArr = dataObject.xname;
		var value = dataObject.value;

		var dataLength = value.length;

		for (var i = 0; i < dataLength; i++) {

			var chartObject = {};

			chartObject.name = xNameArr[i];
			chartObject.y = parseInt(value[i]);

			returnData.push(chartObject);
		}

		return returnData;

	},

	'convertDataStockChart': function (data) {

		// series: [ {
		// name : 'Temperature',
		// data : [ [ 1317888000000, 372.5101 ], [ 1317888060000, 372.4 ],
		// [ 1317888120000, 372.16 ], [ 1317888180000, 371.62 ],
		// [ 1317888240000, 371.75 ], [ 1317888300000, 372 ] ],
		//
		// tooltip : {
		// valueDecimals : 1,
		// valueSuffix : '°C'
		// }
		// } ]

		var returnData = [];

		var dataObject = data.chartdata[0];

		var xname = dataObject.xname;
		var value = dataObject.value;

		var length = xname.length;

		for (var i = 0; i < length; i++) {

			var tempArray = [];

			tempArray.push(Number(xname[i]));
			tempArray.push(Number(value[i]));

			returnData.push(tempArray);

		}

		return returnData;

	},

	'convertDataSimpleChart': function (data) {

		var dataObject = data.chartdata[0];

		var dataChart = [];

		var valueList = dataObject.value;
		var xNameList = dataObject.xname;

		// var minValue = Math.min(...valueList);
		// var rootValue = Math.trunc(minValue*0.99);

		var tradeDemoCapitalValue = valueList[0];
		// var rootValue = Math.trunc(tradeDemoCapitalValue * 0.99);
		var rootValue = tradeDemoCapitalValue;

		var length = valueList.length;

		for (var i = 0; i < length; i++) {

			// var tempObject = [];

			var currentValue = Number(valueList[i]) - rootValue;

			// tempObject.push(Number(xNameList[i]));

			// tempObject.push(currentValue);

			// dataChart.push(tempObject);
			dataChart.push(currentValue);
		}

		return dataChart;

	},

	'convertDataColumnChart': function (data) {

		var returnObject = {};

		var dataObject = data.chartdata;

		returnObject.categories = [];

		returnObject.data = [];

		var dataLength = dataObject.length;

		if (dataLength == 0) {

			return returnObject;
		}

		var feeNameList = dataObject[0].yname;

		var feeNameListLength = feeNameList.length;

		for (var i = 0; i < feeNameListLength; i++) {

			var tempObject = {};

			tempObject.name = feeNameList[i];

			tempObject.data = [];

			for (var j = 0; j < dataLength; j++) {

				returnObject.categories.push(dataObject[j].xname[0]);

				tempObject.data.push(Number(dataObject[j].value[i]));

			}

			// reverse data in object
			tempObject.data = tempObject.data.reverse();

			returnObject.data.push(tempObject);
		}

		// reverse category in object
		returnObject.categories = returnObject.categories.reverse();

		return returnObject;

	},

	'convertOneObjectDataColumnChart': function (data) {

		var returnObject = {};
		returnObject.data = [];

		var chartDataArray = data.chartdata;

		for (var h = 0; h < chartDataArray.length; h++) {

			var dataObject = data.chartdata[h];

			var dateMilisecond = dataObject.xname;
			var dateArray = [];

			for (var j = 0; j < dateMilisecond.length; j++) {

				var currentDateValue = new Date(Number(dateMilisecond[j]));

				var formatDate = shinobi.util.getFormatDate(
					currentDateValue, {
					format: 'dd-MM-yyyy hh:mm'
				});

				dateArray.push(formatDate);
			}

			returnObject.categories = dateArray;

			var valueList = dataObject.value;

			var valueListLength = valueList.length;

			var tempObject = {};

			tempObject.name = dataObject.yname[0];

			tempObject.data = [];

			for (var i = 0; i < valueListLength; i++) {

				tempObject.data.push(Number(valueList[i]));

			}

			returnObject.data.push(tempObject);
		}

		return returnObject;

	},

};