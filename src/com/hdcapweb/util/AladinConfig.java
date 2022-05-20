package com.hdcapweb.util;

import com.hdcapweb.config.DomainType;

public class AladinConfig {	

	public static String getDomainname() {

		String domain = System.getProperty("domain");
		
		if (domain == null) {
			System.setProperty("domainname", DomainType.ALADIN.getName());
			domain = DomainType.ALADIN.getName();
		}
		
		DomainType domaintype = DomainType.valueOf(domain.toUpperCase());
		String domainname = domaintype.getValue();
		
		return domainname;
	}


}
