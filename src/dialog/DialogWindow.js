/**
 * @file melon/Dialog/DialogWindow
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('DialogWindow');

export default class DialogWindow extends PureComponent {

    constructor(...args) {
        super(...args);
        this.state = {
            mounted: false
        };
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({mounted: true});
        });
    }

    onTransitionEnd() {
        let {closing, onMotionEnd} = this.props;
        if (this.state.mounted && closing) {
            onMotionEnd();
        }
    }

    render() {

        let {
            children,
            title,
            footer,
            width,
            style,
            closing,
            /* eslint-disable no-unused-vars */
            onMotionEnd,
            /* eslint-enable no-unused-vars */
            ...others
        } = this.props;

        let animationStyle = this.state.mounted && !closing
            ? {
                transform: '',
                opacity: 1
            }
            : {
                transform: `translate(0, ${(closing ? 1 : -1) * Math.round(window.innerWidth / 2 * .4)}px)`,
                opacity: 0
            };

        return (
            <div
                {...others}
                style={{
                    ...style,
                    width: `${width}px`,
                    ...animationStyle
                }}
                className={cx(this.props).build()}
                onTransitionEnd={this.onTransitionEnd}>
                {title}{children}{footer}
            </div>
        );

    }

}

DialogWindow.propTypes = {
    footer: PropTypes.element,
    title: PropTypes.element
};
