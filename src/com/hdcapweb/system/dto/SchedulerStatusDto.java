package com.hdcapweb.system.dto;

import java.io.Serializable;

public class SchedulerStatusDto implements Serializable {

	private static final long serialVersionUID = 4713091569631011707L;
	private String schedulername;
	private String schedulerstatus;

	private String lasttimerun;

	public String getSchedulername() {
		return schedulername;
	}

	public void setSchedulername(String schedulername) {
		this.schedulername = schedulername;
	}

	public String getSchedulerstatus() {
		return schedulerstatus;
	}

	public void setSchedulerstatus(String schedulerstatus) {
		this.schedulerstatus = schedulerstatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getLasttimerun() {
		return lasttimerun;
	}

	public void setLasttimerun(String lasttimerun) {
		this.lasttimerun = lasttimerun;
	}

}
