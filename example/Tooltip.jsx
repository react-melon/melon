/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Tooltip = require('../src/Tooltip.jsx');
var Button = require('../src/Button.jsx');
var Icon = require('../src/Icon.jsx');

var View = React.createClass({

    render: function() {

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
                    <Button variants={['icon'] } size="xxl">
                        <Tooltip content="加粗">
                            <Icon icon="format-bold" />
                        </Tooltip>
                    </Button>
                    <Button variants={['icon'] } size="xxl">
                        <Tooltip content="倾斜">
                            <Icon icon="format-underlined" />
                        </Tooltip>
                    </Button>
                    <Button variants={['icon']} size="xxl">
                        <Tooltip content="下划线">
                            <Icon icon="format-italic" />
                        </Tooltip>
                    </Button>
                </div>
            </div>
        );
    }

});

module.exports = View;
