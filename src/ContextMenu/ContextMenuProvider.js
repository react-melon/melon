/**
 * @file ContextMenuProvider
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';

export default class ContextMenuProvider extends Component {

    constructor(...args) {
        super(...args);
        this.attechMenu = this.attechMenu.bind(this);
        this.detechMenu = this.detechMenu.bind(this);
        this.menuPool = {};
    }

    getChildContext() {

        let {attechMenu, detechMenu} = this;

        return {
            attechMenu,
            detechMenu
        };

    }

    attechMenu(id, menu) {
        this.menus[id] = menu;
    }

    detechMenu(id) {
        this.menus[id] = null;
    }

    render() {
        return this.props.children;
    }

}

ContextMenuProvider.propTypes = {
};

ContextMenuProvider.childContextTypes = {
    attechMenu: PropTypes.func.isRequired,
    detechMenu: PropTypes.func.isRequired
};
