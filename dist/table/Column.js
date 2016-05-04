/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', "../babelHelpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require("../babelHelpers"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.babelHelpers);
    global.Column = mod.exports;
  }
})(this, function (exports, _react, babelHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = TableColumn;

  /**
   * @file TableColumn
   * @author leon(ludafa@outlook.com)
   */

  function TableColumn(props) {
    return null;
  }

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
     * @type {[type]}
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