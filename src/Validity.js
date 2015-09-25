/**
 * @file melon/Validity
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component');

class Validity extends Component {

    shouldComponentUpdate(nextProps) {
        var props = this.props;
        return nextProps.isValid !== props.isValid || nextProps.message !== props.message;
    }

    render() {

        var props = this.props;

        return (
            <span className={this.getClassName()}>
                {props.message}
            </span>
        );

    }

    getStates(props) {

        var isValid = props.isValid;

        return {
            ...super.getStates(props),
            valid: isValid,
            invalid: !isValid
        };

    }

}

module.exports = Validity;
