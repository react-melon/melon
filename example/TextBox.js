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
            value: ''
        };
    }

    render() {
        return (
            <div >
                <Title level={4}>文本输入</Title>
                <p>Uncontrolled</p>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>普通</Title>
                        <TextBox
                            placeholder='有什么新鲜事想告诉大家？'
                            variants={['fluid']} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>默认值</Title>
                        <TextBox
                            defaultValue="没啥新鲜事啊。。。"
                            placeholder='有什么新鲜事想告诉大家？'
                            variants={['fluid']} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>只读状态</Title>
                        <TextBox
                            value='只读输入框的值'
                            readOnly={true}
                            variants={['fluid']} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>禁用状态</Title>
                        <TextBox
                            value='禁用'
                            disabled={true}
                            variants={['fluid']}  />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>浮动提示</Title>
                        <TextBox
                            floatingLabel='姓名'
                            variants={['fluid']} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>浮动提示 - 带有默认值</Title>
                        <TextBox
                            floatingLabel='爱好'
                            defaultValue='melon'
                            variants={['fluid']} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>多行输入</Title>
                        <TextBox
                            variants={['fluid']}
                            placeholder='有什么新鲜事想告诉大家？...'
                            multiline={true} />
                        <Title level={5}>默认值多行文本</Title>
                        <TextBox
                            variants={['fluid']}
                            defaultValue={Array.from({length: 10}).map(() => '发个微博...').join('\n')}
                            multiline={true} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>多行文本浮动提示</Title>
                        <TextBox
                            variants={['fluid']}
                            floatingLabel='有什么新鲜事想告诉大家？'
                            multiline={true} />
                        <Title level={5}>默认值多行文本浮动提示</Title>
                        <TextBox
                            variants={['fluid']}
                            floatingLabel='有什么新鲜事想告诉大家？'
                            defaultValue={Array.from({length: 10}).map(() => '发个微博...').join('\n')}
                            multiline={true} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Title level={5}>宽度</Title>
                        <TextBox floatingLabel='300px' style={{width: 300}} />
                        <div style={{height: '1rem'}}></div>
                        <TextBox floatingLabel='500px' style={{width: 500}} />
                        <div style={{height: '1rem'}}></div>
                        <TextBox floatingLabel='全宽' variants={['fluid']} />
                    </div>
                </div>

                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>前缀</Title>
                        <TextBox floatingLabel="出价" />
                        <span className="ui-text-box-suffix">万元
                        </span>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>后缀</Title>
                        <span className="ui-text-box-prefix">{'http://'}</span><TextBox floatingLabel="网址" prefix="http://" />
                    </div>
                </div>
                <p>Controlled</p>
                <div style={{fontSize: '0.8rem', color: '#666'}}>
                    左侧输入框的值会被拆成多行填入右侧的输入框；
                    右侧输入框的值会被合并成一行填入左侧的输入框；
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={5}>单行输入框</Title>
                        <TextBox
                            variants={['fluid']}
                            value={this.state.value}
                            onChange={this.onControlledTextBoxChange.bind(this)} />
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={5}>多行输入框</Title>
                        <TextBox
                            multiline={true}
                            variants={['fluid']}
                            value={
                                this.state.value
                                    .split(/(\w)/)
                                    .filter(i => !!i)
                                    .join('\n')
                            }
                            onChange={e => {
                                this.setState({
                                    value: e.value.replace(/\W/g, '')
                                });
                            }} />
                    </div>
                </div>
            </div>
        );
    }

    onControlledTextBoxChange(e) {
        this.setState({value: e.value});
    }

}

module.exports = View;
