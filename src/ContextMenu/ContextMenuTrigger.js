/**
 * @file ContextMenuTrigger
 * @author leon <ludafa@outlook.com>
 */


import {
    Component,
    PropTypes,
    cloneElement,
    Children
} from 'react';

import {findDOMNode} from 'react-dom';

export default class ContextMenuTrigger extends Component {

    constructor(...args) {
        super(...args);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

        let {children, menu} = this.props;
        let child = Children.only(children);
        let onClick = child.props.onClick;

        if (onClick) {
            onClick(e);
        }

        if (e.defaultPrevented) {
            return;
        }

        this.context.showContextMenu(findDOMNode(this), menu);

    }

    render() {

        return cloneElement(
            Children.only(this.props.children),
            {
                onClick: this.onClick
            }
        );

    }

}

ContextMenuTrigger.propTypes = {
    menu: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    mode: PropTypes.oneOf(['click', 'rightclick'])
};

ContextMenuTrigger.defaultProps = {
    mode: 'rightclick'
};

ContextMenuTrigger.contextTypes = {
    showContextMenu: PropTypes.func.isRequired
};
