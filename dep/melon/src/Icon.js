/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const cx = require('./common/util/cxBuilder').create('Icon');

function Icon(props) {

    const {
        icon,
        ...rest
    } = props;

    return (
        <i {...rest} data-icon={icon} className={cx(props).build()}/>
    );
}


Icon.propTypes = {
    icon: React.PropTypes.string.isRequired
};

Icon.displayName = 'Icon';

module.exports = Icon;
