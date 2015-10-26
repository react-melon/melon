/**
 * @file melon demo Progress
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title');
var Progress = require('../src/Progress');

var View = React.createClass({

    getInitialState: function () {
        return {
            value: 20
        };
    },

    componentDidMount: function () {
        var me = this;
        var value = me.state.value;
        me.timer = setTimeout(function tick() {
            value += 10;
            if (value < 100) {
                me.timer = setTimeout(tick, 800);
                me.setState({value: value});
            }
        }, 800);
    },

    componentWillUnmount() {
        clearTimeout(this.timer);
    },

    render: function() {
        return (
            <div>
                <Title level={3}>Progress</Title>

                <div className="row">
                    <Title level={4}>Linear</Title>
                    <Title level={5}>determinate</Title>
                    <Progress value={this.state.value} mode="determinate" />
                    <Title level={5}>indeterminate</Title>
                    <Progress mode="indeterminate" />
                </div>

                <div className="row">
                    <Title level={4}>Circle</Title>
                    <Title level={5}>determinate</Title>
                    <Progress value={this.state.value} mode="determinate" shape="circle" size="xxs" />
                    <Progress value={this.state.value} mode="determinate" shape="circle" size="xs" />
                    <Progress value={this.state.value} mode="determinate" shape="circle" />
                    <Progress value={this.state.value} mode="determinate" shape="circle" size="l" />
                    <Progress value={this.state.value} mode="determinate" shape="circle" size="xl" />
                    <Title level={5}>indeterminate</Title>
                    <Progress mode="indeterminate" shape="circle" size="xxl" />
                    <Progress mode="indeterminate" shape="circle" size="xxxl" />
                    <Progress mode="indeterminate" shape="circle" size="s" />
                </div>
            </div>
        );
    }

});

module.exports = View;
