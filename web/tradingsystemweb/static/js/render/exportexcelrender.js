shinobi.exportexcelrender = {
	containerId : 'adminDepositRequestContainer',
	title:'DEPOSIT',
	exportExcelApi : shinobi.coreapi.systemDepositApi + 'exportExcel',
	/*exportCurrentApi : shinobi.coreapi.depositRequestReportToExcelReportApi + 'doRenderDepositRequestReport',
	exportAllApi : shinobi.coreapi.depositRequestReportToExcelReportApi + 'doRenderDepositRequestReportAll',*/
	
	'init' : function() {
		/*shinobi.exportexceldepositrequestrender.addExportExcelCurrentPage();
		shinobi.exportexcelrender.addExportExcelAllPages();*/
		shinobi.exportexcelrender.addExportExcel();
		
	},
	addExportExcel : function(){
		var container = document.getElementById(shinobi.exportexcelrender.containerId);
		var button = container.querySelector('.export-excel');
		
		button.addEventListener("click", function(){			
			var excelUrl = shinobi.exportexcelrender.exportExcelApi;
			
			console.log(excelUrl);
			
			shinobi.exportfile.exportFile(excelUrl, {}, {});
			
		});
		
	},
	/*addExportExcelCurrentPage : function(callback) {
		var container = document.getElementById(shinobi.exportexcelrender.containerId);
		var button = container.querySelector('.export-current-page');
		var excelUrl = shinobi.exportexcelrender.exportCurrentApi;
		
		var activeTab = container.querySelector('.tabs').querySelector('.is-active');
		
		button.onclick = function() {
			
			var request = {
				tabname : shinobi.exportexcelrender.title + '_' + shinobi.util.getSearchParam('status'),
				tabcode : shinobi.util.getSearchParam('status')
			};
			
			shinobi.exportfile.exportFile(excelUrl, request, {});
		}
	},
	
	addExportExcelAllPages : function(callback){
		var container = document.getElementById(shinobi.exportexcelrender.containerId);
		var button = container.querySelector('.export-all-page');
		var excelUrl = shinobi.exportexcelrender.exportAllApi;
		
		var tabs = container.querySelector('.tabs').querySelectorAll('li');
		
		var reportRequestList = [];
		for (var i = 0 ; i < tabs.length; i++){
			var tab = tabs[i];
			
			var href = window.location.origin + tab.querySelector('a').getAttribute('href');
			var url = new URL(href);
			var tabCode = url.searchParams.get("status");
			
			if (JSON.stringify(tabCode) !== ''){
				var tabInfo = {
						tabname : shinobi.exportexcelrender.title + "_" +tabCode,
						tabcode : tabCode
					};
				reportRequestList.push(tabInfo);
			}
		}
		var request = {reportRequestList};
		
		button.onclick = function() {
			shinobi.exportfile.exportFile(excelUrl, request, {});
		}
	},*/
	
};