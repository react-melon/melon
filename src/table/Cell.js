/**
 * @file melon/TableCell
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import shallowEqual from 'melon-core/util/shallowEqual';

const cx = create('TableCell');

const JUSTIFY_CONTENT_MAP = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
};

export default class TableCell extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        const {
            height,
            content,
            columnData
        } = this.props;

        let {
            align,
            width,
            grow,
            shrink,
            maxWidth,
            minWidth
        } = columnData;

        const style = {
            justifyContent: JUSTIFY_CONTENT_MAP[align],
            flexBasis: width,
            height: height,
            flexGrow: grow,
            flexShrink: shrink,
            maxWidth,
            minWidth
        };

        return (
            <div className={cx(this.props).build()} style={style}>
                {content}
            </div>
        );

    }

}

TableCell.displayName = 'TableCell';

TableCell.propTypes = {

    part: PropTypes.oneOf(['header', 'body', 'footer']),

    columnData: PropTypes.shape({
        width: PropTypes.number.isRequired,
        align: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
        grow: PropTypes.number.isRequired,
        shrink: PropTypes.number.isRequired,
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number
    }),

    rowData: PropTypes.any,
    columnIndex: PropTypes.number,
    rowIndex: PropTypes.number,
    cellData: PropTypes.any,
    cellKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),

    height: PropTypes.number.isRequired,
    cellRenderer: PropTypes.func

};

TableCell.defaultProps = {
    align: 'left'
};
