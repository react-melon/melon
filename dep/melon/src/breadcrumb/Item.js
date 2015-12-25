 /**
  * @file melon/breadcrumb/item
  * @author leon(ludafa@outlook.com)
  */

const React = require('react');

const cx = require('../common/util/cxBuilder').create('BreadcrumbItem');

function BreadcrumbItem(props) {
    return (
        <a {...props} className={cx(props).build()} />
    );
}

BreadcrumbItem.propTypes = {
    href: React.PropTypes.string
};

module.exports = BreadcrumbItem;
