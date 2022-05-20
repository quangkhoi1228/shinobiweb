INSERT INTO tbstockcomaccount (systemaccount,userid,account,username,"password",stockcompany,pincode,additionaldata,createddate,createduser,lastmodifieddate,lastmodifieduser,fullname,tradingsubaccount) VALUES
         ('VPS_699279','','699279','699279','zxcasd123!@#ZXC','VPS','',NULL,'2022-03-22 14:32:33.949','superadmin','2022-03-22 14:32:41.616','superadmin','Tự doanh 1','VPS_699279_N');

INSERT INTO tbstockcomsubaccount (createddate,createduser,lastmodifieddate,lastmodifieduser,systemsubaccount,systemaccount,account,subaccount,subaccounttype,subaccountname,additionaldata) VALUES
 ('2022-03-22 14:32:34.760','system','2022-03-22 14:32:34.760','system','VPS_699279_N','VPS_699279','699279','6992791','NORMAL','Tài khoản thường',NULL),
 ('2022-03-22 14:32:34.767','system','2022-03-22 14:32:34.767','system','VPS_699279_S','VPS_699279','699279','6992793','SPECIAL_MARGIN','Tài khoản special margin',NULL),
 ('2022-03-22 14:32:34.773','system','2022-03-22 14:32:34.773','system','VPS_699279_M','VPS_699279','699279','6992796','MARGIN','Tài khoản margin',NULL),
 ('2022-03-22 14:32:34.779','system','2022-03-22 14:32:34.779','system','VPS_699279_D','VPS_699279','699279','6992798','DERIVATIVE','Tài khoản phái sinh',NULL);

INSERT INTO tballocationaccount (createduser,createddate,lastmodifieddate,lastmodifieduser,allocationaccount,systemsubaccount,allocationratio,allocationamount,"type") VALUES
         ('superadmin','2022-03-22 14:32:35.650','2022-03-22 14:32:35.650','superadmin','VPS_699279_N_5','VPS_699279_N',0.85,4821671,'INDEPENDENT'),
         ('superadmin','2022-03-22 14:32:35.733','2022-03-22 14:32:35.733','superadmin','VPS_699279_S_1','VPS_699279_S',0,0,'INDEPENDENT'),
         ('superadmin','2022-03-22 14:32:35.803','2022-03-22 14:32:35.803','superadmin','VPS_699279_M_1','VPS_699279_M',1.00,50742,'INDEPENDENT'),
         ('superadmin','2022-03-22 14:32:35.871','2022-03-22 14:32:35.871','superadmin','VPS_699279_D_1','VPS_699279_D',0,0,'INDEPENDENT');

INSERT INTO tbcashinfo (createduser,createddate,lastmodifieddate,lastmodifieduser,account,accounttype,assets,availablecash,balance,purchasingpower,"locked",debt) VALUES
         ('system','2022-03-22 15:42:56.138','2022-03-22 15:42:56.180','system','VPS_699279_D_1','ALLOCATION_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:42:56.005','2022-03-22 15:42:56.039','system','VPS_699279_M_1','ALLOCATION_ACCOUNT',50742,50742,50742,50742,0,0),
         ('system','2022-03-22 15:42:55.928','2022-03-22 15:42:55.949','system','VPS_699279_S_1','ALLOCATION_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:42:55.851','2022-03-22 15:53:34.360','system','VPS_699279_N_1','ALLOCATION_ACCOUNT',2685967,2685967,2685967,2685967,0,0),
         ('system','2022-03-22 15:42:55.792','2022-03-22 15:42:55.792','system','VPS_699279_D','SYSTEM_SUB_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:42:55.617','2022-03-22 15:42:55.617','system','VPS_699279_M','SYSTEM_SUB_ACCOUNT',50742,50742,50742,50742,0,0),
         ('system','2022-03-22 15:42:55.440','2022-03-22 15:42:55.440','system','VPS_699279_S','SYSTEM_SUB_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:42:55.225','2022-03-22 15:42:55.225','system','VPS_699279_N','SYSTEM_SUB_ACCOUNT',5691896,4971896,4971896,4971896,0,0);

