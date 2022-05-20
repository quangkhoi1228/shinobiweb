shinobi.multivalueinput = (function() {
    var constructor = function(selector, options) {
        this.multivalueinput = "";
        this.input = "";
        this.inputSearch = "";
        this.selector = selector;
        this.idSearchInputTag = 'selectorInputSearch';
        this.result = [];
        this.updateInputValue = function() {
            var objectTaginput = this;
            objectTaginput.input.value = objectTaginput.result;
        };


        this.renderItem = function(result) {
            try {
                result = JSON.parse(result);
                return result;
            } catch (e) {
                return result;
            }

        };
        this.getListResult = '';

        this.setListResult = '';


        this.getResultValue = '';


        this.options = options;


        this.buildSearch = function(object) {
            shinobi.util.addEventEnter(object.inputSearch, function() {

                var returnInput = object.onSubmit(object.inputSearch.value.trim());

                object.appendChildItem(returnInput, object);
                object.inputSearch.value = '';
            });
        };

        this.onSubmit = function(result, object) {
            return result;
        };

        this.appendChildItem = function(result, objectTaginput) {

            if (result) {
                result = JSON.stringify(result);
                var indexResult = objectTaginput.result.indexOf(result);
                if (indexResult == -1) {

                    objectTaginput.result.push(result);
                    objectTaginput.updateInputValue();
                    objectTaginput.insertBeforeSearch(result, objectTaginput);

                }
            }
        };
        this.insertBeforeSearch = function(result, objectTaginput) {
            var children = document.createElement('div');
            children.classList.add('tag', 'is-3', 'is-medium');

            children.innerHTML = objectTaginput.renderItem(result);

            var buttonClose = document.createElement('button');
            buttonClose.classList.add('is-small', 'is-danger', 'delete', "has-background-danger", "has-text-white");
            buttonClose.addEventListener('click', function() {
                children.remove();
                var index = objectTaginput.result.indexOf(result);
                if (index > -1) {
                    objectTaginput.result.splice(index, 1);
                }
                objectTaginput.updateInputValue();
            });
            children.appendChild(buttonClose);

            var container = document.querySelector('#tagstaginput');
            var tagsearch = document.getElementById('tagsearch');

            container.insertBefore(children, tagsearch);
        };
        this.loadOptions = function() {
            var object = this;
            if (options.hasOwnProperty("buildSearch")) {
                object.buildSearch = options.buildSearch;
            }

            if (options.hasOwnProperty("onSubmit")) {
                object.onSubmit = options.onSubmit;
            }
            if (options.hasOwnProperty("renderItem")) {
                object.renderItem = options.renderItem;
            }
            if (options.hasOwnProperty("getListResult")) {
                object.getListResult = options.getListResult;
            }
            if (options.hasOwnProperty("setListResult")) {
                object.setListResult = options.setListResult;
            }
        };

        this.createStructure = function(callback) {
            var object = this;
            var oldtag = document.getElementById('tagstaginput');
            if (oldtag) {
                while (oldtag.firstChild.classList.contains('tag')) {
                    oldtag.firstChild.remove();
                }
            }

            // 
            object.input = document.querySelector(this.selector);
            object.input.classList.add('is-hidden');

            var elem = document.createElement('div');
            elem.style.padding = '1rem';
            elem.style.border = '1px solid #ddd';
            elem.style.borderRadius = '10px';
            elem.classList.add('box');
            //
            var tags = document.createElement('div');
            tags.setAttribute('class', 'tags is-multiline');
            tags.setAttribute('id', 'tagstaginput');
            //
            var node = document.createElement('div');
            node.setAttribute('class', 'is-5');
            node.setAttribute('id', 'tagsearch');
            //
            var children = document.createElement('input');
            children.setAttribute('class', 'input is-bordered');
            children.setAttribute('id', this.idSearchInputTag);
            //
            node.appendChild(children);
            tags.appendChild(node);
            elem.appendChild(tags);

            object.inputSearch = children;


            object.input.parentElement.replaceChild(elem, object.input);

            elem.insertBefore(object.input, elem.firstElementChild);
            elem.appendChild(object.input);
            //
            callback();
        };
        this.createObject = function() {
            var object = this;

            object.buildSearch(object);

            if (typeof object.setListResult === 'function') {

                var listItem = object.setListResult(object.input);

                listItem.forEach(result => {
                    object.appendChildItem(result, object);
                });

            }
            if (typeof object.getListResult === 'function') {

                getListResult(object.result);

            }
        };


        this.loadAll = function() {
            var object = this;
            this.loadOptions();
            this.createStructure(function() {
                object.createObject();
            });
        };

        this.loadAll();
    };

    // public static method
    constructor.staticmethod = {
        hello: function() {},
    };

    return constructor;
})();