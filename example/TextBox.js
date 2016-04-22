/**
 * @file melon TextBox example
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';

import Title from '../src/Title';
import TextBox from '../src/TextBox';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            controlledValue: '',
            userInputValue: ''
        };
    }

    render() {
        return (
            <div >
                <Title level={4}>文本输入</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>普通</Title>
                        <TextBox placeholder='请输入' />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>默认值</Title>
                        <TextBox defaultValue="default value" placeholder='请输入' />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>只读状态</Title>
                        <TextBox value='只读' readOnly={true} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>禁用状态</Title>
                        <TextBox value='禁用' disabled={true} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>浮动提示</Title>
                        <TextBox floatingLabel='姓名' />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>浮动提示 - 带有默认值</Title>
                        <TextBox floatingLabel='爱好' defaultValue='melon' />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>多行输入</Title>
                        <TextBox placeholder='发个微博...' multiline={true} />
                        <TextBox
                            value={Array.from({length: 10}).map(() => '发个微博...').join('')}
                            multiline={true} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>多行文本浮动提示</Title>
                        <TextBox floatingLabel='多行文本浮动提示' multiline={true} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Title level={5}>宽度</Title>
                        <TextBox floatingLabel='300px' style={{width: 300}} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <TextBox floatingLabel='500px' style={{width: 500}} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <TextBox floatingLabel='全宽' variants={['fluid']} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>前缀</Title>
                        <TextBox
                            required={true}
                            max={1000}
                            maxErrorMessage="出价不能多于1000元哟！"
                            min={100}
                            minErrorMessage="出价不能少于100元哟！"
                            pattern="\d+"
                            patternErrorMessage="出价需要是整数呢"
                            floatingLabel="出价" />
                            <span className="ui-textbox-suffix">万元
                        </span>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>后缀</Title>
                        <span className="ui-textbox-prefix">{'http://'}</span><TextBox floatingLabel="网址" prefix="http://" />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Title level={5}>被控制的输入框</Title>
                        <TextBox
                            name="controlled"
                            value={this.state.controlledValue}
                            onChange={this.onControlledTextBoxChange.bind(this)} />
                        {this.state.userInputValue ? '用户输入了：' + this.state.userInputValue : ''}
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12" style={{lineHeight: 2}}>
                        <p>被控制的输入框的值不会随着用户输入而变化。它只会响应value值的变化。</p>
                        <p>当value和onChange同时被设定时，TextBox就会进入被控制的状态。</p>
                        <p>即value不是undefined或null，onChange是一个函数</p>
                    </div>
                </div>

            </div>
        );
    }

    onControlledTextBoxChange(e) {
        this.setState({userInputValue: e.value});
    }

}

module.exports = View;
