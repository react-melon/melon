define('melon/dialog/DialogWindow', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var cx = require('../common/util/cxBuilder').create('DialogWindow');
    var DialogWindow = React.createClass({
        displayName: 'DialogWindow',
        propTypes: {
            top: PropTypes.number.isRequired,
            footer: PropTypes.element,
            title: PropTypes.element
        },
        shouldComponentUpdate: function (nextProps) {
            return nextProps.top !== this.props.top || nextProps.footer !== this.props.footer || nextProps.title !== this.props.title;
        },
        render: function () {
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
            return React.createElement('div', babelHelpers._extends({}, others, {
                style: {
                    transform: 'translate(0, ' + top + 'px)',
                    WebkitTransform: 'translate(0, ' + top + 'px)',
                    msTransform: 'translate(0, ' + top + 'px)',
                    MozTransform: 'translate(0, ' + top + 'px)'
                },
                className: cx(this.props).build()
            }), title, children, footer);
        }
    });
    module.exports = DialogWindow;
});