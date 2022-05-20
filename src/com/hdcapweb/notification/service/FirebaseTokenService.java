package com.hdcapweb.notification.service;

import com.shinobi.service.ShinobiService;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.notification.entity.Tbfirebasetoken;

public interface FirebaseTokenService extends ShinobiService<Tbfirebasetoken>{
	void addNewToken(String username, String token, String snbsession) throws SnbException;
	
	void markAsLogoutProcess(String username, String snbsession) throws SnbException;
	
	Tbfirebasetoken getFirebaseToken(String username) throws SnbException;
}
