shinobi.confirmemailregistrationrender = {
  build: function () {
    shinobi.confirmemailregistrationrender.sendRequestConfirmRegistration();
  },

  sendRequestConfirmRegistration: function () {
    var pathName = window.location.pathname;

    var pathNameSplit = pathName.split("/");

    var validationcode = pathNameSplit[pathNameSplit.length - 1];
    var requestid = pathNameSplit[pathNameSplit.length - 2];

    var request = {};
    request.requestid = requestid;
    request.validationcode = validationcode;

    shinobi.api.request(
      shinobi.coreapi.userApi + "validateAccount",
      JSON.stringify(request),
      function (response) {
        console.log(response);
        if (response == "update success") {
          var confirmPanel = document.getElementById("confirmPanel");
          shinobi.util.modalEventListener(confirmPanel);

          confirmPanel.getElementsByClassName("modal-card-title")[0].innerHTML =
            "Thông báo";
          confirmPanel.getElementsByClassName("modal-card-body")[0].innerHTML =
            "Xác nhận email <b>thành công</b>.<br>Yêu cầu tạo tài khoản đang được xử lý và CFV sẽ liên hệ lại để cung cấp tài khoản.";
          confirmPanel
            .getElementsByClassName("yes")[0]
            .classList.add("is-primary");
          confirmPanel.getElementsByClassName("yes")[0].innerHTML =
            "Về trang chủ";

          confirmPanel.classList.remove("is-medium");
          confirmPanel.classList.remove("is-large");

          confirmPanel
            .getElementsByClassName("modal-card-foot")[0]
            .classList.remove("is-hidden");

          var yes = confirmPanel.getElementsByClassName("yes")[0];
          var cancel = confirmPanel.getElementsByClassName("cancel")[0];
          cancel.classList.add("is-hidden");

          confirmPanel.classList.add("is-active");

          yes.focus();
          yes.onclick = function () {
            // shinobi.loginrender.gotoLoginPage();
            window.location.href = "/";
          };
        }
      }
    );
  },
};
