/**
 * @file melon/Breadcrumb
 * @author leon(ludafa@outlook.com)
 */

import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './breadcrumb/Item';
import Icon from './Icon';

const cx = create('Breadcrumb');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Breadcrumb
 *
 * @class
 * @param {Object}  props 属性
 * @return {ReactElement}
 */
function Breadcrumb(props) {

    /* eslint-disable fecs-min-vars-per-destructure */
    let {
        children,
        seperator,
        ...rest
    } = props;

    children = Children
        .toArray(children)
        .filter(child => child && child.type === Item)
        .reduce(
            (result, child, index) => {

                result.push(cloneElement(child, {level: index}));

                if (index !== children.length - 1) {
                    result.push(
                        <i
                            key={`sep-${index}`}
                            className={cx.getPartClassName('seperator')}>
                            {seperator}
                        </i>
                    );
                }
                return result;
            },
            []
        );

    return (
        <div {...rest} className={cx(props).build()}>
            {children}
        </div>
    );

}

Breadcrumb.propTypes = {
    seperator: PropTypes.node
};

Breadcrumb.defaultProps = {
    seperator: '/'
};

/* eslint-enable fecs-prefer-class */

Breadcrumb.Item = Item;

Breadcrumb.createCrumbs = function (crumbs) {

    return crumbs.map(function (crumb, index) {

        const {text, icon, ...rest} = crumb;

        return (
            <Item
                {...rest}
                key={index}
                level={index}>
                {icon ? <Icon icon={icon} /> : null}
                <span>{text}</span>
            </Item>
        );
    });

};

export {
    Breadcrumb as default,
    Item
};
