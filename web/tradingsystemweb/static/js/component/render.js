shinobi.render = {
  renderDownloadButtonTable: function (cell, row, col, all) {
    cell.innerHTML = `<a class="button is-small is-link" href="${all[row]["fileurl"]}" download><span class="icon"><i class="fa fa-file"></i></span><span>Tải file</span></a>`;
  },
  renderFormatNumber: function (elem, value, all) {
    var renderValue = shinobi.util.formatNumber(value);
    if (["INPUT", "SELECT", "TEXTAREA"].includes(elem.tagName)) {
      elem.value = renderValue;
    } else {
      elem.innerHTML = renderValue;
      if (["TD", "TH"].includes(elem.tagName)) {
        elem.classList.add("has-text-right");
      }
    }
  },
  showParentNode: function (elem, value, all) {
    elem.innerHTML = value;
    elem.parentNode.classList.remove("is-hidden");
  },
  hiddenParentNode: function (elem, value, all) {
    elem.innerHTML = value;
    elem.parentNode.classList.add("is-hidden");
  },

  renderChangeAvatarImageContainer: function (elem, value, all) {
    all.hasOwnProperty("avatarlink") ? elem.classList.remove("is-hidden") : elem.classList.add("is-hidden");
  },
  renderImageFileInput: function (element, value, all) {
    if (value.trim() != "" && value.trim() != "null") {
      var url = value;

      element.setAttribute("image-url", url);

      var filename = url.split("/")[url.split("/").length - 1];

      var fileContainer = shinobi.util.getParentElementHasAttribute(element, {
        type: "class",
        value: "file",
      });

      var field = shinobi.util.getParentElementHasAttribute(element, {
        type: "class",
        value: "field",
      });

      var fileNameContainer = fileContainer.getElementsByClassName("file-name")[0];
      fileNameContainer.innerHTML = filename;

      field.classList.add("is-grouped");

      var control = field.querySelector(".control.image-info");
      if (control) {
        control.remove();
      }
      control = document.createElement("div");
      control.setAttribute("class", "control image-info");
      var button = document.createElement("a");
      button.setAttribute("class", "button is-primary is-icon");
      button.innerHTML = '<span class="icon"><i class="fal fa-image"></i></span>';
      control.appendChild(button);
      field.appendChild(control);

      button.onclick = function () {
        shinobi.notification.image(element.getAttribute("image-url"));
      };
    }
  },
  renderRatioTable: function (cell, row, col, all) {
    shinobi.render.renderRatio(cell, cell.innerHTML, all[row]);
  },
  renderRatio: function (elem, value, all) {
    elem.innerHTML = value + "%";
  },
  renderPercent: function (elem, value, all) {
    elem.value = (Number(value) * 100) + "%";
  },
  getRatio: function (value, option) {
    return value.replace("%", "");
  },
  renderFullNameTable: function (cell, row, col, all) {
    shinobi.render.renderFullName(cell, cell.innerHTML, all[row]);
  },

  renderFullName: function (elem, value, all) {
    elem.innerHTML = all["lastname"] + " " + all["firstname"];
  },
  enumMapping: {
    SETTLE: "Hoàn tất",
    INPROCESS: "Đang xử lý",
    WAITING_FOR_CHEQUE: "Đợi thanh toán",
    EXPIRED: "Đã hết hạn",
    DELETED: "Đã xóa",
    ACCEPTED: "Chấp nhận",
    REJECTED: "Từ chối",
    WAITING_FOR_TRANFER: "Đang xử lý",
    CANCEL: "Đã hủy",
    WAITING_FOR_AUDIT: "Chờ xử lý",
    DEPOSIT: "Nạp tiền",
    DEPOSIT_DEAL: "Đơn nạp tiền",
    WITHDRAWAL: "Rút tiền",
    TRADING_DEAL: "Mua hàng",
    WINNING_LOTTERY: "Thắng cược",
    WITHDRAW: "Rút tiền",
    CANCEL_REQUEST: "Hủy yêu cầu",
    SEND_REQUEST: "Gửi yêu cầu",
    ACCEPTED_BY_ADMIN: "Admin đồng ý",
    MARK_AS_INPROCESS_BY_ADMIN: "Admin chuyển sang đang xử lý",
    REJECTED_BY_ADMIN: "Admin từ chối",
    MARK_AS_TRANFER_BY_ADMIN: "Admin chuyển sang chờ chuyển",
    WAITING_FOR_EMAIL_VERIFY: "Đợi xác nhận email",
  },

  enumMappingResultStatus: {
    NOT_YET: "Chưa đến lượt",
    ON_WAITING: "Chờ xổ",
    COMPLETE: "Đã xổ xong",
    IN_PROCESS: "Đang xổ",
  },

  enumMappingWithdrawalRequestActionType: {
    ADD_BY_ADMIN: "Admin nạp tiền",
    ACCEPTED_BY_ADMIN: "Đang xử lý",
    REJECTED_BY_ADMIN: "Từ chối",
    SEND_REQUEST: "Gửi yêu cầu",
    MARK_AS_TRANFER_BY_ADMIN: "Admin xác nhận hoàn tất",
    MARK_AS_INPROCESS_BY_ADMIN: "Admin chuyển qua đang xử lý",
    CANCEL_REQUEST: "Hủy yêu cầu",
  },

  enumMappingDepositRequestActionType: {
    ADD_BY_ADMIN: "Admin nạp tiền",
    ACCEPTED_BY_ADMIN: "Admin hoàn tất",
    REJECTED_BY_ADMIN: "Admin từ chối",
    SEND_REQUEST: "Gửi yêu cầu",
    MARK_AS_TRANFER_BY_ADMIN: "Admin xác nhận đã chuyển",
    MARK_AS_INPROCESS_BY_ADMIN: "Admin chuyển qua đang xử lý",
    CANCEL_REQUEST: "Hủy yêu cầu",
  },

  renderEnumActionWithdrawalDepositTable: function (cell, row, col, all) {
    shinobi.render.renderEnumActionWithdrawalDeposit(cell, cell.innerHTML, all[row]);
  },

  renderEnumActionWithdrawalDeposit: function (elem, value, all) {
    var enumList =
      all.actiontype == "DEPOSIT" || all.requesttype == "DEPOSIT"
        ? shinobi.render.enumMappingDepositRequestActionType
        : shinobi.render.enumMappingWithdrawalRequestActionType;
    var returnValue = enumList.hasOwnProperty(value) ? enumList[value] : value;
    elem.innerHTML = returnValue;
  },

  renderRandomColor: function (elem, value, all) {
    var list = ["white", "black", "light", "dark", "primary", "link", "info", "success", "warning", "danger"];
    var randomValue = list[Math.floor(Math.random() * list.length)];
    var attribute = elem.hasAttribute("snb-color-attribute")
      ? elem.getAttribute("snb-color-attribute")
      : "has-background-";
    elem.classList.add(attribute + randomValue);
  },

  renderLotteryResultStatus: function (elem, value, all) {
    var returnValue = shinobi.render.enumMappingResultStatus.hasOwnProperty(value)
      ? shinobi.render.enumMappingResultStatus[value]
      : value;
    elem.innerHTML = returnValue;
    if (value == "ON_WAITING") {
      elem.classList.add("has-text-primary");
    }
  },

  renderEnum: function (elem, value, all) {
    var returnValue = shinobi.render.enumMapping.hasOwnProperty(value) ? shinobi.render.enumMapping[value] : value;
    elem.innerHTML = returnValue;
  },

  renderEnumTable: function (cell, row, col, all) {
    shinobi.render.renderEnum(cell, cell.innerHTML);
  },

  removeFormatNumber: function (value, option) {
    var formatCharacter = shinobi.util.getFormatCharacters();
    var numberFormatCharacter = formatCharacter.numberFormatCharacter;
    return value.replace(new RegExp("\\" + numberFormatCharacter, "g"), "");
  },

  getBulmaCalendarValue: function (value, option) {
    var returnValue = {};
    if (value == "") {
      return value;
    } else {
      option["elem"].parentNode.classList.remove("has-border-danger");
      if (option["elem"].hasAttribute("data-is-range") && option["elem"].getAttribute("data-is-range") == "true") {
        var valueSplit = value.split("-");
        var optionDate = {
          format: "yyyy-MM-dd",
        };
        returnValue["beginDate"] = valueSplit[0] ? valueSplit[0].trim() : "";
        returnValue["endDate"] = valueSplit[1] ? valueSplit[1].trim() : "";

        return returnValue;
      }
      return value;
    }
  },

  getBulmaCalendarValueFormat: function (value, option) {
    var returnValue = value;
    if (value != "") {
      returnValue = shinobi.util.reverseFormatDate(value, {
        reverseFormat: "dd/MM/yyyy",
        format: "yyyy-MM-dd",
      });
    }
    return returnValue;
  },

  getFilterSelect: function (th, options) {
    var select = th.querySelector('select');
    console.log(select.value);
    return {
      colname: th.getAttribute('snb-colname'),
      operator: (select.value == '') ? 'like' : '=',
      value: select.value
    };
  },

  buildFilterSelect: function (th, options) {
    var listOption = JSON.parse(th.getAttribute('snb-filter-list-option'));
    if (th.querySelector('.table-filter')) {
      var preFilter = th.querySelector('.table-filter');
      preFilter.remove();
      options['tableObject'].reloadApi(1);
    } else {
      var container = document.createElement('div');
      container.setAttribute('class', 'field table-filter has-addons');
      container.innerHTML = `
        <div class="select is-small">
            <select></select>
        </div>
        `;
      var select = container.querySelector('select');
      select.onchange = function () {
        options['tableObject'].reloadApi(1);
      }

      listOption.forEach(function (item) {
        var option = document.createElement('option');
        option.setAttribute('value', item["value"]);
        option.innerHTML = item["name"];
        select.appendChild(option);
      });

      th.appendChild(container);
      select.value = '';
    }
  },

  renderFormatNumberTable: function (cell, row, col, all) {
    shinobi.render.renderFormatNumber(cell, cell.innerHTML, all);
  },

  renderUserBalance: function (elem, value, all) {
    shinobi.render.addLoading(elem);
    shinobi.cacheapi.request(shinobi.coreapi.bankAccountApi + "getAccountBalance", "{}", function (response) {
      var jsonArr = JSON.parse(response);
      elem.innerHTML = jsonArr.hasOwnProperty("currentcash")
        ? shinobi.util.formatNumber(jsonArr["currentcash"])
        : "Đang xử lý";
    });
  },

  getFileName: function (elem, value, all) {
    var linkFile = value;
    var linkFileSplit = linkFile.split("/");

    elem.innerHTML = linkFileSplit[linkFileSplit.length - 1];
  },

  renderDownloadFile: function (elem, value, all) {
    var linkFile = value;

    elem.setAttribute("href", value);

    setTimeout(function () {
      elem.focus();
    }, 200);

    elem.onclick = function () {
      var modalId = elem.getAttribute("modal-parent");

      var modal = document.getElementById(modalId);
      modal.classList.remove("is-active");
    };
  },

  addLoading: function (elem, value, all) {
    elem.innerHTML = '<a class="button is-small is-borderless is-paddingless is-icon is-transparent  is-loading"></a>';
  },

  renderTagInputValue: function (elem, value, all) {
    if (typeof shinobi.initbulma.tagsInput == "object") {
      shinobi.initbulma.tagsInput.forEach(function (item) {
        if (item["element"] == elem) {
          item.reset();
          item.input.setAttribute("style", "");
          item.element.value = "";
          var listOption = item.container.querySelectorAll("[data-tag]");

          for (var i = 0; i < listOption.length; i++) {
            listOption[i].remove();
          }
          var listTagValue = value.split(",");
          listTagValue.forEach(function (valueItem) {
            if (valueItem.trim() != "") {
              item.addTag(valueItem.trim());
            }
          });

          item.element.value = value;
        }
      });
    }
  },

  renderFormatDate: function (elem, value, all) {
    var format = elem.hasAttribute("snb-date-format") ? elem.getAttribute("snb-date-format") : "dd-MM-yyyy";
    elem.innerHTML = shinobi.util.getFormatDate(value, {
      format: format,
    });
  },

  renderFormatNumberFloat: function (elem, value, all) {
    var floatValue = Number.parseFloat(value);
    shinobi.render.renderFormatNumber(elem, floatValue, all);
  },

  renderFormatNumberInt: function (elem, value, all) {
    var intValue = Number.parseInt(value);
    shinobi.render.renderFormatNumber(elem, intValue, all);
  },

  renderTotalPrice: function (elem, value, all) {
    var total = all["quantity"] * all["price"];
    elem.innerHTML = shinobi.util.formatNumber(total);
  },
  renderChangeColor: function (elem, value, all) {
    if (Number(value) > 0 || value.trim().toString().startsWith('+')) {
      elem.style.color = 'rgb(0, 255, 0)';
    }

    if (Number(value) < 0 || value.trim().toString().startsWith('-')) {
      elem.style.color = 'rgb(255, 0, 0)';
    }
  },
  renderChangePercentColor: function (elem, value, all) {
    var number = Number(value.replace('%', ''));
    if (number > 0 || value.trim().toString().startsWith('+')) {
      elem.style.color = 'rgb(0, 255, 0)';
    }

    if (number < 0 || value.trim().toString().startsWith('-')) {
      elem.style.color = 'rgb(255, 0, 0)';
    }
  },
  renderChangeAvatarButton: function (elem, value, all) {
    shinobi.fileupload.registerElement(
      elem,
      "change",
      "uploadavatar",
      function () {
        return 0;
      },
      function (upfileResponse) {
        var jsonArr = upfileResponse;

        if (jsonArr.result == "success") {
          var url = jsonArr.content.url;

          var updateAvatarRequest = {};

          var avatarLink = url + "?" + new Date().getTime();

          updateAvatarRequest.avatarlink = avatarLink;

          shinobi.api.request(
            shinobi.coreapi.loggedUserApi + "updateAvatarLink",
            JSON.stringify(updateAvatarRequest),
            function (response) {
              if (response == "update success") {
                shinobi.notification.notification.info("Cập nhật thành công!");

                setTimeout(function () {
                  location.reload();
                }, 1000);
              }
            }
          );
        } else {
          shinobi.notification.notification.error("Xảy ra lỗi vui lòng thử lại!");

          return;
        }
      }
    );
  },
  renderGenderTable: function (cell, row, col, all) {
    shinobi.render.renderGender(cell, cell.innerHTML, all[row]);
  },
  renderGender: function (elem, value, all) {
    var returnValue;
    switch (value) {
      case "MR":
        returnValue = "Nam";
        break;
      case "MS":
        returnValue = "Nữ";
        break;
      default:
        returnValue = value;
        break;
    }
    elem.innerHTML = returnValue;
  },

  filterGender: function (value, option) {
    var returnValue;
    switch (value) {
      case "Nam":
        returnValue = "MR";
        break;
      case "Nữ":
        returnValue = "MS";
        break;
      default:
        returnValue = value;
        break;
    }
    return returnValue;
  },

  renderPhoneNumberWithPhoneReligion: function (elem, value, all) {
    elem.value = value;
    if (elem.hasAttribute("render-target") && all.hasOwnProperty("country")) {
      var target = elem.getAttribute("render-target");
      eval(target).setCountry(all["country"]);
    }
  },

  getNumberCleaveInput: function (value, option) {
    return shinobi.util.getValueNumberCleaveFormat(option.elem);
  },

  renderTextCenterTable: function (cell, row, col, all) {
    shinobi.render.renderTextCenterDatalist(cell, cell.innerHTML, all[row]);
  },

  renderTextCenterDatalist: function (elem, value, all) {
    elem.classList.add('has-text-centered');
  },
  renderTextLeftTable: function (cell, row, col, all) {
    shinobi.render.renderTextLeftDatalist(cell, cell.innerHTML, all[row]);
  },

  renderTextLeftDatalist: function (elem, value, all) {
    elem.classList.add('has-text-left');
  },
  renderTextRightTable: function (cell, row, col, all) {
    shinobi.render.renderTextRightDatalist(cell, cell.innerHTML, all[row]);
  },

  renderTextRightDatalist: function (elem, value, all) {
    elem.classList.add('has-text-right');
  },
};
