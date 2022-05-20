package com.hdcapweb.routing.impl;

import static io.netty.handler.codec.http.HttpResponseStatus.FOUND;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;

import java.io.IOException;
import java.util.Date;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.persistence.EntityManager;
import com.shinobi.persistence.EntityManagerGroup;
import com.shinobi.persistence.impl.DataSourceManager;
import com.shinobi.persistence.impl.EntityManagerGroupFactory;
import com.shinobi.routing.impl.AbstractDynamicRouteProcessor;
import com.shinobiserver.server.routing.RouteProcessor;
import com.shinobiutil.caching.ShinobiCacheManager;
import com.shinobiutil.exception.SnbError;
import com.shinobiutil.exception.SnbException;
import com.shinobiutil.security.ShinobiContext;
import com.shinobiutil.util.ServerConst;
import com.shinobiutil.util.ShinobiUtil;


import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.HttpResponse;

public class LogoutProcessorImpl extends AbstractDynamicRouteProcessor implements RouteProcessor {
	public static int MAX_AGE = 86400000; // 3600 * 24 * 1000 (1000 days)

	private static final Logger logger = LogManager.getLogger();

	@Override
	public HttpResponse getResponse(HttpRequest request) {
		FullHttpResponse response = new DefaultFullHttpResponse(HTTP_1_1, FOUND);
		response.headers().set("LOCATION", "/page/login");

		try {
			ShinobiContext context = ShinobiUtil.getAuthenContext(request);

			String username = logoutSuccess(context.getCurrentSession(), response);

			addLogoutActivityLog(username);

		} catch (SnbException e) {
			logger.catching(Level.ERROR, e);
		}

		return response;
	}

	private void addLogoutActivityLog(String username) throws SnbException {
		EntityManagerGroup emg = EntityManagerGroupFactory.getInstance().createEntityManagerGroup();
		try {
			emg.begin();
			EntityManager em1 = emg.getEntityManager(DataSourceManager.getDefaultDatasource());
			emg.setContextEntityManager(em1);


			emg.commit();
		} catch (Exception e) {
			emg.rollback();

			if (e.getClass().isInstance(SnbException.class)) {
				throw new SnbException(((SnbError) e).getCode());
			} else {
				throw new SnbException(e);
			}
		}
	}

	@Override
	protected byte[] getContent(String params) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

	public String logoutSuccess(String snbSession, HttpResponse response) {
		String sessionName = ServerConst.SNBSESSION;

		ShinobiContext context = (ShinobiContext) ShinobiCacheManager.getSessionCache().get(sessionName + snbSession);
		String username = context.getUsername();

		ShinobiCacheManager.getSessionCache().remove(sessionName + snbSession);
		ShinobiUtil.removeSession(username); // remove username from SESSION_MAP cache

		logger.info("sessionid {} has been removed", snbSession);
		logger.info("{} has logged out at {} ", username, new Date());

		// write cookie to response
		if (!"true".equals(System.getProperty("IS_DEV_MODE"))) {
			response.headers().set("Set-Cookie", sessionName + "= -1; HttpOnly; secure; Max-Age=" + MAX_AGE);
		} else {
			response.headers().set("Set-Cookie", sessionName + "= -1; HttpOnly; Max-Age=" + MAX_AGE);
		}

		return username;
	}
}
