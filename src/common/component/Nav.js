/**
 * @file common/component/Nav
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import Title from 'melon/Title';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
import DrawerNav from './DrawerNav';
import navs from '../conf/navs';

const cx = require('melon/common/util/cxBuilder').create('Nav');
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

        const {
            query,
            pathname
        } = this.props.location;

        let activeItem;

        const getItem = function (i, result, item) {

            if ((!query && pathname === item.pathname)
                || (query && query.name === item.text)) {
                item.title = item.title == null ? navs[i].text + ' - ' + item.text : item.title;
                return item;
            }

            return result;
        };

        for (let i = navs.length - 1; i >= 0; i--) {

            const items = navs[i].children;

            activeItem = _.reduce(items, getItem.bind(this, i), false);

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

                <a href="https://github.com/react-melon/melon">
                    <img
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            border: 0
                        }}
                        src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
                        alt="Fork me on GitHub"
                        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" />
                </a>
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
