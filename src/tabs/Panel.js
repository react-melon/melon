/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('../Component');

class TabsPanel extends Component {

    static displayName = 'TabsPanel';

    getStates(props) {

        var states = {};

        if (props.active) {
            states.active = true;
        }

        return states;
    }

    render() {

        var props = this.props;

        return (
            <div {...props} className={this.getClassName()}>
                {props.children}
            </div>
        );

    }

}

TabsPanel.propTypes = {
    active: React.PropTypes.bool
};

module.exports = TabsPanel;
