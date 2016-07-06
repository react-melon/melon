/**
 * @file melon/Breadcrumb
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './breadcrumb/Item';

const cx = create('Breadcrumb');

/* eslint-disable fecs-prefer-class */
export default function Breadcrumb(props) {

    const {
        children,
        ...rest
    } = props;

    return (
        <div {...rest} className={cx(props).build()}>
            {React.Children.map(
                children,
                (child, index) => (
                    child && child.type === Item
                        ? React.cloneElement(child, {
                            key: index,
                            level: index
                        })
                        : null
                )
            )}
        </div>
    );

}
/* eslint-enable fecs-prefer-class */

Breadcrumb.Item = Item;

Breadcrumb.createCrumbs = function (crumbs) {

    return crumbs.map(function (crumb, index) {

        const {text, ...rest} = crumb;

        return (
            <Item
                {...rest}
                key={index}
                level={index}>
                {text}
            </Item>
        );
    });

};
