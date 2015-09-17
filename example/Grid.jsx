/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div>
                <Title level={3}>按钮</Title>
                <Title level={4}>预定义样式</Title>

                {this.renderGrid(12)}

            </div>
        );
    },

    renderGrid(columns) {

        var grid = [];

        for (var i = 1; i < columns; ++i) {

            var prev = 'melon-column melon-column-' + i;
            var next = 'melon-column melon-column-' + (columns - i);

            grid[i] = (
                <div className="melon-row" key={i}>
                    <div className={prev}>{i}</div>
                    <div className={next}>{columns - i}</div>
                </div>
            );

        }

        return grid;

    }

});

module.exports = View;
