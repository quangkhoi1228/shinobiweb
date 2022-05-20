package com.hdcapweb.config;

public enum DateTimeFormat {
	DATE_FORMAT("yyyy-MM-dd"),
	REVERT_DATE_FORMAT("dd/MM/yyyy"),
	SHORT_REVERT_DATE_FORMAT("dd/MM/yy"),
	DATETIME_FORMAT("yyyy-MM-dd HH:mm"),
	DATETIME_FORMAT2("yyyy-MM-ddTHH:mm"),
	DATETIME_FORMAT3("yyyy-MM-dd HH:mm:ss"),
	KEY_BY_TIME("HHmmssSS"),
	KEY_BY_DATE("yyyyMMdd"),
	;
	
	private final String value;
	
	DateTimeFormat(String value) {
        this.value = value;
    }
 
	public String getName() {
		return this.toString();
	}
	
    public String getValue() {
        return value;
    }
}
