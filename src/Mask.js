/**
 * @file melon/Mask
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import {create} from './common/util/cxBuilder';

const cx = create('Mask');

export default class Mask extends Component {

    componentDidMount() {

        this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;

        const {show, lockScrollingOnShow} = this.props;

        if (show && lockScrollingOnShow) {
            this.lockScroll();
        }

    }

    shouldComponentUpdate({show}) {
        return this.props.show !== show;
    }

    componentDidUpdate() {
        const {show, lockScrollingOnShow} = this.props;
        show && lockScrollingOnShow ? this.lockScroll() : this.unlockScroll();
    }

    componentWillUnmount() {
        this.unlockScroll();
    }

    lockScroll() {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    }

    unlockScroll() {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = this.originalBodyOverflow || '';
    }

    render() {

        const {props} = this;
        const {show} = props;

        return (
            <div {...props} className={cx(props).addStates({show}).build()} />
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
