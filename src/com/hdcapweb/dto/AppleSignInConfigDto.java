package com.hdcapweb.dto;

import java.io.Serializable;

public class AppleSignInConfigDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String configfile;
	String projectname;

	public String getConfigfile() {
		return configfile;
	}

	public void setConfigfile(String configfile) {
		this.configfile = configfile;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
