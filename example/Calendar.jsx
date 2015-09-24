/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Calendar = require('../src/Calendar.jsx');

var View = React.createClass({

    render: function() {

        return (
            <div>
                <Title level={3}>Calendar</Title>

                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>普通日历</Title>
                        <Calendar></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>限定区间</Title>
                        <Calendar min={new Date(2015, 7, 10)} max={new Date(2015, 9, 28)}></Calendar>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>禁用</Title>
                        <Calendar disabled></Calendar>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>只读</Title>
                        <Calendar min={new Date(2015, 7, 10)} max={new Date(2015, 9, 28)} readOnly></Calendar>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = View;
