/**
 * @file melon demo Pager
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Pager = require('../src/Pager.jsx');

var View = React.createClass({

    getInitialState: function () {
        return {
            page: ''
        };
    },

    render: function() {
        return (
            <div>
                <Title level={3}>翻页器</Title>

                <Pager total={10} page={1} onChange={this.onChange} />

                {this.getCurrentPage()}

            </div>
        );
    },

    getCurrentPage: function () {
        return this.state.page
            ? <label style={{lineHeight: '48px', marginLeft: 10}}>当前的选择页码是：{this.state.page + 1}</label>
            : null;
    },


    onChange: function (e) {

        this.setState({
            page: e.page
        });

    }

});

module.exports = View;
