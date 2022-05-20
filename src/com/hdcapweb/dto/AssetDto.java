package com.hdcapweb.dto;

import java.math.BigDecimal;
import java.util.List;

public class AssetDto {
    private BigDecimal nav;
    private BigDecimal stockvalue;
    private BigDecimal cash;
    private BigDecimal debt;

    private List<PortfolioDto> portfolio;

    public BigDecimal getNav() {
        return nav;
    }

    public void setNav(BigDecimal nav) {
        this.nav = nav;
    }

    public BigDecimal getStockvalue() {
        return stockvalue;
    }

    public void setStockvalue(BigDecimal stockvalue) {
        this.stockvalue = stockvalue;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public BigDecimal getDebt() {
        return debt;
    }

    public void setDebt(BigDecimal debt) {
        this.debt = debt;
    }

    public List<PortfolioDto> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(List<PortfolioDto> portfolio) {
        this.portfolio = portfolio;
    }
}
