truncate tbstockcomaccount;
truncate
 tbaction ;

update
 tbtradingsystemconfig
set
 configvalue = '{"listString":[]}'
where
 configname = 'ORIGIN_STOCK_COM_ACCOUNT';


update tbtradingsystemconfig set configvalue  = '{"listString":[]}' where configname ='AUDIT_ERROR_RECEIVED_EMAIL_LIST';

update tbtradingsystemconfig set configvalue = '{"dateoff":[]}' where configname = 'TRADING_DATE_OFF';



truncate
 tbuser;

insert
 into
 public.tbuser
(username,
 "password",
 createddate,
 createduser,
 lastmodifieddate,
 lastmodifieduser,
 id,
 isvalidated,
 loginusername)
values('aladinadmin',
'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
'2022-01-17 16:11:58.360',
'system',
'2022-01-17 16:11:58.360',
'system',
2,
true,
'aladinadmin');

insert
 into
 public.tbuser
(username,
 "password",
 createddate,
 createduser,
 lastmodifieddate,
 lastmodifieduser,
 id,
 isvalidated,
 loginusername)
values('superadmin',
'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
'2022-01-17 16:11:58.360',
'system',
'2022-01-17 16:11:58.360',
'system',
67,
true,
'superadmin');

truncate
 tbuserinfo ;

insert
 into
 tbuserinfo
(id,
 createddate,
 createduser,
 lastmodifieddate,
 lastmodifieduser,
 username,
 firstname,
 lastname,
 usertype,
 managedaccounts,
 lastlogintime,
 invitedby,
 avatarlink,
 email)
values(73,
'2022-02-21 20:09:20.627',
'system',
'2022-02-21 20:09:20.627',
'system',
'aladinadmin',
'a la đin',
'ạt min',
'PMALADIN',
null,
null,
null,
null,
'quangkhoi1228@gmail.com');

insert
 into
 tbuserinfo
(id,
 createddate,
 createduser,
 lastmodifieddate,
 lastmodifieduser,
 username,
 firstname,
 lastname,
 usertype,
 managedaccounts,
 lastlogintime,
 invitedby,
 avatarlink,
 email)
values(83,
'2022-02-21 20:09:20.627',
'system',
'2022-02-21 20:09:20.627',
'system',
'superadmin',
'súp bờ',
'ạt min',
'SUPERADMIN',
null,
null,
null,
null,
'quangkhoi1228@gmail.com');

truncate
 tballocationaccount ;

truncate
 tballocationaccountlog ;

truncate tballocationaccounthistory;

truncate
 tbstockcomsubaccount;

truncate
 tbstockcomautheninfo ;

truncate
 tbcashinfo ;

truncate
 tbfollowing ;

truncate tbfollowinghistory;

truncate
 tbtradingperiod ;

truncate
 tbtradingperiodhistory;

truncate
 tbactivitylog;



truncate
tbrelationaction ;
truncate tbsignal ;
truncate tboriginalsignal ;
truncate tboriginalsignalhistory ;
truncate tbstockcomorder;
truncate tbcashtransaction;
truncate tborder;
truncate tborderhistory ;
truncate tborderstatuslog ;
truncate tbscheduledcash ;
truncate tbscheduledstock ;
truncate tbsignalhistory ;
truncate tbstockcomcashinfo ;
truncate tbstockcomcashtransaction ;
truncate tbstockcomorderhistory ;
truncate tbstockcomstockinfo ;
truncate tbstockinfo ;
truncate tbstockcomtradingconfig ;


truncate
tbdeal ;
truncate
tbdealhistory ;
truncate  tbclosedtrading ;


INSERT INTO public.tbaction
( createduser, createddate, lastmodifieddate, lastmodifieduser, "name", "data", description, status)
VALUES( 'system', '2022-02-23 08:01:20.632', '2022-02-23 08:01:20.632', 'system', 'LOGIN_ALL_USER', '', '', 'PENDING');
INSERT INTO public.tbaction
( createduser, createddate, lastmodifieddate, lastmodifieduser, "name", "data", description, status)
VALUES( 'system', '2022-02-23 08:01:25.632', '2022-02-23 08:01:25.632', 'system', 'GET_SUB_ACCOUNT_LIST_ALL_USER', '', '', 'PENDING');
INSERT INTO public.tbaction
( createduser, createddate, lastmodifieddate, lastmodifieduser, "name", "data", description, status)
VALUES( 'system', '2022-02-23 08:01:30.633', '2022-02-23 08:01:30.633', 'system', 'GET_CASH_INFO_ALL_USER', '', '', 'PENDING');
INSERT INTO public.tbaction
( createduser, createddate, lastmodifieddate, lastmodifieduser, "name", "data", description, status)
VALUES( 'system', '2022-02-23 08:01:35.633', '2022-02-23 08:01:35.633', 'system', 'GET_INTRA_DAY_ORDER_ALL_USER', '', '', 'PENDING');