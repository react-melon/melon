/**
 * @file 首页
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-prefer-class, fecs-valid-class-jsdoc */

import React from 'react';
import Button from 'melon/Button';

export default function Home({locator}) {
    return (
        <div className="home">
            <section>
                <div className="logo" />
                <h3 className="title">MELON</h3>
                <p className="desc">基于 React 和 Material Design 的 UI 组件库</p>
                <div className="buttons">
                    <Button
                        variants={['raised']}
                        onClick={() => locator.redirect('/components/Button')}>
                        开始
                    </Button>
                    <Button
                        variants={['raised']}
                        onClick={() => {
                            window.location = 'https://github.com/react-melon/melon';
                        }}>
                        Github
                    </Button>
                </div>
            </section>
        </div>
    );
}
