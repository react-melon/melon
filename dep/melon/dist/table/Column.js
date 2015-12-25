define('melon/table/Column', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var TableColumn = React.createClass({
        displayName: 'TableColumn',
        render: function () {
            return null;
        }
    });
    var PropTypes = React.PropTypes;
    TableColumn.propTypes = {
        align: PropTypes.oneOf([
            'left',
            'center',
            'right'
        ]),
        cellRenderer: PropTypes.func,
        dataKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        title: PropTypes.string,
        width: PropTypes.number.isRequired
    };
    TableColumn.defaultProps = { align: 'left' };
    TableColumn._TABLE_COMPONENT_ = 'COLUMN';
    module.exports = TableColumn;
});