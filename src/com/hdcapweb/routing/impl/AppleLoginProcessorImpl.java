package com.hdcapweb.routing.impl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
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

import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.hash.Hashing;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.gson.Gson;
import com.shinobi.routing.impl.AbstractAuthenticationProcessor;
import com.shinobi.service.UserService;
import com.shinobi.service.impl.UserServiceImpl;
import com.shinobiserver.server.exception.SnbErrorCode;
import com.shinobiutil.exception.SnbException;
import com.hdcapweb.dto.AppleSignInConfigDto;

public class AppleLoginProcessorImpl extends AbstractAuthenticationProcessor {

	private static final Logger logger = LogManager.getLogger();

	public static boolean isInit = false;

	@Override
	protected boolean checkAuthen(String clientid, String accessToken, String secureinfo) throws SnbException {

		try {

			String appleSignInConfig = System.getProperty("applesigninconfig");
			String content = new String(Files.readAllBytes(Paths.get(appleSignInConfig)), StandardCharsets.UTF_8);
			Gson gson = new Gson();
			AppleSignInConfigDto appleSignInConfigDto = gson.fromJson(content, AppleSignInConfigDto.class);

			if (clientid.contains("ap_")) {
				if (!AppleLoginProcessorImpl.isInit) {
					FileInputStream serviceAccount = new FileInputStream(appleSignInConfigDto.getConfigfile());
					FirebaseOptions options = new FirebaseOptions.Builder()
							.setCredentials(GoogleCredentials.fromStream(serviceAccount))
							.setDatabaseUrl(appleSignInConfigDto.getProjectname()).build();
					AppleLoginProcessorImpl.isInit = true;
					FirebaseApp myApp = FirebaseApp.initializeApp(options);
				}
				FirebaseAuth app = FirebaseAuth.getInstance();

				UserRecord user = app.getUser(clientid.replace("ap_", ""));

				String encodeUid = Hashing.sha256().hashString(user.getUid(), StandardCharsets.UTF_8).toString();

				if (accessToken.equals(encodeUid)) {

					UserService userService = new UserServiceImpl(null, em);
					userService.checkUsernameWithValidate(clientid);

					return true;
				} else {
					throw new SnbException(SnbErrorCode.ACCESSTOKEN_INVALID);
				}

			} else {
				throw new SnbException(SnbErrorCode.ACCESSTOKEN_NOT_MATCH_CLIENTID);
			}

		} catch (FileNotFoundException e) {

			e.printStackTrace();
			return false;

		} catch (IOException e) {

			e.printStackTrace();
			return false;

		} catch (FirebaseAuthException e) {
			e.printStackTrace();
			return false;
		} finally {
//			if (em != null && em.isOpen()) {
//				em.close();
//			}
		}

	}

	private String getClientId(String accessToken) throws OAuthSystemException, OAuthProblemException {

		OAuthClientRequest bearerClientRequest = new OAuthBearerClientRequest(
				"https://www.googleapis.com/userinfo/v2/me").setAccessToken(accessToken).buildQueryMessage();

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
