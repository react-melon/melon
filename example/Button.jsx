/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Button = require('../src/Button.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div>
                <Title level={3}>按钮</Title>

                <Title level={4}>预定义样式</Title>

                <div className="row">
                    <Button variants={['raised']}>default</Button>
                    <Button variants={['raised', 'primary']}>primary</Button>
                    <Button variants={['raised', 'secondery']}>secondery</Button>
                    <Button variants={['raised', 'success']}>success</Button>
                    <Button variants={['raised', 'info']}>info</Button>
                    <Button variants={['raised', 'warning']}>warning</Button>
                    <Button variants={['raised', 'danger']}>danger</Button>
                </div>

                <div className="row">
                    <Button>default</Button>
                    <Button variants={['primary']}>primary</Button>
                    <Button variants={['secondery']}>secondery</Button>
                    <Button variants={['success']}>success</Button>
                    <Button variants={['info']}>info</Button>
                    <Button variants={['warning']}>warning</Button>
                    <Button variants={['danger']}>danger</Button>
                </div>

                <Title level={4}>按钮大小</Title>

                <div className="row">

                    <Button variants={['raised', 'primary']} size="xs">xs</Button>
                    <Button variants={['raised', 'primary']} size="s">s</Button>
                    <Button variants={['raised', 'primary']} size="m">m</Button>
                    <Button variants={['raised', 'primary']} size="l">l</Button>
                    <Button variants={['raised', 'primary']} size="xl">xl</Button>
                    <Button variants={['raised', 'primary']} size="xxl">xxl</Button>
                    <Button variants={['raised', 'primary']} size="xxxl">xxxl</Button>

                </div>

                <Title level={4}>禁用按钮</Title>
                <Button disabled>disabled</Button>
                <Button variants={['raised']} disabled>disabled</Button>

                <Title level={4}>交互</Title>
                <Button
                    variants={['raised', 'primary']}
                    disabled={this.state.disabled}
                    onClick={this.onClick}>
                    {this.state.text}
                </Button>

                <Title level={4}>Grid</Title>

                <div className="row">
                    <Button variants={['raised', 'success']} style={{width: 100}}>
                        100px
                    </Button>
                </div>

                <div className="row">
                    <Button variants={['raised', 'info']} style={{width: 300}}>
                        300px
                    </Button>
                </div>

                <div className="row">
                    <Button variants={['raised', 'primary', 'fluid']}>
                        全宽
                    </Button>
                </div>

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
        );
    },

    getInitialState: function () {
        return {
            text: '赞我',
            count: 0,
            disabled: false
        };
    },

    onClick: function () {

        var text = this.state.text;
        var count = this.state.count + 1;

        var disabled = count === 5;

        this.setState({
            text: disabled ? '今天的5个赞集满啦，客官明天赶早来~' : '+' + (count),
            count: count,
            disabled: disabled
        });

    }

});

module.exports = View;
