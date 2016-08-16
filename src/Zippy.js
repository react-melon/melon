/**
 * @file Zippy
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes} from 'react';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Zippy');


/**
 * melon/Zippy
 *
 * @extends {React.Component}
 * @class
 */
export default class Zippy extends React.Component {

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;

        const {
            expand,
            horizontal,
            ...others
        } = props;

        const className = cx(props)
            .addVariants(horizontal ? 'horizontal' : 'vertical')
            .addStates({close: !expand})
            .build();

        let style = this.props.style;

        if (!expand) {
            style = {
                ...style,
                [horizontal ? 'width' : 'height']: 0
            };
        }

        return (
            <div {...others} style={style} className={className} />
        );

    }

}

Zippy.displayName = 'Zippy';

Zippy.propTypes = {
    horizontal: PropTypes.bool,
    expand: PropTypes.bool
};

Zippy.defaultProps = {
    horizontal: false,
    expand: false
};
