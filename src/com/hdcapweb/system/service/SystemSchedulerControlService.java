package com.hdcapweb.system.service;

import java.util.List;

import com.shinobiutil.exception.SnbException;
import com.hdcapweb.system.dto.SchedulerStatusDto;

public interface SystemSchedulerControlService {

	String startSchedulerName(String schedulername) throws SnbException;

	String stopSchedulerName(String schedulername) throws SnbException;

	List<SchedulerStatusDto> getAllSchedulerStatus() throws SnbException;

	void startScheduler() throws SnbException;

}
