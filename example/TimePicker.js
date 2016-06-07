/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import TimePicker from '../src/TimePicker';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            value: undefined
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({value: e.value});
    }

    render() {

        return (
            <div>
                <Title level={3}>TimePicker</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>时间</Title>
                        <TimePicker />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>有默认值</Title>
                        <TimePicker defaultValue="00:00" size="s" />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>有限制 0:00 - 11:00</Title>
                        <TimePicker
                            defaultValue="01:00"
                            begin="00:00"
                            end="11:00" />
                    </div>
                    <div className="melon-column melon-column-6">
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>Controlled</Title>
                        <TimePicker
                            value={this.state.value}
                            onChange={this.onChange}
                            begin="00:00"
                            end="11:00" />
                    </div>
                    <div className="melon-column melon-column-6">
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = View;
