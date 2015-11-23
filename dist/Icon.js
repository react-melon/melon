define('melon/Icon', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Icon');
    function Icon(props) {
        var icon = props.icon;
        var rest = babelHelpers.objectWithoutProperties(props, ['icon']);
        return React.createElement('i', babelHelpers._extends({}, rest, {
            'data-icon': icon,
            className: cx(props).build()
        }));
    }
    Icon.propTypes = { icon: React.PropTypes.string.isRequired };
    module.exports = Icon;
});