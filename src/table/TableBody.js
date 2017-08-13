/**
 * @file 表格 body
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import TableRow from './Row';
import shallowEqual from 'melon-core/util/shallowEqual';

const cx = create('TableBody');

export default class TableBody extends Component {

    shouldComponentUpdate(nextProps) {

        let {columns, dataSource} = this.props;

        return !shallowEqual(nextProps.columns, columns)
            || !shallowEqual(dataSource, nextProps.dataSource);

    }

    render() {

        let {
            dataSource,
            columns
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                {dataSource.map((rowData, index) => (
                    <TableRow
                        columns={columns}
                        index={index}
                        rowData={rowData} />
                ))}
            </div>
        );

    }

}


TableBody.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired
};
