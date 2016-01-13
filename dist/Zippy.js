define('melon/Zippy', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-motion',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var cx = require('./common/util/cxBuilder').create('Zippy');
    var PropTypes = React.PropTypes;
    var Zippy = React.createClass({
        displayName: 'Zippy',
        propTypes: {
            size: PropTypes.number.isRequired,
            horizontal: PropTypes.bool,
            expand: PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                horizontal: false,
                expand: false
            };
        },
        getStyle: function (value) {
            var _babelHelpers$_extends;
            var _props = this.props;
            var horizontal = _props.horizontal;
            var style = _props.style;
            return babelHelpers._extends({}, style, (_babelHelpers$_extends = {}, _babelHelpers$_extends[horizontal ? 'overflowX' : 'overflowY'] = 'hidden', _babelHelpers$_extends[horizontal ? 'width' : 'height'] = Math.floor(value), _babelHelpers$_extends));
        },
        render: function () {
            var _this = this;
            var props = this.props;
            var expand = props.expand;
            var size = props.size;
            var children = props.children;
            var others = babelHelpers.objectWithoutProperties(props, [
                'expand',
                'size',
                'children'
            ]);
            var className = cx(props).addStates({ expand: expand }).build();
            return React.createElement(Motion, { style: { value: spring(expand ? size : 0) } }, function (_ref) {
                var value = _ref.value;
                return React.createElement('div', babelHelpers._extends({}, others, {
                    className: className,
                    style: _this.getStyle(value)
                }), children);
            });
        }
    });
    module.exports = Zippy;
});