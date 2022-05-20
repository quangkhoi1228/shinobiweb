package com.hdcapweb.view;

import java.math.BigDecimal;
import java.util.Date;

import com.shinobi.persistence.annotation.Entity;

@Entity(tableName = "ViewClientAccountDetail")
public class ViewClientAccountDetail {
	private String account;
	private String fullname;
	private String username;
	private String password;
	private String pincode;
	private String systemsubaccount;
	private BigDecimal nav;
	private BigDecimal purchasingpower;
	private BigDecimal profitcommisionratio;
	private BigDecimal managementfeeratio;
	private BigDecimal tradingprofit;
	private BigDecimal aladinprofit;
	private Date startdate;
	private Date enddate;
	private String pm;
	private BigDecimal allocationratio;
	private BigDecimal allocationamount;
	private String pmfullname;

	public BigDecimal getPurchasingpower() {
		return purchasingpower;
	}

	public void setPurchasingpower(BigDecimal purchasingpower) {
		this.purchasingpower = purchasingpower;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public BigDecimal getProfitcommisionratio() {
		return profitcommisionratio;
	}

	public void setProfitcommisionratio(BigDecimal profitcommisionratio) {
		this.profitcommisionratio = profitcommisionratio;
	}

	public BigDecimal getManagementfeeratio() {
		return managementfeeratio;
	}

	public void setManagementfeeratio(BigDecimal managementfeeratio) {
		this.managementfeeratio = managementfeeratio;
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

	public String getPm() {
		return pm;
	}

	public void setPm(String pm) {
		this.pm = pm;
	}

	public BigDecimal getAllocationratio() {
		return allocationratio;
	}

	public void setAllocationratio(BigDecimal allocationratio) {
		this.allocationratio = allocationratio;
	}

	public BigDecimal getAllocationamount() {
		return allocationamount;
	}

	public void setAllocationamount(BigDecimal allocationamount) {
		this.allocationamount = allocationamount;
	}

	public String getPmfullname() {
		return pmfullname;
	}

	public void setPmfullname(String pmfullname) {
		this.pmfullname = pmfullname;
	}

}
