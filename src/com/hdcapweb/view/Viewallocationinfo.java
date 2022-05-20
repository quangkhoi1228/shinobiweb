package com.hdcapweb.view;

import com.shinobi.persistence.annotation.Entity;

import java.math.BigDecimal;
import java.util.Date;

@Entity(tableName = "Viewallocationinfo")
public class Viewallocationinfo {

  private String pm;
  private String firstname;
  private String lastname;

  private String allocationaccount;
  private String followingtype;
  private boolean isactive;
  private Date activateddate;
  private String additionaldata;
  private String systemsubaccount;
  private BigDecimal allocationratio;
  private BigDecimal allocationamount;
  private String allocationtype;
  private String periodid;
  private Date startdate;
  private Date enddate;
  private BigDecimal managementfeeratio;
  private BigDecimal profitcommisionratio;

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getPm() {
    return pm;
  }

  public void setPm(String pm) {
    this.pm = pm;
  }

  public String getAllocationaccount() {
    return allocationaccount;
  }

  public void setAllocationaccount(String allocationaccount) {
    this.allocationaccount = allocationaccount;
  }

  public String getFollowingtype() {
    return followingtype;
  }

  public void setFollowingtype(String followingtype) {
    this.followingtype = followingtype;
  }

  public boolean isIsactive() {
    return isactive;
  }

  public void setIsactive(boolean isactive) {
    this.isactive = isactive;
  }

  public Date getActivateddate() {
    return activateddate;
  }

  public void setActivateddate(Date activateddate) {
    this.activateddate = activateddate;
  }

  public String getAdditionaldata() {
    return additionaldata;
  }

  public void setAdditionaldata(String additionaldata) {
    this.additionaldata = additionaldata;
  }

  public String getSystemsubaccount() {
    return systemsubaccount;
  }

  public void setSystemsubaccount(String systemsubaccount) {
    this.systemsubaccount = systemsubaccount;
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

  public String getAllocationtype() {
    return allocationtype;
  }

  public void setAllocationtype(String allocationtype) {
    this.allocationtype = allocationtype;
  }

  public String getPeriodid() {
    return periodid;
  }

  public void setPeriodid(String periodid) {
    this.periodid = periodid;
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
