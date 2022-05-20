shinobi.areastacksplinechart = (function() {

	/*
	 * categories : [ 'Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas' ]
	 */

	/*
	 * [ { name : 'John', data : [ 5, 3, 4, 7, 2 ] }, { name : 'Jane', data : [
	 * 2, 2, 3, 2, 1 ] }, { name : 'Joe', data : [ 3, 4, 4, 2, 5 ] } ]
	 */

	// private static variable
	// constructor
	var constructor = function(chartId) {

		this.data = [];

		this.title = '';

		this.name = '';

		this.categories = [];

		this.createAreaStackSplineChart = function(chartId, categories, data) {

			this.containerId = chartId;

			this.categories = categories;

			this.data = data;

			this.renderChart();

		}

		this.setData = function(data) {

			this.data = data;
		}

		this.setName = function(name) {

			this.name = name;
		}
		this.renderChart = function() {

			Highcharts.chart(this.containerId, {
				chart : {
					type : 'areaspline'
				},
				title : {
					text : ''
				},
				xAxis : {
					categories : this.categories
				},
				yAxis : {
					title : false
				},
				exporting : {
					enabled : false
				},
				tooltip : {
					split : true,
				},
				credits : {
					enabled : false
				},
				plotOptions : {
					areaspline : {
						stacking : 'normal'
					}
				},
				series : this.data
			});

		}

		// public static method
		constructor.staticmethod = {
			'hello' : function() {

			}
		}
	}

	return constructor;
})();
