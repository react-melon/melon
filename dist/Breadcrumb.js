define('melon/Breadcrumb', [
    'exports',
    './babelHelpers',
    'react',
    './Component',
    './breadcrumb/Item'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Item = require('./breadcrumb/Item');
    var Breadcrumb = function (_Component) {
        babelHelpers.inherits(Breadcrumb, _Component);
        function Breadcrumb(props) {
            babelHelpers.classCallCheck(this, Breadcrumb);
            babelHelpers.get(Object.getPrototypeOf(Breadcrumb.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
        }
        babelHelpers.createClass(Breadcrumb, [
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('div', babelHelpers._extends({}, props, {
                        onClick: null,
                        className: this.getClassName()
                    }), this.renderChildren(props.children));
                }
            },
            {
                key: 'renderChildren',
                value: function renderChildren(children) {
                    return React.Children.map(children, function (child, index) {
                        if (!child || child.type !== Item) {
                            return null;
                        }
                        return React.cloneElement(child, {
                            key: index,
                            level: index,
                            onClick: this.onClick
                        });
                    }, this);
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    var onClick = this.props.onClick;
                    if (onClick) {
                        onClick(e);
                    }
                }
            }
        ]);
        return Breadcrumb;
    }(Component);
    var PropTypes = React.PropTypes;
    Breadcrumb.propTypes = babelHelpers._extends({}, Component.propTypes, { onClick: PropTypes.func });
    Breadcrumb.Item = Item;
    module.exports = Breadcrumb;
});