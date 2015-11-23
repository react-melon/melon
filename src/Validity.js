/**
 * @file melon/Validity
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const cxBuilder = require('./common/util/cxBuilder').create('Validity');

function Validity(props) {

    const {
        isValid,
        message
    } = props;

    const statefulClassName = cxBuilder
        .resolve(props)
        .addState({
            valid: isValid,
            invalid: !isValid
        })
        .build();

    return (
        <div className={statefulClassName}>
            {message}
        </div>
    );

}

const {PropTypes} = React;

Validity.propTypes = {
    isValid: PropTypes.bool.isRequired,
    message: PropTypes.string
};

module.exports = Validity;
