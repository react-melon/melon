/**
 * @file Example / ButtonGroup
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import Button from 'melon/Button';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <div className="ui-buttongroup">
                    <Button variants={['raised', 'info']}>
                        添加
                    </Button>
                    <Button variants={['raised', 'info']}>
                        删除
                    </Button>
                    <Button variants={['raised', 'info']}>
                        启用
                    </Button>
                </div>
            </div>
        </div>
    );
}

module.exports = View;
