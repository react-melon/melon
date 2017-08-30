(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'melon-core/classname/cxBuilder', 'lodash/omit', './babelHelpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('lodash/omit'), require('./babelHelpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.cxBuilder, global.omit, global.babelHelpers);
    global.Link = mod.exports;
  }
})(this, function (exports, _react, _cxBuilder, _omit, babelHelpers) {
  'use strict';

  exports.__esModule = true;
  exports.default = Link;

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _omit2 = babelHelpers.interopRequireDefault(_omit);

  /**
   * @file melon/Link
   * @author leon(ludafa@outlook.com)
   */

  var cx = (0, _cxBuilder.create)('Link');

  /* eslint-disable fecs-prefer-class */

  /**
   * melon/Link
   *
   * @class
   * @param {Object} props     属性
   * @return {ReactElement}
   */
  function Link(props) {

    return _react2['default'].createElement('a', babelHelpers['extends']({}, (0, _omit2['default'])(props, ['variants', 'states']), { className: cx(props).build() }));
  }

  Link.displayName = 'Link';

  /* eslint-enable fecs-prefer-class */
});
//# sourceMappingURL=Link.js.map
