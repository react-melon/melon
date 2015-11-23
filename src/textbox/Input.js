/**
 * @file TextBox/Input
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const createCXBuilder = require('../common/util/createClassNameBuilder');

const cxBuilder = createCXBuilder('TextboxInput');

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
                className: cxBuilder
                    .resolve(this.props)
                    .addState({
                        focus: isFocus
                    })
                    .addVariant('a', 'b', 'c')
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
