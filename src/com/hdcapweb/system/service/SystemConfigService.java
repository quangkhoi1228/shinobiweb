package com.hdcapweb.system.service;

import com.shinobiutil.exception.SnbException;

public interface SystemConfigService {
    void updateTradingOffDate(String tradingOffDateString) throws SnbException;
}
