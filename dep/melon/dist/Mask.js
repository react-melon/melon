define('melon/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Mask');
    var PropTypes = React.PropTypes;
    var Mask = React.createClass({
        displayName: 'Mask',
        getInitialState: function () {
            this.originalBodyOverflow = '';
            return {};
        },
        propTypes: {
            autoLockScrolling: PropTypes.bool,
            show: PropTypes.bool
        },
        getDefaultProps: function () {
            return { autoLockScrolling: true };
        },
        componentDidMount: function () {
            this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
        },
        componentDidUpdate: function () {
            var _props = this.props;
            var autoLockScrolling = _props.autoLockScrolling;
            var show = _props.show;
            if (!autoLockScrolling) {
                return;
            }
            show ? this.preventScrolling() : this.allowScrolling();
        },
        componentWillUnmount: function () {
            this.allowScrolling();
        },
        preventScrolling: function () {
            var body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
        },
        allowScrolling: function () {
            var body = document.getElementsByTagName('body')[0];
            body.style.overflow = this.originalBodyOverflow || '';
        },
        render: function () {
            var props = this.props;
            var show = props.show;
            return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
        }
    });
    module.exports = Mask;
});