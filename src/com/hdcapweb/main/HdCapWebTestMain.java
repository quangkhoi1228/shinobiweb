package com.hdcapweb.main;

import java.io.FileNotFoundException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import com.hdcapweb.config.DbEnum;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.shinobi.persistence.EntityManagerGroup;
import com.shinobi.persistence.impl.DataSourceManager;
import com.shinobi.persistence.impl.EntityManagerGroupFactory;
import com.shinobi.persistence.impl.ShinobiJpaManager;
import com.shinobiutil.caching.ShinobiCacheFactory;
import com.shinobiutil.dbhelper.DbHelper;
import com.shinobiutil.dbhelper.DbHelperFactory;
import com.shinobiutil.exception.SnbException;

public class HdCapWebTestMain {

	private static final Logger logger;

	static {
		if (System.getProperty("logname") == null) {
			System.setProperty("logname", "testconsole.log");
		}

		logger = LogManager.getLogger(HdCapWebTestMain.class);
	}

	public static void main(String[] args) throws FileNotFoundException, ClassNotFoundException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException,
			SecurityException, SnbException {

		registerDB();

		registerLogDb();

		ShinobiCacheFactory.setEnableHazelcast(false);

//		test();

		test1();

		logger.info("process done");

	}

	private static void test() throws SnbException {
		EntityManager em = ShinobiJpaManager.getInstance().getEntityManager();
		em.getTransaction().begin();

		startCache(em);
		logger.info("start cache ok");

		em.getTransaction().commit();
		em.close();

	}

	private static void test1() throws SnbException {
		EntityManagerGroup emg = EntityManagerGroupFactory.getInstance().createEntityManagerGroup();

		com.shinobi.persistence.EntityManager em;
		try {
			emg.begin();

			em = emg.getEntityManager(DataSourceManager.getDefaultDatasource());

			emg.setContextEntityManager(em);

//			String systemsubaccount = "VPS_318467_N";
//			Date start = new Date();
//			Date end = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2022-05-07 00:00:00");
//			BigDecimal profitRatio =null;
//			BigDecimal feeRatio = null;
//			List<AllocationInfoDto> data = new ArrayList<>();
//			data.add(new AllocationInfoDto("pm1", new BigDecimal("0.4")));
//			data.add(new AllocationInfoDto("pm2", new BigDecimal("0.6")));


//			UserInfoServiceImpl test2 = new UserInfoServiceImpl(null, emg);
//			test2.createUserInfo("Hoang", "kim", "pham", "abc");
//			tesstings.createNewSystemUser("hoangf", "pham", "PM", "no", "pass", true);

			//StockComAccountRegistrationService te = new StockComAccountRegistrationServiceImpl(null, emg);
			//te.createNewAccountAndSubAccount("VPS", "634214", "634214", "Ho@ng13301", "a", null);

			emg.commit();

		} catch (Exception e) {
			logger.catching(Level.TRACE, e);
			emg.rollback();
		}

	}

	private static void startCache(EntityManager em) throws SnbException {
//		AladinCachingService aladinCachingService = new AladinCachingServiceImpl("null", em);
//
//		aladinCachingService.reloadCacheAll();
//
//		VseCachingService vseCachingService = new VseCachingServiceImpl("null", em);
//
//		vseCachingService.initLoad();
//		vseCachingService.reloadCacheAll();
	}

	private static void registerLogDb()
			throws ClassNotFoundException, FileNotFoundException, IllegalAccessException, InstantiationException,
			IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		DbHelper dbHelper = DbHelperFactory.getInstance().createDbHelper("logdbconfig");
		dbHelper.loadConfig(System.getProperty("logdbconfig"));
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
				throw new FileNotFoundException("Cannot find " + dbconfig.getKey() + " file");
			}

			DataSourceManager.registerDataSource(configName, configPath);

		}
	}

}
