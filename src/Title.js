/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Title');

function Title(props) {

    const {
        level,
        ...rest
    } = props;

    return React.createElement(
        `h${level}`,
        {
            ...rest,
            className: cx(props).build()
        }
    );

}

Title.propsTypes = {
    level: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired
};

Title.defaultProps = {
    level: 1
};

module.exports = Title;
