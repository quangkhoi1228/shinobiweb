shinobi.userstatus = {
    userStatusMap: {},
    userStatusWidgets: {},
    updateUserStatusProcess: function (item) {
        var data = JSON.parse(item.data);
        Object.keys(data).forEach(function (key) {
            shinobi.userstatus.userStatusMap[key] = data[key];
            shinobi.userstatus.updateUserStatusWidgets(key);
        });
    },
    updateUserStatusWidgets: function (username) {
        if (shinobi.userstatus.userStatusWidgets.hasOwnProperty(username)) {
            shinobi.userstatus.userStatusWidgets[username].forEach(function (widget) {
                var color = shinobi.userstatus.getCurrentStatusColor(username);
                widget.classList.remove('has-text-success');
                widget.classList.remove('has-text-grey');
                widget.classList.add(color);
            })
        }
    },
    renderUserStatusTable: function (cell, row, col, all) {
        var value = cell.innerHTML;
        cell.innerHTML = '';
        shinobi.userstatus.renderUserStatus(cell, value, all[row]);
    },
    renderUserStatus: function (elem, value, all) {
        var username = value;
        if (shinobi.userstatus.userStatusMap.hasOwnProperty(username)) {
            shinobi.userstatus.renderUserStatusWidget(elem, username, all);
        } else {
            shinobi.api.request('/authenapi/UserOnlineStatusApi/getUserOnlineStatus', JSON.stringify({ "username": username }), function (response) {
                shinobi.userstatus.userStatusMap[username] = JSON.parse(response);
                shinobi.userstatus.renderUserStatusWidget(elem, username, all);
            })
        }
    },
    renderUserStatusWidget: function (elem, username, all) {
        var color = shinobi.userstatus.getCurrentStatusColor(username);
        elem.innerHTML = `
            <div class="user-status-container ${color}"><span class="icon"><i class="fa fa-circle"></i></span></div>
        `;
        if (!shinobi.userstatus.userStatusWidgets.hasOwnProperty(username)) {
            shinobi.userstatus.userStatusWidgets[username] = [];
        }
        shinobi.userstatus.userStatusWidgets[username].push(elem.querySelector('.user-status-container'));
    },
    getCurrentStatusColor: function (username) {
        var status = shinobi.userstatus.userStatusMap[username];
        var color = (status) ? 'has-text-success' : 'has-text-grey';
        return color;
    }
};