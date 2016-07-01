/**
 * @file melon Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TabsPanel');

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
