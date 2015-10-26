define('melon/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Mask = function (_Component) {
        babelHelpers.inherits(Mask, _Component);
        babelHelpers.createClass(Mask, null, [{
                key: 'displayName',
                value: 'Mask',
                enumerable: true
            }]);
        function Mask(props) {
            babelHelpers.classCallCheck(this, Mask);
            babelHelpers.get(Object.getPrototypeOf(Mask.prototype), 'constructor', this).call(this, props);
            this.originalBodyOverflow = '';
        }
        babelHelpers.createClass(Mask, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    if (!this.props.autoLockScrolling) {
                        return;
                    }
                    this.props.show ? this.preventScrolling() : this.allowScrolling();
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.allowScrolling();
                }
            },
            {
                key: 'preventScrolling',
                value: function preventScrolling() {
                    var body = document.getElementsByTagName('body')[0];
                    body.style.overflow = 'hidden';
                }
            },
            {
                key: 'allowScrolling',
                value: function allowScrolling() {
                    var body = document.getElementsByTagName('body')[0];
                    body.style.overflow = this.originalBodyOverflow || '';
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(Mask.prototype), 'getStates', this).call(this, props);
                    states.show = !!props.show;
                    return states;
                }
            },
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', babelHelpers._extends({}, this.props, { className: this.getClassName() }));
                }
            }
        ]);
        return Mask;
    }(Component);
    var PropTypes = React.PropTypes;
    Mask.propTypes = {
        autoLockScrolling: PropTypes.bool,
        show: PropTypes.bool
    };
    Mask.defaultProps = babelHelpers._extends({}, Component.defaultProps, { autoLockScrolling: true });
    module.exports = Mask;
});