/**
 * @file melon demo Slider
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Slider from '../src/Slider';

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            value1: 12
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange({value}) {
        this.setState({value1: value});
    }

    render() {
        return (
            <div>
                <Title level={1}>数值选择器</Title>
                <Slider
                    style={{marginTop: 100}}
                    onChange={this.onChange}
                    value={this.state.value1}
                    width={500} />
                <div>
                    数值：{this.state.value1}
                </div>
            </div>
        );
    }

}

module.exports = View;
