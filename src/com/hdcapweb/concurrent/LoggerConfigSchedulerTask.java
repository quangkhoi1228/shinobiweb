package com.hdcapweb.concurrent;

import com.shinobi.service.AbstractSchedulerService;
import com.shinobi.service.LoggerConfigService;
import com.shinobi.service.impl.LoggerConfigServiceImpl;
import com.shinobiutil.exception.SnbException;

public class LoggerConfigSchedulerTask extends AbstractSchedulerService {
	private LoggerConfigService loggerConfigService;
	public LoggerConfigSchedulerTask(String taskName, String sessionid) {
		super(taskName, sessionid);
	}

	@Override
	protected void scheduleRun() throws SnbException {
		loggerConfigService = new LoggerConfigServiceImpl(sessionid, em);
		loggerConfigService.setLoggerLevelFromCache();
		
	}
}
