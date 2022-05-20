1. LINK SOURCE
 - shinobicore
 - shinobisocket
 - shinobiutil
 
2. ADD LIBRARY
 - select "add library JAR" in eclipse
 - add file shinobiserver.jar in ../aladin/lib/
 
3. RUN CONFIGURATIONS
- right click project -> run As -> Run configurations
- douple click "Java Application" to create new java app
- Change name in "Name:"
- in "Project" select project tradingsystemweb 
- In "Main class" search *Main, select com.hdcapweb.main.HdCapWebMain

- Argument:(change link file equal your file location)
-Dconfig=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/web/web.properties 
-Ds3=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/web/s3.properties 
-Dwebdir=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/web/tradingsystemweb/ 
-Dlogdbconfig=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/logdbconfig.properties 
-Ddbconfig=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/dbconfig.properties 
-Dcustomconfig=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/config.properties 
-Dorg.owasp.esapi.resources=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/aladin
-Dloggerlevel=TRACE 
-DexcelPath=/home/huong/Projects/ 
-DSTARTWEBSOCKETSERVER=true 
-DSOCKETSERVERHOST=localhost 
-DSOCKETSERVERPORT=8090 
-Dapplesigninconfig=/home/huong/Project/tradingsystemweb/git/tradingsystemweb/applesigninconfig.json 
-DISDEVMODE=true 
-Ddomain=LOCALHOST

--------aplly and run------
-----------end setup--------
4. Build resource
- go to ../tradingsystemweb/web/optimize
- in file syc_resource.sh
	+ change variable CORE_DIR= location folder showcase($HOME_DIR/showcase/web/showcase) in showcase project 
	+ change WEB_DIR = tradingsystemweb 
- run buildresource.sh(use sh buildresource.sh or ./buildresource.sh) 


-------kill process java------
cmd: "ps aux | grep java" to show all process run with JAVA
cmd: "kill -9 {number process}"


