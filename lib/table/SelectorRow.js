(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Row', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Row'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Row, global.babelHelpers);
        global.SelectorRow = mod.exports;
    }
})(this, function (exports, _react, _Row2, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _Row3 = babelHelpers.interopRequireDefault(_Row2);

    var SelectorRow = function (_Row) {
        babelHelpers.inherits(SelectorRow, _Row);

        function SelectorRow() {
            babelHelpers.classCallCheck(this, SelectorRow);
            return babelHelpers.possibleConstructorReturn(this, _Row.apply(this, arguments));
        }

        SelectorRow.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

            if (nextProps.selected !== this.props.selected) {
                return true;
            }

            return _Row.prototype.shouldComponentUpdate.call(this, nextProps, nextState);
        };

        return SelectorRow;
    }(_Row3['default']);

    exports['default'] = SelectorRow;


    SelectorRow.propTypes = babelHelpers['extends']({}, _Row3['default'].propTypes, {
        selected: _react.PropTypes.bool.isRequired
    });

    SelectorRow.defaultProps = babelHelpers['extends']({}, _Row3['default'].defaultProps, {
        selected: false
    });
});
//# sourceMappingURL=SelectorRow.js.map
