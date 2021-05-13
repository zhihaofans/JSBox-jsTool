const JSDialogs = require("JSDialogs"),
  input = async (
    title,
    message,
    confirmText = undefined,
    cancelText = undefined
  ) => {
    return await JSDialogs.inputAlert({
      title: title,
      message: message,
      text: text,
      confirmText: confirmText,
      cancelText: cancelText
    });
  },
  login = async (
    title,
    message,
    confirmText = undefined,
    cancelText = undefined
  ) => {
    return await JSDialogs.loginAlert({
      title: title,
      message: message,
      placeholder1: "username",
      placeholder2: "password",
      confirmText: confirmText,
      cancelText: cancelText
    });
  },
  alert = async (
    title,
    message,
    confirmText = undefined,
    cancelText = undefined
  ) => {
    return await JSDialogs.plainAlert({
      title: title,
      message: message,
      confirmText: confirmText,
      cancelText: cancelText
    });
  };

module.exports = { input, login, alert };
