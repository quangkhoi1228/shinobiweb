package com.hdcapweb.dto;

import java.math.BigDecimal;
import java.util.Date;


public class SignalDto {
    private String createduser;
    private Date createddate;
    private Date lastmodifieddate;
    private String lastmodifieduser;

    private String originalsignalid;
    private String signalid;
    private String placedby;
    private String fullname;
    private String allocationaccount;
    private String stockcode;
    private BigDecimal volume;
    private String price;
    private String ordertype;
    private String side;
    private BigDecimal proportion;
    private String status;
    private String description;
    private String orderid;
    private String orderstatus;

    public String getCreateduser() {
        return createduser;
    }

    public void setCreateduser(String createduser) {
        this.createduser = createduser;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }

    public Date getLastmodifieddate() {
        return lastmodifieddate;
    }

    public void setLastmodifieddate(Date lastmodifieddate) {
        this.lastmodifieddate = lastmodifieddate;
    }

    public String getLastmodifieduser() {
        return lastmodifieduser;
    }

    public void setLastmodifieduser(String lastmodifieduser) {
        this.lastmodifieduser = lastmodifieduser;
    }

    public String getOriginalsignalid() {
        return originalsignalid;
    }

    public void setOriginalsignalid(String originalsignalid) {
        this.originalsignalid = originalsignalid;
    }

    public String getSignalid() {
        return signalid;
    }

    public void setSignalid(String signalid) {
        this.signalid = signalid;
    }

    public String getPlacedby() {
        return placedby;
    }

    public void setPlacedby(String placedby) {
        this.placedby = placedby;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAllocationaccount() {
        return allocationaccount;
    }

    public void setAllocationaccount(String allocationaccount) {
        this.allocationaccount = allocationaccount;
    }

    public String getStockcode() {
        return stockcode;
    }

    public void setStockcode(String stockcode) {
        this.stockcode = stockcode;
    }

    public BigDecimal getVolume() {
        return volume;
    }

    public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getOrdertype() {
        return ordertype;
    }

    public void setOrdertype(String ordertype) {
        this.ordertype = ordertype;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public BigDecimal getProportion() {
        return proportion;
    }

    public void setProportion(BigDecimal proportion) {
        this.proportion = proportion;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public String getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }
}
