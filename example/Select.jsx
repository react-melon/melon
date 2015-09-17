/**
 * @file melon demo select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Select = require('../src/Select.jsx');

var View = React.createClass({

    getInitialState: function () {
        return {
            value: ''
        };
    },

    render: function() {

        var datasource = [
            {value: '1', name: 'Never'},
            {value: '2', name: 'Every Night'},
            {value: '3', name: 'Weeknights'},
            {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
            {value: '5', name: 'Weekly'}
        ];

        return (
            <div>
                <Title level={3}>下拉选项</Title>
                <Title level={4}>预定义样式</Title>
                <Select value={this.state.value} onChange={this.onChange}>
                    {Select.createOptions(datasource)}
                </Select>
                {this.getCurrentValue()}
                <Title level={4}>选项分组</Title>
                <Select value={this.state.value} onChange={this.onChange}>
                    <optgroup label="fruit">
                        <option value="Apple" label="Apple" />
                        <option value="Banana" label="Banana" />
                        <option value="Mango" label="Mango" disabled />
                        <option value="Pear" label="Pear" disabled />
                    </optgroup>
                    <optgroup label="sport">
                        <option value="Basketball" label="Basketball" />
                        <option value="Football" label="Football" />
                    </optgroup>
                </Select>
            </div>
        );
    },

    getCurrentValue: function () {
        return this.state.value
            ? <label style={{lineHeight: '48px', marginLeft: 10}}>当前的选择值是：{this.state.value}</label>
            : null;
    },

    onChange: function (e) {
        this.setState({
            value: e.value
        });
    }

});

module.exports = View;
