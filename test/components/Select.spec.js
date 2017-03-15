/**
 * @file Select单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {mount} from 'enzyme';
import Select from '../../src/Select';

/* eslint-disable max-nested-callbacks */

describe('Select', function () {

    const datasource = [
        {value: '1', name: 'Never'},
        {value: '2', name: 'Every Night'},
        {value: '3', name: 'Weeknights'},
        {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
        {value: '5', name: 'Weekly', disabled: true}
    ];

    it('work', done => {

        let wrapper = mount(
            <Select name="a" defaultValue="1">
                <optgroup label="1">
                    {Select.createOptions(datasource)}
                </optgroup>
                <option label="others" value="0" />
            </Select>
        );

        let select = wrapper.instance();

        expect(select.getValue()).toEqual('1');
        expect(select.isOpen()).toBeFalsy();
        wrapper.find('.ui-select').simulate('click');

        setTimeout(() => {

            expect(select.isOpen()).toBeTruthy();
            document.querySelectorAll('.ui-select-option')[1].click();

            setTimeout(() => {

                expect(select.isOpen()).toBeFalsy();
                expect(select.getValue()).toBe('2');
                wrapper.unmount();
                done();

            }, 1000);

        }, 1000);

    });

});
