/**
 * @file common/component/DrawerNav
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import Drawer from 'melon/Drawer';
import Title from 'melon/Title';

import ZippyNav from './ZippyNav';

const cx = require('melon/common/util/cxBuilder').create('DrawerNav');
const _ = require('underscore');
const navs = require('../conf/navs');


class DrawerNav extends React.Component {

    static displayName = 'DrawerNav';

    renderNavs() {

        const {current} = this.props;

        return _.map(
            navs,
            (nav, index) => {

                return (
                    <ZippyNav
                        current={current}
                        key={index}
                        nav={nav}
                        onActive={() => {
                            this.props.onHide();
                        }} />
                );
            },
            this
        );
    }

    render() {

        const {props} = this;

        return (
            <Drawer {...props} className={cx(props).build()}>
                <Title level={2}>Melon</Title>
                {this.renderNavs()}
            </Drawer>
        );
    }

}

export default DrawerNav;
