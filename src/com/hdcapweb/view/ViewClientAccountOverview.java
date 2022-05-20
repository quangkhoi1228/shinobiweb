package com.hdcapweb.view;

import java.math.BigDecimal;
import java.util.Date;

import com.shinobi.persistence.annotation.Entity;

@Entity(tableName = "ViewClientAccountOverview")
public class ViewClientAccountOverview {
	private String account;
	private String fullname;
	private String systemsubaccount;
	private String systemaccount;
	private String stockcom;
	private BigDecimal nav;
	private BigDecimal purchasingpower;
	private BigDecimal tradingprofit;
	private BigDecimal aladinprofit;
	private Date startdate;
	private Date enddate;

	public String getStockcom() {
		return stockcom;
	}

	public void setStockcom(String stockcom) {
		this.stockcom = stockcom;
	}

	public String getSystemaccount() {
		return systemaccount;
	}

	public void setSystemaccount(String systemaccount) {
		this.systemaccount = systemaccount;
	}

	public BigDecimal getPurchasingpower() {
		return purchasingpower;
	}

	public void setPurchasingpower(BigDecimal purchasingpower) {
		this.purchasingpower = purchasingpower;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getSystemsubaccount() {
		return systemsubaccount;
	}

	public void setSystemsubaccount(String systemsubaccount) {
		this.systemsubaccount = systemsubaccount;
	}

	public BigDecimal getNav() {
		return nav;
	}

	public void setNav(BigDecimal nav) {
		this.nav = nav;
	}

	public BigDecimal getTradingprofit() {
		return tradingprofit;
	}

	public void setTradingprofit(BigDecimal tradingprofit) {
		this.tradingprofit = tradingprofit;
	}

	public BigDecimal getAladinprofit() {
		return aladinprofit;
	}

	public void setAladinprofit(BigDecimal aladinprofit) {
		this.aladinprofit = aladinprofit;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

}
