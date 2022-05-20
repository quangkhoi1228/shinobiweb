package com.hdcapweb.entity;

import java.util.Date;

import com.shinobi.entity.ShinobiEntity;
import com.shinobi.persistence.annotation.Entity;
import com.shinobi.persistence.annotation.Sequence;

@Entity(tableName = "Tbtradingsystemconfig")
public class Tbtradingsystemconfig implements ShinobiEntity {
	@Sequence
	private long id;
	private String configname;
	private String configvalue;
	private String description;
	private Date createddate;
	private String createduser;
	private Date lastmodifieddate;
	private String lastmodifieduser;
	private String othercomment;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getConfigname() {
		return configname;
	}

	public void setConfigname(String configname) {
		this.configname = configname;
	}

	public String getConfigvalue() {
		return configvalue;
	}

	public void setConfigvalue(String configvalue) {
		this.configvalue = configvalue;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getOthercomment() {
		return othercomment;
	}

	public void setOthercomment(String othercomment) {
		this.othercomment = othercomment;
	}

}
