(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
    global.Divider = mod.exports;
  }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
  'use strict';

  exports.__esModule = true;
  exports.default = Divider;

  var _react2 = babelHelpers.interopRequireDefault(_react);

  /**
   * @file Divider
   * @author leon <ludafa@outlook.com>
   */

  /* eslint-disable fecs-prefer-class */

  var cx = (0, _cxBuilder.create)('Divider');

  /**
   * Divider
   *
   * @class
   * @param {*} props 属性
   */
  function Divider(props) {
    return _react2['default'].createElement('hr', { className: cx(props).build(), style: props.style });
  }
});
//# sourceMappingURL=Divider.js.map
