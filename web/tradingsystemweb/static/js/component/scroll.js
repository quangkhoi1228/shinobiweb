shinobi.scroll = {
    defaultOption: {
        scrolldelay: 50,
        delayReScroll: 4000,
        delayStartScrollWhenReScroll: 2000,
        pauseOnHover: true
    },
    init: function (selector, option) {
        var elemList = document.querySelectorAll(selector);
        for (var i = 0; i < elemList.length; i++) {
            var elem = elemList[i];
            shinobi.scroll.initElement(elemList, i, option);
        }
    },
    initElement: function (elemList, i, option) {
        var elem = elemList[i];
        var newOption;
        if (!option) {
            newOption = JSON.parse(JSON.stringify(shinobi.scroll.defaultOption));
        } else {
            newOption = option;
        }

        shinobi.scroll.scrollProcess(elem, newOption);
    },

    scrollProcess: function (elem, option) {
        // shinobi.scroll.state = 'scroll';
        var currentScrollHeight = elem.scrollTop + elem.clientHeight;
        var scrollHeight = elem.scrollHeight;
        shinobi.scroll.clear(elem, option, function (afterOption) {
            shinobi.scroll.addEventHover(elem, afterOption);
            if (currentScrollHeight < scrollHeight) {
                afterOption.scrollInterval = setTimeout(function () {
                    elem.scrollBy(0, 1);
                    shinobi.scroll.scrollProcess(elem, afterOption);
                }, afterOption['scrolldelay']);

            } else {
                afterOption.reScrollInterval = setTimeout(function () {
                    elem.scrollTo(0, 0);
                    setTimeout(function () {
                        shinobi.scroll.scrollProcess(elem, afterOption);
                    }, afterOption['delayStartScrollWhenReScroll'])
                }, afterOption['delayReScroll']);

            }
        });

    },

    addEventHover: function (elem, option) {
        if (option.hasOwnProperty('pauseOnHover')) {
            if (option['pauseOnHover']) {
                elem.onmouseover = function () {
                    shinobi.scroll.clear(elem, option);
                }
                elem.onmouseout = function () {
                    shinobi.scroll.scrollProcess(elem, option);
                }
            }
        }
    },
    clear: function (elem, option, callback) {
        if (option.hasOwnProperty('scrollInterval')) {
            clearTimeout(option['scrollInterval']);
        }
        if (option.hasOwnProperty('reScrollInterval')) {
            clearTimeout(option['reScrollInterval']);
        }
        if (typeof callback == 'function') {
            callback(option);
        }
    },

};