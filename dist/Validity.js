define('melon/Validity', [
    'require',
    'exports',
    'module',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var cxBuilder = require('./common/util/cxBuilder').create('Validity');
    function Validity(props) {
        var isValid = props.isValid;
        var message = props.message;
        var statefulClassName = cxBuilder.resolve(props).addState({
            valid: isValid,
            invalid: !isValid
        }).build();
        return React.createElement('div', { className: statefulClassName }, message);
    }
    var PropTypes = React.PropTypes;
    Validity.propTypes = {
        isValid: PropTypes.bool.isRequired,
        message: PropTypes.string
    };
    module.exports = Validity;
});