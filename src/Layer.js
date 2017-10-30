/**
 * @file Layer
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import {createPortal} from 'react-dom';

const cx = create('Layer');

export default class Layer extends PureComponent {

    constructor(...args) {
        super(...args);
        this.onClickAway = this.onClickAway.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
    }

    componentDidMount() {
        let {open, useLayerMask} = this.props;
        if (open) {
            this.addGlobalEventListeners(useLayerMask);
        }
    }

    componentWillReceiveProps({open, useLayerMask}) {
        open
            ? this.addGlobalEventListeners(useLayerMask)
            : this.removeGlobalEventListeners(useLayerMask);
    }

    componentWillUnmount() {
        this.removeGlobalEventListeners(this.props.useLayerMask);
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    onClickAway(e) {
        let {target, defaultPrevented} = e;
        let {onClickAway, open} = this.props;
        if (defaultPrevented || !open || !this.container) {
            return;
        }
        if (!this.container.contains(target)) {
            onClickAway && onClickAway();
        }
    }

    onMaskClick(e) {
        if (e.target !== e.currentTarget) {
            return;
        }
        let {onClickAway} = this.props;
        if (onClickAway) {
            onClickAway(e);
        }
    }

    addGlobalEventListeners(useLayerMask) {
        if (!useLayerMask) {
            setTimeout(() => {
                window.addEventListener('click', this.onClickAway);
            }, 0);
        }
    }
    removeGlobalEventListeners(useLayerMask) {
        if (!useLayerMask) {
            window.removeEventListener('click', this.onClickAway);
        }
    }

    getLayer() {

        let {open, useLayerMask} = this.props;
        let container = this.container;

        if (!open || !container) {
            return null;
        }

        return useLayerMask ? container.firstChild : container;

    }

    getContainer() {
        let container = this.container;
        if (!container) {
            container = this.container = document.createElement('div');
            document.body.appendChild(container);
        }
        return container;
    }

    render() {
        let {open, children, useLayerMask} = this.props;
        return open
            ? createPortal(
                useLayerMask
                    ? (
                        <div
                            className="ui-layer-mask"
                            onClick={this.onMaskClick}>
                            {children}
                        </div>
                    )
                    : children,
                this.getContainer()
            )
            : null;
    }

}

Layer.propTypes = {
    onClickAway: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    useLayerMask: PropTypes.bool.isRequired
};

Layer.defaultProps = {
    open: false,
    useLayerMask: true
};
