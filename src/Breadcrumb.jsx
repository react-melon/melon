/**
 * @file melon/Breadcrumb
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component.jsx');

var Item = require('./breadcrumb/Item.jsx');

class Breadcrumb extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        var props = this.props;
        return (
            <div {...props} onClick={null} className={this.getClassName()}>
                {this.renderChildren(props.children)}
            </div>
        );
    }

    renderChildren(children) {
        return React.Children.map(
            children,
            function (child, index) {
                if (!child || child.type !== Item) {
                    return null;
                }
                return React.cloneElement(
                    child,
                    {
                        key: index,
                        level: index,
                        onClick: this.onClick
                    }
                );
            },
            this
        );
    }

    onClick(e) {
        var onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }

}

var PropTypes = React.PropTypes;

Breadcrumb.propTypes = {
    ...Component.propTypes,
    onClick: PropTypes.func
};

Breadcrumb.Item = Item;

module.exports = Breadcrumb;
