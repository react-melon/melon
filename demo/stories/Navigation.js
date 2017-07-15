/**
 * @file Navigation
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Navigation, {
    NavigationItem,
    NavigationHeader
} from '../../src/Navigation';
import Divider from '../../src/Divider';

let book = storiesOf('Navigation', module);

class NavigationDemo extends Component {

    constructor(...args) {

        super(...args);

        this.onHashChange = this.onHashChange.bind(this);

        let hash = location.hash.slice(1);
        this.state = {
            current: hash || '/index'
        };

    }

    componentDidMount() {
        window.addEventListener('hashchange', this.onHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChange);
    }

    onHashChange() {
        this.setState({
            current: location.hash.slice(1)
        });
    }

    isItemActive(name) {
        return this.state.current === name;
    }

    render() {
        return (
            <Navigation>
                <NavigationItem
                    active={this.isItemActive('/index')}
                    href="#/index"
                    label="Inbox"
                    leftIcon="move-to-inbox" />
                <NavigationItem
                    active={this.isItemActive('/starred')}
                    href="#/starred"
                    label="Starred"
                    leftIcon="star"/>
                <NavigationItem
                    active={this.isItemActive('/send-mail')}
                    href="#/send-mail"
                    label="Sent mail"
                     leftIcon="send" />
                <NavigationItem
                    href="#/draft"
                    label="Draft"
                    leftIcon="drafts" />
                <Divider />
                <NavigationHeader>Subheader</NavigationHeader>
                <NavigationItem
                    active={this.isItemActive('/all-mail')}
                    href="#/all-mail"
                    label="All mail"
                     leftIcon="mail" />
                <NavigationItem
                    active={this.isItemActive('/blog')}
                    href="#/blog"
                    label="Trash"
                    leftIcon="delete" />
                <NavigationItem
                    active={this.isItemActive('/about')}
                    href="#/about"
                    label="Spam"
                    leftIcon="info" />
            </Navigation>
        );
    }

}

book.add('导航', () => (
    <div style={{width: 300, border: '1px solid #eee'}}>
        <NavigationDemo />
    </div>
));

book.add('嵌套导航', () => (
    <div style={{width: 300, border: '1px solid #eee'}}>
        <Navigation>
            <Navigation label="世界">
                <NavigationItem
                    label="非洲"
                    onClick={action('非洲')}/>
                <NavigationItem
                    label="美洲"
                    onClick={action('美洲')}/>
                <NavigationItem
                    label="亚洲"
                    onClick={action('亚洲')}/>
                <NavigationItem
                    label="欧洲"
                    onClick={action('欧洲')}/>
            </Navigation>
            <Navigation label="中国">
                <Navigation label="一线城市">
                    <NavigationItem
                        label="北京"
                        onClick={action('北京')}/>
                    <NavigationItem
                        label="上海"
                        onClick={action('上海')}/>
                    <NavigationItem
                        label="广州"
                        onClick={action('广州')}/>
                    <NavigationItem
                        label="深圳"
                        onClick={action('广州')} />
                </Navigation>
                <Navigation label="二线城市">
                    <NavigationItem
                        label="南京"
                        onClick={action('南京')}/>
                    <NavigationItem
                        label="杭州"
                        onClick={action('杭州')}/>
                    <NavigationItem
                        label="..."
                        onClick={action('...')}/>
                </Navigation>
            </Navigation>
            <NavigationItem
                label="大洋洲"
                onClick={action('大洋洲')}/>
            <NavigationItem
                label="南极洲"
                onClick={action('南极洲')}/>
        </Navigation>
    </div>
));
