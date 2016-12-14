(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.guid = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = guid;
  /**
   * @file guid
   * @author leon <ludafa@outlook.com>
   */

  function guid() {
    return (+(Math.random() + '').substr(2, 12)).toString(36);
  }
});
//# sourceMappingURL=guid.js.map
