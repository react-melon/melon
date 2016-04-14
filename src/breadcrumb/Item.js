 /**
  * @file melon/breadcrumb/item
  * @author leon(ludafa@outlook.com)
  */

import React from 'react';
import {create} from '../common/util/cxBuilder';

const cx = create('BreadcrumbItem');

export default function BreadcrumbItem(props) {
    return (
        <a {...props} className={cx(props).build()} />
    );
}

BreadcrumbItem.propTypes = {
    href: React.PropTypes.string
};
