/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Breadcrumb from '../src/Breadcrumb';
import Icon from '../src/Icon';

class View extends React.Component {

    constructor() {
        super();
        this.state = {href: ''};
    }

    render() {

        const onClick = e => {
            e.preventDefault();
            this.setState({
                href: e.currentTarget.href
            });
        };

        return (
            <div>
                <Title level={4}>面包屑 / Breadcrumb</Title>
                <Title level={5}>文本</Title>
                <Breadcrumb>
                    <Breadcrumb.Item
                        onClick={onClick}
                        href="#/home">首页</Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={onClick}
                        href="#/application">应用中心</Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={onClick}
                        href="#/application/list">应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={onClick}>
                        我的应用</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={5}>带 Icon</Title>
                <Breadcrumb>
                    <Breadcrumb.Item d
                        onClick={onClick}
                        href="#/home">
                        <Icon icon="home" /> 首页
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={onClick}
                        href="#/application">
                        <Icon icon="apps" /> 应用中心
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={onClick}
                        href="#/application/list">
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
    }

}

module.exports = View;
