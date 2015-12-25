/**
 * @file melon/Validity
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const cx = require('./common/util/cxBuilder').create('Validity');

const Validity = React.createClass({

    displayName: 'Validity',

    render() {
        const {
            validity
        } = this.props;

        if (!validity) {
            return null;
        }

        const isValid = validity.isValid();
        const message = validity.getMessage();

        const statefulClassName = cx(this.props)
            .addStates({
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

});

const {PropTypes} = React;

Validity.propTypes = {
    validity: PropTypes.instanceOf(require('./validator/Validity'))
};

module.exports = Validity;
