define('melon/table/Cell', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TableCell');
    var TableCell = React.createClass({
        displayName: 'TableCell',
        shouldComponentUpdate: function (nextProps) {
            return nextProps.cellRenderer || nextProps.cellData !== this.props.cellData;
        },
        getCellContent: function () {
            var props = this.props;
            var _props = this.props;
            var cellRenderer = _props.cellRenderer;
            var cellData = _props.cellData;
            var content = cellRenderer ? cellRenderer(props) : cellData;
            return React.createElement('div', { className: cx().part('content').build() }, content);
        },
        render: function () {
            var props = this.props;
            var style = {
                textAlign: props.align,
                width: props.width,
                height: props.height
            };
            return React.createElement('div', { className: cx(props).build() }, React.createElement('div', {
                className: cx().part('wrap1').build(),
                style: style
            }, React.createElement('div', { className: cx().part('wrap2').build() }, React.createElement('div', { className: cx().part('wrap3').build() }, this.getCellContent()))));
        }
    });
    var PropTypes = React.PropTypes;
    TableCell.propTypes = {
        part: PropTypes.oneOf([
            'header',
            'body',
            'footer'
        ]),
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
    TableCell.defaultProps = { align: 'left' };
    module.exports = TableCell;
});