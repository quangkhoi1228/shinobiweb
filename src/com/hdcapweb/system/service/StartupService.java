package com.hdcapweb.system.service;

import com.shinobiutil.exception.SnbException;

public interface StartupService {
	void startAllService() throws SnbException;
	void startLocalService() throws SnbException;
}
