package com.hdcapweb.routing.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.persistence.EntityManager;
import com.shinobi.persistence.EntityManagerGroup;
import com.shinobi.persistence.impl.DataSourceManager;
import com.shinobi.persistence.impl.EntityManagerGroupFactory;
import com.shinobi.service.LoginService;
import com.shinobi.service.impl.LoginServiceImpl;
import com.shinobiutil.exception.SnbError;
import com.shinobiutil.exception.SnbException;

public class LoginProcessorImpl extends AbstractLoginProcessor {

    private static final Logger logger = LogManager.getLogger();

    protected boolean checkAuthen(String username, String password, String secureinfo) throws SnbException {
        LoginService loginService = new LoginServiceImpl(null, em);


        loginService.login(username, password);

        return true;
    }

    private boolean validOtp(String username, String opt) throws SnbException {
        EntityManagerGroup emg = EntityManagerGroupFactory.getInstance().createEntityManagerGroup();
        try {
            emg.begin();
            EntityManager em1 = emg.getEntityManager(
                    DataSourceManager.getDefaultDatasource());
            emg.setContextEntityManager(em1);


            boolean result = true;
            

            emg.commit();

            return result;
        } catch (Exception e) {
            emg.rollback();

            if (e.getClass().isInstance(SnbException.class)) {
                throw new SnbException(((SnbError) e).getCode());
            } else {
                throw new SnbException(e);
            }
        }
    }

    public boolean isLoginOtpAuthenChecking() throws SnbException {

        return false;
    }

    private String validToken(String token) {

        String result = "false";

        // try {
        // String s = ReCaptcha.checkToken(token);
        //
        // System.out.println(s);
        //
        // Gson gson = new Gson();
        // JsonObject object = gson.fromJson(s, JsonObject.class);
        //
        // result = object.get("success").toString().trim();
        //
        // } catch (Exception e) {
        // e.printStackTrace();
        // }

        return result;
    }

}
