/**
 * @file melon demo Progress Linear
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from 'melon/Title';
import Progress from 'melon/Progress';

require('../code/ProgressLinear.txt');

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            value: 20
        };
    }

    componentDidMount() {
        const me = this;
        let {value} = me.state;
        this.timer = setTimeout(function tick() {
            value += 10;
            me.setState({value});
            if (value < 100) {
                me.timer = setTimeout(tick, 800);
            }
        }, 800);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <div>
                <Title level={4}>determinate</Title>
                <Progress value={this.state.value} mode="determinate" />
                <br />
                <Title level={4}>indeterminate</Title>
                <Progress mode="indeterminate" />
            </div>
        );
    }
}

module.exports = View;
