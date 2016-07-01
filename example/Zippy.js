/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Title from '../src/Title';
import Zippy from '../src/Zippy';
import Button from '../src/Button';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            example1: false,
            example2: false,
            example3: true
        };
    }

    render() {
        return (
            <div>
                <Title level={3}>拉伸</Title>
                <Title level={4}>垂直</Title>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({example1: !this.state.example1})}>
                    打开
                </Button>
                <Zippy expand={this.state.example1} style={{height: 25 * 16}}>
                    <div style={{width: 800, lineHeight: '25px'}}>
                        <p>如何让你遇见我</p>
                        <p>在我最美丽的时刻为这</p>
                        <p>我已在佛前求了五百年</p>
                        <p>求他让我们结一段尘缘</p>
                        <p>佛于是把我化作一棵树</p>
                        <p>长在你必经的路旁</p>
                        <p>阳光下慎重地开满了花</p>
                        <p>朵朵都是我前世的盼望</p>
                        <p>当你走近请你细听</p>
                        <p>那颤抖的叶是我等待的热情</p>
                        <p>而当你终于无视地走过</p>
                        <p>在你身后落了一地的</p>
                        <p>朋友啊那不是花瓣</p>
                        <p>是我凋零的心</p>
                        <p>只缘感君一回顾，使我思君暮与朝</p>
                        <p>——席慕容《古乐府》</p>
                    </div>
                </Zippy>
                <Title level={4}>水平</Title>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({example2: !this.state.example2})}>
                    打开
                </Button>
                <Zippy expand={this.state.example2} style={{width: 300}} horizontal>
                    <div style={{width: 300, backgroundColor: '#fbfbfb', lineHeight: '25px'}}>
                        <p>垂柳里，兰舟当日曾系。</p>
                        <p>千帆过尽，只伊人不随书至。</p>
                        <p>怪管道着我侬心，一般思妇游子。</p>
                        <p>昨宵梦，分明记：几回飞度烟水。</p>
                        <p>西风水断伴灯花，摇摇欲坠。</p>
                        <p>宵深待到凤凰山，声声啼鴂催起。</p>
                        <p>锦书宛在怀袖底。</p>
                        <p>人迢迢、紫塞千里，算是不曾相忆。</p>
                        <p>倘有情、早合归来，休寄一纸无聊相思字！</p>
                        <p>——王国维《西河》</p>
                    </div>
                </Zippy>
                <Title level={4}>自适应</Title>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({example3: !this.state.example3})}>
                    打开
                </Button>
                <Zippy expand={this.state.example3} isAdaptive>
                    <div style={{width: 800, lineHeight: '25px'}}>
                        <p>如何让你遇见我</p>
                        <p>在我最美丽的时刻为这</p>
                        <p>我已在佛前求了五百年</p>
                        <p>求他让我们结一段尘缘</p>
                        <p>佛于是把我化作一棵树</p>
                        <p>长在你必经的路旁</p>
                        <p>阳光下慎重地开满了花</p>
                        <p>朵朵都是我前世的盼望</p>
                        <p>当你走近请你细听</p>
                        <p>那颤抖的叶是我等待的热情</p>
                        <p>而当你终于无视地走过</p>
                        <p>在你身后落了一地的</p>
                        <p>朋友啊那不是花瓣</p>
                        <p>是我凋零的心</p>
                        <p>只缘感君一回顾，使我思君暮与朝</p>
                        <p>——席慕容《古乐府》</p>
                    </div>
                </Zippy>
            </div>
        );
    }


}

module.exports = View;
