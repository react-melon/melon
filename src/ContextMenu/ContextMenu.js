/**
 * @file ContextMenu
 * @author leon <ludafa@outlook.com>
 */
import React, {Component, PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('ContextMenu');

export default class ContextMenu extends Component {

    render() {

        let className = cx(this.props).build();

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );

    }

}

ContextMenu.propTypes = {
    id: PropTypes.string.isRequired
};