INSERT INTO tballocationaccount (createduser,createddate,lastmodifieddate,lastmodifieduser,allocationaccount,systemsubaccount,allocationratio,allocationamount,"type") VALUES
         ('system','2022-03-22 16:08:30.242','2022-03-22 16:08:30.242','system','VPS_699279_N_2','VPS_699279_N',0.40,2285929,'TRADING_FOLLOW');

INSERT INTO tbcashinfo (createduser,createddate,lastmodifieddate,lastmodifieduser,account,accounttype,assets,availablecash,balance,purchasingpower,"locked",debt) VALUES
         ('system','2022-03-22 15:53:34.279','2022-03-22 15:53:34.394','system','VPS_699279_N_2','ALLOCATION_ACCOUNT',2285929,2285929,2285929,2285929,0,0);

update tballocationaccount set  allocationratio = 0.47,allocationamount = 2685967 where allocationaccount= 'VPS_699279_N_1';

UPDATE public.tbcashinfo
SET createduser='system', createddate='2022-03-22 15:42:55.851', lastmodifieddate='2022-03-22 16:08:30.309', lastmodifieduser='system', assets=2685967, availablecash=2685967, balance=2685967, purchasingpower=2685967, "locked"=0, debt=0
WHERE account='VPS_699279_N_1';

update tbtradingsystemconfig set configvalue = '{"listString":["VPS_699279"]}' where configname = 'ORIGIN_STOCK_COM_ACCOUNT';

INSERT INTO tbuser (username,"password",createddate,createduser,lastmodifieddate,lastmodifieduser,isvalidated,loginusername) VALUES
         ('84','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2022-03-22 14:45:32.486','superadmin','2022-03-22 14:45:32.489','superadmin',true,'quangkhoiuit98@gmail.com');

INSERT INTO tbuserinfo (createddate,createduser,lastmodifieddate,lastmodifieduser,username,firstname,lastname,usertype,managedaccounts,lastlogintime,invitedby,avatarlink,identitynumber,phonenumber,email) VALUES
         ('2022-03-22 14:45:32.455','superadmin','2022-03-22 14:45:32.469','superadmin','84','pm','1','PM',NULL,NULL,'','/static/image/user-avatar.png','123456789','0123456789','truongthinh118001@gmail.com');

INSERT INTO tbusergroup (groupname,username,createddate,createduser,lastmodifieddate,lastmodifieduser) VALUES
         ('pm','84','2022-03-22 15:44:53.574','superadmin','2022-03-22 15:44:53.574','superadmin') on conflict on constraint tbusergroup_unique do nothing ;

INSERT INTO tbstockcomaccount (systemaccount,userid,account,username,"password",stockcompany,pincode,additionaldata,createddate,createduser,lastmodifieddate,lastmodifieduser,fullname,tradingsubaccount) VALUES
         ('VPS_634214','','634214','634214','Ho@ng13301','VPS','',NULL,'2022-03-22 14:47:40.311','superadmin','2022-03-22 14:47:47.664','superadmin','Kim Hoàng','VPS_634214_N');

INSERT INTO tbstockcomsubaccount (createddate,createduser,lastmodifieddate,lastmodifieduser,systemsubaccount,systemaccount,account,subaccount,subaccounttype,subaccountname,additionaldata) VALUES
         ('2022-03-22 14:47:41.021','system','2022-03-22 14:47:41.021','system','VPS_634214_N','VPS_634214','634214','6342141','NORMAL','Tài khoản thường',NULL),
         ('2022-03-22 14:47:41.029','system','2022-03-22 14:47:41.029','system','VPS_634214_M','VPS_634214','634214','6342146','MARGIN','Tài khoản margin',NULL),
         ('2022-03-22 14:47:41.035','system','2022-03-22 14:47:41.035','system','VPS_634214_D','VPS_634214','634214','6342148','DERIVATIVE','Tài khoản phái sinh',NULL);

