package com.hdcapweb.system.config;

import com.shinobiutil.exception.SnbError;

public enum SystemErrorCode implements SnbError {
	CANNOT_FIND_SCHEDULER_NAME,;

	@Override
	public String getCode() {
		return "ERROR_" + this.toString();

	}

	@Override
	public String getValue() {
		return this.toString();
	}
}
