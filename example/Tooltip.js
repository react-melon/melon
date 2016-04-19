/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Tooltip from '../src/Tooltip';
import Button from '../src/Button';
import Icon from '../src/Icon';

class View extends React.Component {

    render() {

        return (
            <div>
                <Title level={3}>Switches</Title>
                <Tooltip content="这是一个 tooltip 呢">
                    <Button variants={['raised', 'primary']}>哟吼吼</Button>
                </Tooltip>
                <Title level={3}>方向</Title>
                <Tooltip content="上方哟" direction="top">
                    <Button variants={['raised', 'primary']}>上方</Button>
                </Tooltip>
                <Tooltip content="下方哟吼" direction="bottom">
                    <Button variants={['raised', 'primary']}>下方</Button>
                </Tooltip>
                <Tooltip content="左侧哟吼吼" direction="left">
                    <Button variants={['raised', 'primary']}>左侧</Button>
                </Tooltip>
                <Tooltip content="右侧哟吼吼哟" direction="right">
                    <Button variants={['raised', 'primary']}>右侧</Button>
                </Tooltip>
                <Title level={5}>按钮组</Title>
                <div className="ui-buttongroup">
                    <Tooltip content="加粗">
                        <Button variants={['icon']} size="xxl">
                            <Icon icon="format-bold" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="倾斜">
                        <Button variants={['icon']} size="xxl">
                            <Icon icon="format-underlined" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="下划线">
                        <Button variants={['icon']} size="xxl">
                            <Icon icon="format-italic" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    }

}

module.exports = View;
