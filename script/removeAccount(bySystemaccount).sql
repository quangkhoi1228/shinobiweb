delete
from
	tbstockcomaccount
where
	systemaccount =  :systemaccount ;

update
 tbtradingsystemconfig
set
 configvalue = REPLACE(configvalue, '"'|| :systemaccount || '"','')
where
 configname = 'ORIGIN_STOCK_COM_ACCOUNT';

delete from 
	tballocationaccount where systemsubaccount like '%' || :systemaccount || '%';

delete from 
	tballocationaccountlog where systemsubaccount like '%' || :systemaccount || '%';

delete from 
	tballocationaccounthistory where systemsubaccount like '%' || :systemaccount || '%';

delete from 
	tbstockcomsubaccount where systemaccount = :systemaccount ;

delete from 
	tbstockcomautheninfo where systemaccount = :systemaccount ;

delete from
	tbcashinfo where account like '%' || :systemaccount || '%';

delete from
	tbcashinfohistory where account like '%' || :systemaccount || '%';

delete from
	tbstockinfo where account like '%' || :systemaccount || '%';

delete from
	tbstockinfohistory where account like '%' || :systemaccount || '%';

delete from
	tbfollowing where subscriber like '%' || :systemaccount || '%';

delete from
	tbfollowinghistory where subscriber like '%' || :systemaccount || '%';

delete from
	tbtradingperiod where allocationaccount like '%' || :systemaccount || '%';

delete from
	tbtradingperiodhistory where allocationaccount like '%' || :systemaccount || '%';

delete from
	tbrelationaction where subscriber like '%' || :systemaccount || '%';

delete from
	tbsignal where allocationaccount like '%' || :systemaccount || '%';

delete from
	tboriginalsignal where allocationaccount like '%' || :systemaccount || '%';

delete from
	tboriginalsignalhistory where allocationaccount like '%' || :systemaccount || '%' ;

delete from
	tbcashtransaction where account like '%' || :systemaccount || '%';

delete from
	tbactivitylog where "data" like '%' || :systemaccount || '%'; 

delete from
	tbclosedtrading where allocationaccount like '%' || :systemaccount || '%';

delete from
	tbdeal where allocationaccount like '%' || :systemaccount || '%';

delete from
	tbdealhistory where allocationaccount like '%' || :systemaccount || '%';

delete from
	tbstockcomcashtransaction where systemsubaccount like '%' || :systemaccount || '%';

delete from
	tbstockcomtradingconfig where systemaccount = :systemaccount ;

delete from
	tbstocktransaction where allocationaccount like '%' || :systemaccount || '%';
	
delete from
	tbscheduledstock where allocationaccount like '%' || :systemaccount || '%';	
	
delete from
	tbscheduledcash where allocationaccount like '%' || :systemaccount || '%';	
	
