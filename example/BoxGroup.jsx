/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var BoxGroup = require('../src/BoxGroup.jsx');
var Button = require('../src/Button.jsx');
var Toggle = require('../src/Toggle.jsx');

var View = React.createClass({

    render: function() {

        var value = this.state.value;

        var datasource = [{
            value: 'A',
            name: '青年A'
        }, {
            value: 'B',
            name: '青年B'
        }, {
            value: 'C',
            name: '青年C'
        }];

        return (
            <div>
                <Title level={3}>单复选框</Title>

                <div className="row">
                    <Title level={5}>复选框</Title>
                    <BoxGroup boxModel="checkbox">
                        <option name="checkbox1" value="1" label="1" />
                        <option name="checkbox1" value="2" label="2" />
                        <option name="checkbox1" value="3" label="3" />
                    </BoxGroup>
                </div>

                <div className="row">
                    <Title level={5}>单选框</Title>
                    <BoxGroup boxModel="radio">
                        <option name="radio1" value="1" label="1" />
                        <option name="radio1" value="2" label="2" />
                        <option name="radio1" value="3" label="3" />
                    </BoxGroup>
                </div>

                <div className="row">
                    <Title level={5}>Toggle</Title>

                    <Toggle name="toggle1" value="1" label="On" leftLabel="Off" />
                    <p />
                    <Toggle name="toggle2" value="1" label="On" leftLabel="Off" disabled />
                </div>

                <div className="row">
                    <Title level={5}>有组织的复选框</Title>

                    <BoxGroup name="boxgroup1" boxModel="checkbox" value={value}>
                        <option value="A" label="青年A" />
                        <option value="B" label="青年B" />
                        <option value="C" label="青年C" />
                    </BoxGroup>

                    <p><Button variants={['raised']} onClick={this.onButtonClick}>手动设置值【A、B】</Button></p>
                </div>

                <div className="row">
                    <Title level={5}>有组织的单选框</Title>

                    <BoxGroup name="boxgroup2" boxModel="radio" value={['C']}>
                        <option value="A" label="青年A" />
                        <option value="B" label="青年B" />
                        <option value="C" label="青年C" />
                    </BoxGroup>

                </div>

                <div className="row">
                    <Title level={5}>禁用</Title>

                    <BoxGroup name="boxgroup3" boxModel="checkbox" value={['C']} disabled>
                        <option value="A" label="青年A" />
                        <option value="B" label="青年B" />
                        <option name="checkbox1" value="C" label="青年C" />
                    </BoxGroup>

                </div>

                <div className="row">
                    <Title level={5}>使用DataSource</Title>
                    <BoxGroup
                        boxModel="checkbox"
                        name="boxgroup4"
                        value={['B', 'C']}>
                        {BoxGroup.createOptions(datasource)}
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
