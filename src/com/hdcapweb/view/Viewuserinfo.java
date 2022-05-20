package com.hdcapweb.view;

import com.shinobi.persistence.annotation.Entity;

import java.util.Date;

@Entity(tableName = "viewuserinfo")
public class Viewuserinfo {

	private Date createddate;
	private String createduser;
	private Date lastmodifieddate;
	private String lastmodifieduser;
	private String username;
	private String email;
	private String firstname;
	private String lastname;
	private String usertype;
	private String managedaccounts;
	private Date lastlogintime;
	private String invitedby;
	private String avatarlink;
	private String identitynumber;
	private String phonenumber;
	private String loginusername;
	private String password;
	private boolean isvalidated;

	public Viewuserinfo() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdentitynumber() {
		return identitynumber;
	}

	public void setIdentitynumber(String identitynumber) {
		this.identitynumber = identitynumber;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

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

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getManagedaccounts() {
		return managedaccounts;
	}

	public void setManagedaccounts(String managedaccounts) {
		this.managedaccounts = managedaccounts;
	}

	public Date getLastlogintime() {
		return lastlogintime;
	}

	public void setLastlogintime(Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	public String getInvitedby() {
		return invitedby;
	}

	public void setInvitedby(String invitedby) {
		this.invitedby = invitedby;
	}

	public String getAvatarlink() {
		return avatarlink;
	}

	public void setAvatarlink(String avatarlink) {
		this.avatarlink = avatarlink;
	}

	public Date getCreateddate() {
		return createddate;
	}

	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}

	public String getCreateduser() {
		return createduser;
	}

	public void setCreateduser(String createduser) {
		this.createduser = createduser;
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

	public boolean isIsvalidated() {
		return isvalidated;
	}

	public void setIsvalidated(boolean isvalidated) {
		this.isvalidated = isvalidated;
	}

	public String getLoginusername() {
		return loginusername;
	}

	public void setLoginusername(String loginusername) {
		this.loginusername = loginusername;
	}
}
