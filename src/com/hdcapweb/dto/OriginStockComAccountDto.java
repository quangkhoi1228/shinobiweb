package com.hdcapweb.dto;

public class OriginStockComAccountDto {
    String systemaccount;
    String stockcompany;
    String fullname;
    String tradingsubaccount;
    String account;

    public OriginStockComAccountDto(String account, String systemaccount, String stockcompany, String fullname,
                                    String tradingsubaccount) {
        this.account = account;
        this.systemaccount = systemaccount;
        this.stockcompany = stockcompany;
        this.fullname = fullname;
        this.tradingsubaccount = tradingsubaccount;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getSystemaccount() {
        return systemaccount;
    }

    public void setSystemaccount(String systemaccount) {
        this.systemaccount = systemaccount;
    }

    public String getStockcompany() {
        return stockcompany;
    }

    public void setStockcompany(String stockcompany) {
        this.stockcompany = stockcompany;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getTradingsubaccount() {
        return tradingsubaccount;
    }

    public void setTradingsubaccount(String tradingsubaccount) {
        this.tradingsubaccount = tradingsubaccount;
    }

}
