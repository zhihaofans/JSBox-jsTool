//JSBoxDialogs: https://github.com/Gandum2077/jsbox-dialogs

let plainAlert = require("./JSBoxDialogs/dialogs/plainAlert"),
    inputAlert = require("./JSBoxDialogs/dialogs/inputAlert"),
    loginAlert = require("./JSBoxDialogs/dialogs/loginAlert"),
    textDialogs = require("./JSBoxDialogs/dialogs/textDialogs"),
    listDialogs = require("./JSBoxDialogs/dialogs/listDialogs"),
    editListDialogs = require("./JSBoxDialogs/dialogs/editListDialogs"),
    formDialogs = require("./JSBoxDialogs/dialogs/formDialogs"),
    Dialogs = {
        showPlainAlert: async (title, message) => {
            return await plainAlert({
                title: title,
                message: message
            });
        },
        showInputAlert: async (title, message = "", text = "") => {
            return await inputAlert({
                title: title,
                message: message,
                text: text,
            });
        },
        showLoginAlert: async (title) => {
            return await loginAlert({
                title: title
            });
        },
        showTextDialogs: async (title, message) => {
            return await textDialogs({
                title: title,
                message: message
            });
        },
        showListDialogs: async (title, items, values, multiSelectEnabled = true, editable = true) => {
            return await listDialogs({
                title: title,
                items: items,
                values: values,
                multiSelectEnabled: multiSelectEnabled,
                editable: editable
            });
        }
    };
module.exports = {
    plainAlert,
    inputAlert,
    loginAlert,
    textDialogs,
    listDialogs,
    editListDialogs,
    formDialogs,
    Dialogs
};