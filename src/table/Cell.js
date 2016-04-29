/**
 * @file melon/TableCell
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';

const cx = create('TableCell');

export default class TableCell extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    render() {

        const {align, width, height, content} = this.props;

        const style = {
            textAlign: align,
            width: width,
            height: height
        };

        return (
            <div className={cx(this.props).build()}>
                <div className={cx.getPartClassName('wrap1')} style={style}>
                    <div className={cx.getPartClassName('wrap2')}>
                        <div className={cx.getPartClassName('wrap3')}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

TableCell.displayName = 'TableCell';

TableCell.propTypes = {

    part: PropTypes.oneOf(['header', 'body', 'footer']),

    columnData: PropTypes.any,
    rowData: PropTypes.any,
    columnIndex: PropTypes.number,
    rowIndex: PropTypes.number,
    cellData: PropTypes.any,
    cellKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,

    cellRenderer: PropTypes.func

};

TableCell.defaultProps = {
    align: 'left'
};
