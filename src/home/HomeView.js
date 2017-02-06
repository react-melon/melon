/**
 * @file HomeView
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import {connect} from 'ei';

import Title from 'melon/Title';
import Button from 'melon/Button';
import Link from 'melon/Link';

const cx = require('melon-core/classname/cxBuilder').create('Homeview');

class HomeView extends React.Component {

    render() {

        return (
            <div className={cx(this.props).build()}>
                <div className={cx().part('header').build()}>
                    <div className={cx().part('header-logo').build()} />
                    <Title level={1}>melon ui</Title>
                    <p>A Set of React Components that Implement</p>
                    <p>Google's Material Design</p>
                </div>
                <div className={cx().part('info').build()}>
                    <p>
                        Melon是一款基于
                        <Link target="_blank" href="http://facebook.github.io/react/">React</Link>
                        ，采用
                        <Link target="_blank" href="https://www.google.com/design/spec/material-design/introduction.html">Google's Material Design</Link>
                        设计的组件库。
                    </p>
                </div>
                <div className={cx().part('install').build()}>
                    <Title level={2}>安装</Title>
                    <div>$ bower install melon --save</div>
                </div>
                <div className={cx().part('github').build()}>
                    <p>请在github上关注我们的项目</p>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={() => {
                            window.location = 'https://github.com/react-melon/melon/';
                        }}>
                        GITHUB
                    </Button>
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
