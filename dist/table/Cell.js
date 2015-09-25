define('melon/table/Cell', [
    'exports',
    '../babelHelpers',
    'react',
    'underscore',
    '../Component'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
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
    var Component = require('../Component');
    var TableCell = function (_Component) {
        babelHelpers.inherits(TableCell, _Component);
        function TableCell() {
            babelHelpers.classCallCheck(this, TableCell);
            babelHelpers.get(Object.getPrototypeOf(TableCell.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(TableCell, [
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return nextProps.cellRenderer || nextProps.cellData !== this.props.cellData;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var style = {
                        textAlign: props.align,
                        width: props.width,
                        height: props.height
                    };
                    return React.createElement('div', { className: this.getClassName() }, React.createElement('div', {
                        style: style,
                        className: this.getPartClassName('wrap1')
                    }, React.createElement('div', { className: this.getPartClassName('wrap2') }, React.createElement('div', { className: this.getPartClassName('wrap3') }, this.getCellContent()))));
                }
            },
            {
                key: 'getCellContent',
                value: function getCellContent() {
                    var props = this.props;
                    var part = props.part;
                    var renderer = props.cellRenderer;
                    var content = renderer ? renderer(u.pick(props, RENDERER_PROPS)) : props.cellData;
                    return React.createElement('div', { className: this.getPartClassName('content') }, content);
                }
            }
        ]);
        return TableCell;
    }(Component);
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