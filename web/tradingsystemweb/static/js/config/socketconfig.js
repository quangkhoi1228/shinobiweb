shinobi.config = {
  current: {
    imserver: "ws://localhost:8081/authensocket",
    publicWebSocketUrl: "ws://localhost:8182/publicwebsocket",
  },
  getConfig: function () {
    var hostname = window.location.hostname;
    switch (hostname) {
      case "golddemo.hanzo.finance":
        shinobi.config.current.imserver =
          "wss://golddemoprivatesocket.hanzo.finance/authensocket";
        shinobi.config.current.publicWebSocketUrl =
          "wss://golddemopublicsocket.hanzo.finance/publicwebsocket";
        break;
      case "gold.hanzo.finance":
        shinobi.config.current.imserver =
          "wss://goldprivatesocket.hanzo.finance/authensocket";
        shinobi.config.current.publicWebSocketUrl =
          "wss://goldpublicsocket.hanzo.finance/publicwebsocket";
        break;
      case "localhost":
      default:
        shinobi.config.current.imserver = "ws://localhost:8081/authensocket";
        shinobi.config.current.publicWebSocketUrl =
          "ws://localhost:8182/publicwebsocket";
        // shinobi.config.current.publicWebSocketUrl =
        // "wss://golddemopublicsocket.hanzo.finance/publicwebsocket";
        break;
    }
  },
};
