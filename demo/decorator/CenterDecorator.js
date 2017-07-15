/**
 * @file 居中
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';

const styles = {
    main: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

/**
 * CenterDecorator
 *
 * @class
 * @param {Object} story story
 */
export default function CenterDecorator(story) {
    return (
        <div style={styles.main}>
            {story()}
        </div>
    );
}
