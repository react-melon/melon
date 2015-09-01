/**
 * @file melon demo Pager
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title.jsx');
var Pager = require('../src/Pager.jsx');

var View = React.createClass({

    render: function() {
        return (
            <div>
                <Title level={3}>翻页器</Title>

                <Pager total={10} page={1} anchor />

            </div>
        );
    },


    onBeforeChange: function (index, e) {

        console.log('你选择了' + index);

    }

});

module.exports = View;
