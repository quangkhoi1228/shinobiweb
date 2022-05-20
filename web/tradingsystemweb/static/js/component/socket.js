shinobi.socket = (function () {
  // constructor
  var constructor = function (option) {
    this.url = "";
    this.option = option;
    this.socket = {};
    this.msgid = "";
    this.onOpen = null;
    this.onOpenOverrideFunction = null;
    this.onMessage = null;
    this.onMessageOverrideFunction = null;
    this.onSendOverrideFunction = null;
    this.onError = null;
    this.onClose = null;
    this.onAjax = null;

    this.init = function () {
      this.setupOption();

      this.connect();
    };

    this.connect = function () {
      var socketObject = this;

      this.socket = new WebSocket(socketObject.url);

      this.socket.addEventListener("open", function (event) {
        if (typeof socketObject.onOpenOverrideFunction == "function") {
          socketObject.onOpenOverrideFunction(socketObject);
        } else {
          var message = {
            type: "register",
            command: "init",
            msgid: 0,
            data: [],
          };
          this.send(JSON.stringify(message));

          if (typeof socketObject.onOpen == "function") {
            socketObject.onOpen(socketObject);
          }
        }
      });

      this.socket.addEventListener("message", function (event) {
        if (typeof socketObject.onMessageOverrideFunction == "function") {
          socketObject.onMessageOverrideFunction(event.data);
        } else {
          var data = JSON.parse(event.data);

          // if (socketObject.msgid == '') {

          // 	socketObject.msgid = data.msgid;

          // } else {

          if (typeof socketObject.onMessage == "function") {
            socketObject.onMessage(data);
          }

          // }
        }
      });

      this.socket.addEventListener("close", function () {
        console.log("connection closed");
        if (typeof socketObject.onClose == "function") {
          socketObject.onClose(socketObject);
        } else {
          setTimeout(socketObject.connect(socketObject.url), 1000);
        }
      });
    };

    this.setupOption = function () {
      var socketObject = this;

      socketObject["url"] = option["url"];

      if (option["onOpen"]) {
        socketObject["onOpen"] = option["onOpen"];
      }
      if (option["onClose"]) {
        socketObject["onClose"] = option["onClose"];
      }
      if (option["onMessage"]) {
        socketObject["onMessage"] = option["onMessage"];
      }
      if (option["onError"]) {
        socketObject["onError"] = option["onError"];
      }
      if (option["onAjax"]) {
        socketObject["onAjax"] = option["onAjax"];
      }
      if (option["onOpenOverrideFunction"]) {
        socketObject["onOpenOverrideFunction"] =
          option["onOpenOverrideFunction"];
      }
      if (option["onMessageOverrideFunction"]) {
        socketObject["onMessageOverrideFunction"] =
          option["onMessageOverrideFunction"];
      }
      if (option["onSendOverrideFunction"]) {
        socketObject["onSendOverrideFunction"] =
          option["onSendOverrideFunction"];
      }
    };

    this.send = function (sendData, callback) {
      var socketObject = this;

      var interval = setInterval(function () {
        if (socketObject.socket.readyState == 1) {
          if (typeof socketObject.onSendOverrideFunction == "function") {
            socketObject.onSendOverrideFunction(socketObject, sendData);
          } else {
            var content = {
              command: "request",
              msgid: socketObject.msgid,
              data: sendData,
            };

            socketObject.socket.send(JSON.stringify(content));
          }

          if (typeof callback == "function") {
            callback();
          }

          clearInterval(interval);
        }
      }, 10);
    };

    this.init();
  }; // end constructor

  return constructor;
})();
