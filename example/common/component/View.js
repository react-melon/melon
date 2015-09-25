/**
 * @file melon demo view
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Nav = require('./Nav');

var View = React.createClass({

    render: function() {

        console.log(this.props);

        return (
            <div id="app">
                <Nav components={this.props.components} />
                {this.props.children}
            </div>
        );
    }

});

module.exports = View;
