/**
 * @file CenterBox
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';

const styles = {
    main: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto'
    }
};

/**
 * CenterBox
 *
 * @class
 * @param {*} props 属性
 */
export default function CenterBox(props) {

    let {
        direction,
        layout,
        width,
        height
    } = props;

    let style = {
        ...styles.main,
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        justifyContent: layout,
        width,
        height
    };

    return (
        <div style={style}>
            {props.children}
        </div>
    );

}

CenterBox.defaultProps = {
    layout: 'space-around',
    direction: 'vertical'
};

CenterBox.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    layout: PropTypes.oneOf(['space-around', 'space-between', 'center'])
};
