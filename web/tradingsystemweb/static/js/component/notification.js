shinobi.notification = {
  config: {
    modalSize: "is-small",
  },
  modal: {
    modalId: "confirmPanel",
    isInitLoad: false,
    isAccept: false,
    confirm: function (callback) {
      var modal = document.getElementById(this.modalId);

      modal.classList.add("is-active");

      if (!this.isInitLoad) {
        this.registerButton();
      }

      this.isInitLoad = true;
      this.isAccept = false;

      this.doAccept = callback;
    },
    registerButton: function () {
      var modal = document.getElementById(this.modalId);

      var closeButton = modal.getElementsByClassName("delete")[0];

      closeButton.addEventListener("click", function () {
        modal.classList.remove("is-active");
      });

      var cancelButton = modal.getElementsByClassName("cancel")[0];

      cancelButton.addEventListener("click", function () {
        modal.classList.remove("is-active");
      });

      var yesButton = modal.getElementsByClassName("yes")[0];

      var modalObject = this;

      yesButton.addEventListener("click", function () {
        modal.classList.remove("is-active");

        modalObject.isAccept = true;

        modalObject.doAccept();
      });
    },
    doAccep: function () {},
  },
  notification: {
    notificationId: "shinobinotification",
    isInitLoad: false,
    isLoading: true,
    show: function (type, content) {
      var notification = document.getElementById(this.notificationId);
      var notificationcontent = notification.getElementsByClassName("notificationcontent")[0];
      notificationcontent.innerHTML = content;
      if (shinobi.hasOwnProperty("language")) {
        shinobi.language.renderContainer(notificationcontent);
      }
      if ("info" === type) {
        notification.classList.add("info-message");
        notification.classList.remove("error-message");
        notification.classList.remove("loading-message");

        setTimeout(function () {
          notification.classList.remove("info-message");
        }, 3000);
      } else {
        notification.classList.remove("info-message");
        notification.classList.add("error-message");
        notification.classList.remove("loading-message");
      }

      this.registerButton();
      this.isInitLoad = true;
    },
    info: function (content) {
      this.show("info", content);
    },
    error: function (content) {
      this.show("error", content);
    },
    loading: function () {
      var notification = document.getElementById(this.notificationId);

      this.isInitLoad = true;

      notification.getElementsByClassName("delete")[0].classList.add("is-hidden");

      notification.classList.add("info-message");
      notification.classList.add("loading-message");
      notification.classList.remove("error-message");

      var notificationcontent = notification.getElementsByClassName("notificationcontent")[0];
      notificationcontent.innerHTML =
        '<div class="columns is-vcentered"> <a class="button is-text  is-loading column is-1"></a> <div class="column" snb-lang="PAGECODE_LOADING">Đang xử lý</div> </div>';
      if (shinobi.hasOwnProperty("language")) {
        shinobi.language.renderContainer(notificationcontent);
      }
    },
    loaded: function () {
      this.isInitLoad = false;

      var notification = document.getElementById(this.notificationId);

      notification.classList.remove("info-message");
      notification.classList.remove("loading-message");
    },
    registerButton: function () {
      var notification = document.getElementById(this.notificationId);

      var closeButton = notification.getElementsByClassName("delete")[0];
      closeButton.classList.remove("is-hidden");
      closeButton.addEventListener("click", function () {
        notification.classList.remove("info-message");
        notification.classList.remove("error-message");
        closeButton.classList.add("is-hidden");
      });
    },
  },
  confirm: function (callback, options) {
    if (shinobi.hasOwnProperty("notificationconfig")) {
      shinobi.notificationconfig.init();
    }
    var confirmPanel = document.getElementById("confirmPanel");
    shinobi.util.modalEventListener(confirmPanel);
    if (options) {
      if (options.title) {
        confirmPanel.getElementsByClassName("modal-card-title")[0].innerHTML = options.title;
      }
      if (options.content) {
        confirmPanel.getElementsByClassName("modal-card-body")[0].innerHTML = options.content;
      }
      if (options.yescontent) {
        confirmPanel.getElementsByClassName("yes")[0].innerHTML = options.yescontent;
      }
      if (options.nocontent) {
        confirmPanel.getElementsByClassName("cancel")[0].innerHTML = options.nocontent;
      }
      confirmPanel.classList.remove("is-small");
      confirmPanel.classList.remove("is-medium");
      confirmPanel.classList.remove("is-large");
      if (options.modalsize) {
        confirmPanel.classList.add(options.modalsize);
      } else {
        confirmPanel.classList.add(shinobi.notification.config.modalSize);
      }
      if (shinobi.notification.config.hasOwnProperty("modalFontSize")) {
        confirmPanel.classList.add(shinobi.notification.config.modalFontSize);
      }
      if (options.initfunction) {
        options.initfunction(confirmPanel);
      }
      if (options.ishiddenfooter) {
        confirmPanel.getElementsByClassName("modal-card-foot")[0].classList.add("is-hidden");
      } else {
        confirmPanel.getElementsByClassName("modal-card-foot")[0].classList.remove("is-hidden");
      }
    } else {
      confirmPanel.getElementsByClassName("modal-card-title")[0].innerHTML = "Cảnh báo";
      confirmPanel.getElementsByClassName("modal-card-body")[0].innerHTML = "Bạn chắc chắn?";

      confirmPanel.setAttribute("snb-lang", "PAGECODE_ARE_YOU_SURE");
      confirmPanel.getElementsByClassName("yes")[0].innerHTML = "Xác nhận";
      confirmPanel.getElementsByClassName("cancel")[0].innerHTML = "Hủy";
      confirmPanel.classList.remove("is-medium");
      confirmPanel.classList.remove("is-large");
      confirmPanel.classList.add("is-small");
      confirmPanel.classList.add(shinobi.notification.config.modalSize);
      if (shinobi.notification.config.hasOwnProperty("modalFontSize")) {
        confirmPanel.classList.add(shinobi.notification.config.modalFontSize);
      }
      confirmPanel.getElementsByClassName("modal-card-foot")[0].classList.remove("is-hidden");
    }
    confirmPanel.classList.add("is-active");
    var yes = confirmPanel.getElementsByClassName("yes")[0];
    yes.focus();
    yes.onclick = function () {
      if (typeof callback == "function") {
        if (options) {
          if (!(options.hasOwnProperty("notclosewhenacceft") && options["notclosewhenacceft"])) {
            confirmPanel.classList.remove("is-active");
          }
        } else {
          confirmPanel.classList.remove("is-active");
        }

        callback();
      }
    };
  },
  image: function (url, options) {
    var modal = document.getElementById("imageModal");
    if (modal) {
      var modalContent = modal.querySelector(".modal-content");
      modalContent.innerHTML = `
			<p class="image">
				<img sizes="(min-width: 576px) 540px, 100vw" src="${url}"> 
			</p>
			`;
      shinobi.initbulma.modalOpen(modal);
    } else {
      var modalNode = shinobi.util.convertTextToElement(shinobi.notification.iamgeModalContent);
      document.body.appendChild(modalNode);
      shinobi.initbulma.modalEventListener(modalNode);
      shinobi.notification.image(url, options);
    }
  },
  iamgeModalContent: `<div id="imageModal" class="modal">
					<div class="modal-background"></div>
					<div class="modal-content">
					
					</div>
					<button class="modal-close is-large" aria-label="close"></button>
				</div>`,
};
