/**
 * @file Example / ButtonSize
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import Button from 'melon/Button';
import Title from 'melon/Title';

require('../code/ButtonSize.txt');

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <Button variants={['raised', 'primary']} size="xxs">xxs</Button>
                <Button variants={['raised', 'primary']} size="xs">xs</Button>
                <Button variants={['raised', 'primary']} size="s">s</Button>
                <Button variants={['raised', 'primary']} size="m">m</Button>
                <Button variants={['raised', 'primary']} size="l">l</Button>
                <Button variants={['raised', 'primary']} size="xl">xl</Button>
                <Button variants={['raised', 'primary']} size="xxl">xxl</Button>
                <Button variants={['raised', 'primary']} size="xxxl">xxxl</Button>
            </div>
            <div className="melon-column melon-column-12">
                <Title level={4}>禁用的按钮</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-12">
                        <Button disabled>disabled</Button>
                        <Button variants={['raised']} disabled>disabled</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = View;
