package com.hdcapweb.dto;

import java.math.BigDecimal;

public class UserStockProfolioDto {
    String account;
    String stockCode;
    BigDecimal currentAmount;
    BigDecimal waitAmount;
    BigDecimal trading;
    BigDecimal avgPrice;
    BigDecimal orderValue;
    BigDecimal marketPrice;
    BigDecimal marketValue;
    BigDecimal gain_loss;
    BigDecimal ratio;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getStockCode() {
        return stockCode;
    }

    public void setStockCode(String stockCode) {
        this.stockCode = stockCode;
    }

    public BigDecimal getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(BigDecimal currentAmount) {
        this.currentAmount = currentAmount;
    }

    public BigDecimal getWaitAmount() {
        return waitAmount;
    }

    public void setWaitAmount(BigDecimal waitAmount) {
        this.waitAmount = waitAmount;
    }

    public BigDecimal getTrading() {
        return trading;
    }

    public void setTrading(BigDecimal trading) {
        this.trading = trading;
    }

    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public BigDecimal getOrderValue() {
        return orderValue;
    }

    public void setOrderValue(BigDecimal orderValue) {
        this.orderValue = orderValue;
    }

    public BigDecimal getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(BigDecimal marketValue) {
        this.marketValue = marketValue;
    }

    public BigDecimal getGain_loss() {
        return gain_loss;
    }

    public void setGain_loss(BigDecimal gain_loss) {
        this.gain_loss = gain_loss;
    }

    public BigDecimal getRatio() {
        return ratio;
    }

    public void setRatio(BigDecimal ratio) {
        this.ratio = ratio;
    }
}
