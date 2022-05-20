shinobi.roottemplate = {
  config: "",
  init: function () {
    var object = this;
    shinobi.initbulma.build();
    shinobi.util.addEventInternetConnection();
    object.renderDevelopingTooltip();
    object.activeMenuType();
    object.activeTab();
  },
  activeMenuType: function () {
    var menuleft = document.getElementById('menuleft');
    var menuPm = menuleft.querySelector('.pm-menu');
    var menuSupadmin = menuleft.querySelector('.superadmin-menu');
    var menuAladinAdmin = menuleft.querySelector('.aladin-admin-menu');
    getUserInfo(function (res) {
      if (res.usertype == "PM") {
        menuPm.classList.remove('is-hidden');
        menuSupadmin.classList.add('is-hidden');
      } else {
        if ((res.usertype == "SUPERADMIN")) {
          menuPm.classList.add('is-hidden');
          menuSupadmin.classList.remove('is-hidden');
        } else {
          if (res.usertype == "PMALADIN") {
            menuAladinAdmin.classList.remove('is-hidden');
            menuSupadmin.classList.add('is-hidden');
          }
        }
      }

    })

  },
  renderMobileNavigatorNavbar: function () {
    shinobi.coreapi.checkAuthen(function (username) {
      if (username) {
        shinobi.usernotificationrender.updateNotificationBadge();
        //hidden burger logged usermenu
        // document.querySelector('.navbar .navbar-end .user-navbar-header-menu-container').classList.add('is-hidden')
      }
    });
  },
  renderDevelopingTooltip: function () {
    var listDevelopingItem = document.querySelectorAll(".is-developing");
    listDevelopingItem.forEach(item => {
      item.classList.add('has-tooltip-bottom', 'has-tooltip-multiline');
      item.setAttribute("data-tooltip", "Đang phát triển");
    });
  },
  renderCellTextCentered: function (cell, row, col, all) {
    value = cell.innerHTML;
    cell.innerHTML = `
      <div class="has-text-centered">
        ${value}
      </div>
  `
  },
  renderCellTextBoldCentered: function (cell, row, col, all) {
    value = cell.innerHTML;
    cell.innerHTML = `
      <div class="has-text-centered has-text-weight-bold">
        ${value}
      </div>
  `
  },
  renderElemTextCentered: function (elem, value, all) {
    elem.innerHTML = `
      <div class="has-text-centered">
        ${value}
      </div>
  `
  },
  renderCellTextRight: function (cell, row, col, all) {
    value = cell.innerHTML;
    cell.innerHTML = `
      <div class="has-text-right">
        ${value}
      </div>
  `
  },
  renderElemTextRight: function (elem, value, all) {
    elem.innerHTML = `
      <div class="has-text-right">
        ${value}
      </div>
  `
  },

  renderFirstNameLastName(cell, row, col, all) {
    let data = all[row];
    cell.innerHTML = `<div class="has-text-centered">${data.firstname} ${data.lastname}</div>`
  },

  renderProfitPercent(cell, row, col, all) {
    let data = all[row];
    let value = cell.innerHTML;
    cell.innerHTML = `<div class="has-text-right">${value * 100}%</div>`
  },

  activeTab: function () {
    getUserInfo(function (response) {
      var infoUser = response;
      var usertype = infoUser.usertype;
      var tab = document.querySelector(`#menuleft [value="${usertype}"] a[href="${window.location.pathname}"`);
      if (tab) {
        tab.classList.add("is-active");

      }
    });
  },
};
