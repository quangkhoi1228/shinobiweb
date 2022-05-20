package com.hdcapweb.routing.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.config.LangCode;
import com.shinobi.config.SessionName;
import com.shinobi.persistence.EntityManagerGroup;
import com.shinobi.persistence.impl.DataSourceManager;
import com.shinobi.persistence.impl.EntityManagerGroupFactory;
import com.shinobi.routing.impl.AbstractAuthenticationProcessor;
import com.shinobi.service.RoleService;
import com.shinobi.service.impl.RoleServiceImpl;
import com.shinobiutil.exception.SnbException;
import com.shinobiutil.security.ShinobiContext;
import com.shinobiutil.util.ShinobiUtil;

import com.hdcapweb.notification.service.FirebaseTokenService;
import com.hdcapweb.notification.service.impl.FirebaseTokenServiceImpl;

import io.netty.handler.codec.http.HttpRequest;

public abstract class AbstractLoginProcessor extends AbstractAuthenticationProcessor {
    private static final Logger logger = LogManager.getLogger();

    private FirebaseTokenService firebaseTokenService;

    private void registService() {
        firebaseTokenService = new FirebaseTokenServiceImpl(null, em);
    }

    protected abstract boolean checkAuthen(String username, String password, String secureinfo) throws SnbException;

    @Override
    protected void postAuthen() throws SnbException {
        EntityManagerGroup emg = EntityManagerGroupFactory.getInstance().createEntityManagerGroup();

        try {
            emg.begin();
            emg.setContextEntityManager(emg.getEntityManager(
                    DataSourceManager.getDefaultDatasource()));

            super.postAuthen();

            registService();

            Map<String, Object> properties = new ConcurrentHashMap<>();
            properties.put(SessionName.LANG_CODE.toString(),
                    LangCode.VN.toString());

            RoleService roleService = new RoleServiceImpl(snbSession, em);
            List<String> authorizedRoles = roleService.getAuthorizedRoles(
                    loggedUser);
            List<String> unauthorizedRoles = roleService.getUnauthorizedRoles(
                    loggedUser);

            ShinobiContext context = ShinobiUtil.getAuthenContext(snbSession);
            context.setAuthorizedResource(authorizedRoles);
            context.setUnauthorizedResource(unauthorizedRoles);

            ShinobiUtil.storeContext(snbSession, context);

            logger.debug("store snbsession: {}", snbSession);

            storeMobileFirebaseToken(getHttpRequest(), getLoggedUser());

            emg.commit();
        } catch (Exception e) {
            logger.catching(Level.ERROR, e);

            emg.rollback();
            throw e;
        }
    }

    private void storeMobileFirebaseToken(HttpRequest httpRequest, String username) throws SnbException {
        logger.trace(
                "instead of storing NOTI_TOKEN with snbSession, we insert all NOTI_TOKEN to db");
        String token = httpRequest.headers().get("noti_token");

        if (token == null || token.isBlank()) {
            token = httpRequest.headers().get("noti-token");
        }

//		println httpRequest.headers
//		for (Map.Entry<String, String> entry : httpRequest.headers().entries()) {
//			System.out.println(entry.getKey() + "=" + entry.getValue());
//		}

        if (token != null) {
            logger.info("addNewToken for {} with token {} and sessionid {}",
                    username, token, snbSession);
            firebaseTokenService.addNewToken(username, token, snbSession);
        } else {
            logger.trace("token null");
        }
    }

}
