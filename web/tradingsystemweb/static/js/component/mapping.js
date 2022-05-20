/* usage: 
 * shinobi.mapping.render("body",json) 
 * shinobi.mapping.render("#elemid",json)
 * shinobi.mapping.render(".classname",json)
 * 
 * HTML:
 * <div snb-key="keyvalue"></div>
 * 
 *  */

shinobi.mapping = {
    'render': function (pattern, json) {
        var jsonArr = JSON.parse(json);

        var searchList = document.querySelectorAll(pattern);

        for (var index = 0; index < searchList.length; index++) {
            var search = searchList[index];

            shinobi.mapping.renderElement(search, jsonArr);
        }
    },
    'renderElement': function (search, jsonArr) {
        for (var elem in jsonArr) {
            var selectors = search.querySelectorAll("[snb-key=" + elem + "]");

            // check current node has snb-key=elem
            if (selectors.length == 0) {

                if (search.hasAttribute('snb-key')) {

                    if (search.getAttribute('snb-key') == elem) {

                        shinobi.mapping.renderSelector(search, jsonArr, elem);
                    }
                }
            }
            //

            for (var i = 0; i < selectors.length; i++) {
                shinobi.mapping.renderSelector(selectors[i], jsonArr, elem);
            }
        }
    },
    'renderSelector': function (selector, jsonArr, elem) {

        var nodeType = selector.nodeType;
        var value = jsonArr[elem];
        if (selector.hasAttribute("snb-render")) {
            var render = selector.getAttribute("snb-render");
            var option = {
                type: 'mapping',
            };
            eval(render)(selector, value, jsonArr);

            return;
        }

        // check formatter
        if (selector.hasAttribute("snb-format")) {
            var formatter = selector.getAttribute("snb-format");

            if ("number" === formatter) {
                var numberValue = Number(value);
                value = numberValue.format(0, 3, ',', '.');
            }

        }

        if (nodeType === 3) {
            selector.innerHTML = value;
        } else if (nodeType === 1) {

            // refactor 12/04/2020
            // check has render attribute

            if (selector.hasAttribute("snb-editor-index")) {
                if (typeof shinobiEditors == 'object') {
                    shinobiEditors[selector.getAttribute("snb-editor-index")]
                        .setData(value);
                } else {
                    if (typeof CKEDITOR == 'object' &&
                        selector.hasAttribute('id')) {
                        (CKEDITOR.instances.hasOwnProperty(selector.id)) ? CKEDITOR.instances[selector.id]
                            .setData(value) : console.log('elem has id' + selector.id +
                                ' has not been replace by CKEDITOR ');

                    } else {
                        console.log('CKEDITOR could not be declare');
                    }
                }

            } else {
                var attributes = selector.attributes;

                var isFound = false;
                for (var i = attributes.length - 1; i >= 0; i--) {
                    var attributeName = attributes[i].name;
                    var attributeValue = attributes[i].value;

                    var index = attributeName.search("snb-key-");
                    if (index >= 0) {
                        isFound = true;
                        var ref = attributeName.substring(8);

                        switch (ref) {
                            case 'value':
                                selector.value = jsonArr[attributeValue];
                                selector.setAttribute(ref, jsonArr[attributeValue]);
                                break;
                            case 'innerhtml':
                                selector.innerHTML = jsonArr[attributeValue];
                                break;
                            default:
                                selector.setAttribute(ref, jsonArr[attributeValue]);
                                break;
                        }
                    }
                }
                if (isFound === false) {

                    if (!['INPUT', 'SELECT', 'TEXTAREA']
                        .includes(selector.tagName)) {
                        selector.innerHTML = value;
                    } else {
                        value = shinobi.util.decodeValue(value);
                        switch (selector.tagName) {

                            case 'OPTION':
                                if (selector.hasAttribute("snb-key-innerhtml")) {
                                    selector.innerHTML = value;
                                }
                                break;
                            case 'INPUT':
                                switch (selector.type) {
                                    case 'checkbox':
                                        selector.checked = JSON.parse(value);
                                        break;
                                    case 'radio':
                                        if (value) {
                                            // var name = selector.getAttribute('name');
                                            // var checkedInput = document
                                            // 	.querySelector('input[type="radio"][name="'
                                            // 		+ name
                                            // 		+ '"][radio-value="'
                                            // 		+ value + '"]');
                                            // 		console.log(checkedInput);
                                            // if (checkedInput) {
                                            // 	checkedInput.checked = true;
                                            // }
                                            if (selector.hasAttribute('radio-value')) {
                                                (selector.getAttribute('radio-value') == value) ? selector.checked = true : selector.checked = false;
                                            }
                                        }
                                        break;
                                    default:
                                        selector.value = value;
                                        break;
                                }
                                break;
                            case 'SELECT':
                                selector.value = value;
                                break;

                            default:
                                selector.value = value;
                                break;
                        }
                    }
                }
            }

        }
    },
    'applySnbFormat': function (selector, value) {

    },
    getValue: function (selector, callback, option) {
        var elem = document.querySelector(selector);
        shinobi.mapping.getValueElement(elem, callback, option);
    },
    getValueElement: function (elem, callback, option) {
        var listSnb = elem.querySelectorAll('[snb-key]');
        var listRadioNameHasGetValue = [];
        var jsonMapping = {};
        listSnb
            .forEach(function (item) {

                var key = item.getAttribute('snb-key');

                if (item.hasAttribute('snb-editor-index')) {
                    jsonMapping[key] = shinobi.mapping
                        .getValueShinobiEditor(item, {
                            container: elem
                        });

                } else {
                    var getValueMappingNormalTagOption = {
                        container: elem,
                        listRadioNameHasGetValue: listRadioNameHasGetValue,
                    };
                    if (option && option.hasOwnProperty('getHtml') && option.getHtml) {
                        getValueMappingNormalTagOption.getHtml = true;
                    }
                    if (option && option.hasOwnProperty('getText') && option.getText) {
                        getValueMappingNormalTagOption.getText = true;
                    }
                    jsonMapping[key] = shinobi.mapping
                        .getValueMappingNormalTag(
                            item, getValueMappingNormalTagOption
                        )
                }

                shinobi.mapping.handleOptionMapping(item, jsonMapping,
                    option);
            });

        if (typeof callback == 'function') {
            callback(jsonMapping);
        }
    },

    handleOptionMapping: function (item, jsonMapping, option) {
        if (option) {
            var tagName = item.tagName;
            var key = item.getAttribute('snb-key');

            if (option.hasOwnProperty('checkEmpty')) {
                var isEmpty = (jsonMapping[key] == '') ? true : false;
                if (!item.classList.contains('disable-checkempty')) {


                    switch (tagName) {
                        case 'INPUT':
                        case 'TEXTAREA':
                            (isEmpty) ? item.classList.add('is-danger') : item.classList.remove('is-danger');
                            break;
                        case 'SELECT':
                            (isEmpty) ? item.parentElement.classList.add('is-danger') : item.parentElement.classList.remove('is-danger');
                            break;
                        default:
                            break;
                    }
                }

                if (item.hasAttribute('snb-editor-index')) {
                    var editorItem = CKEDITOR.instances[item.getAttribute('id')].container.$;
                    if (isEmpty) {
                        editorItem.classList.add('input');
                        editorItem.classList.add('is-danger');
                    } else {
                        editorItem.classList.remove('input');
                        editorItem.classList.remove('is-danger');
                    }

                }

                if (tagName == 'INPUT' && item.getAttribute('type') == 'file') {
                    var fileParentInput = shinobi.util.getParentElementHasAttribute(item, {
                        type: 'class',
                        value: 'file',
                    });



                    (isEmpty) ? fileParentInput.classList.add('is-danger') : fileParentInput.classList.remove('is-danger');
                }

                if (tagName == 'INPUT' && item.hasAttribute('snb-date-filter')) {
                    (isEmpty) ? item.parentElement.classList.add('has-border-danger') : item.parentElement.classList.remove('has-border-danger');
                }

            }
        }
    },

    getValueMappingNormalTag: function (item, option) {
        var returnValue;
        var listRadioNameHasGetValue = option['listRadioNameHasGetValue'];
        var tagName = item.tagName;
        switch (tagName) {
            case 'INPUT':
                var type = (item.hasAttribute('type')) ? item.getAttribute('type') :
                    'text';

                switch (type) {

                    case 'radio':
                        var name = item.getAttribute('name');
                        if (name) {
                            listRadioNameHasGetValue.push(name);
                            var checkedValue = document
                                .querySelector('input[type="radio"][name="' + name +
                                    '"]:checked');
                            returnValue = (checkedValue) ? checkedValue
                                .getAttribute('radio-value') : false;

                        } else {
                            returnValue = item.checked;
                        }
                        break;
                    case 'file':
                        returnValue = (item.hasAttribute('image-url')) ? item
                            .getAttribute('image-url') : item.value;
                        break;
                    case 'tags':
                        var tagInput = shinobi.util.getTagInputMappingElem(item);
                        if (tagInput) {
                            returnValue = tagInput.tags.toString();
                        }
                        break;
                    case 'checkbox':
                        returnValue = item.checked;
                        break;
                    case 'text':
                    default:
                        returnValue = item.value.trim();
                        break;
                }
                break;
            case 'SELECT':
            case 'TEXTAREA':
                returnValue = item.value.trim();
                break;
            default:

                if (option && option.hasOwnProperty('getHtml') && option.getHtml) {
                    returnValue = item.innerHTML.trim();
                }
                if (option && option.hasOwnProperty('getText') && option.getText) {
                    returnValue = item.innerText.trim();
                }
                break;
        }

        returnValue = shinobi.mapping.checkPreProcess(item, {
            container: option['container'],
            returnValue: returnValue,
        });

        return returnValue;
    },

    replaceFormWithLabel: function (selector) {
        shinobi.mapping.replaceFormWithLabelElement(document.querySelector(selector));
    },

    replaceFormWithLabelElement: function (elem) {
        var listSnb = elem.querySelectorAll('[snb-key]');
        for (var i = 0; i < listSnb.length; i++) {
            shinobi.mapping.replaceFormWithLabelSnbKey(listSnb[i]);
        }
    },

    replaceFormWithLabelSnbKey: function (item) {
        var tagName = item.tagName;
        var label = document.createElement('p');
        var value = item.value;
        label.setAttribute('class', 'is-italic');
        console.log(item);
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tagName)) {

            switch (tagName) {
                case 'SELECT':
                    var content = (item.selectedIndex > 0) ? item.options[item.selectedIndex].text : '';
                    label.innerHTML = content;
                    item.parentElement.parentElement.replaceChild(label, item.parentElement);
                    break;
                case 'TEXTAREA':
                case 'INPUT':
                default:
                    label.innerHTML = value;
                    item.parentElement.replaceChild(label, item);
                    break;

            }

        }
    },

    checkPreProcess: function (item, option) {
        var inputValue = option['returnValue'];
        var container = option['container'];
        var outputValue = inputValue;

        if (item.hasAttribute('snb-preprocess')) {
            outputValue = eval(item.getAttribute("snb-preprocess"))(inputValue, {
                elem: item,
                container: container,
            })
        }

        if (item.getAttribute("snb-datatype")) {
            var newValueWithDatatype = JSON.parse(outputValue);
            outputValue = (newValueWithDatatype) ? newValueWithDatatype :
                outputValue;
        }

        return outputValue;
    },

    getValueShinobiEditor: function (item, option) {
        var returnValue;
        if (typeof shinobiEditors == 'object') {
            returnValue = shinobiEditors[item.getAttribute("snb-editor-index")]
                .getData();
        } else {
            if (typeof CKEDITOR == 'object' && item.hasAttribute('id')) {
                returnValue = (CKEDITOR.instances.hasOwnProperty(item.id)) ? CKEDITOR.instances[item.id]
                    .getData() :
                    '';

            } else {
                returnValue = '';
            }
        }

        returnValue = shinobi.mapping.checkPreProcess(item, {
            container: option['container'],
            returnValue: returnValue,
        });

        return returnValue;
    },
    clear: function (selector, callback, option) {
        var elem = document.querySelector(selector);
        shinobi.mapping.clearElement(elem, callback, option);
    },

    clearElement: function (elem, callback, option) {
        var listSnb = elem.querySelectorAll('[snb-key]');
        listSnb.forEach(function (item) {
            var tagName = item.tagName;
            switch (tagName) {
                case 'INPUT':
                    var type = item.type;
                    switch (type) {
                        case 'checkbox':
                        case 'radio':
                            item.checked = false;
                            break;
                        case 'file':
                            (item.hasAttribute('image-url')) ? item
                                .removeAttribute('image-url') : item.value = '';
                            var name = item.parentElement.querySelector('.file-name');
                            if (name) {
                                name.innerHTML = '';
                            }
                            var parent = shinobi.util.getParentElementHasAttribute(item, {
                                type: 'class',
                                value: 'field'
                            })

                            if (parent) {
                                var info = parent.querySelector('.image-info');
                                if (info) {
                                    info.remove();
                                }
                            }
                            break;
                        case 'text':
                        default:
                            item.value = '';
                            break;
                    }
                    break;
                case 'SELECT':
                case 'TEXTAREA':
                    item.value = '';
                    break;
                default:
                    break;
            }

            var attributes = item.attributes;

            for (var i = attributes.length - 1; i >= 0; i--) {
                var attributeName = attributes[i].name;

                var index = attributeName.search("snb-key-");
                if (index >= 0) {
                    var ref = attributeName.substring(8);

                    switch (ref) {
                        case 'value':
                            item.value = '';
                            item.removeAttribute(ref);
                            break;
                        case 'innerhtml':
                            item.innerHTML = '';
                            break;
                        default:
                            item.removeAttribute(ref);
                            break;
                    }
                }
            }
        });

        if (typeof callback == 'function') {
            callback();
        }
    },
};