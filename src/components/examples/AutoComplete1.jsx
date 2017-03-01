/**
 * @file Example / ColorPicker
 */


import React from 'react';
import AutoComplete from 'melon-autocomplete';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <AutoComplete
                    layerArchor='tl'
                    mainArchor='bl'
                    name="fruits"
                    floatingLabel="输入水果"
                    defaultValue=""
                    dataSource={['苹果', '橘子', '桃子']} />
            </div>
        </div>
    );
}

module.exports = View;
