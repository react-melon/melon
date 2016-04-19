/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';

import Title from '../src/Title';

class View extends React.Component {

    render() {
        return (
            <div>
                <Title level={3}>按钮</Title>
                <Title level={4}>预定义样式</Title>

                {this.renderGrid(12)}

            </div>
        );
    }

    renderGrid(columns) {

        let grid = [];

        for (let i = 1; i < columns; ++i) {

            let prev = 'melon-column melon-column-' + i;
            let next = 'melon-column melon-column-' + (columns - i);

            grid[i] = (
                <div className="melon-row" key={i}>
                    <div className={prev}>{i}</div>
                    <div className={next}>{columns - i}</div>
                </div>
            );

        }

        return grid;
    }

}

module.exports = View;
