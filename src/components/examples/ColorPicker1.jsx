/**
 * @file Example / ColorPicker
 */


import React from 'react';
import ColorPicker from 'melon-colorpicker';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <ColorPicker
                    name="rgbStr"
                    placeholder="请选择颜色"
                    defaultValue="#fff" />
            </div>
            <div className="melon-column melon-column-12" style={{marginTop: '1em'}}>
                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <ColorPicker
                            variants={['fluid']}
                            name="rgbStr"
                            placeholder="请选择颜色"
                            defaultValue="rgba(0, 0, 0, 0.4)" />
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = View;
