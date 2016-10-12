(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '../babelHelpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('../babelHelpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.babelHelpers);
    global.Column = mod.exports;
  }
})(this, function (exports, _react, babelHelpers) {
  'use strict';

  exports.__esModule = true;

  var TableColumn = function (_Component) {
    babelHelpers.inherits(TableColumn, _Component);

    function TableColumn() {
      babelHelpers.classCallCheck(this, TableColumn);
      return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TableColumn.prototype.render = function render() {
      return null;
    };

    return TableColumn;
  }(_react.Component);

  exports['default'] = TableColumn;


  TableColumn.displayName = 'TableColumn';

  TableColumn.propTypes = {

    /**
     * 单元格式对齐方式
     *
     * @type {string}
     */
    align: _react.PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * 单元格渲染函数
     *
     * @type {function}
     */
    cellRenderer: _react.PropTypes.func,

    headerRenderer: _react.PropTypes.func,

    bodyRenderer: _react.PropTypes.func,

    /**
     * 单元格从行数据中取数据的键值
     *
     * 必须是string/number
     *
     * @type {(string|number)}
     */
    dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

    /**
     * 列的头部文本
     *
     * @type {string}
     */
    title: _react.PropTypes.string,

    /**
     * 单元格式宽度
     *
     * @type {number}
     */
    width: _react.PropTypes.number.isRequired
  };

  TableColumn.defaultProps = {
    align: 'left'
  };

  TableColumn._TABLE_COMPONENT_ = 'COLUMN';
});
//# sourceMappingURL=Column.js.map
