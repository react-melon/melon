/**
 * @file Toggle单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {mount} from 'enzyme';
import then from '../then';

import Toggle from '../../src/Toggle';

describe('Toggle', () => {

    it('uncontrolled', done => {

        let toggle = mount(
            <Toggle
                defaultValue="on"
                trueValue="on"
                falseValue="off" />
        );

        expect(toggle.state('value')).toBe('on');

        const input = toggle.find('input');

        input.instance().checked = false;
        input.at(0).simulate('change');

        then(() => {
            expect(toggle.state('value')).toBe('off');
            toggle.unmount();
            done();
        });

    });

    it('controlled', done => {

        const spy = jasmine.createSpy('toggle-change');

        let toggle = mount(
            <Toggle
                value="on"
                onChange={spy}
                trueValue="on"
                falseValue="off" />
        );

        expect(toggle.state('value')).toBe('on');

        const input = toggle.find('input');

        input.instance().checked = false;
        input.at(0).simulate('change');

        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(toggle.state('value')).toBe('on');
            toggle.setProps({value: 'off'});
        })
        .then(() => {
            expect(toggle.state('value')).toBe('off');
            toggle.unmount();
            done();
        });

    });

    it('disabled', done => {

        const spy = jasmine.createSpy('toggle-change');

        let toggle = mount(
            <Toggle
                value="on"
                disabled={true}
                onChange={spy}
                trueValue="on"
                falseValue="off" />
        );

        expect(toggle.state('value')).toBe('on');

        const input = toggle.find('input');

        input.instance().checked = false;
        input.at(0).simulate('change');

        then(() => {
            expect(spy).not.toHaveBeenCalled();
            expect(toggle.state('value')).toBe('on');
            toggle.unmount();
            done();
        });

    });

    it('readOnly', done => {

        const spy = jasmine.createSpy('toggle-change');

        let toggle = mount(
            <Toggle
                value="on"
                readOnly={true}
                onChange={spy}
                trueValue="on"
                falseValue="off" />
        );

        expect(toggle.state('value')).toBe('on');

        const input = toggle.find('input');

        input.instance().checked = false;
        input.at(0).simulate('change');

        then(() => {
            expect(spy).not.toHaveBeenCalled();
            expect(toggle.state('value')).toBe('on');
            toggle.unmount();
            done();
        });

    });

});
