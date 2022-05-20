package com.hdcapweb.dto;

import java.math.BigDecimal;

public class AssetsUserInfoDto {
    private BigDecimal assets;
    private BigDecimal availablecash;
    private BigDecimal debt;
    private BigDecimal availablestock;

    public BigDecimal getAssets() {
        return assets;
    }

    public void setAssets(BigDecimal assets) {
        this.assets = assets;
    }

    public BigDecimal getAvailablecash() {
        return availablecash;
    }

    public void setAvailablecash(BigDecimal availablecash) {
        this.availablecash = availablecash;
    }

    public BigDecimal getDebt() {
        return debt;
    }

    public void setDebt(BigDecimal debt) {
        this.debt = debt;
    }

    public BigDecimal getAvailablestock() {
        return availablestock;
    }

    public void setAvailablestock(BigDecimal availablestock) {
        this.availablestock = availablestock;
    }
}
