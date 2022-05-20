shinobi.roottemplaterender = {
  init: function () {
    // shinobi.socketmanager.init();
    shinobi.roottemplaterender.changeLoggedState(shinobi.roottemplaterender.showLoginSignUpButton);
    shinobi.roottemplate.init();
  },

  changeLoggedState: function (callback) {
    shinobi.coreapi.reCheckAuthen(function (username) {
      if (username) {
        document.body.classList.add("has-logged");
        document.body.classList.remove("not-logged");
      } else {
        document.body.classList.remove("has-logged");
        document.body.classList.add("not-logged");
      }

      if (typeof callback == "function") {
        callback();
      }
    });
  },

  showLoginSignUpButton: function () {
    if (JSON.stringify(document.body.classList).includes("not-logged")) {
      var signupButtons = document.querySelectorAll(".is-signup-button");
      for (let signupButton of signupButtons) {
        signupButton.classList.remove("is-hidden");
      }

      var loginButtons = document.querySelectorAll(".is-login-button");
      for (let loginButton of loginButtons) {
        loginButton.classList.remove("is-hidden");
      }
    }
  },
};
