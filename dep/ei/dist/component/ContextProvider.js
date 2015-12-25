define('ei/component/ContextProvider', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var ContextProvider = React.createClass({
        displayName: 'ContextProvider',
        getChildContext: function getChildContext() {
            return { ei: this.props.ei };
        },
        render: function render() {
            return this.props.children;
        }
    });
    var PropTypes = React.PropTypes;
    ContextProvider.childContextTypes = { ei: PropTypes.object.isRequired };
    ContextProvider.propTypes = { ei: React.PropTypes.object.isRequired };
    module.exports = ContextProvider;
});