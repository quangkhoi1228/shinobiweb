package com.hdcapweb.exception;

import com.shinobiutil.exception.SnbError;

public enum TradingSystemWebErrorCode implements SnbError {
    INVALID_RELATION_TYPE, INVALID_ALLOCATED_USER, INVALID_USERID, USER_INFO_NOT_FOUND, SUB_ACCOUNT_NOT_FOUND,
    START_TRADING_DATE_CANNOT_BE_BEFORE_TODAY, END_DATE_MUST_BE_AFTER_START_DATE,
    RATIO_NUMBER_MUST_NOT_BE_GREATER_THAN_ONE, MISSING_ALLOCATION_INFO, INVALID_TRADING_FOLLOW_RELATION_DATA,
    INVALID_RELATION_ACTION_OF_THIS_TYPE, TRADING_PERIOD_NOT_FOUND, INVALID_STOCK_COMPANY, INVALID_USERTYPE,
    STOCK_ACCOUNT_ALREADY_EXIST, LOGIN_FAILURE, GROUPNAME_NOT_FOUND, USERNAME_ALREADY_EXIST, INVALID_USERNAME,
    STOCK_ACCOUNT_INFO_LOGIN_NOT_EXIST, IMVALID_USERNAME_PASSWORD, PRICE_NOT_FOUND, INVALID_SYSTEM_ACCOUNT,

    INVALID_SYSTEM_SUB_ACCOUNT, INVALID_ALLOCATION_ACCOUNT, INVALID_DATE,
    PERMISSION_REJECTED, INVALID_INPUT_TYPE,
    CAN_NOT_GET_LIST_ORIGIN_STOCK_COM_ACCOUNT, NOT_FOUND_IN_DATA,
    PASSWORD_DIFFERENT, MISSING_VALUE,

    CAN_NOT_UPDATE_PERSONAL_TRADING_CONFIG,
    CAN_NOT_GET_INFO_ALLOCATION_ACCOUNT;

    @Override
    public String getValue() {
        return "ERROR_" + this.toString();
    }

    @Override
    public String getCode() {
        return this.toString();
    }
}
