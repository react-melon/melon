/**
 * @file melon demo Tabs
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Tab = require('../src/Tab.jsx');
var Tabs = require('../src/Tabs.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div>
                <Title level={3}>Tabs</Title>

                <Tabs initialSelectedIndex={1} style={{width: 500}} onBeforeChange={this.onBeforeChange}>
                    <Tab label="Tab A">This is Tab A</Tab>
                    <Tab label="Tab B">This is Tab B</Tab>
                    <Tab label="Tab C" />
                    <Tab label="被禁用的Tab" disabled />
                </Tabs>

            </div>
        );
    },


    onBeforeChange: function (index, e) {

        console.log('你选择了' + index);

    }

});

module.exports = View;
