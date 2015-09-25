/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

var React = require('react');

var Component = require('./Component');

class Button extends Component {

    render() {

        var props = this.props;

        return (
            <button {...props} className={this.getClassName()}>
                {props.label || props.children}
            </button>
        );

    }

}

module.exports = Button;
