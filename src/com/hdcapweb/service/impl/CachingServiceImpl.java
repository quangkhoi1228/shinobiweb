package com.hdcapweb.service.impl;

import javax.persistence.EntityManager;

import org.apache.logging.log4j.Level;

import com.shinobi.service.AbstractShinobiService;
import com.shinobi.service.ShinobiCoreCachingService;
import com.shinobi.service.impl.ShinobiCoreCachingServiceImpl;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.service.CachingService;

public class CachingServiceImpl extends AbstractShinobiService implements CachingService {
	private ShinobiCoreCachingService shinobiCoreCachingService;

	public CachingServiceImpl(String sessionid, EntityManager em) {
		super(sessionid, em);
		shinobiCoreCachingService = new ShinobiCoreCachingServiceImpl(sessionid, em);
	}

	@Override
	public void reloadCacheAll() throws SnbException {

	}

	@Override
	public void cacheLogLevel() throws SnbException {
		String loggerlevel = (System.getProperty("loggerlevel") != null) ? System.getProperty("loggerlevel") : "DEBUG";

		shinobiCoreCachingService.cacheLoggerLevel(Level.valueOf(loggerlevel));
		shinobiCoreCachingService.cacheMainDbconfig();
	}
}
