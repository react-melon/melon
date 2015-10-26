 /**
  * @file melon/breadcrumb/item
  * @author leon(ludafa@outlook.com)
  */

var React = require('react');
var Component = require('../Component');

class BreadcrumbItem extends Component {

    static displayName = 'BreadcrumbItem';

    render() {

        var props = this.props;

        return (
            <a {...props} className={this.getClassName()}>
                {props.children}
            </a>
        );

    }

}

var PropTypes = React.PropTypes;

BreadcrumbItem.propTypes = {
    ...Component.propTypes,
    href: PropTypes.string
};

module.exports = BreadcrumbItem;
