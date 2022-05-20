shinobi.autocomplete = (function () {
  var constructor = function (selector, options) {
    this.autoCompleteObject = "";
    this.input = "";
    this.selector = selector;
    this.onUpdate = function (results, selectedIndex) {
      console.log(`${results.length} results`);
      if (selectedIndex > -1) {
        console.log(`Selected: ${results[selectedIndex]}`);
      }
    };
    this.getResultValue = function (result) {
      // return result.name
    };
    this.autoSelect = true;
    // this.containerSelector = selector.replace('#', "").replace('.', "") + "autoComplete";
    this.containerSelector =
      "shinobiAutoComplete" + shinobi.util.sha256(selector);
    this.options = options;
    this.onSearch = function (input, resolve) {
      return [];
    };
    this.renderResult = function (result, props) {
      return `<li ${props}> ${JSON.stringify(result)}</li>`;
    };
    this.onSubmit = function (result, object) {
      object.autoCompleteObject.input.value = JSON.stringify(result);
    };
    this.loadOptions = function () {
      var object = this;
      if (options.hasOwnProperty("onSearch")) {
        object.onSearch = options.onSearch;
      }
      if (options.hasOwnProperty("renderResult")) {
        object.renderResult = options.renderResult;
      }
      if (options.hasOwnProperty("onSubmit")) {
        object.onSubmit = options.onSubmit;
      }
      if (options.hasOwnProperty("onUpdate")) {
        object.onUpdate = options.onUpdate;
      }
      if (options.hasOwnProperty("autoSelect")) {
        object.autoSelect = options.autoSelect;
      }
    };

    this.createObject = function () {
      var object = this;
      object.autoCompleteObject = new Autocomplete(
        "#" + object.containerSelector,
        {
          search: (input) => {
            if (input.trim() != "" || (options.hasOwnProperty('emptySearch') && options['emptySearch'])) {
              return new Promise((resolve) => {
                object.onSearch(input.trim(), resolve);
                // var request = {};
                // request.searchkey = input.trim();
                // shinobi.api.request(shinobi.coreapi.loggedUserApi + 'searchUser', JSON.stringify(request), function (re) {
                //     var arrJson = JSON.parse(re);
                //     var data = arrJson;
                //     resolve(data);
                // });
              });
            } else {
              return [];
            }
          },
          renderResult: function (result, props) {
            return object.renderResult(result, props);
          },
          onSubmit: function (result) {
            object.onSubmit(result, object);
          },
          autoSelect: object.autoSelect,
          onUpdate: function (results, selectedIndex) {
            object.onUpdate(results, selectedIndex, object);
          },
        }
      );
    };

    this.createStructure = function (callback) {
      var object = this;
      object.input = document.querySelector(this.selector);
      if (!object.input.parentElement.classList.contains("autocomplete")) {
        var container = document.createElement("div");
        container.setAttribute("class", "autocomplete");
        container.setAttribute("id", this.containerSelector);
        container.innerHTML = `<ul class="autocomplete-result-list"></ul>`;
        object.input.classList.add("autocomplete-input");
        object.input.setAttribute("autocomplete", "nope");
        object.input.setAttribute("autocorrect", "off");
        // object.input.setAttribute("name", object.containerSelector);
        object.input.value = "";
        object.input.parentElement.replaceChild(container, object.input);
        container.insertBefore(object.input, container.firstElementChild);
        container.appendChild(object.input);

        var formContainer = document.createElement("form");
        formContainer.setAttribute("autocomplete", "off");
        formContainer.setAttribute("onSubmit", "return false;");
        container.parentElement.replaceChild(formContainer, container);
        formContainer.appendChild(container);
      }
      callback();
    };
    this.loadAll = function () {
      var object = this;
      this.loadOptions();
      this.createStructure(function () {
        object.createObject();
      });
    };

    this.loadAll();
  };

  // public static method
  constructor.staticmethod = {
    hello: function () { },
  };

  return constructor;
})();
