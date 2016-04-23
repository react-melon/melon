/**
 * @file common/component/DrawerNav
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import Drawer from 'melon/Drawer';
import Title from 'melon/Title';
import Link from 'melon/Link';

import ZippyNav from './ZippyNav';

import locator from '../../locator';
import navs from '../conf/navs';

const cx = require('melon/common/util/cxBuilder').create('DrawerNav');
const _ = require('underscore');


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
                <Link
                    href={locator.createHref('/')}
                    onClick={() => {
                        this.props.onHide();
                    }}>
                    <Title level={2}>Melon</Title>
                </Link>
                {this.renderNavs()}
            </Drawer>
        );
    }

}

export default DrawerNav;
