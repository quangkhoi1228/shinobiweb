package com.hdcapweb.main;

import com.hdcapweb.config.DbEnum;
import com.shinobi.persistence.impl.DataSourceManager;
import com.shinobi.socket.ShinobiPrivateWebsocketServer;
import com.shinobi.socket.ShinobiSocketClient;
import com.shinobi.socket.ShinobiSocketServer;
import com.shinobi.socket.config.SocketChannelType;
import com.shinobi.socket.config.SocketConfig;
import com.shinobiserver.server.HttpServer;
import com.shinobiserver.server.HttpServerImpl;
import com.shinobiserver.server.config.ServerConfig;
import com.shinobiutil.caching.ShinobiCacheFactory;
import com.shinobiutil.concurrent.ShinobiConcurrentManager;
import com.shinobiutil.dbhelper.DbHelper;
import com.shinobiutil.dbhelper.DbHelperFactory;
import com.shinobiutil.logging.ApiLogServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class HdCapWebMain {

    private static final Logger logger;

    static {
        if (System.getProperty("logname") == null) {
            System.setProperty("logname", "tradingsystemweb.log");
        }

        logger = LogManager.getLogger(HdCapWebMain.class);
    }

    public static void main(String[] args) throws IllegalAccessException, ClassNotFoundException, IOException,
            IllegalArgumentException, NoSuchFieldException, SecurityException, InstantiationException,
            InvocationTargetException, NoSuchMethodException, InterruptedException {

        String logdbconfig = System.getProperty("logdbconfig");
        if (logdbconfig != null && !logdbconfig.equals("")) {

            DbHelper dbHelper = DbHelperFactory.getInstance().createDbHelper(
                    "logdbconfig");
            dbHelper.loadConfig(System.getProperty("logdbconfig"));

            ApiLogServiceImpl.isActiveInsertLog = true;

            ShinobiConcurrentManager.createScheduleServiceTask(
                    new ApiLogServiceImpl("API_LOG_TASK"), 10,
                    TimeUnit.SECONDS);

        }

        String START_WEBSOCKET_SERVER_ONLY = System.getProperty(
                "START_WEBSOCKET_SERVER_ONLY", "false");

        if ("true".equals(START_WEBSOCKET_SERVER_ONLY)) {
            registerSocketServer();
            return;
        } else {
            String START_WEBSOCKET_SERVER = System.getProperty(
                    "START_WEBSOCKET_SERVER", "false");
            if ("true".equals(START_WEBSOCKET_SERVER)) {
                registerSocketServer();
            }
        }

        registerDB();

        registerExternalDb("dbshinobimailconfig", DbEnum.SHINOBIMAILDB);

        Thread.sleep(1000);

        registerSocketClient();

        logger.info("load config ...");

        ServerConfig.loadConfig();

        ShinobiCacheFactory.setEnableHazelcast(true);

        HttpServer server = new HttpServerImpl(ServerConfig.HTTP_PORT);

        server.start();

        logger.info("server started successfully!");
    }

    private static void registerSocketClient() {

        SocketConfig.SOCKET_SERVER_HOST = System.getProperty(
                "SOCKET_SERVER_HOST", "");
        SocketConfig.SOCKET_SERVER_PORT = Integer.parseInt(
                System.getProperty("SOCKET_SERVER_PORT", "0"));

        if (!"".equals(
                SocketConfig.SOCKET_SERVER_HOST) && SocketConfig.SOCKET_SERVER_PORT != 0) {
            List<String> channels = new ArrayList<>();
            channels.add(SocketChannelType.CHAT.toString());
            channels.add(SocketChannelType.NOTIFICATION.toString());

            ShinobiConcurrentManager.createAsyncTask(
                    new ShinobiSocketClient(SocketConfig.SOCKET_SERVER_HOST,
                            SocketConfig.SOCKET_SERVER_PORT, channels));
        }

    }

    private static void registerSocketServer() {
        logger.info("starting private socket server");
        ShinobiConcurrentManager.createAsyncTask(
                ShinobiSocketServer.getInstance());

        logger.info("starting private websocket server");
        ShinobiConcurrentManager.createAsyncTask(
                ShinobiPrivateWebsocketServer.getInstance());

    }

    private static void registerDB()
            throws FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException,
            IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
        String dbConfig = System.getProperty("dbconfig");

        if (System.getProperty("dbconfig") == null) {
            throw new FileNotFoundException("Cannot find dbConfig file");
        }

        DataSourceManager.registerDataSource(DbEnum.MAINDB.getName(), dbConfig);

        DataSourceManager.setDefaultEntityManager(DbEnum.MAINDB.getName());

    }

    private static void registerExternalDb(String configname, DbEnum dbname)
            throws FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException,
            IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
        HashMap<String, String> dbconfigs = new HashMap<String, String>();

        dbconfigs.put(configname, dbname.getName());

        for (Map.Entry<String, String> dbconfig : dbconfigs.entrySet()) {

            String configPath = System.getProperty(dbconfig.getKey());
            String configName = dbconfig.getValue();

            if (configPath == null) {
                throw new FileNotFoundException(
                        "Cannot find " + dbconfig.getKey() + " file");
            }

            DataSourceManager.registerDataSource(configName, configPath);

        }
    }

}
