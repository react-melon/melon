/**
 * @file melon demo Progress Linear
 * @author cxtom(cxtom2008@gmail.com)
 */

const React = require('react');

const Title = require('melon/Title');
const Progress = require('melon/Progress');

require('../code/ProgressCircle.txt');

const View = React.createClass({

    getInitialState() {
        return {
            value: 20
        };
    },

    componentDidMount() {
        var me = this;
        var value = me.state.value;
        me.timer = setTimeout(function tick() {
            value += 10;
            me.setState({value: value});
            if (value < 100) {
                me.timer = setTimeout(tick, 800);
            }
        }, 800);
    },

    componentWillUnmount() {
        clearTimeout(this.timer);
    },

    render() {
        return (
            <div>
                <Title level={4}>determinate</Title>
                <Progress value={this.state.value} mode="determinate" shape="circle" size="xxs" />
                <Progress value={this.state.value} mode="determinate" shape="circle" size="xs" />
                <Progress value={this.state.value} mode="determinate" shape="circle" />
                <Progress value={this.state.value} mode="determinate" shape="circle" size="l" />
                <Progress value={this.state.value} mode="determinate" shape="circle" size="xl" />
                <br />
                <Title level={4}>indeterminate</Title>
                <Progress mode="indeterminate" shape="circle" size="xxl" />
                <Progress mode="indeterminate" shape="circle" size="xxxl" />
                <Progress mode="indeterminate" shape="circle" size="s" />
            </div>
        );
    }

});

module.exports = View;
