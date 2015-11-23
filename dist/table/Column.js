define('melon/table/Column', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var Component = require('../Component');
    var TableColumn = function (_Component) {
        babelHelpers.inherits(TableColumn, _Component);
        function TableColumn() {
            babelHelpers.classCallCheck(this, TableColumn);
            _Component.apply(this, arguments);
        }
        TableColumn.prototype.render = function render() {
            return null;
        };
        babelHelpers.createClass(TableColumn, null, [{
                key: 'displayName',
                value: 'TableColumn',
                enumerable: true
            }]);
        return TableColumn;
    }(Component);
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