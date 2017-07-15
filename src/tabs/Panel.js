/**
 * @file melon Tabs Panel
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TabsPanel');

/**
 * melon/Tabs/TabPanel
 *
 * @class
 * @param {Object}  props        属性
 * @param {boolean} props.active 是否选中
 * @return {ReactElement}
 */
export default function TabsPanel(props) {

    /* eslint-disable fecs-min-vars-per-destructure */
    const {active, ...others} = props;

    return (
        <div {...others} className={cx(props).addStates({active}).build()} />
    );

}

TabsPanel.displayName = 'TabsPanel';

TabsPanel.propTypes = {
    active: PropTypes.bool
};

TabsPanel.defaultProps = {
    active: false
};
