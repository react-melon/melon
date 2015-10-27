define('melon/dialog/DialogWindow', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var _ = require('underscore');
    var DialogWindow = function (_Component) {
        babelHelpers.inherits(DialogWindow, _Component);
        function DialogWindow() {
            babelHelpers.classCallCheck(this, DialogWindow);
            babelHelpers.get(Object.getPrototypeOf(DialogWindow.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(DialogWindow, [
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return !_.isEqual(nextProps, this.props);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var children = _props.children;
                    var top = _props.top;
                    var title = _props.title;
                    var footer = _props.footer;
                    var others = babelHelpers.objectWithoutProperties(_props, [
                        'children',
                        'top',
                        'title',
                        'footer'
                    ]);
                    return React.createElement('div', babelHelpers._extends({}, others, { style: { marginTop: top } }), title, children, footer);
                }
            }
        ], [{
                key: 'displayName',
                value: 'DialogWindow',
                enumerable: true
            }]);
        return DialogWindow;
    }(Component);
    DialogWindow.propTypes = {
        top: React.PropTypes.number,
        footer: React.PropTypes.element,
        title: React.PropTypes.element
    };
    module.exports = DialogWindow;
});