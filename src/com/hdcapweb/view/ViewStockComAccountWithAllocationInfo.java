package com.hdcapweb.view;

import com.shinobi.persistence.annotation.Entity;

import java.math.BigDecimal;
import java.util.Date;

@Entity(tableName = "ViewStockComAccountWithAllocationInfo")
public class ViewStockComAccountWithAllocationInfo {
  private String allocationaccount;
  private String systemsubaccount;
  private String systemaccount;
  private String systemaccountname;
  private String accountname;
  private Date startdate;
  private Date enddate;
  private String username;
  private String stockcompany;
  private String contactaddress;
  private String customeremail;
  private String customerphone;
  private String customercardid;
  private String pm;
  private String pmfullname;
  private boolean isactive;
  private BigDecimal allocationratio;
  private BigDecimal allocationamount;
  private BigDecimal managementfeeratio;
  private BigDecimal profitcommisionratio;


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

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getStockcompany() {
    return stockcompany;
  }

  public void setStockcompany(String stockcompany) {
    this.stockcompany = stockcompany;
  }

  public String getSystemsubaccount() {
    return systemsubaccount;
  }

  public void setSystemsubaccount(String systemsubaccount) {
    this.systemsubaccount = systemsubaccount;
  }

  public String getSystemaccount() {
    return systemaccount;
  }

  public void setSystemaccount(String systemaccount) {
    this.systemaccount = systemaccount;
  }

  public String getAllocationaccount() {
    return allocationaccount;
  }

  public void setAllocationaccount(String allocationaccount) {
    this.allocationaccount = allocationaccount;
  }

  public String getSystemaccountname() {
    return systemaccountname;
  }

  public void setSystemaccountname(String systemaccountname) {
    this.systemaccountname = systemaccountname;
  }

  public String getAccountname() {
    return accountname;
  }

  public void setAccountname(String accountname) {
    this.accountname = accountname;
  }

  public String getContactaddress() {
    return contactaddress;
  }

  public void setContactaddress(String contactaddress) {
    this.contactaddress = contactaddress;
  }

  public String getCustomeremail() {
    return customeremail;
  }

  public void setCustomeremail(String customeremail) {
    this.customeremail = customeremail;
  }

  public String getCustomerphone() {
    return customerphone;
  }

  public void setCustomerphone(String customerphone) {
    this.customerphone = customerphone;
  }

  public String getCustomercardid() {
    return customercardid;
  }

  public void setCustomercardid(String customercardid) {
    this.customercardid = customercardid;
  }

  public String getPm() {
    return pm;
  }

  public void setPm(String pm) {
    this.pm = pm;
  }

  public String getPmfullname() {
    return pmfullname;
  }

  public void setPmfullname(String pmfullname) {
    this.pmfullname = pmfullname;
  }

  public boolean isIsactive() {
    return isactive;
  }

  public void setIsactive(boolean isactive) {
    this.isactive = isactive;
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

  public BigDecimal getManagementfeeratio() {
    return managementfeeratio;
  }

  public void setManagementfeeratio(BigDecimal managementfeeratio) {
    this.managementfeeratio = managementfeeratio;
  }

  public BigDecimal getProfitcommisionratio() {
    return profitcommisionratio;
  }

  public void setProfitcommisionratio(BigDecimal profitcommisionratio) {
    this.profitcommisionratio = profitcommisionratio;
  }

}
