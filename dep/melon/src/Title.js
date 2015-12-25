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
    level: React.PropTypes.number.isRequired
};

module.exports = Title;
