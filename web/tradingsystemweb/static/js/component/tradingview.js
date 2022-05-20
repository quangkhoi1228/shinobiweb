shinobi.tradingview = {
	getConfig : function(content) {
		copy(JSON.parse(content.content));
	},
	configCFV : {
		"name": "CFV",
		"layout": "s",
		"charts": [
			{
				"panes": [
					{
						"sources": [
							{
								"type": "MainSeries",
								"id": "z2uWe2",
								"state": {
									"style": 2,
									"esdShowDividends": true,
									"esdShowSplits": true,
									"esdShowEarnings": true,
									"esdShowBreaks": false,
									"esdBreaksStyle": {
										"color": "rgba( 235, 77, 92, 1)",
										"style": 2,
										"width": 1
									},
									"esdFlagSize": 2,
									"showCountdown": false,
									"showInDataWindow": true,
									"visible": true,
									"showPriceLine": true,
									"priceLineWidth": 1,
									"priceLineColor": "",
									"baseLineColor": "#5d606b",
									"showPrevClosePriceLine": false,
									"prevClosePriceLineWidth": 1,
									"prevClosePriceLineColor": "rgba( 85, 85, 85, 1)",
									"minTick": "default",
									"extendedHours": false,
									"sessVis": false,
									"statusViewStyle": {
										"fontSize": 16,
										"showExchange": true,
										"showInterval": true,
										"symbolTextSource": "description"
									},
									"candleStyle": {
										"upColor": "#00CA73",
										"downColor": "#FF6960",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#225437",
										"borderDownColor": "#5A1913",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#225437",
										"wickDownColor": "#5A1913",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350"
									},
									"haStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"showRealLastPrice": false,
										"barColorsOnPrevClose": false,
										"inputs": {},
										"inputInfo": {}
									},
									"barStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"hiloStyle": {
										"color": "#2196f3",
										"showBorders": true,
										"borderColor": "#2196f3",
										"showLabels": true,
										"labelColor": "#2196f3",
										"fontSize": 7
									},
									"lineStyle": {
										"color": "rgba(0, 255, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "rgba(33, 150, 243, 0.05)",
										"color2": "rgba(33, 150, 243, 0.05)",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"renkoStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"inputs": {
											"source": "close",
											"boxSize": 3,
											"style": "ATR",
											"atrLength": 14,
											"wicks": true
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"wicks": {
												"name": "Wicks"
											}
										}
									},
									"pbStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"lb": 3
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"lb": {
												"name": "Number of line"
											}
										}
									},
									"kagiStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"style": "ATR",
											"atrLength": 14,
											"reversalAmount": 1
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											}
										}
									},
									"pnfStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"sources": "Close",
											"reversalAmount": 3,
											"boxSize": 1,
											"style": "ATR",
											"atrLength": 14
										},
										"inputInfo": {
											"sources": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											}
										}
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 38, 166, 154, 0.05)",
										"topFillColor2": "rgba( 38, 166, 154, 0.05)",
										"bottomFillColor1": "rgba( 239, 83, 80, 0.05)",
										"bottomFillColor2": "rgba( 239, 83, 80, 0.05)",
										"topLineColor": "rgba( 38, 166, 154, 1)",
										"bottomLineColor": "rgba( 239, 83, 80, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"rangeStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"thinBars": true,
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"range": 10,
											"phantomBars": false
										},
										"inputInfo": {
											"range": {
												"name": "Range"
											},
											"phantomBars": {
												"name": "Phantom Bars"
											}
										}
									},
									"symbol": "SJCBUY",
									"shortName": "Vàng SJC 1L HCM Mua vào",
									"timeframe": "",
									"onWidget": false,
									"interval": "D",
									"showSessions": false,
									"priceAxisProperties": {
										"autoScale": true,
										"autoScaleDisabled": false,
										"lockScale": false,
										"percentage": false,
										"percentageDisabled": false,
										"log": false,
										"logDisabled": false,
										"alignLabels": true,
										"isInverted": false,
										"indexedTo100": false
									}
								},
								"zorder": -1,
								"haStyle": {
									"studyId": "BarSetHeikenAshi@tv-basicstudies-60"
								},
								"renkoStyle": {
									"studyId": "BarSetRenko@tv-prostudies-15"
								},
								"pbStyle": {
									"studyId": "BarSetPriceBreak@tv-prostudies-15"
								},
								"kagiStyle": {
									"studyId": "BarSetKagi@tv-prostudies-15"
								},
								"pnfStyle": {
									"studyId": "BarSetPnF@tv-prostudies-15"
								},
								"rangeStyle": {
									"studyId": "BarSetRange@tv-basicstudies-72"
								}
							},
							{
								"type": "study_Overlay",
								"id": "GdoUI3",
								"state": {
									"styles": {
										"open": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Open"
										},
										"high": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "High"
										},
										"low": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Low"
										},
										"close": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Close"
										}
									},
									"precision": "default",
									"inputs": {
										"symbol": "SJCSELL"
									},
									"style": 2,
									"showPriceLine": false,
									"minTick": "default",
									"candleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"barStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"lineStyle": {
										"color": "rgba(255, 0, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "#2196f3",
										"color2": "#2196f3",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 83, 185, 135, 0.05)",
										"topFillColor2": "rgba( 83, 185, 135, 0.05)",
										"bottomFillColor1": "rgba( 235, 77, 92, 0.05)",
										"bottomFillColor2": "rgba( 235, 77, 92, 0.05)",
										"topLineColor": "rgba( 83, 185, 135, 1)",
										"bottomLineColor": "rgba( 235, 77, 92, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"palettes": {},
									"bands": {},
									"area": {},
									"graphics": {},
									"showInDataWindow": true,
									"visible": true,
									"showStudyArguments": true,
									"plots": {
										"0": {
											"id": "open",
											"type": "line"
										},
										"1": {
											"id": "high",
											"type": "line"
										},
										"2": {
											"id": "low",
											"type": "line"
										},
										"3": {
											"id": "close",
											"type": "line"
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								},
								"zorder": -4,
								"metaInfo": {
									"palettes": {},
									"inputs": [
										{
											"id": "symbol",
											"name": "symbol",
											"defval": "",
											"type": "symbol",
											"isHidden": true
										}
									],
									"plots": [
										{
											"id": "open",
											"type": "line"
										},
										{
											"id": "high",
											"type": "line"
										},
										{
											"id": "low",
											"type": "line"
										},
										{
											"id": "close",
											"type": "line"
										}
									],
									"graphics": {},
									"defaults": {
										"styles": {},
										"inputs": {
											"symbol": ""
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"styles": {
										"open": {
											"title": "Open"
										},
										"high": {
											"title": "High"
										},
										"low": {
											"title": "Low"
										},
										"close": {
											"title": "Close"
										}
									},
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies-1",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								}
							}
						],
						"leftAxisesState": [],
						"rightAxisesState": [
							{
								"state": {
									"id": "6FPccHx2iRtp",
									"m_priceRange": {
										"m_maxValue": 58050000,
										"m_minValue": 56250000
									},
									"m_isAutoScale": true,
									"m_isPercentage": false,
									"m_isIndexedTo100": false,
									"m_isLog": false,
									"m_isLockScale": false,
									"m_isInverted": false,
									"m_height": 220,
									"m_topMargin": 0.1,
									"m_bottomMargin": 0.08,
									"alignLabels": true
								},
								"sources": [
									"z2uWe2",
									"GdoUI3"
								]
							}
						],
						"overlayPriceScales": {},
						"stretchFactor": 2000,
						"mainSourceId": "z2uWe2",
						"priceScaleRatio": null
					}
				],
				"timeScale": {
					"m_barSpacing": 41.94601675233001,
					"m_rightOffset": 10
				},
				"chartProperties": {
					"paneProperties": {
						"background": "#131722",
						"gridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"vertGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"horzGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"crossHairProperties": {
							"color": "rgba(117, 134, 150, 1)",
							"style": 2,
							"transparency": 0,
							"width": 1
						},
						"topMargin": 10,
						"bottomMargin": 8,
						"axisProperties": {
							"autoScale": true,
							"autoScaleDisabled": false,
							"lockScale": false,
							"percentage": false,
							"percentageDisabled": false,
							"indexedTo100": false,
							"log": false,
							"logDisabled": false,
							"alignLabels": true,
							"isInverted": false
						},
						"legendProperties": {
							"showStudyArguments": true,
							"showStudyTitles": true,
							"showStudyValues": true,
							"showSeriesTitle": true,
							"showSeriesOHLC": true,
							"showLegend": true,
							"showBarChange": true,
							"showOnlyPriceSource": true
						}
					},
					"scalesProperties": {
						"backgroundColor": "#ffffff",
						"lineColor": "#787878",
						"textColor": "#D9D9D9",
						"fontSize": 11,
						"scaleSeriesOnly": false,
						"showSeriesLastValue": true,
						"seriesLastValueMode": 1,
						"showSeriesPrevCloseValue": false,
						"showStudyLastValue": false,
						"showSymbolLabels": false,
						"showStudyPlotLabels": false,
						"barSpacing": 6
					},
					"chartEventsSourceProperties": {
						"visible": true,
						"futureOnly": true,
						"breaks": {
							"color": "rgba(85, 85, 85, 1)",
							"visible": false,
							"style": 2,
							"width": 1
						}
					},
					"priceScaleSelectionStrategyName": "auto"
				},
				"version": 2,
				"timezone": "Asia/Ho_Chi_Minh",
				"sessions": {
					"properties": {
						"graphics": {
							"backgrounds": {
								"inSession": {
									"color": "#6fa8dc",
									"transparency": 60,
									"visible": false
								},
								"outOfSession": {
									"color": "#ffe599",
									"transparency": 60,
									"visible": false
								}
							},
							"vertlines": {
								"sessBreaks": {
									"color": "#4985e7",
									"style": 2,
									"visible": false,
									"width": 1
								}
							}
						}
					}
				}
			}
		]
	},
	config24K : {
		"name": "CFV",
		"layout": "s",
		"charts": [
			{
				"panes": [
					{
						"sources": [
							{
								"type": "MainSeries",
								"id": "z2uWe2",
								"state": {
									"style": 2,
									"esdShowDividends": true,
									"esdShowSplits": true,
									"esdShowEarnings": true,
									"esdShowBreaks": false,
									"esdBreaksStyle": {
										"color": "rgba( 235, 77, 92, 1)",
										"style": 2,
										"width": 1
									},
									"esdFlagSize": 2,
									"showCountdown": false,
									"showInDataWindow": true,
									"visible": true,
									"showPriceLine": true,
									"priceLineWidth": 1,
									"priceLineColor": "",
									"baseLineColor": "#5d606b",
									"showPrevClosePriceLine": false,
									"prevClosePriceLineWidth": 1,
									"prevClosePriceLineColor": "rgba( 85, 85, 85, 1)",
									"minTick": "default",
									"extendedHours": false,
									"sessVis": false,
									"statusViewStyle": {
										"fontSize": 16,
										"showExchange": true,
										"showInterval": true,
										"symbolTextSource": "description"
									},
									"candleStyle": {
										"upColor": "#00CA73",
										"downColor": "#FF6960",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#225437",
										"borderDownColor": "#5A1913",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#225437",
										"wickDownColor": "#5A1913",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350"
									},
									"haStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"showRealLastPrice": false,
										"barColorsOnPrevClose": false,
										"inputs": {},
										"inputInfo": {}
									},
									"barStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"hiloStyle": {
										"color": "#2196f3",
										"showBorders": true,
										"borderColor": "#2196f3",
										"showLabels": true,
										"labelColor": "#2196f3",
										"fontSize": 7
									},
									"lineStyle": {
										"color": "rgba(0, 255, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "rgba(33, 150, 243, 0.05)",
										"color2": "rgba(33, 150, 243, 0.05)",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"renkoStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"inputs": {
											"source": "close",
											"boxSize": 3,
											"style": "ATR",
											"atrLength": 14,
											"wicks": true
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"wicks": {
												"name": "Wicks"
											}
										}
									},
									"pbStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"lb": 3
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"lb": {
												"name": "Number of line"
											}
										}
									},
									"kagiStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"style": "ATR",
											"atrLength": 14,
											"reversalAmount": 1
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											}
										}
									},
									"pnfStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"sources": "Close",
											"reversalAmount": 3,
											"boxSize": 1,
											"style": "ATR",
											"atrLength": 14
										},
										"inputInfo": {
											"sources": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											}
										}
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 38, 166, 154, 0.05)",
										"topFillColor2": "rgba( 38, 166, 154, 0.05)",
										"bottomFillColor1": "rgba( 239, 83, 80, 0.05)",
										"bottomFillColor2": "rgba( 239, 83, 80, 0.05)",
										"topLineColor": "rgba( 38, 166, 154, 1)",
										"bottomLineColor": "rgba( 239, 83, 80, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"rangeStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"thinBars": true,
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"range": 10,
											"phantomBars": false
										},
										"inputInfo": {
											"range": {
												"name": "Range"
											},
											"phantomBars": {
												"name": "Phantom Bars"
											}
										}
									},
									"symbol": "REFVANG24KBUY",
									"shortName": "VÀNG 24K (9999) MUA VÀO",
									"timeframe": "",
									"onWidget": false,
									"interval": "D",
									"showSessions": false,
									"priceAxisProperties": {
										"autoScale": true,
										"autoScaleDisabled": false,
										"lockScale": false,
										"percentage": false,
										"percentageDisabled": false,
										"log": false,
										"logDisabled": false,
										"alignLabels": true,
										"isInverted": false,
										"indexedTo100": false
									}
								},
								"zorder": -1,
								"haStyle": {
									"studyId": "BarSetHeikenAshi@tv-basicstudies-60"
								},
								"renkoStyle": {
									"studyId": "BarSetRenko@tv-prostudies-15"
								},
								"pbStyle": {
									"studyId": "BarSetPriceBreak@tv-prostudies-15"
								},
								"kagiStyle": {
									"studyId": "BarSetKagi@tv-prostudies-15"
								},
								"pnfStyle": {
									"studyId": "BarSetPnF@tv-prostudies-15"
								},
								"rangeStyle": {
									"studyId": "BarSetRange@tv-basicstudies-72"
								}
							},
							{
								"type": "study_Overlay",
								"id": "GdoUI3",
								"state": {
									"styles": {
										"open": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Open"
										},
										"high": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "High"
										},
										"low": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Low"
										},
										"close": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Close"
										}
									},
									"precision": "default",
									"inputs": {
										"symbol": "REFVANG24KSELL"
									},
									"style": 2,
									"showPriceLine": false,
									"minTick": "default",
									"candleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"barStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"lineStyle": {
										"color": "rgba(255, 0, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "#2196f3",
										"color2": "#2196f3",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 83, 185, 135, 0.05)",
										"topFillColor2": "rgba( 83, 185, 135, 0.05)",
										"bottomFillColor1": "rgba( 235, 77, 92, 0.05)",
										"bottomFillColor2": "rgba( 235, 77, 92, 0.05)",
										"topLineColor": "rgba( 83, 185, 135, 1)",
										"bottomLineColor": "rgba( 235, 77, 92, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"palettes": {},
									"bands": {},
									"area": {},
									"graphics": {},
									"showInDataWindow": true,
									"visible": true,
									"showStudyArguments": true,
									"plots": {
										"0": {
											"id": "open",
											"type": "line"
										},
										"1": {
											"id": "high",
											"type": "line"
										},
										"2": {
											"id": "low",
											"type": "line"
										},
										"3": {
											"id": "close",
											"type": "line"
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								},
								"zorder": -4,
								"metaInfo": {
									"palettes": {},
									"inputs": [
										{
											"id": "symbol",
											"name": "symbol",
											"defval": "",
											"type": "symbol",
											"isHidden": true
										}
									],
									"plots": [
										{
											"id": "open",
											"type": "line"
										},
										{
											"id": "high",
											"type": "line"
										},
										{
											"id": "low",
											"type": "line"
										},
										{
											"id": "close",
											"type": "line"
										}
									],
									"graphics": {},
									"defaults": {
										"styles": {},
										"inputs": {
											"symbol": ""
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"styles": {
										"open": {
											"title": "Open"
										},
										"high": {
											"title": "High"
										},
										"low": {
											"title": "Low"
										},
										"close": {
											"title": "Close"
										}
									},
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies-1",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								}
							}
						],
						"leftAxisesState": [],
						"rightAxisesState": [
							{
								"state": {
									"id": "6FPccHx2iRtp",
									"m_priceRange": {
										"m_maxValue": 58050000,
										"m_minValue": 56250000
									},
									"m_isAutoScale": true,
									"m_isPercentage": false,
									"m_isIndexedTo100": false,
									"m_isLog": false,
									"m_isLockScale": false,
									"m_isInverted": false,
									"m_height": 220,
									"m_topMargin": 0.1,
									"m_bottomMargin": 0.08,
									"alignLabels": true
								},
								"sources": [
									"z2uWe2",
									"GdoUI3"
								]
							}
						],
						"overlayPriceScales": {},
						"stretchFactor": 2000,
						"mainSourceId": "z2uWe2",
						"priceScaleRatio": null
					}
				],
				"timeScale": {
					"m_barSpacing": 41.94601675233001,
					"m_rightOffset": 10
				},
				"chartProperties": {
					"paneProperties": {
						"background": "#131722",
						"gridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"vertGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"horzGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"crossHairProperties": {
							"color": "rgba(117, 134, 150, 1)",
							"style": 2,
							"transparency": 0,
							"width": 1
						},
						"topMargin": 10,
						"bottomMargin": 8,
						"axisProperties": {
							"autoScale": true,
							"autoScaleDisabled": false,
							"lockScale": false,
							"percentage": false,
							"percentageDisabled": false,
							"indexedTo100": false,
							"log": false,
							"logDisabled": false,
							"alignLabels": true,
							"isInverted": false
						},
						"legendProperties": {
							"showStudyArguments": true,
							"showStudyTitles": true,
							"showStudyValues": true,
							"showSeriesTitle": true,
							"showSeriesOHLC": true,
							"showLegend": true,
							"showBarChange": true,
							"showOnlyPriceSource": true
						}
					},
					"scalesProperties": {
						"backgroundColor": "#ffffff",
						"lineColor": "#787878",
						"textColor": "#D9D9D9",
						"fontSize": 11,
						"scaleSeriesOnly": false,
						"showSeriesLastValue": true,
						"seriesLastValueMode": 1,
						"showSeriesPrevCloseValue": false,
						"showStudyLastValue": false,
						"showSymbolLabels": false,
						"showStudyPlotLabels": false,
						"barSpacing": 6
					},
					"chartEventsSourceProperties": {
						"visible": true,
						"futureOnly": true,
						"breaks": {
							"color": "rgba(85, 85, 85, 1)",
							"visible": false,
							"style": 2,
							"width": 1
						}
					},
					"priceScaleSelectionStrategyName": "auto"
				},
				"version": 2,
				"timezone": "Asia/Ho_Chi_Minh",
				"sessions": {
					"properties": {
						"graphics": {
							"backgrounds": {
								"inSession": {
									"color": "#6fa8dc",
									"transparency": 60,
									"visible": false
								},
								"outOfSession": {
									"color": "#ffe599",
									"transparency": 60,
									"visible": false
								}
							},
							"vertlines": {
								"sessBreaks": {
									"color": "#4985e7",
									"style": 2,
									"visible": false,
									"width": 1
								}
							}
						}
					}
				}
			}
		]
	},
	config18K : {
		"name": "CFV",
		"layout": "s",
		"charts": [
			{
				"panes": [
					{
						"sources": [
							{
								"type": "MainSeries",
								"id": "z2uWe2",
								"state": {
									"style": 2,
									"esdShowDividends": true,
									"esdShowSplits": true,
									"esdShowEarnings": true,
									"esdShowBreaks": false,
									"esdBreaksStyle": {
										"color": "rgba( 235, 77, 92, 1)",
										"style": 2,
										"width": 1
									},
									"esdFlagSize": 2,
									"showCountdown": false,
									"showInDataWindow": true,
									"visible": true,
									"showPriceLine": true,
									"priceLineWidth": 1,
									"priceLineColor": "",
									"baseLineColor": "#5d606b",
									"showPrevClosePriceLine": false,
									"prevClosePriceLineWidth": 1,
									"prevClosePriceLineColor": "rgba( 85, 85, 85, 1)",
									"minTick": "default",
									"extendedHours": false,
									"sessVis": false,
									"statusViewStyle": {
										"fontSize": 16,
										"showExchange": true,
										"showInterval": true,
										"symbolTextSource": "description"
									},
									"candleStyle": {
										"upColor": "#00CA73",
										"downColor": "#FF6960",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#225437",
										"borderDownColor": "#5A1913",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#225437",
										"wickDownColor": "#5A1913",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350"
									},
									"haStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"showRealLastPrice": false,
										"barColorsOnPrevClose": false,
										"inputs": {},
										"inputInfo": {}
									},
									"barStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"hiloStyle": {
										"color": "#2196f3",
										"showBorders": true,
										"borderColor": "#2196f3",
										"showLabels": true,
										"labelColor": "#2196f3",
										"fontSize": 7
									},
									"lineStyle": {
										"color": "rgba(0, 255, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "rgba(33, 150, 243, 0.05)",
										"color2": "rgba(33, 150, 243, 0.05)",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"renkoStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"inputs": {
											"source": "close",
											"boxSize": 3,
											"style": "ATR",
											"atrLength": 14,
											"wicks": true
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"wicks": {
												"name": "Wicks"
											}
										}
									},
									"pbStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"lb": 3
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"lb": {
												"name": "Number of line"
											}
										}
									},
									"kagiStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"style": "ATR",
											"atrLength": 14,
											"reversalAmount": 1
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											}
										}
									},
									"pnfStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"sources": "Close",
											"reversalAmount": 3,
											"boxSize": 1,
											"style": "ATR",
											"atrLength": 14
										},
										"inputInfo": {
											"sources": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											}
										}
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 38, 166, 154, 0.05)",
										"topFillColor2": "rgba( 38, 166, 154, 0.05)",
										"bottomFillColor1": "rgba( 239, 83, 80, 0.05)",
										"bottomFillColor2": "rgba( 239, 83, 80, 0.05)",
										"topLineColor": "rgba( 38, 166, 154, 1)",
										"bottomLineColor": "rgba( 239, 83, 80, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"rangeStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"thinBars": true,
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"range": 10,
											"phantomBars": false
										},
										"inputInfo": {
											"range": {
												"name": "Range"
											},
											"phantomBars": {
												"name": "Phantom Bars"
											}
										}
									},
									"symbol": "REFVANG18KBUY",
									"shortName": "VÀNG 18K (750) MUA VÀO",
									"timeframe": "",
									"onWidget": false,
									"interval": "D",
									"showSessions": false,
									"priceAxisProperties": {
										"autoScale": true,
										"autoScaleDisabled": false,
										"lockScale": false,
										"percentage": false,
										"percentageDisabled": false,
										"log": false,
										"logDisabled": false,
										"alignLabels": true,
										"isInverted": false,
										"indexedTo100": false
									}
								},
								"zorder": -1,
								"haStyle": {
									"studyId": "BarSetHeikenAshi@tv-basicstudies-60"
								},
								"renkoStyle": {
									"studyId": "BarSetRenko@tv-prostudies-15"
								},
								"pbStyle": {
									"studyId": "BarSetPriceBreak@tv-prostudies-15"
								},
								"kagiStyle": {
									"studyId": "BarSetKagi@tv-prostudies-15"
								},
								"pnfStyle": {
									"studyId": "BarSetPnF@tv-prostudies-15"
								},
								"rangeStyle": {
									"studyId": "BarSetRange@tv-basicstudies-72"
								}
							},
							{
								"type": "study_Overlay",
								"id": "GdoUI3",
								"state": {
									"styles": {
										"open": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Open"
										},
										"high": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "High"
										},
										"low": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Low"
										},
										"close": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Close"
										}
									},
									"precision": "default",
									"inputs": {
										"symbol": "REFVANG18KSELL"
									},
									"style": 2,
									"showPriceLine": false,
									"minTick": "default",
									"candleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"barStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"lineStyle": {
										"color": "rgba(255, 0, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "#2196f3",
										"color2": "#2196f3",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 83, 185, 135, 0.05)",
										"topFillColor2": "rgba( 83, 185, 135, 0.05)",
										"bottomFillColor1": "rgba( 235, 77, 92, 0.05)",
										"bottomFillColor2": "rgba( 235, 77, 92, 0.05)",
										"topLineColor": "rgba( 83, 185, 135, 1)",
										"bottomLineColor": "rgba( 235, 77, 92, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"palettes": {},
									"bands": {},
									"area": {},
									"graphics": {},
									"showInDataWindow": true,
									"visible": true,
									"showStudyArguments": true,
									"plots": {
										"0": {
											"id": "open",
											"type": "line"
										},
										"1": {
											"id": "high",
											"type": "line"
										},
										"2": {
											"id": "low",
											"type": "line"
										},
										"3": {
											"id": "close",
											"type": "line"
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								},
								"zorder": -4,
								"metaInfo": {
									"palettes": {},
									"inputs": [
										{
											"id": "symbol",
											"name": "symbol",
											"defval": "",
											"type": "symbol",
											"isHidden": true
										}
									],
									"plots": [
										{
											"id": "open",
											"type": "line"
										},
										{
											"id": "high",
											"type": "line"
										},
										{
											"id": "low",
											"type": "line"
										},
										{
											"id": "close",
											"type": "line"
										}
									],
									"graphics": {},
									"defaults": {
										"styles": {},
										"inputs": {
											"symbol": ""
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"styles": {
										"open": {
											"title": "Open"
										},
										"high": {
											"title": "High"
										},
										"low": {
											"title": "Low"
										},
										"close": {
											"title": "Close"
										}
									},
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies-1",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								}
							}
						],
						"leftAxisesState": [],
						"rightAxisesState": [
							{
								"state": {
									"id": "6FPccHx2iRtp",
									"m_priceRange": {
										"m_maxValue": 58050000,
										"m_minValue": 56250000
									},
									"m_isAutoScale": true,
									"m_isPercentage": false,
									"m_isIndexedTo100": false,
									"m_isLog": false,
									"m_isLockScale": false,
									"m_isInverted": false,
									"m_height": 220,
									"m_topMargin": 0.1,
									"m_bottomMargin": 0.08,
									"alignLabels": true
								},
								"sources": [
									"z2uWe2",
									"GdoUI3"
								]
							}
						],
						"overlayPriceScales": {},
						"stretchFactor": 2000,
						"mainSourceId": "z2uWe2",
						"priceScaleRatio": null
					}
				],
				"timeScale": {
					"m_barSpacing": 41.94601675233001,
					"m_rightOffset": 10
				},
				"chartProperties": {
					"paneProperties": {
						"background": "#131722",
						"gridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"vertGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"horzGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"crossHairProperties": {
							"color": "rgba(117, 134, 150, 1)",
							"style": 2,
							"transparency": 0,
							"width": 1
						},
						"topMargin": 10,
						"bottomMargin": 8,
						"axisProperties": {
							"autoScale": true,
							"autoScaleDisabled": false,
							"lockScale": false,
							"percentage": false,
							"percentageDisabled": false,
							"indexedTo100": false,
							"log": false,
							"logDisabled": false,
							"alignLabels": true,
							"isInverted": false
						},
						"legendProperties": {
							"showStudyArguments": true,
							"showStudyTitles": true,
							"showStudyValues": true,
							"showSeriesTitle": true,
							"showSeriesOHLC": true,
							"showLegend": true,
							"showBarChange": true,
							"showOnlyPriceSource": true
						}
					},
					"scalesProperties": {
						"backgroundColor": "#ffffff",
						"lineColor": "#787878",
						"textColor": "#D9D9D9",
						"fontSize": 11,
						"scaleSeriesOnly": false,
						"showSeriesLastValue": true,
						"seriesLastValueMode": 1,
						"showSeriesPrevCloseValue": false,
						"showStudyLastValue": false,
						"showSymbolLabels": false,
						"showStudyPlotLabels": false,
						"barSpacing": 6
					},
					"chartEventsSourceProperties": {
						"visible": true,
						"futureOnly": true,
						"breaks": {
							"color": "rgba(85, 85, 85, 1)",
							"visible": false,
							"style": 2,
							"width": 1
						}
					},
					"priceScaleSelectionStrategyName": "auto"
				},
				"version": 2,
				"timezone": "Asia/Ho_Chi_Minh",
				"sessions": {
					"properties": {
						"graphics": {
							"backgrounds": {
								"inSession": {
									"color": "#6fa8dc",
									"transparency": 60,
									"visible": false
								},
								"outOfSession": {
									"color": "#ffe599",
									"transparency": 60,
									"visible": false
								}
							},
							"vertlines": {
								"sessBreaks": {
									"color": "#4985e7",
									"style": 2,
									"visible": false,
									"width": 1
								}
							}
						}
					}
				}
			}
		]
	},
	config14K : {
		"name": "CFV",
		"layout": "s",
		"charts": [
			{
				"panes": [
					{
						"sources": [
							{
								"type": "MainSeries",
								"id": "z2uWe2",
								"state": {
									"style": 2,
									"esdShowDividends": true,
									"esdShowSplits": true,
									"esdShowEarnings": true,
									"esdShowBreaks": false,
									"esdBreaksStyle": {
										"color": "rgba( 235, 77, 92, 1)",
										"style": 2,
										"width": 1
									},
									"esdFlagSize": 2,
									"showCountdown": false,
									"showInDataWindow": true,
									"visible": true,
									"showPriceLine": true,
									"priceLineWidth": 1,
									"priceLineColor": "",
									"baseLineColor": "#5d606b",
									"showPrevClosePriceLine": false,
									"prevClosePriceLineWidth": 1,
									"prevClosePriceLineColor": "rgba( 85, 85, 85, 1)",
									"minTick": "default",
									"extendedHours": false,
									"sessVis": false,
									"statusViewStyle": {
										"fontSize": 16,
										"showExchange": true,
										"showInterval": true,
										"symbolTextSource": "description"
									},
									"candleStyle": {
										"upColor": "#00CA73",
										"downColor": "#FF6960",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#225437",
										"borderDownColor": "#5A1913",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#225437",
										"wickDownColor": "#5A1913",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350"
									},
									"haStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "#378658",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"wickColor": "#B5B5B8",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"showRealLastPrice": false,
										"barColorsOnPrevClose": false,
										"inputs": {},
										"inputInfo": {}
									},
									"barStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"hiloStyle": {
										"color": "#2196f3",
										"showBorders": true,
										"borderColor": "#2196f3",
										"showLabels": true,
										"labelColor": "#2196f3",
										"fontSize": 7
									},
									"lineStyle": {
										"color": "rgba(0, 255, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "rgba(33, 150, 243, 0.05)",
										"color2": "rgba(33, 150, 243, 0.05)",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"renkoStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"wickUpColor": "#26a69a",
										"wickDownColor": "#ef5350",
										"inputs": {
											"source": "close",
											"boxSize": 3,
											"style": "ATR",
											"atrLength": 14,
											"wicks": true
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"wicks": {
												"name": "Wicks"
											}
										}
									},
									"pbStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"borderUpColor": "#26a69a",
										"borderDownColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"borderUpColorProjection": "#336854",
										"borderDownColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"lb": 3
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"lb": {
												"name": "Number of line"
											}
										}
									},
									"kagiStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"source": "close",
											"style": "ATR",
											"atrLength": 14,
											"reversalAmount": 1
										},
										"inputInfo": {
											"source": {
												"name": "Source"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											}
										}
									},
									"pnfStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"sources": "Close",
											"reversalAmount": 3,
											"boxSize": 1,
											"style": "ATR",
											"atrLength": 14
										},
										"inputInfo": {
											"sources": {
												"name": "Source"
											},
											"boxSize": {
												"name": "Box size"
											},
											"reversalAmount": {
												"name": "Reversal amount"
											},
											"style": {
												"name": "Style"
											},
											"atrLength": {
												"name": "ATR Length"
											}
										}
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 38, 166, 154, 0.05)",
										"topFillColor2": "rgba( 38, 166, 154, 0.05)",
										"bottomFillColor1": "rgba( 239, 83, 80, 0.05)",
										"bottomFillColor2": "rgba( 239, 83, 80, 0.05)",
										"topLineColor": "rgba( 38, 166, 154, 1)",
										"bottomLineColor": "rgba( 239, 83, 80, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"rangeStyle": {
										"upColor": "#26a69a",
										"downColor": "#ef5350",
										"thinBars": true,
										"upColorProjection": "#336854",
										"downColorProjection": "#7f323f",
										"inputs": {
											"range": 10,
											"phantomBars": false
										},
										"inputInfo": {
											"range": {
												"name": "Range"
											},
											"phantomBars": {
												"name": "Phantom Bars"
											}
										}
									},
									"symbol": "REFVANG14KBUY",
									"shortName": "VÀNG 14K (533) MUA VÀO",
									"timeframe": "",
									"onWidget": false,
									"interval": "D",
									"showSessions": false,
									"priceAxisProperties": {
										"autoScale": true,
										"autoScaleDisabled": false,
										"lockScale": false,
										"percentage": false,
										"percentageDisabled": false,
										"log": false,
										"logDisabled": false,
										"alignLabels": true,
										"isInverted": false,
										"indexedTo100": false
									}
								},
								"zorder": -1,
								"haStyle": {
									"studyId": "BarSetHeikenAshi@tv-basicstudies-60"
								},
								"renkoStyle": {
									"studyId": "BarSetRenko@tv-prostudies-15"
								},
								"pbStyle": {
									"studyId": "BarSetPriceBreak@tv-prostudies-15"
								},
								"kagiStyle": {
									"studyId": "BarSetKagi@tv-prostudies-15"
								},
								"pnfStyle": {
									"studyId": "BarSetPnF@tv-prostudies-15"
								},
								"rangeStyle": {
									"studyId": "BarSetRange@tv-basicstudies-72"
								}
							},
							{
								"type": "study_Overlay",
								"id": "GdoUI3",
								"state": {
									"styles": {
										"open": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Open"
										},
										"high": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "High"
										},
										"low": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Low"
										},
										"close": {
											"visible": true,
											"color": "rgba( 255, 0, 0, 1)",
											"linestyle": 0,
											"linewidth": 1,
											"plottype": 0,
											"histogramBase": 0,
											"transparency": 50,
											"trackPrice": false,
											"joinPoints": false,
											"title": "Close"
										}
									},
									"precision": "default",
									"inputs": {
										"symbol": "REFVANG14KSELL"
									},
									"style": 2,
									"showPriceLine": false,
									"minTick": "default",
									"candleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"hollowCandleStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"drawWick": true,
										"drawBorder": true,
										"borderColor": "rgba( 55, 134, 88, 1)",
										"borderUpColor": "rgba( 34, 84, 55, 1)",
										"borderDownColor": "rgba( 91, 26, 19, 1)",
										"wickColor": "rgba( 115, 115, 117, 1)",
										"wickUpColor": "rgba( 115, 115, 117, 1)",
										"wickDownColor": "rgba( 115, 115, 117, 1)",
										"barColorsOnPrevClose": false
									},
									"barStyle": {
										"upColor": "rgba( 107, 165, 131, 1)",
										"downColor": "rgba( 215, 84, 66, 1)",
										"barColorsOnPrevClose": false,
										"dontDrawOpen": false,
										"thinBars": true
									},
									"lineStyle": {
										"color": "rgba(255, 0, 0, 1)",
										"linestyle": 0,
										"linewidth": 4,
										"priceSource": "close",
										"styleType": 2
									},
									"areaStyle": {
										"color1": "#2196f3",
										"color2": "#2196f3",
										"linecolor": "#2196f3",
										"linestyle": 0,
										"linewidth": 3,
										"priceSource": "close",
										"transparency": 95
									},
									"baselineStyle": {
										"baselineColor": "rgba( 117, 134, 150, 1)",
										"topFillColor1": "rgba( 83, 185, 135, 0.05)",
										"topFillColor2": "rgba( 83, 185, 135, 0.05)",
										"bottomFillColor1": "rgba( 235, 77, 92, 0.05)",
										"bottomFillColor2": "rgba( 235, 77, 92, 0.05)",
										"topLineColor": "rgba( 83, 185, 135, 1)",
										"bottomLineColor": "rgba( 235, 77, 92, 1)",
										"topLineWidth": 3,
										"bottomLineWidth": 3,
										"priceSource": "close",
										"transparency": 50,
										"baseLevelPercentage": 50
									},
									"palettes": {},
									"bands": {},
									"area": {},
									"graphics": {},
									"showInDataWindow": true,
									"visible": true,
									"showStudyArguments": true,
									"plots": {
										"0": {
											"id": "open",
											"type": "line"
										},
										"1": {
											"id": "high",
											"type": "line"
										},
										"2": {
											"id": "low",
											"type": "line"
										},
										"3": {
											"id": "close",
											"type": "line"
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								},
								"zorder": -4,
								"metaInfo": {
									"palettes": {},
									"inputs": [
										{
											"id": "symbol",
											"name": "symbol",
											"defval": "",
											"type": "symbol",
											"isHidden": true
										}
									],
									"plots": [
										{
											"id": "open",
											"type": "line"
										},
										{
											"id": "high",
											"type": "line"
										},
										{
											"id": "low",
											"type": "line"
										},
										{
											"id": "close",
											"type": "line"
										}
									],
									"graphics": {},
									"defaults": {
										"styles": {},
										"inputs": {
											"symbol": ""
										}
									},
									"_metainfoVersion": 47,
									"isTVScript": false,
									"isTVScriptStub": false,
									"is_hidden_study": true,
									"styles": {
										"open": {
											"title": "Open"
										},
										"high": {
											"title": "High"
										},
										"low": {
											"title": "Low"
										},
										"close": {
											"title": "Close"
										}
									},
									"description": "Overlay",
									"shortDescription": "Overlay",
									"is_price_study": false,
									"id": "Overlay@tv-basicstudies-1",
									"description_localized": "Overlay",
									"shortId": "Overlay",
									"packageId": "tv-basicstudies",
									"version": "1",
									"fullId": "Overlay@tv-basicstudies-1",
									"productId": "tv-basicstudies",
									"name": "Overlay@tv-basicstudies",
									"format": {
										"type": "price",
										"precision": 4
									}
								}
							}
						],
						"leftAxisesState": [],
						"rightAxisesState": [
							{
								"state": {
									"id": "6FPccHx2iRtp",
									"m_priceRange": {
										"m_maxValue": 58050000,
										"m_minValue": 56250000
									},
									"m_isAutoScale": true,
									"m_isPercentage": false,
									"m_isIndexedTo100": false,
									"m_isLog": false,
									"m_isLockScale": false,
									"m_isInverted": false,
									"m_height": 220,
									"m_topMargin": 0.1,
									"m_bottomMargin": 0.08,
									"alignLabels": true
								},
								"sources": [
									"z2uWe2",
									"GdoUI3"
								]
							}
						],
						"overlayPriceScales": {},
						"stretchFactor": 2000,
						"mainSourceId": "z2uWe2",
						"priceScaleRatio": null
					}
				],
				"timeScale": {
					"m_barSpacing": 41.94601675233001,
					"m_rightOffset": 10
				},
				"chartProperties": {
					"paneProperties": {
						"background": "#131722",
						"gridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"vertGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"horzGridProperties": {
							"color": "#363c4e",
							"style": 0
						},
						"crossHairProperties": {
							"color": "rgba(117, 134, 150, 1)",
							"style": 2,
							"transparency": 0,
							"width": 1
						},
						"topMargin": 10,
						"bottomMargin": 8,
						"axisProperties": {
							"autoScale": true,
							"autoScaleDisabled": false,
							"lockScale": false,
							"percentage": false,
							"percentageDisabled": false,
							"indexedTo100": false,
							"log": false,
							"logDisabled": false,
							"alignLabels": true,
							"isInverted": false
						},
						"legendProperties": {
							"showStudyArguments": true,
							"showStudyTitles": true,
							"showStudyValues": true,
							"showSeriesTitle": true,
							"showSeriesOHLC": true,
							"showLegend": true,
							"showBarChange": true,
							"showOnlyPriceSource": true
						}
					},
					"scalesProperties": {
						"backgroundColor": "#ffffff",
						"lineColor": "#787878",
						"textColor": "#D9D9D9",
						"fontSize": 11,
						"scaleSeriesOnly": false,
						"showSeriesLastValue": true,
						"seriesLastValueMode": 1,
						"showSeriesPrevCloseValue": false,
						"showStudyLastValue": false,
						"showSymbolLabels": false,
						"showStudyPlotLabels": false,
						"barSpacing": 6
					},
					"chartEventsSourceProperties": {
						"visible": true,
						"futureOnly": true,
						"breaks": {
							"color": "rgba(85, 85, 85, 1)",
							"visible": false,
							"style": 2,
							"width": 1
						}
					},
					"priceScaleSelectionStrategyName": "auto"
				},
				"version": 2,
				"timezone": "Asia/Ho_Chi_Minh",
				"sessions": {
					"properties": {
						"graphics": {
							"backgrounds": {
								"inSession": {
									"color": "#6fa8dc",
									"transparency": 60,
									"visible": false
								},
								"outOfSession": {
									"color": "#ffe599",
									"transparency": 60,
									"visible": false
								}
							},
							"vertlines": {
								"sessBreaks": {
									"color": "#4985e7",
									"style": 2,
									"visible": false,
									"width": 1
								}
							}
						}
					}
				}
			}
		]
	},

	configGOLD : {
		"name" : "GOLD",
		"layout" : "s",
		"charts" : [ {
			"panes" : [ {
				"sources" : [ {
					"type" : "MainSeries",
					"id" : "dzzl2a",
					"state" : {
						"style" : 2,
						"esdShowDividends" : true,
						"esdShowSplits" : true,
						"esdShowEarnings" : true,
						"esdShowBreaks" : false,
						"esdBreaksStyle" : {
							"color" : "rgba( 235, 77, 92, 1)",
							"style" : 2,
							"width" : 1
						},
						"esdFlagSize" : 2,
						"showCountdown" : false,
						"showInDataWindow" : true,
						"visible" : true,
						"showPriceLine" : true,
						"priceLineWidth" : 1,
						"priceLineColor" : "",
						"baseLineColor" : "#5d606b",
						"showPrevClosePriceLine" : false,
						"prevClosePriceLineWidth" : 1,
						"prevClosePriceLineColor" : "rgba( 85, 85, 85, 1)",
						"minTick" : "default",
						"extendedHours" : false,
						"sessVis" : false,
						"statusViewStyle" : {
							"fontSize" : 16,
							"showExchange" : true,
							"showInterval" : true,
							"symbolTextSource" : "description"
						},
						"candleStyle" : {
							"upColor" : "#00CA73",
							"downColor" : "#FF6960",
							"drawWick" : true,
							"drawBorder" : true,
							"borderColor" : "#378658",
							"borderUpColor" : "#225437",
							"borderDownColor" : "#5A1913",
							"wickColor" : "#B5B5B8",
							"wickUpColor" : "#225437",
							"wickDownColor" : "#5A1913",
							"barColorsOnPrevClose" : false
						},
						"hollowCandleStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"drawWick" : true,
							"drawBorder" : true,
							"borderColor" : "#378658",
							"borderUpColor" : "#26a69a",
							"borderDownColor" : "#ef5350",
							"wickColor" : "#B5B5B8",
							"wickUpColor" : "#26a69a",
							"wickDownColor" : "#ef5350"
						},
						"haStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"drawWick" : true,
							"drawBorder" : true,
							"borderColor" : "#378658",
							"borderUpColor" : "#26a69a",
							"borderDownColor" : "#ef5350",
							"wickColor" : "#B5B5B8",
							"wickUpColor" : "#26a69a",
							"wickDownColor" : "#ef5350",
							"showRealLastPrice" : false,
							"barColorsOnPrevClose" : false,
							"inputs" : {},
							"inputInfo" : {}
						},
						"barStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"barColorsOnPrevClose" : false,
							"dontDrawOpen" : false,
							"thinBars" : true
						},
						"hiloStyle" : {
							"color" : "#2196f3",
							"showBorders" : true,
							"borderColor" : "#2196f3",
							"showLabels" : true,
							"labelColor" : "#2196f3",
							"fontSize" : 7
						},
						"lineStyle" : {
							"color" : "#2196f3",
							"linestyle" : 0,
							"linewidth" : 3,
							"priceSource" : "close",
							"styleType" : 2
						},
						"areaStyle" : {
							"color1" : "#2196f3",
							"color2" : "#2196f3",
							"linecolor" : "#2196f3",
							"linestyle" : 0,
							"linewidth" : 3,
							"priceSource" : "close",
							"transparency" : 95
						},
						"renkoStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"borderUpColor" : "#26a69a",
							"borderDownColor" : "#ef5350",
							"upColorProjection" : "#336854",
							"downColorProjection" : "#7f323f",
							"borderUpColorProjection" : "#336854",
							"borderDownColorProjection" : "#7f323f",
							"wickUpColor" : "#26a69a",
							"wickDownColor" : "#ef5350",
							"inputs" : {
								"source" : "close",
								"boxSize" : 3,
								"style" : "ATR",
								"atrLength" : 14,
								"wicks" : true
							},
							"inputInfo" : {
								"source" : {
									"name" : "Source"
								},
								"boxSize" : {
									"name" : "Box size"
								},
								"style" : {
									"name" : "Style"
								},
								"atrLength" : {
									"name" : "ATR Length"
								},
								"wicks" : {
									"name" : "Wicks"
								}
							}
						},
						"pbStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"borderUpColor" : "#26a69a",
							"borderDownColor" : "#ef5350",
							"upColorProjection" : "#336854",
							"downColorProjection" : "#7f323f",
							"borderUpColorProjection" : "#336854",
							"borderDownColorProjection" : "#7f323f",
							"inputs" : {
								"source" : "close",
								"lb" : 3
							},
							"inputInfo" : {
								"source" : {
									"name" : "Source"
								},
								"lb" : {
									"name" : "Number of line"
								}
							}
						},
						"kagiStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"upColorProjection" : "#336854",
							"downColorProjection" : "#7f323f",
							"inputs" : {
								"source" : "close",
								"style" : "ATR",
								"atrLength" : 14,
								"reversalAmount" : 1
							},
							"inputInfo" : {
								"source" : {
									"name" : "Source"
								},
								"style" : {
									"name" : "Style"
								},
								"atrLength" : {
									"name" : "ATR Length"
								},
								"reversalAmount" : {
									"name" : "Reversal amount"
								}
							}
						},
						"pnfStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"upColorProjection" : "#336854",
							"downColorProjection" : "#7f323f",
							"inputs" : {
								"sources" : "Close",
								"reversalAmount" : 3,
								"boxSize" : 1,
								"style" : "ATR",
								"atrLength" : 14
							},
							"inputInfo" : {
								"sources" : {
									"name" : "Source"
								},
								"boxSize" : {
									"name" : "Box size"
								},
								"reversalAmount" : {
									"name" : "Reversal amount"
								},
								"style" : {
									"name" : "Style"
								},
								"atrLength" : {
									"name" : "ATR Length"
								}
							}
						},
						"baselineStyle" : {
							"baselineColor" : "rgba( 117, 134, 150, 1)",
							"topFillColor1" : "rgba( 38, 166, 154, 0.05)",
							"topFillColor2" : "rgba( 38, 166, 154, 0.05)",
							"bottomFillColor1" : "rgba( 239, 83, 80, 0.05)",
							"bottomFillColor2" : "rgba( 239, 83, 80, 0.05)",
							"topLineColor" : "rgba( 38, 166, 154, 1)",
							"bottomLineColor" : "rgba( 239, 83, 80, 1)",
							"topLineWidth" : 3,
							"bottomLineWidth" : 3,
							"priceSource" : "close",
							"transparency" : 50,
							"baseLevelPercentage" : 50
						},
						"rangeStyle" : {
							"upColor" : "#26a69a",
							"downColor" : "#ef5350",
							"thinBars" : true,
							"upColorProjection" : "#336854",
							"downColorProjection" : "#7f323f",
							"inputs" : {
								"range" : 10,
								"phantomBars" : false
							},
							"inputInfo" : {
								"range" : {
									"name" : "Range"
								},
								"phantomBars" : {
									"name" : "Phantom Bars"
								}
							}
						},
						"symbol" : "WORLDGOLD",
						"shortName" : "Vàng Thế giới",
						"timeframe" : "",
						"onWidget" : false,
						// "interval": "5",
						"priceAxisProperties" : {
							"autoScale" : true,
							"autoScaleDisabled" : false,
							"lockScale" : false,
							"percentage" : false,
							"percentageDisabled" : false,
							"log" : false,
							"logDisabled" : false,
							"alignLabels" : true,
							"isInverted" : false,
							"indexedTo100" : false
						}
					},
					"zorder" : -1,
					"haStyle" : {
						"studyId" : "BarSetHeikenAshi@tv-basicstudies-60"
					},
					"renkoStyle" : {
						"studyId" : "BarSetRenko@tv-prostudies-15"
					},
					"pbStyle" : {
						"studyId" : "BarSetPriceBreak@tv-prostudies-15"
					},
					"kagiStyle" : {
						"studyId" : "BarSetKagi@tv-prostudies-15"
					},
					"pnfStyle" : {
						"studyId" : "BarSetPnF@tv-prostudies-15"
					},
					"rangeStyle" : {
						"studyId" : "BarSetRange@tv-basicstudies-72"
					}
				} ],
				"leftAxisesState" : [],
				"rightAxisesState" : [ {
					"state" : {
						"id" : "rRfOPrPWyH3u",
						"m_priceRange" : {
							"m_maxValue" : 1931.9,
							"m_minValue" : 1196.6
						},
						"m_isAutoScale" : true,
						"m_isPercentage" : false,
						"m_isIndexedTo100" : false,
						"m_isLog" : false,
						"m_isLockScale" : false,
						"m_isInverted" : false,
						"m_height" : 301,
						"m_topMargin" : 0.1,
						"m_bottomMargin" : 0.08,
						"alignLabels" : true
					},
					"sources" : [ "dzzl2a" ]
				} ],
				"overlayPriceScales" : {},
				"stretchFactor" : 2000,
				"mainSourceId" : "dzzl2a",
				"priceScaleRatio" : null
			} ],
			"timeScale" : {
				"m_barSpacing" : 50,
				"m_rightOffset" : 10
			},
			"chartProperties" : {
				"paneProperties" : {
					"background" : "#131722",
					"gridProperties" : {
						"color" : "#363c4e",
						"style" : 0
					},
					"vertGridProperties" : {
						"color" : "#363c4e",
						"style" : 0
					},
					"horzGridProperties" : {
						"color" : "#363c4e",
						"style" : 0
					},
					"crossHairProperties" : {
						"color" : "#758696",
						"style" : 2,
						"transparency" : 0,
						"width" : 1
					},
					"topMargin" : 10,
					"bottomMargin" : 8,
					"axisProperties" : {
						"autoScale" : true,
						"autoScaleDisabled" : false,
						"lockScale" : false,
						"percentage" : false,
						"percentageDisabled" : false,
						"indexedTo100" : false,
						"log" : false,
						"logDisabled" : false,
						"alignLabels" : true,
						"isInverted" : false
					},
					"legendProperties" : {
						"showStudyArguments" : true,
						"showStudyTitles" : true,
						"showStudyValues" : true,
						"showSeriesTitle" : true,
						"showSeriesOHLC" : true,
						"showLegend" : true,
						"showBarChange" : true,
						"showOnlyPriceSource" : true
					}
				},
				"scalesProperties" : {
					"backgroundColor" : "#ffffff",
					"lineColor" : "#787878",
					"textColor" : "#D9D9D9",
					"fontSize" : 11,
					"scaleSeriesOnly" : false,
					"showSeriesLastValue" : true,
					"seriesLastValueMode" : 1,
					"showSeriesPrevCloseValue" : false,
					"showStudyLastValue" : false,
					"showSymbolLabels" : false,
					"showStudyPlotLabels" : false,
					"barSpacing" : 6
				},
				"chartEventsSourceProperties" : {
					"visible" : true,
					"futureOnly" : true,
					"breaks" : {
						"color" : "rgba(85, 85, 85, 1)",
						"visible" : false,
						"style" : 2,
						"width" : 1
					}
				},
				"priceScaleSelectionStrategyName" : "auto"
			},
			"version" : 2,
			"timezone" : "Asia/Bangkok",
			"sessions" : {
				"properties" : {
					"graphics" : {
						"backgrounds" : {
							"inSession" : {
								"color" : "#6fa8dc",
								"transparency" : 60,
								"visible" : false
							},
							"outOfSession" : {
								"color" : "#ffe599",
								"transparency" : 60,
								"visible" : false
							}
						},
						"vertlines" : {
							"sessBreaks" : {
								"color" : "#4985e7",
								"style" : 2,
								"visible" : false,
								"width" : 1
							}
						}
					}
				}
			}
		} ]
	}

};