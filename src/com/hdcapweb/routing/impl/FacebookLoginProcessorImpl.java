package com.hdcapweb.routing.impl;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.oltu.oauth2.client.OAuthClient;
import org.apache.oltu.oauth2.client.URLConnectionClient;
import org.apache.oltu.oauth2.client.request.OAuthBearerClientRequest;
import org.apache.oltu.oauth2.client.request.OAuthClientRequest;
import org.apache.oltu.oauth2.client.response.OAuthResourceResponse;
import org.apache.oltu.oauth2.common.OAuth;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;

import com.google.gson.Gson;
import com.shinobi.service.UserService;
import com.shinobi.service.impl.UserServiceImpl;
import com.shinobiserver.server.exception.SnbErrorCode;
import com.shinobiutil.exception.SnbException;

public class FacebookLoginProcessorImpl extends AbstractLoginProcessor {
	private static final Logger logger = LogManager.getLogger();

	@Override
	protected boolean checkAuthen(String clientid, String accessToken, String secureinfo) throws SnbException {
		String validClientId = "";
		try {
			validClientId = getClientId(accessToken);

		} catch (Exception e) {
			throw new SnbException(SnbErrorCode.ACCESSTOKEN_INVALID);
		}

		try {
			if (clientid.equals("fb_" + validClientId)) {

				UserService userService = new UserServiceImpl(null, em);
				userService.checkUsernameWithValidate(clientid);

				return true;
			} else {
				throw new SnbException(SnbErrorCode.ACCESSTOKEN_NOT_MATCH_CLIENTID);
			}
		} finally {
			/*if (em != null && em.isOpen()) {
				em.close();
			}*/
		}

	}

	private String getClientId(String accessToken) throws OAuthSystemException, OAuthProblemException {
		OAuthClientRequest bearerClientRequest = new OAuthBearerClientRequest("https://graph.facebook.com/me")
				.setAccessToken(accessToken).buildQueryMessage();

		OAuthClient oAuthClient = new OAuthClient(new URLConnectionClient());

		OAuthResourceResponse resourceResponse = oAuthClient.resource(bearerClientRequest, OAuth.HttpMethod.GET,
				OAuthResourceResponse.class);

		String result = resourceResponse.getBody();

		logger.trace(result);

		Gson gson = new Gson();
		Map<String, String> map = gson.fromJson(result, Map.class);

		return map.get("id");
	}

}
