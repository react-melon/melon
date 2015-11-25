/**
 * @file esui-react Tabs Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

const cx = require('../common/util/cxBuilder').create('Tab');

function Tab(props) {

    let {
        selected,
        disabled,
        label,
        ...others
    } = props;

    return (
        <li {...others} className={cx(props).addStates({selected, disabled}).build()}>
            {label}
        </li>
    );
}

module.exports = Tab;
