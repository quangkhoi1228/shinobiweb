shinobi.ordercommandmodal = {
    build: function () {

    },

    openModalAddChildCommand: function () {
        shinobi.ordercommandmodal.activeModal("addChildOrderCommand");
    },

    ModifyModalAddChildCommand: function () {
        shinobi.ordercommandmodal.activeModal("modifyChildOrderCommand");
    },

    activeModal: function (selector) {
        var modal = document.getElementById(selector);
        modal.classList.add("is-active");
    }
};  