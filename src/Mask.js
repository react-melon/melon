/**
 * @file melon/Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import * as windowScrollHelper from './dialog/windowScrollHelper';
import omit from 'lodash/omit';

const cx = create('Mask');

/**
 * melon/Pager
 *
 * @extends {React.Component}
 * @class
 */
export default class Mask extends PureComponent {

    locked = false;

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {
        const {show, lockScrollingOnShow} = this.props;
        if (show && lockScrollingOnShow) {
            this.lockScroll();
        }
    }

    /**
     * unmount时处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {
        this.unlockScroll();
    }

    /**
     * lock scrolling
     *
     * @public
     */
    lockScroll() {
        if (!this.locked) {
            windowScrollHelper.stop();
            this.locked = true;
        }
    }

    /**
     * unlock scrolling
     *
     * @public
     */
    unlockScroll() {
        if (this.locked) {
            windowScrollHelper.restore();
        }
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            show,
            closing,
            variants,
            states,
            ...rest
        } = this.props;

        const className = cx()
            .addVariants(variants)
            .addStates({
                ...states,
                show,
                closing
            })
            .build();

        return (
            <div
                {...omit(rest, 'lockScrollingOnShow')}
                className={className} />
        );

    }

}

Mask.defaultProps = {
    lockScrollingOnShow: true,
    show: false
};


Mask.propTypes = {
    lockScrollingOnShow: PropTypes.bool,
    show: PropTypes.bool
};
