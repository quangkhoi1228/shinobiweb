package com.hdcapweb.concurrent;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.service.AbstractBackgroundService;
import com.shinobiutil.exception.SnbException;

public class EndDayLogoutAllUserAgent extends AbstractBackgroundService {

    Logger logger = LogManager.getLogger();

    public EndDayLogoutAllUserAgent(String taskName, String sessionid) {
        super(taskName, sessionid);
    }

    @Override
    protected void scheduleRun() throws SnbException {
        SimpleDateFormat parser = new SimpleDateFormat("HH:mm:ss");

        try {
            Date now = parser.parse(parser.format(new Date()));

        } catch (ParseException e) {
            logger.catching(Level.ERROR, e);
        }
    }

}
