/**
 * @file melon demo Pager
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title');
var Pager = require('../src/Pager');

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

                <Title level={5}>图标</Title>

                <Pager total={10} page={1} onChange={this.onChange} />

                {this.getCurrentPage()}

                <Title level={5}>文字</Title>

                <Pager total={10} page={1} useLang />

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
