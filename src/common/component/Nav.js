/**
 * @file common/component/Nav
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import Title from 'melon/Title';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import DrawerNav from './DrawerNav';

const cx = require('melon/common/util/cxBuilder').create('Nav');
const navs = require('../conf/navs');
const _ = require('underscore');

class Nav extends React.Component {

    static displayName = 'Nav';

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            open: true
        });
    }

    getCurrentPathConf() {

        const {pathname} = this.props.location;

        let activeItem;

        for (let i = navs.length - 1; i >= 0; i--) {
            let items = navs[i].children;

            activeItem = _.reduce(items, (result, item) => {
                if (pathname === item.pathname) {
                    item.title = item.title == null ? navs[i].text + ' - ' + item.text : item.title;
                    return item;
                }

                return result;
            }, false);

            if (activeItem) {
                return activeItem;
            }
        }

    }

    render() {

        const conf = this.getCurrentPathConf();

        const {pathname} = this.props.location;

        const variant = pathname.split('/')[1];

        return (
            <aside className={cx(this.props).addVariants(variant).build()}>
                {this.renderButton()}
                {this.renderTitle(conf)}
                {this.renderMenu(conf)}
            </aside>
        );
    }

    renderButton() {
        return (
            <Button size="xxl" onClick={this.onClick}>
                <Icon icon="dehaze" />
            </Button>
        );
    }

    renderTitle(conf) {

        if (!conf.title) {
            return null;
        }

        return (
            <Title level={2}>Melon - {conf.title}</Title>
        );
    }

    renderMenu(conf) {

        return (
            <DrawerNav
                open={this.state.open}
                current={conf}
                onHide={() => {
                    this.setState({
                        open: false
                    });
                }} />
        );

    }

}

export default Nav;
