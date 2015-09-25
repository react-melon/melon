/**
 * @file melon example main
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Nav = require('./common/Nav');

class App extends React.Component {
    render() {
        var {components, name, Component} = this.props;
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
