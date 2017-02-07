/**
 * @file melon demo BoxGroup2
 */

import React from 'react';

import Title from 'melon/Title';
import BoxGroup from 'melon/BoxGroup';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            a: [],
            b: []
        };
    }

    onChange(name, e) {
        this.setState({
            [name]: e.value
        });
    }

    getCurrentValue(name) {
        const value = this.state[name];
        return value ? '当前的选择是：' + value : '';
    }

    render() {

        return (
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <BoxGroup
                        name="a"
                        boxModel="checkbox"
                        value={this.state.a}
                        onChange={this.onChange.bind(this, 'a')}>
                        <option value="A" label="青年A" />
                        <option value="B" label="青年B" />
                        <option value="C" label="青年C" />
                    </BoxGroup>
                    <p style={{marginTop: '10px'}}>
                        {this.getCurrentValue('a')}
                    </p>
                </div>
                <div className="melon-column melon-column-6">
                    <BoxGroup
                        name="controlled-radio"
                        boxModel="radio"
                        value={this.state.b}
                        onChange={this.onChange.bind(this, 'b')}>
                        <option value="A" label="青年A" />
                        <option value="B" label="青年B" />
                        <option value="C" label="青年C" />
                    </BoxGroup>
                    <p style={{marginTop: '10px'}}>
                        {this.getCurrentValue('b')}
                    </p>
                </div>
            </div>
        );
    }

}

module.exports = View;
