/**
 * @file melon/Tooltip
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import dom from './common/util/dom';
import {create} from './common/util/cxBuilder';

const cx = create('Tooltip');

export default class Tooltip extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.state = {
            isShown: false
        };

    }

    componentDidMount() {
        const popup = this.popup = Tooltip.createPopup();
        this.renderPopup(popup, this.props.content);
    }

    componentWillUnmount() {
        Tooltip.destroyPopup(this.popup);
        this.popup = null;
    }

    componentDidUpdate() {
        this.renderPopup(this.popup, this.props.content);
    }

    onClick(e) {
        this.toggle();
    }

    onMouseEnter(e) {
        this.show();
    }

    onMouseLeave(e) {
        this.hide();
    }

    isShown() {
        return this.state.isShown;
    }

    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    show() {
        this.setState({isShown: true});
    }

    hide() {
        this.setState({isShown: false});
    }

    getPosition() {

        const {main} = this;

        if (!this.isShown() || !main) {
            return {
                left: -10000,
                top: 0,
                opacity: 0,
                width: 'auto',
                height: 'auto'
            };
        }

        const props = this.props;

        const {
            direction,
            offsetX,
            offsetY
        } = props;

        const popup = this.popup.childNodes[0];

        const position = dom.getPosition(main);

        const {offsetWidth, offsetHeight} = popup;

        let styles = {
            opacity: 1
        };

        switch (direction) {
            case 'top':
                styles.left = position.left + (position.width - offsetWidth) / 2;
                styles.top = position.top - offsetHeight - offsetY;
                break;
            case 'bottom':
                styles.left = (position.width - offsetWidth) / 2 + position.left;
                styles.top = position.top + position.height + offsetY;
                break;
            case 'left':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left - offsetWidth - offsetY;
                break;
            case 'right':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left + position.width + offsetX;
                break;
        }

        return styles;
    }

    renderPopup(target, content) {

        ReactDOM.render(
            <div
                className={cx().part('popup').build()}
                style={this.getPosition()}>
                {content}
            </div>,
            target
        );

    }

    render() {

        const props = this.props;

        const {
            mode,
            children,
            direction
        } = props;

        const onClick = mode === 'click' ? this.onClick : null;
        const onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
        const onMouseLeave = mode === 'over' ? this.onMouseLeave : null;

        return (
            <div {...props}
                ref={main => {
                    if (main) {
                        this.main = main;
                    }
                }}
                className={cx(props).addStates({direction}).build()}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </div>
        );
    }

}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
    arrow: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    mode: PropTypes.oneOf(['over', 'click'])
};

Tooltip.defaultProps = {
    arrow: true,
    direction: 'bottom',
    mode: 'over',
    offsetX: 14,
    offsetY: 14
};

(function () {

    let container;

    Tooltip.createPopup = function () {

        if (!container) {
            container = document.createElement('div');
            container.className = cx().part('container').build();
            document.body.appendChild(container);
        }

        const popup = document.createElement('div');

        container.appendChild(popup);

        return popup;

    };

    Tooltip.destroyPopup = function (popup) {
        container.removeChild(popup);
    };

})();
