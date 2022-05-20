package com.hdcapweb.notification.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.shinobi.entity.ShinobiEntity;

@Entity
public class Tbfirebasetoken implements ShinobiEntity {
	private static final long serialVersionUID = 6362457440292556830L;

	@Id
	@Column(insertable = false)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createddate;
	private String createduser;

	@Temporal(TemporalType.TIMESTAMP)
	private Date lastmodifieddate;
	private String lastmodifieduser;

	private String username;
	private String token;
	private String snbsession;

	public Tbfirebasetoken() {}

	public Tbfirebasetoken(Date createddate, String createduser, Date lastmodifieddate, String lastmodifieduser,
			String username, String token, String snbsession) {
		this.createddate = createddate;
		this.createduser = createduser;
		this.lastmodifieddate = lastmodifieddate;
		this.lastmodifieduser = lastmodifieduser;

		this.username = username;
		this.token = token;
		this.snbsession = snbsession;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getSnbsession() {
		return snbsession;
	}

	public void setSnbsession(String snbsession) {
		this.snbsession = snbsession;
	}

}
