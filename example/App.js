/**
 * @file melon example main
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Nav from './common/Nav';

class App extends React.Component {
    render() {
        const {components, name, Component} = this.props;
        return (
            <div>
                <Nav components={components} component={name}/>
                {this.renderContent(Component)}
            </div>
        );
    }
    renderContent(Component) {
        return Component
            ? React.createElement(Component)
            : '加载中~';
    }
}

module.exports = App;
