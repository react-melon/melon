define('melon/Title', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Title');
    function Title(props) {
        var level = props.level;
        var rest = babelHelpers.objectWithoutProperties(props, ['level']);
        return React.createElement('h' + level, babelHelpers._extends({}, rest, { className: cx(props).build() }));
    }
    Title.propsTypes = { level: React.PropTypes.number.isRequired };
    module.exports = Title;
});