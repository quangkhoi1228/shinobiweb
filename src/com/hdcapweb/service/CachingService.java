package com.hdcapweb.service;

import com.shinobiutil.exception.SnbException;

public interface CachingService {
	void reloadCacheAll() throws SnbException;

	void cacheLogLevel() throws SnbException;
}
