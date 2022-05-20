truncate tbtaskconfig;

INSERT INTO tbtaskconfig (createduser,createddate,lastmodifieddate,lastmodifieduser,"name","data",description,"period",active,priority) VALUES
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','GET_STOCK_INFO_ALL_USER','',NULL,5,false,4),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','GET_CASH_INFO_ALL_USER','',NULL,5,false,3),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','GET_INTRA_DAY_ORDER_ALL_USER','',NULL,10,true,5),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','GET_CASH_TRANSACTION_ALL_USER','',NULL,7200,false,6),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','RESET_ALL','',NULL,100000,false,7),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','GET_SUB_ACCOUNT_LIST_ALL_USER','',NULL,7200,true,2),
	 ('admin','2021-12-12 00:00:00.000','2021-12-12 00:00:00.000','admin','LOGIN_ALL_USER','',NULL,7200,true,1);

truncate 	tbtradingsystemconfig;

INSERT INTO tbtradingsystemconfig (configname,configvalue,description,othercomment,createddate,createduser,lastmodifieddate,lastmodifieduser) VALUES
	 ('TRANSACTION_DAYS','2','Chu kỳ thanh toán T+',NULL,'2022-03-10 10:57:18.782','system','2022-03-10 10:57:18.782','system'),
	 ('SYSTEM_TRADING_TAX','0.001',NULL,NULL,'2022-02-14 10:36:17.692','system','2022-02-14 10:36:17.692','system'),
	 ('VOLUME_STEP','100','bước khối lượng',NULL,'2022-02-08 16:45:35.363','system','2022-02-17 14:04:12.706','system'),
	 ('SYSTEM_TRADING_FEE','0.002',NULL,NULL,'2022-02-14 10:36:17.692','system','2022-02-14 10:36:17.692','system'),
	 ('AUDIT_ERROR_RECEIVED_EMAIL_LIST','{"listString":[]}','danh sách địa chỉ nhận email lỗi audit',NULL,'2022-03-15 14:25:05.869','system','2022-03-15 14:25:05.869','system'),
	 ('RESET_DATABASE_QUERY','100','reset database query',NULL,'2022-02-22 19:42:04.717','system','2022-02-22 19:42:04.717','system'),
	 ('ORIGIN_STOCK_COM_ACCOUNT','{"listString":[]}','danh sách tài khoản chứng khoán gốc của hệ thống',NULL,'2022-02-08 16:45:35.363','system','2022-04-19 15:46:16.000','superadmin'),
	 ('IS_LOGIN_OTP_AUTHEN_CHECKING','false','có xác thực đăng nhập bằng mã OTP (gửi qua email) hay không',NULL,'2022-03-23 14:09:15.037','system','2022-03-23 14:09:15.037','system'),
	 ('TRADING_DATE_OFF','{"dateoff":[]}','date-off trading of year',NULL,'2022-03-10 10:57:18.782','system','2022-03-10 10:57:18.782','system');


