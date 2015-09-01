/**
 * @file melon TextBox example
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var TextBox = require('../src/TextBox.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div >
                <div className="row">
                    <TextBox defaultValue="default value" placeholder='请输入' />
                    <TextBox placeholder='提示语' />
                </div>

                <Title level={4}>状态</Title>
                <div className="row">
                    <TextBox value='只读' readOnly={true} />
                    <TextBox value='禁用' disabled={true} />
                </div>

                <Title level={4}>多行文本输入</Title>
                <div className="row">
                    <TextBox placeholder='提示语(多行输入)' multiline={true} />
                </div>
                <Title level={4}>浮动提示</Title>
                <div className="row">
                    <TextBox floatingLabel='姓名' />
                    <TextBox floatingLabel='爱好' defaultValue='melon' />
                    <TextBox floatingLabel='多行文本浮动提示' multiline={true} />
                </div>
                <Title level={4}>宽度</Title>
                <div className="row">
                    <TextBox floatingLabel='300px' style={{width: 300}} />
                </div>
                <div className="row">
                    <TextBox floatingLabel='全宽' variants={['fluid']} />
                </div>
                <Title level={4}>前缀 / 后缀</Title>
                <div className="row">
                    <TextBox defaultValue="123" prefix="$" />
                    <TextBox defaultValue="123" suffix="天" />
                </div>

                <Title level={4}>浮动提示的前缀 / 后缀</Title>
                <div className="row">
                    <TextBox floatingLabel="出价" /><span className="ui-textbox-suffix">万元</span>
                </div>
                <div className="row">
                    &emsp;<span className="ui-textbox-prefix">http://</span>
                    <TextBox floatingLabel="网址" prefix="http://" />
                </div>

            </div>
        );
    }

});

module.exports = View;
