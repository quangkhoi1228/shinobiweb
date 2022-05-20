package com.hdcapweb.system.service.impl;

import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.concurrent.LoggerConfigSchedulerTask;
import com.shinobi.persistence.impl.ShinobiJpaManager;
import com.shinobiutil.concurrent.ShinobiConcurrentManager;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.config.SchedulerName;
import com.hdcapweb.service.CachingService;
import com.hdcapweb.service.impl.CachingServiceImpl;
import com.hdcapweb.system.service.StartupService;
import com.hdcapweb.system.service.SystemSchedulerControlService;

public class StartupServiceImpl implements StartupService {
	private static final Logger logger = LogManager.getLogger();

	@Override
	public void startAllService() throws SnbException {
		startCaching();
		startBackgroundService();
	}

	private void startCaching() throws SnbException {
		logger.info("-------------------start caching-------------------");

		EntityManager em = ShinobiJpaManager.getInstance().getEntityManager();
		try {
			em.getTransaction().begin();

			CachingService cachingService = new CachingServiceImpl("null", em);

			cachingService.reloadCacheAll();
			cachingService.cacheLogLevel();

			em.getTransaction().commit();

		} catch (Exception e) {
			throw new SnbException(e);
		} finally {
			if (em != null && em.isOpen()) {
				em.close();
			}
		}

		logger.info("-------------------end caching-------------------");
	}

	private void startBackgroundService() throws SnbException {
		SystemSchedulerControlService systemSchedulerControlService = new SystemSchedulerControlServiceImpl("null",
				null);
		systemSchedulerControlService.startScheduler();

	}

	@Override
	public void startLocalService() throws SnbException {
		startLocalScheduler();
	}

	private void startLocalScheduler() throws SnbException {
		ShinobiConcurrentManager.createScheduleServiceTask(
				new LoggerConfigSchedulerTask(SchedulerName.LoggerConfigSchedulerTask.getValue(), null), 10,
				TimeUnit.SECONDS);
	}

	private void cacheLogLevel() throws SnbException {
		EntityManager em = ShinobiJpaManager.getInstance().getEntityManager();

		try {
			CachingService cachingService = new CachingServiceImpl("null", em);
			cachingService.cacheLogLevel();
		} catch (Exception e) {
			throw new SnbException(e);
		} finally {
			if (em != null && em.isOpen()) {
				em.close();
			}
		}
	}
}
