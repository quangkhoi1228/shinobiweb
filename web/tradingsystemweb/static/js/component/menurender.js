shinobi.menurender = {

	'patern': '',
	'data': '',
	'container': '',
	'dangerStyle': 'color: rgb(241, 70, 104) !important;',

	'defaultIcon': 'iconpicker-icon-preview icon-menu',

	'build': function (patern, data, callback) {

		shinobi.menurender.patern = patern;

		shinobi.menurender.data = data;

		var container = document.querySelectorAll(patern)[0];

		shinobi.menurender.container = container;

		shinobi.menurender.render(container, data);

		if (typeof callback == 'function') {

			callback();
		}

	},

	'showAllMenu': function (patern) {

		var container = document.querySelectorAll(patern)[0];

		var arrowDown = container.getElementsByClassName('shinobi-arrow');

		for (var j = 0; j < arrowDown.length; j++) {

			arrowDown[j].classList.add('arrow-down');

			var hiddenElem = container.getElementsByClassName('is-hidden');

			for (var i = 0; i < hiddenElem.length; i++) {

				hiddenElem[i].classList.remove('is-hidden');
			}
		}

	},

	'render': function (container, data) {

		if (container) {

			container.classList.add('shinobimenu');

			var ul = document.createElement('ul');
			container.appendChild(ul);

			shinobi.menurender.addEventToggleSubMenu(ul);

			data.sort(function (a, b) {
				if (a.menucode.includes('_') && b.menucode.includes('_')) {
					return Number(a.menucode.split('_')[1]) - (b.menucode.split('_')[1]);
				} else {
					return 1;
				}
			});

			for (var i = 0; i < data.length; i++) {

				shinobi.menurender.buildBlockMenu(ul, data, i);

			}
		}

	},

	'addEventToggleSubMenu': function (ul) {

		if (ul.previousElementSibling) {

			var preElem = ul.previousElementSibling;

			var classList = preElem.getAttribute('class');

			if (classList.includes('has-submenu')) {

				ul.classList.add('is-hidden');
				ul.classList.toggle('ul-submenu');
				preElem.onclick = function () {

					ul.classList.toggle('is-hidden');

					var arrow = preElem.getElementsByClassName('shinobi-arrow')[0];
					arrow.classList.toggle('arrow-down');
				}

			}
		}
	},

	'buildBlockMenu': function (ul, data, index) {

		var currentData = data[index];

		var li = document.createElement('li');
		ul.appendChild(li);

		var div = document.createElement('div');
		div.setAttribute('class', 'shinobimenu-item');
		li.appendChild(div);

		var spanIcon = document.createElement('span');
		// spanIcon.setAttribute('class', 'icon');
		div.appendChild(spanIcon);

		var icon = document.createElement('i');
		icon.setAttribute('class', shinobi.menurender.defaultIcon);
		spanIcon.appendChild(icon);

		if (currentData.menuicon) {

			icon.setAttribute('class', currentData.menuicon);
		}

		var a = document.createElement('a');
		a.innerHTML = currentData.menuname;
		div.appendChild(a);

		if (currentData.menucode) {

			a.id = currentData.menucode;
		}

		if (currentData.menuurl) {

			a.href = shinobi.util.decodeValue(currentData.menuurl);
		}

		if (currentData.menudes) {

			a.title = currentData.menudes;
		}

		if (currentData.menuicon) {

			a.setAttribute('icon-class', currentData.menuicon);
		} else {

			a.setAttribute('icon-class', shinobi.menurender.defaultIcon);
		}

		if (currentData.menuchildren) {

			if (currentData.menuchildren.length != 0) {

				div.classList.add('has-submenu');

				shinobi.menurender.createArrowSpan(div);

				shinobi.menurender.render(li, currentData.menuchildren);
			}

		}

		if (currentData.hasOwnProperty('menudes')) {
			if (currentData.menudes.toLowerCase().includes('(nguy hiểm)') || currentData.menudes.toLowerCase().includes('(danger)')) {
				icon.setAttribute('style', shinobi.menurender.dangerStyle);
				a.setAttribute('style', shinobi.menurender.dangerStyle);
			}
		}
	},

	'createArrowSpan': function (div) {
		var arrowIconSpan = document.createElement('span');
		arrowIconSpan.setAttribute('class', 'is-right-align shinobi-arrow');
		div.appendChild(arrowIconSpan);

	}
};