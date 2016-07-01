/**
 * @file melon demo Pager
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Pager from '../src/Pager';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            page1: 1,
            page2: 1
        };
    }

    render() {
        return (
            <div>
                <Title level={3}>翻页器</Title>

                <Title level={5}>图标</Title>

                <Pager total={10} page={this.state.page1} onChange={this.onChange.bind(this, 1)} />

                {this.getCurrentPage(1)}

                <Title level={5}>文字</Title>

                <Pager total={10} page={this.state.page2} first={1} useLang onChange={this.onChange.bind(this, 2)} />

                {this.getCurrentPage(2)}

                <Pager total={1} showAlways={false} useLang />

            </div>
        );
    }

    getCurrentPage(index) {
        return (
            <div>
                <label style={{lineHeight: '48px', marginLeft: 10}}>
                    当前的选择页码是：{this.state[`page${index}`]}
                </label>
            </div>
        );
    }

    onChange(index, e) {
        this.setState({
            [`page${index}`]: e.page
        });
    }

}

module.exports = View;
