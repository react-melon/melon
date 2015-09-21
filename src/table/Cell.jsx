/**
 * @file melon/TableCell
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var PropTypes = React.PropTypes;
var u = require('underscore');

var RENDERER_PROPS = [
    'cellData',
    'cellDataKey',
    'rowData',
    'rowIndex',
    'columnData',
    'columnIndex',
    'width',
    'height',
    'part'
];

var Component = require('../Component.jsx');

class TableCell extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.cellRenderer || nextProps.cellData !== this.props.cellData;
    }

    render() {

        var props = this.props;

        var style = {
            textAlign: props.align,
            width: props.width,
            height: props.height
        };

        return (
            <div className={this.getClassName()}>
                <div style={style} className={this.getPartClassName('wrap1')}>
                    <div className={this.getPartClassName('wrap2')}>
                        <div className={this.getPartClassName('wrap3')}>
                            {this.getCellContent()}
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    getCellContent() {

        var props = this.props;
        var part = props.part;
        var renderer = props.cellRenderer;

        var content = renderer
            ? renderer(u.pick(props, RENDERER_PROPS))
            : props.cellData;

        return <div className={this.getPartClassName('content')}>{content}</div>
    }

}

TableCell.propTypes = {

    part: PropTypes.oneOf(['header', 'body', 'footer']),

    columnData: PropTypes.any,
    rowData: PropTypes.any,
    columnIndex: PropTypes.number,
    rowIndex: PropTypes.number,
    cellData: PropTypes.any,
    cellKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
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

module.exports = TableCell;
