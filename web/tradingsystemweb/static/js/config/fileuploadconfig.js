shinobi.fileuploadconfig = {
  uploadDomainProcess: function () {
    var hostname = window.location.hostname;
    var uploadFileUrl;
    switch (hostname) {
      case "golddemo.hanzo.finance":
        uploadFileUrl = "https://golddemouploadfile.hanzo.finance/";
        break;
      case "gold.hanzo.finance":
        uploadFileUrl = "https://golduploadfile.hanzo.finance/";
        break;
      case "localhost":
      default:
        uploadFileUrl = "http://localhost:10000/";
        break;
    }
    return uploadFileUrl;
  },
};
