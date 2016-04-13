/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import Title from '../src/Title';

const styles = {
    cell: {
        boxSizing: 'border-box',
        padding: 10,
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'rgb(0, 159, 147)'
    }
};

export default class View extends Component {

    renderGrid(columns) {

        const grid = [];

        for (let i = 1; i < columns; ++i) {

            const prev = 'melon-column melon-column-' + i;
            const next = 'melon-column melon-column-' + (columns - i);

            grid[i] = (
                <div className="melon-row" key={i}>
                    <div className={prev}>
                        <div style={styles.cell}>{i}</div>
                    </div>
                    <div className={next}>
                        <div style={styles.cell}>{columns - i}</div>
                    </div>
                </div>
            );

        }

        return grid;

    }


    render() {

        return (
            <div>
                <Title level={3}>按钮</Title>
                <Title level={4}>预定义样式</Title>

                {this.renderGrid(12)}

            </div>
        );

    }

}
