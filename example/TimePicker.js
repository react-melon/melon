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
            value: '20:30'
        };
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
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = View;
