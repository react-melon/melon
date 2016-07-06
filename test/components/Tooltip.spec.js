/**
 * @file Tooltip单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Tooltip from '../../src/Tooltip';
import Button from '../../src/Button';

describe('Tooltip', () => {

    let component;

    afterEach(() => {
        component = null;
    });

    it('work', done => {

        component = TestUtils.renderIntoDocument(
            <Tooltip content="这是一个 tooltip 呢">
                <Button variants={['raised', 'primary']}>哟吼吼</Button>
            </Tooltip>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(component.state.isShown).toBe(false);

        const main = component.main;
        expect(TestUtils.isDOMComponent(main)).toBe(true);

        TestUtils.Simulate.mouseEnter(main);

        then(() => {
            expect(component.state.isShown).toBe(true);
            TestUtils.Simulate.mouseLeave(main);
        })
        .then(() => {
            expect(component.state.isShown).toBe(false);
            component.toggle();
        })
        .then(() => {
            expect(component.state.isShown).toBe(true);
            component.toggle();
        })
        .then(() => {
            expect(component.state.isShown).toBe(false);
            done();
        });
    });

    it('mode click', done => {

        component = TestUtils.renderIntoDocument(
            <Tooltip mode="click" content="这是一个 tooltip 呢">
                <Button variants={['raised', 'primary']}>哟吼吼</Button>
            </Tooltip>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(component.state.isShown).toBe(false);

        const main = component.main;

        TestUtils.Simulate.click(main);

        then(() => {
            expect(component.state.isShown).toBe(true);
            TestUtils.Simulate.click(main);
        })
        .then(() => {
            expect(component.state.isShown).toBe(false);
            done();
        });
    });

    ['top', 'left', 'right', 'bottom'].forEach(function (pos) {

        it('position ' + pos, () => {

            component = TestUtils.renderIntoDocument(
                <Tooltip direction={pos} content="这是一个 tooltip 呢" />
            );

            component.isShown = () => true;

            const style = component.getPosition();

            expect(style.opacity).toBe(1);
            expect(style.left).toNotEqual(undefined);
            expect(style.top).toNotEqual(undefined);

        });

    });

});
