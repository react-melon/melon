/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');

var Component = require('../Component');

class Panel extends Component {

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

Panel.propTypes = {
    active: React.PropTypes.bool
};

module.exports = Panel;
