/**
 * @file melon/Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
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
export default class Mask extends Component {

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
     * 是否更新组件
     *
     * @public
     * @override
     * @return {boolean}
     */
    shouldComponentUpdate({show}) {
        return this.props.show !== show;
    }

    /**
     * 更新时处理
     *
     * @public
     * @override
     */
    componentDidUpdate() {
        const {show, lockScrollingOnShow} = this.props;
        show && lockScrollingOnShow ? this.lockScroll() : this.unlockScroll();
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
        windowScrollHelper.stop();
    }

    /**
     * unlock scrolling
     *
     * @public
     */
    unlockScroll() {
        windowScrollHelper.restore();
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
            variants,
            states,
            ...rest
        } = this.props;

        const className = cx()
            .addVariants(variants)
            .addStates({
                ...states,
                show
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
