/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
const cx = require('../common/util/cxBuilder').create('TabsPanel');

function TabsPanel(props) {

    let {active, ...others} = props;

    return (
        <div {...others} className={cx(props).addStates({active}).build()} />
    );

}

module.exports = TabsPanel;
