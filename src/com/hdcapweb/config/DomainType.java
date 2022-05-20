package com.hdcapweb.config;

public enum DomainType {
	ALADIN("https://www.aladin.finance"), 
	NARUTO("https://naruto.finance"), 
	LOCALHOST("http://localhost:7979"),
	
	;

	private final String value;

	DomainType(String value) {
        this.value = value;
    }

	public String getName() {
		return this.toString();
	}

	public String getValue() {
		return value;
	}

}