INSERT INTO tballocationaccount (createduser,createddate,lastmodifieddate,lastmodifieduser,allocationaccount,systemsubaccount,allocationratio,allocationamount,"type") VALUES
         ('system','2022-03-22 15:46:49.012','2022-03-22 15:46:49.012','system','VPS_634214_N_3','VPS_634214_N',0.07,362387,'TRADING_FOLLOW'),
         ('system','2022-03-22 15:46:48.271','2022-03-22 15:46:48.271','system','VPS_634214_N_2','VPS_634214_N',0.10,517697,'TRADING_FOLLOW'),
         ('superadmin','2022-03-22 15:46:26.411','2022-03-22 15:46:26.411','superadmin','VPS_634214_D_1','VPS_634214_D',0,0,'INDEPENDENT'),
         ('superadmin','2022-03-22 15:46:26.344','2022-03-22 15:46:26.344','superadmin','VPS_634214_M_1','VPS_634214_M',0,0,'INDEPENDENT'),
         ('superadmin','2022-03-22 15:46:26.240','2022-03-22 15:46:49.044','system','VPS_634214_N_1','VPS_634214_N',0.00,1,'INDEPENDENT');

INSERT INTO tbcashinfo (createduser,createddate,lastmodifieddate,lastmodifieduser,account,accounttype,assets,availablecash,balance,purchasingpower,"locked",debt) VALUES
         ('system','2022-03-22 15:46:49.022','2022-03-22 15:46:49.220','system','VPS_634214_N_3','ALLOCATION_ACCOUNT',362387,362387,362387,362387,0,0),
         ('system','2022-03-22 15:46:48.283','2022-03-22 15:46:48.908','system','VPS_634214_N_2','ALLOCATION_ACCOUNT',517697,517697,517697,517697,0,0),
         ('system','2022-03-22 15:46:26.422','2022-03-22 15:46:26.444','system','VPS_634214_D_1','ALLOCATION_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:46:26.354','2022-03-22 15:46:26.377','system','VPS_634214_M_1','ALLOCATION_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:46:26.266','2022-03-22 15:46:49.192','system','VPS_634214_N_1','ALLOCATION_ACCOUNT',1,1,1,1,0,0),
         ('system','2022-03-22 15:46:26.151','2022-03-22 15:46:26.151','system','VPS_634214_D','SYSTEM_SUB_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:46:25.965','2022-03-22 15:46:25.965','system','VPS_634214_M','SYSTEM_SUB_ACCOUNT',0,0,0,0,0,0),
         ('system','2022-03-22 15:46:25.788','2022-03-22 15:46:25.788','system','VPS_634214_N','SYSTEM_SUB_ACCOUNT',5200085,880085,880085,880085,0,0);

INSERT INTO tbtradingperiod (createduser,createddate,lastmodifieddate,lastmodifieduser,periodid,allocationaccount,startdate,enddate,managementfeeratio,profitcommisionratio) VALUES
         ('system','2022-03-22 15:46:48.930','2022-03-22 15:46:48.930','system','VPS_634214_N_2_1','VPS_634214_N_2','2022-03-23 00:00:00.000','2022-03-31 23:59:59.000',0.1,0.1),
         ('system','2022-03-22 15:46:49.236','2022-03-22 15:46:49.236','system','VPS_634214_N_3_1','VPS_634214_N_3','2022-03-23 00:00:00.000','2022-03-31 23:59:59.000',0.1,0.1),
         ('system','2022-03-22 15:53:34.413','2022-03-22 15:53:34.413','system','VPS_699279_N_2_1','VPS_699279_N_2','2022-03-22 00:00:00.000','2022-03-31 00:00:00.000',0,0.05);

INSERT INTO tbfollowing (createduser,createddate,lastmodifieddate,lastmodifieduser,publisher,subscriber,"type",isactive,activateddate,additionaldata) VALUES
         ('system','2022-03-22 15:46:48.936','2022-03-22 15:46:48.936','system','84','VPS_634214_N_2','TRADING_FOLOW_BY_PERIOD',true,'2022-03-22 15:46:48.936',NULL),
         ('system','2022-03-22 15:46:49.240','2022-03-22 15:46:49.240','system','aladinadmin','VPS_634214_N_3','TRADING_FOLOW_BY_PERIOD',true,'2022-03-22 15:46:49.240',NULL),
         ('system','2022-03-22 15:53:34.421','2022-03-22 15:53:34.421','system','84','VPS_699279_N_2','TRADING_FOLOW_BY_PERIOD',true,'2022-03-22 15:53:34.421',NULL);


update tbuserinfo set managedaccounts = '{"listString":["VPS_699279_N_2"]}' where username = '84';