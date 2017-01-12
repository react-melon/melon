/**
 * @file Layer
 * @author leon <ludafa@outlook.com>
 */

import {Component, PropTypes} from 'react';
import {
    unstable_renderSubtreeIntoContainer,
    unmountComponentAtNode
} from 'react-dom';

export default class Layer extends Component {

    constructor(...args) {
        super(...args);
        this.onClickAway = this.onClickAway.bind(this);
    }

    componentDidMount() {
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unmountLayer();
    }

    onClickAway(e) {

        let {target, defaultPrevented} = e;
        let {onClickAway, open} = this.props;
        let layer = this.layer;

        if (defaultPrevented || !open || !layer) {
            return;
        }

        if (target === layer || !layer.contains(target)) {
            onClickAway && onClickAway();
        }

    }

    renderLayer() {

        let {open, render, userLayerMask} = this.props;

        if (!open) {
            this.unmountLayer();
            return;
        }

        let layer = this.layer;

        if (!layer) {

            layer = this.layer = document.createElement('div');
            let classNames = ['ui-layer'];

            // 如果使用一个 div 作为遮罩，那么这里给 div 加 click 绑定
            if (userLayerMask) {
                layer.addEventListener('click', this.onClickAway);
                classNames.push('variant-mask');
            }
            // 否则我们给 window 加事件绑定
            else {
                setTimeout(() => {
                    window.addEventListener('click', this.onClickAway);
                }, 0);
            }

            layer.className = classNames.join(' ');

            document.body.appendChild(layer);
        }

        this.layerContent = unstable_renderSubtreeIntoContainer(
            this,
            render(),
            layer
        );

    }

    unmountLayer() {

        let layer = this.layer;

        if (!layer) {
            return;
        }

        layer.removeEventListener('click', this.onClickAway);
        window.removeEventListener('click', this.onClickAway);

        unmountComponentAtNode(layer);
        document.body.removeChild(layer);
        this.layer = null;

    }

    getLayer() {
        return this.layer;
    }

    render() {
        return null;
    }

}

Layer.propTypes = {
    onClickAway: PropTypes.func,
    open: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    useLayerMask: PropTypes.bool.isRequired
};

Layer.defaultProps = {
    open: false,
    useLayerMask: true
};
