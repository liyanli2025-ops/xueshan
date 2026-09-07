(function (global) {
  "use strict";

  function closeCurrentPage() {
    var jsapi = global.QNJSAPI || global.qqnewsJSAPI;
    if (jsapi && typeof jsapi.closeWebview === "function") {
      try {
        jsapi.closeWebview();
        return;
      } catch (_) {}
    }

    if (global.WeixinJSBridge && typeof global.WeixinJSBridge.call === "function") {
      try {
        global.WeixinJSBridge.call("closeWindow");
        return;
      } catch (_) {}
    }

    try { global.close(); } catch (_) {}
    global.setTimeout(function () {
      if (document.hidden) return;
      if (global.history.length > 1) global.history.back();
    }, 260);
  }

  global.QQNewsUtils = Object.assign(global.QQNewsUtils || {}, {
    closeCurrentPage: closeCurrentPage
  });
})(window);
