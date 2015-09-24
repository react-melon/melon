/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Breadcrumb = require('../src/Breadcrumb.jsx');
var Icon = require('../src/Icon.jsx');

var View = React.createClass({

    getInitialState() {
        return {
            href: ''
        };
    },

    render: function() {
        return (
            <div>
                <Title level={4}>面包屑 / Breadcrumb</Title>
                <Title level={5}>文本</Title>
                <Breadcrumb onClick={this.onClick}>
                    <Breadcrumb.Item href="#/home">首页</Breadcrumb.Item>
                    <Breadcrumb.Item href="#/application">应用中心</Breadcrumb.Item>
                    <Breadcrumb.Item href="#/application/list">应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item>我的应用</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={5}>带 Icon</Title>
                <Breadcrumb onClick={this.onClick}>
                    <Breadcrumb.Item href="#/home">
                        <Icon icon="home" /> 首页
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#/application">
                        <Icon icon="apps" /> 应用中心
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#/application/list">
                        <Icon icon="favorite-outline" />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
                <br />
                <br />
                {this.state.href}
            </div>
        );
    },

    onClick(e) {
        this.setState({
            href: e.currentTarget.href
        });
    }


});

module.exports = View;
