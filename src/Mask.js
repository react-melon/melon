/**
 * @file melon/Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import * as windowScrollHelper from './dialog/windowScrollHelper';

const cx = create('Mask');

export default class Mask extends Component {

    componentDidMount() {

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
        windowScrollHelper.stop();
    }

    unlockScroll() {
        windowScrollHelper.restore();
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
