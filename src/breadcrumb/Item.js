 /**
  * @file melon/breadcrumb/item
  * @author leon(ludafa@outlook.com)
  */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('BreadcrumbItem');

/**
 * 面包屑项
 *
 * @class
 * @param {*} props 属性
 */
export default function BreadcrumbItem(props) {

    const {level, ...rest} = props;

    return (
        <a
            {...rest}
            data-level={level}
            className={cx(props).addVariants(`level-${level}`).build()} />
    );
}

BreadcrumbItem.propTypes = {
    href: PropTypes.string
};
