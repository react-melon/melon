/**
 * @file DropDownMenu
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import Popover from './Popover';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('DropDownMenu');

export default class DropDownMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.state = {
            open: false
        };
    }

    onOpen() {
        this.setState({
            open: true
        });
    }

    onClose() {
        this.setState({
            open: false
        });
    }

    render() {

        let {
            label,
            children,
            maxHeight,
            style,
            anchorAlignment,
            layerAlignment,
            anchorOffset,
            layerOffset
        } = this.props;

        return (
            <div className={cx(this.props).build()}
                ref="main"
                style={style}
                onClick={this.onOpen}>
                {label}
                <Popover
                    autoWidth={true}
                    maxHeight={maxHeight}
                    open={this.state.open}
                    anchor={this.refs.main}
                    onRequestClose={this.onClose}
                    anchorOffset={anchorOffset}
                    layerOffset={layerOffset}
                    anchorAlignment={anchorAlignment}
                    layerAlignment={layerAlignment}>
                    <Menu onClose={this.onClose}>
                        {children}
                    </Menu>
                </Popover>
            </div>

        );

    }

}

DropDownMenu.propTypes = {
    label: PropTypes.element.isRequired,
    maxHeight: PropTypes.number
};
