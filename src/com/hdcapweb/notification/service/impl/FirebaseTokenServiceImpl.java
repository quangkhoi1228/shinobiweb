package com.hdcapweb.notification.service.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.service.AbstractShinobiService;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.notification.entity.Tbfirebasetoken;
import com.hdcapweb.notification.service.FirebaseTokenService;

public class FirebaseTokenServiceImpl extends AbstractShinobiService<Tbfirebasetoken> implements FirebaseTokenService {

	private Logger logger = LogManager.getLogger();

	public FirebaseTokenServiceImpl(String sessionid, EntityManager em) {
		super(sessionid, em);

	}

	@Override
	public void addNewToken(String username, String token, String snbsession) throws SnbException {

		Tbfirebasetoken currentToken = getFirebaseToken(username);

		if (currentToken == null) {
			currentToken = new Tbfirebasetoken(new Date(), username, new Date(), username, username, token, snbsession);
			em.persist(currentToken);
		} else {
			currentToken.setToken(token);
			currentToken.setLastmodifieduser(username);
			currentToken.setLastmodifieddate(new Date());
			em.merge(currentToken);
		}
	}

	@Override
	public void markAsLogoutProcess(String username, String snbsession) throws SnbException {
		Tbfirebasetoken currentToken = getFirebaseToken(username);
		if (currentToken != null) {
			em.remove(currentToken);
		}
	}

	@Override
	public Tbfirebasetoken getFirebaseToken(String username) throws SnbException {
		Tbfirebasetoken result = null;
		List<Tbfirebasetoken> listFirebaseToken = em
				.createQuery("SELECT o FROM Tbfirebasetoken as o WHERE o.username=:username",
						Tbfirebasetoken.class)
				.setParameter("username", username).getResultList();

		if (listFirebaseToken != null && !listFirebaseToken.isEmpty()) {
			result = listFirebaseToken.get(0);
			logger.debug("get token of user {} from db sucess", username);
		} else {
			logger.debug("can not get noti token");
		}
		return result;
	}

}
