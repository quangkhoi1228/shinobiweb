shinobi.socketmanager = {
  publicWebSocket: "",
  privateWebSocket: "",
  closeNotice5MinuteTimeout: "",
  noticeRemainTimeSound: "",

  socketMessage: {
    public: [],
    private: [],
  },
  init: function () {
    shinobi.config.getConfig();
    /*shinobi.socketmanager.noticeRemainTimeSound = new Audio('/static/audio/lottery-sound.mp3');*/
    // if (shinobi.socketmanager.publicWebSocket == "") {
    //   shinobi.socketmanager.publicWebSocket = "loading";
    //   shinobi.socketmanager.createWebSocketPublic();
    // }
    // if (shinobi.socketmanager.privateWebSocket == "") {
    //   shinobi.socketmanager.privateWebSocket = "loading";
    //   shinobi.socketmanager.createWebSocketPrivate();
    // }
    // shinobi.socketmanager.addEventSocketPublicProcess();
    // shinobi.socketmanager.addEventSocketPrivateProcess();
  },

  addEventSocketPublicProcess: function () {
    setInterval(function () {
      if (shinobi.socketmanager.socketMessage.public.length > 0) {
        var item = shinobi.socketmanager.socketMessage.public.shift();
        switch (item.messagetype) {
          case "PRICEBOARD_DETAIL":
            shinobi.socketmanager.updatePriceBoardDetail(item);
            break;
          case "PRICEBOARD_OVERVIEW":
            shinobi.socketmanager.updatePriceBoardOverview(item);
            break;
          case "MARKET_STATUS":
            shinobi.socketmanager.updateMarketStatus(item);
            break;
          case "MARKET_DATE":
            shinobi.indexrender.renderMarketDateData(JSON.parse(item.data));
            break;
          case "SJC_PRICE":
            shinobi.indexrender.renderMarketSjcPriceData(JSON.parse(item.data));
            break;
          case "GOLD_SPOT":
            shinobi.indexrender.renderMarketGoldSpotData(JSON.parse(item.data));
            break;

          default:
            break;
        }
      }
    }, 100);
  },

  addEventSocketPrivateProcess: function () {
    setInterval(function () {
      if (shinobi.socketmanager.socketMessage.private.length > 0) {
        var item = shinobi.socketmanager.socketMessage.private.shift();
        var type = item.hasOwnProperty("messagetype") ? item.messagetype : item.type;
        switch (type) {
          case "USER_ONLINE_STATUS":
            shinobi.userstatus.updateUserStatusProcess(item);
            break;
          case "PRICEBOARD_PRIVATE_DETAIL":
            var data = JSON.parse(item.data);
            shinobi.priceboardcontrol.updateUserId(data);
            break;
          case "notification":
            shinobi.usernotificationrender.updateNotificationBadge();
            break;
          default:
            break;
        }
      }
    }, 10);
  },

  updatePriceBoardDetail: function (item) {
    var priceboardDetailMessageList = JSON.parse(item.data);
    shinobi.priceboardcontrol.socketQueue = shinobi.priceboardcontrol.socketQueue.concat(priceboardDetailMessageList);
  },

  updateMarketStatus: function (item) {
    shinobi.indexrender.renderMarketStatusData(item.data);
  },

  updatePriceBoardOverview: function (item) {
    var priceboardDetailMessageList = JSON.parse(item.data);
    shinobi.priceboardcontrol.socketQueue = shinobi.priceboardcontrol.socketQueue.concat(priceboardDetailMessageList);
  },

  createWebSocketPrivate: function () {
    shinobi.socketmanager.privateWebSocket = "loading";
    shinobi.util.checkAuthen(function (username) {

      if (username) {
        shinobi.message.connectSocketServer(function () {
          shinobi.message.connect(
            shinobi.config.current.imserver,
            function () {
              // shinobi.message.socket.send(requestMessage);
            },
            {
              onMessage: function (data) {
                shinobi.socketmanager.socketMessage.private = shinobi.socketmanager.socketMessage.private.concat(data);
              },
            }
          );
          shinobi.socketmanager.privateWebSocket = shinobi.message;
          shinobi.socketmanager.disconnectContainer = shinobi.util.addEventInternetConnection();
          shinobi.socketmanager.checkPrivateSocketDisconnect();
        });

      } else {
        shinobi.socketmanager.privateWebSocket = "";
      }
    });
  },
  createWebSocketPublic: function () {
    shinobi.socketmanager.publicWebSocket = new shinobi.socket({
      url: shinobi.config.current.publicWebSocketUrl,
      onMessage: function (data) {
        shinobi.socketmanager.socketMessage.public = shinobi.socketmanager.socketMessage.public.concat(data);
      },
    });
    shinobi.socketmanager.disconnectContainer = shinobi.util.addEventInternetConnection();
    shinobi.socketmanager.checkPublicSocketDisconnect();

  },
  checkPrivateSocketDisconnectCount: 0,
  checkPublicSocketDisconnectCount: 0,
  checkPrivateSocketDisconnect: function () {
    let currentSocket = shinobi.socketmanager.privateWebSocket.socket;
    setTimeout(function () {
      if (currentSocket.readyState == currentSocket.OPEN) {
        shinobi.socketmanager.checkPrivateSocketDisconnectCount = 0;
      } else {
        shinobi.socketmanager.checkPrivateSocketDisconnectCount += 1;
      }
      var internetConnection = shinobi.util.internetConnection;
      var socketConnection;
      if (shinobi.socketmanager.checkPrivateSocketDisconnectCount < 5
        && shinobi.socketmanager.checkPublicSocketDisconnectCount < 5) {
        socketConnection = true;
      } else {
        socketConnection = false;
      }
      if (internetConnection) {
        if (socketConnection) {
          shinobi.socketmanager.disconnectContainer.classList.remove('is-active');
        } else {
          shinobi.socketmanager.disconnectContainer.classList.add('is-active');
        }
      }
      shinobi.socketmanager.checkPrivateSocketDisconnect();
    }, 1000);
  },
  checkPublicSocketDisconnect: function () {
    setTimeout(function () {
      if (shinobi.socketmanager.publicWebSocket.socket.readyState == shinobi.socketmanager.publicWebSocket.socket.OPEN) {
        shinobi.socketmanager.checkPublicSocketDisconnectCount = 0;
      } else {
        shinobi.socketmanager.checkPublicSocketDisconnectCount += 1;
      }
      var internetConnection = shinobi.util.internetConnection;
      var socketConnection;
      if (shinobi.socketmanager.checkPublicSocketDisconnectCount < 5) {
        socketConnection = true;
      } else {
        socketConnection = false;
      }
      if (internetConnection) {
        if (socketConnection) {
          shinobi.socketmanager.disconnectContainer.classList.remove('is-active');
        } else {
          shinobi.socketmanager.disconnectContainer.classList.add('is-active');
        }
      }
      shinobi.socketmanager.checkPublicSocketDisconnect();
    }, 1000);
  },

};
