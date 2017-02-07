/**
 * @file HomeView
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import {connect} from 'ei';

import Title from 'melon/Title';
import Link from 'melon/Link';

const cx = require('melon-core/classname/cxBuilder').create('Homeview');

class HomeView extends React.Component {

    render() {

        return (
            <div className={cx(this.props).build()}>
                <div className={cx().part('header').build()}>
                    <div className={cx().part('header-logo').build()} />
                    <Title level={1}>melon</Title>
                    <p>A Set of React Components that Implement</p>
                    <p>{'Google\'s Material Design'}</p>
                    <Link
                        href="#/components?name=Button"
                        variants={['raised', 'secondery', 'button']}>
                        DEMO
                    </Link>
                </div>
                <div className={cx().part('github').build()}>
                    <p>Check out our repo for more information.</p>
                    <Link
                        href="https://github.com/react-melon/melon/"
                        variants={['raised', 'primary', 'button']}>
                        GITHUB
                    </Link>
                </div>
                <div className={cx().part('footer').build()}>
                    <p>©2015 Baidu</p>
                </div>
            </div>
        );
    }

}

HomeView.displayName = 'HomeView';

module.exports = connect(HomeView, true);
