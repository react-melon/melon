/**
 * @file metaform
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const ReactDOM = require('react-dom');
const Button = require('melon/Button');
const Icon = require('melon/Icon');
const Breadcrumb = require('melon/Breadcrumb');
const Title = require('melon/Title');
const Link = require('melon/Link');

ReactDOM.render(
    <div>
        <Title level={3}>button</Title>
        <Button size="xs">hehe</Button>
        <Button>hehe</Button>
        <Title level={3}>icon</Title>
        <Icon icon="person" />
        <Breadcrumb>
            <Breadcrumb.Item href="#/home">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="#/application">应用中心</Breadcrumb.Item>
            <Breadcrumb.Item href="#/application/list">应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>我的应用</Breadcrumb.Item>
        </Breadcrumb>
        <Title level={1}>level 1 haha</Title>
        <Link href="#/a-link"> a link</Link>
        <Title level={2}>level 2 haha</Title>
        <Title level={3}>level 3 haha</Title>
        <Title level={4}>level 4 haha</Title>
        <Title level={5}>level 5 haha</Title>
        <Title level={6}>level 6 haha</Title>
    </div>,
    document.querySelector('#app')
);
