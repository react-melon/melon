/**
 * @file connect
 * @author leon <ludafa@outlook.com>
 */

import Trigger from './ContextMenuTrigger';
import React, {PropTypes} from 'react';

export default function connect(menu) {

    return function (Component) {

        /**
         * MenuConnector
         *
         * @param {Object} props 属性
         * @class
         */
        function MenuConnector(props) {

            let {
                onContextMenuShow,
                onContextMenuHide,
                ...rest
            } = props;

            return (
                <Trigger
                    menu={menu}
                    onShow={onContextMenuShow}
                    onHide={onContextMenuHide}>
                    <Component {...rest} />
                </Trigger>
            );

        }

        MenuConnector.propTypes = {
            ...Component.propTypes,
            onContextMenuShow: PropTypes.func.isRequired,
            onContextMenuHide: PropTypes.func.isRequired
        };

        return MenuConnector;

    };

}
