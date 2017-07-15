/**
 * @file IconMenu
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Icon from './Icon';
import Menu from './Menu';
import Popover from './Popover';

export default class IconMenu extends Component {

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

        let {icon, children, style, maxHeight} = this.props;

        return (
            <div className="ui-icon-menu" ref="main" style={style}>
                <Button onClick={this.onOpen}>
                    <Icon icon={icon} />
                </Button>
                <Popover
                    autoWidth={true}
                    maxHeight={maxHeight}
                    open={this.state.open}
                    anchor={this.refs.main}
                    onRequestClose={this.onClose}>
                    <Menu onClose={this.onClose}>
                        {children}
                    </Menu>
                </Popover>
            </div>

        );

    }

}

IconMenu.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    children: PropTypes.arrayOf(PropTypes.element),
    maxHeight: PropTypes.number
};
