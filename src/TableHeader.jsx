/**
 * @file melon/TableHeader
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var TableRow = require('./TableRow.jsx');

var TableHeader = React.createClass({

    render: function() {

        var props = this.props;

        return (
            <div className="ui-table-header">
                <TableRow columns={props.columns} />
            </div>
        );
    }

});

module.exports = TableHeader;
