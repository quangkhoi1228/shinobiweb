package com.hdcapweb.dto;

import java.math.BigDecimal;

public class PortfolioDto {
    private String account;

    private String stockcode;

    private BigDecimal avgprice;

    private BigDecimal currentamount;
    private BigDecimal lockedamount;
    private BigDecimal waitamount;
    private BigDecimal totalamount;

    private BigDecimal marketprice;

    private BigDecimal maketvalue;
    private BigDecimal value;
    private BigDecimal percentchange;
    private BigDecimal proportion;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getStockcode() {
        return stockcode;
    }

    public void setStockcode(String stockcode) {
        this.stockcode = stockcode;
    }

    public BigDecimal getAvgprice() {
        return avgprice;
    }

    public void setAvgprice(BigDecimal avgprice) {
        this.avgprice = avgprice;
    }

    public BigDecimal getCurrentamount() {
        return currentamount;
    }

    public void setCurrentamount(BigDecimal currentamount) {
        this.currentamount = currentamount;
    }

    public BigDecimal getLockedamount() {
        return lockedamount;
    }

    public void setLockedamount(BigDecimal lockedamount) {
        this.lockedamount = lockedamount;
    }

    public BigDecimal getWaitamount() {
        return waitamount;
    }

    public void setWaitamount(BigDecimal waitamount) {
        this.waitamount = waitamount;
    }

    public BigDecimal getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(BigDecimal totalamount) {
        this.totalamount = totalamount;
    }

    public BigDecimal getMarketprice() {
        return marketprice;
    }

    public void setMarketprice(BigDecimal marketprice) {
        this.marketprice = marketprice;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public BigDecimal getMaketvalue() {
        return maketvalue;
    }

    public void setMaketvalue(BigDecimal maketvalue) {
        this.maketvalue = maketvalue;
    }

    public BigDecimal getPercentchange() {
        return percentchange;
    }

    public void setPercentchange(BigDecimal percentchange) {
        this.percentchange = percentchange;
    }

    public BigDecimal getProportion() {
        return proportion;
    }

    public void setProportion(BigDecimal proportion) {
        this.proportion = proportion;
    }
}
