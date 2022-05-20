package com.hdcapweb.system.service.impl;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.service.AbstractShinobiService;
import com.shinobiutil.caching.ShinobiCacheManager;
import com.shinobiutil.concurrent.ShinobiConcurrentManager;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.concurrent.EndDayLogoutAllUserAgent;
import com.hdcapweb.config.SchedulerName;
import com.hdcapweb.system.config.SystemErrorCode;
import com.hdcapweb.system.dto.SchedulerStatusDto;
import com.hdcapweb.system.service.SystemSchedulerControlService;

public class SystemSchedulerControlServiceImpl extends AbstractShinobiService implements SystemSchedulerControlService {
	private static final Logger logger = LogManager.getLogger();
	private static boolean startScheduler = false;

	public SystemSchedulerControlServiceImpl(String sessionid, EntityManager em) {
		super(sessionid, em);
	}

	private List<String> getListSchedulerName() throws SnbException {

		List<String> schedulerNameList = Stream.of(SchedulerName.values()).map(Enum::name).collect(Collectors.toList());

		return schedulerNameList;

	}

	@Override
	public String startSchedulerName(String schedulername) throws SnbException {
		checkSchedulerName(schedulername);
		logger.trace("start scheduler " + schedulername + " process");
		switch (schedulername) {
		case "EndDayLogoutAllUserAgent": {
			ShinobiConcurrentManager.createScheduleServiceTask(
					new EndDayLogoutAllUserAgent(SchedulerName.EndDayLogoutAllUserAgent.getValue(), null), 10,
					TimeUnit.SECONDS);

			return null;
		}

		default: {
			return null;
		}

		}

	}

	private void checkSchedulerName(String schedulername) throws SnbException {
		List<String> schedulerNameList = getListSchedulerName();
		if (!schedulerNameList.contains(schedulername) == true) {
			throw new SnbException(SystemErrorCode.CANNOT_FIND_SCHEDULER_NAME);
		}
	}

	@Override
	public String stopSchedulerName(String schedulername) throws SnbException {
		checkSchedulerName(schedulername);
		logger.trace("stop scheduler " + schedulername + " process");
		switch (schedulername) {
		case "EndDayLogoutAllUserAgent": {
			ShinobiConcurrentManager.stopScheduleServiceTask(SchedulerName.EndDayLogoutAllUserAgent.getValue());
			return null;
		}
		default: {
			return null;
		}

		}

	}

	@Override
	public List<SchedulerStatusDto> getAllSchedulerStatus() throws SnbException {

		Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<SchedulerStatusDto> result = new ArrayList<>();
		List<String> schedulerNameList = getListSchedulerName();
		for (String schedulername : schedulerNameList) {
			SchedulerStatusDto schedulerStatusDto = new SchedulerStatusDto();

			if (ShinobiConcurrentManager.getScheduleTask("Schedulername_" + schedulername) != null) {

				schedulerStatusDto.setSchedulerstatus("STARTED");
				schedulerStatusDto.setSchedulername(schedulername);
			} else {
				schedulerStatusDto.setSchedulername(schedulername);
				schedulerStatusDto.setSchedulerstatus("NOT RUNNING");

			}
			Date lastrunningDate = (Date) ShinobiCacheManager.get("Scheduler_Schedulername_" + schedulername);
			if (lastrunningDate == null) {
				schedulerStatusDto.setLasttimerun(null);
			} else {

				String lasttimerun = formatter.format(lastrunningDate);
				schedulerStatusDto.setLasttimerun(lasttimerun);
			}

			result.add(schedulerStatusDto);

		}
		return result;
	}

	@Override
	public void startScheduler() throws SnbException {
		logger.trace("startCbvScheduler:" + startScheduler);
		if (startScheduler == false) {

			logger.trace("start executing relation scheduler");

			ShinobiConcurrentManager.createScheduleServiceTask(
					new EndDayLogoutAllUserAgent(SchedulerName.EndDayLogoutAllUserAgent.getValue(), null), 1,
					TimeUnit.MINUTES);

			startScheduler = true;

		} else {

			throw new SnbException("SYSTEM HAS BEEN STARTED");
		}
	}
}
