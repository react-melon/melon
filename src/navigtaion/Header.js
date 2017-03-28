/**
 * @file NavigationHeader
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import Title from '../Title';

export default class NavigationHeader extends Component {

    render() {

        let {
            children,
            variants = [],
            ...rest
        } = this.props;

        return (
            <Title
                {...rest}
                level={4}
                variants={[...variants, 'navigation-header']}>
                {children}
            </Title>
        );
    }

}
