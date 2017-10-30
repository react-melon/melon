/**
 * @file Tooltip单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {mount} from 'enzyme';
import then from '../then';

import Tooltip from '../../src/Tooltip';
import Button from '../../src/Button';

describe('Tooltip', () => {

    it('over mode', done => {

        let wrapper = mount(
            <Tooltip content="这是一个 tooltip 呢">
                <Button variants={['raised', 'primary']}>哟吼吼</Button>
            </Tooltip>
        );

        expect(wrapper.state('open')).toBe(false);

        wrapper.find('.ui-tooltip').simulate('mouseenter');

        expect(wrapper.state('open')).toBe(true);

        wrapper.find('.ui-tooltip').simulate('mouseleave');

        expect(wrapper.state('open')).toBe(false);

        wrapper.unmount();

        done();

    });

    it('over click', done => {

        let wrapper = mount(
            <Tooltip content="这是一个 tooltip 呢" mode="click">
                <Button variants={['raised', 'primary']}>哟吼吼</Button>
            </Tooltip>
        );

        expect(wrapper.state('open')).toBe(false);

        wrapper.find('.ui-tooltip').simulate('click');

        expect(wrapper.state('open')).toBe(true);

        setTimeout(() => {

            document.body.click();

            expect(wrapper.state('open')).toBe(false);

            wrapper.unmount();

            done();

        }, 20);

    });

    // it('mode click', done => {
    //
    //     component = TestUtils.renderIntoDocument(
    //         <Tooltip mode="click" content="这是一个 tooltip 呢">
    //             <Button variants={['raised', 'primary']}>哟吼吼</Button>
    //         </Tooltip>
    //     );
    //
    //     expect(TestUtils.isCompositeComponent(component)).toBe(true);
    //     expect(component.state.isShown).toBe(false);
    //
    //     const main = component.main;
    //
    //     TestUtils.Simulate.click(main);
    //
    //     then(() => {
    //         expect(component.state.isShown).toBe(true);
    //         TestUtils.Simulate.click(main);
    //     })
    //     .then(() => {
    //         expect(component.state.isShown).toBe(false);
    //         done();
    //     });
    // });
    //
    // ['top', 'left', 'right', 'bottom'].forEach(function (pos) {
    //
    //     it('position ' + pos, () => {
    //
    //         component = TestUtils.renderIntoDocument(
    //             <Tooltip direction={pos} content="这是一个 tooltip 呢" />
    //         );
    //
    //         component.isShown = () => true;
    //
    //         const style = component.getPosition();
    //
    //         expect(style.opacity).toBe(1);
    //         expect(style.left).not.toEqual(undefined);
    //         expect(style.top).not.toEqual(undefined);
    //
    //     });
    //
    // });

});
