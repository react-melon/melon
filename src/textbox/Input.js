/**
 * @file TextBox/Input
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('TextBoxInput');

const TextBoxInput = React.createClass({

    render() {

        const {
            multiline,
            className,
            rows,
            isFocus,
            ...rest
        } = this.props;

        const tag = multiline ? 'textarea' : 'input';

        return React.createElement(
            tag,
            {
                ...rest,
                className: cx(this.props)
                    .addStates({
                        focus: isFocus
                    })
                    .build(),
                rows: multiline ? rows : null
            }
        );

    }

});

TextBoxInput.defaultProps = {
    rows: 2
};

module.exports = TextBoxInput;
