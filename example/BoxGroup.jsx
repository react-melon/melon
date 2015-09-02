/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var CheckBox = require('../src/CheckBox.jsx');
var BoxGroup = require('../src/BoxGroup.jsx');
var Radio = require('../src/Radio.jsx');
var Button = require('../src/Button.jsx');

var View = React.createClass({

    render: function() {

        var value = this.state.value;

        return (
            <div>
                <Title level={3}>单复选框</Title>

                <div className="row">
                    <Title level={5}>复选框</Title>

                    <CheckBox name="checkbox1" value="1" label="普通CheckBox" />
                </div>

                <div className="row">
                    <Title level={5}>单选框</Title>

                    <Radio name="radio1" value="1" label="普通Radio" />
                </div>

                <div className="row">
                    <Title level={5}>有组织的复选框</Title>

                    <BoxGroup name="boxgroup1" value={value}>
                        <CheckBox value="A" label="青年A" />
                        <CheckBox value="B" label="青年B" />
                        <CheckBox name="checkbox1" value="C" label="青年C" />
                    </BoxGroup>

                    <p><Button variants={['raised']} onClick={this.onButtonClick}>手动设置值【A、B】</Button></p>
                </div>

                <div className="row">
                    <Title level={5}>有组织的单选框</Title>

                    <BoxGroup name="boxgroup2" value={['C']}>
                        <Radio value="A" label="青年A" />
                        <Radio value="B" label="青年B" />
                        <Radio name="checkbox1" value="C" label="青年C" />
                    </BoxGroup>

                </div>

                <div className="row">
                    <Title level={5}>禁用</Title>

                    <BoxGroup name="boxgroup3" value={['C']} disabled>
                        <CheckBox value="A" label="青年A" />
                        <CheckBox value="B" label="青年B" />
                        <CheckBox name="checkbox1" value="C" label="青年C" />
                    </BoxGroup>

                </div>

            </div>
        );
    },

    getInitialState: function () {
        return {
            value: ['A']
        };
    },

    onButtonClick: function () {
        this.setState({value: ['A', 'B']});
    }

});

module.exports = View;
