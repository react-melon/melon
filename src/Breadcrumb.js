/**
 * @file melon/Breadcrumb
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Breadcrumb');
const Item = require('./breadcrumb/Item');

const Breadcrumb = function Breadcrumb(props) {

    const {
        children,
        ...rest
    } = props;

    return (
        <div {...rest} className={cx(props).build()}>
            {React.Children.map(
                children,
                (child, index) => {
                    return child && child.type === Item
                        ? React.cloneElement(child, {
                            key: index,
                            level: index
                        })
                        : null;
                }
            )}
        </div>
    );

};

Breadcrumb.Item = Item;

module.exports = Breadcrumb;
