package com.hdcapweb.config;

public enum SchedulerName {
	LoggerConfigSchedulerTask,
	EndDayLogoutAllUserAgent,
	
	;
	public String getValue() {
		return "Schedulername_" + this.toString();
	}

	public String getCode() {
		return this.toString();
	}
}