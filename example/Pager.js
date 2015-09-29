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
            page1: 1,
            page2: 1
        };
    },

    render: function () {
        return (
            <div>
                <Title level={3}>翻页器</Title>

                <Title level={5}>图标</Title>

                <Pager total={10} page={1} onChange={this.onChange.bind(this, 1)} />

                {this.getCurrentPage(1)}

                <Title level={5}>文字</Title>

                <Pager total={10} page={1} first={1} useLang onChange={this.onChange.bind(this, 2)} />

                {this.getCurrentPage(2)}

            </div>
        );
    },

    getCurrentPage: function (index) {
        return (
            <div>
                <label style={{lineHeight: '48px', marginLeft: 10}}>
                    当前的选择页码是：{this.state['page' + index]}
                </label>
            </div>
        );
    },

    onChange: function (index, e) {

        var state = {};

        state['page' + index] = e.page;

        this.setState(state);

    }

});

module.exports = View;
