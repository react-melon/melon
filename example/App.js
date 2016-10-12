/**
 * @file melon example main
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import Nav from './common/Nav';

export default class App extends Component {
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
