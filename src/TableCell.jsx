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

var TableCell = React.createClass({

    propTypes: {

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

        cellRenderer: React.PropTypes.func

    },

    getDefaultProps: function () {
        return {
            align: 'left'
        };
    },

    shouldComponentUpdate: function (nextProps) {
        return nextProps.cellRenderer || nextProps.cellData !== this.props.cellData;
    },

    render: function () {

        var props = this.props;

        var style = {
            textAlign: props.align,
            width: props.width,
            height: props.height
        };

        return (
            <div className="ui-tablecell">
                <div style={style} className="ui-tablecell-wrap1">
                    <div className="ui-tablecell-wrap2">
                        <div className="ui-tablecell-wrap3">
                            {this.getCellContent()}
                        </div>
                    </div>
                </div>
            </div>
        );

    },

    getCellContent: function () {

        var props = this.props;
        var renderer = props.cellRenderer;

        var content = renderer
            ? renderer(u.pick(props, RENDERER_PROPS))
            : props.cellData;

        return <div className="ui-tablecell-content">{content}</div>
    }

});

module.exports = TableCell;
