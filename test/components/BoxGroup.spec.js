/**
 * @file BoxGroup单测
 * @author cxtom(cxtom2008@gmail.com)
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import TestUtils, {createRenderer} from 'react-addons-test-utils';
import {shallow, mount} from 'enzyme';

import BoxGroup from '../../src/BoxGroup';
import Icon from '../../src/Icon';
import CenterRipple from '../../src/ripples/CenterRipple';
import BoxGroupOption from '../../src/boxgroup/Option';
import then from '../then';

const datasource = [
    {value: '1', name: 'Never'},
    {value: '2', name: 'Every Night'},
    {value: '3', name: 'Weeknights'},
    {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
    {value: '5', name: 'Weekly', disabled: true}
];

const noop = function () {};

/* eslint-disable max-nested-callbacks */

describe('BoxGroup', function () {

    it('Option', () => {
        const renderer = createRenderer();
        renderer.render(
            <BoxGroupOption
                boxModel={'checkbox'}
                label={'test'}
                value={'a'}
                checked={true}
                name={'test'}
                disabled={false}
                onChange={noop} />
        );
        const actualElement = renderer.getRenderOutput();
        const expectedElement = (
            <label className={'ui-box-group-option state-checked'} onClick={noop}>
                <input
                    disabled={false}
                    checked={true}
                    type={'checkbox'}
                    value={'a'}
                    name={'test'}
                    readOnly={undefined}
                    onChange={noop} />
                <Icon icon={BoxGroupOption.Icons.checkbox.checked}>
                    <CenterRipple ref="ripple" />
                </Icon>
                test
            </label>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    describe('uncontrolled checkbox', () => {

        it('init', () => {

            let boxgroup = shallow(
                <BoxGroup defaultValue={['1']}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            // 5 个选项
            expect(boxgroup.find(BoxGroupOption).length).toBe(5);
            // 1 个选中
            expect(boxgroup.find({checked: true}).length).toBe(1);
            // value 是 ['1']
            expect(boxgroup.state('value')).toEqual(['1']);

            boxgroup.unmount();

        });

        it('check', done => {

            let boxgroup = mount(
                <BoxGroup defaultValue={['1']}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            const inputs = boxgroup.find('input');

            inputs.get(2).checked = true;
            inputs.at(2).simulate('change');

            then(() => {

                // 2 个选中
                expect(boxgroup.find({checked: true}).length).toBe(2);
                expect(boxgroup.state('value')).toEqual(['1', '3']);
                done();

            });

        });


        it('unchecked', done => {

            let boxgroup = mount(
                <BoxGroup defaultValue={['1']}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            const inputs = boxgroup.find('input');

            inputs.get(0).checked = true;
            inputs.at(0).simulate('change');

            then(() => {

                // 2 个选中
                expect(boxgroup.find({checked: true}).length).toBe(0);
                expect(boxgroup.state('value')).toEqual([]);
                done();

            });

        });

    });


    describe('disabled', () => {

        it('Option disabled will not appear in getValue()', () => {

            const value = ['1', '2', '3'];

            const datasource = [{
                value: '1',
                label: 'a'
            }, {
                value: '2',
                label: 'b'
            }, {
                value: '3',
                label: 'c',
                disabled: true
            }];

            const boxgroup = shallow(
                <BoxGroup disabled value={value}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            expect(boxgroup.instance().getValue()).toEqual(['1', '2']);

        });

    });

});

describe('BoxGropu:radio', () => {

    it('init', () => {

        const boxgroup = shallow(
            <BoxGroup boxModel="radio">
                {BoxGroup.createOptions(datasource)}
            </BoxGroup>
        );

        const options = boxgroup.find(BoxGroupOption);

        expect(options.length).toBe(5);
        expect(boxgroup.instance().getValue()).toEqual([]);

    });

    it('defaultValue', () => {

        const boxgroup = shallow(
            <BoxGroup boxModel="radio" defaultValue={['1']}>
                {BoxGroup.createOptions(datasource)}
            </BoxGroup>
        );

        const options = boxgroup.find(BoxGroupOption);

        expect(options.length).toBe(5);
        expect(boxgroup.instance().getValue()).toEqual(['1']);

    });

    it('uncontrolled click', done => {

        const boxgroup = mount(
            <BoxGroup boxModel="radio">
                {BoxGroup.createOptions(datasource)}
            </BoxGroup>
        );

        const inputs = boxgroup.find('input');

        inputs.get(0).checked = true;
        inputs.at(0).simulate('change');

        then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['1']);
            inputs.get(1).checked = true;
            inputs.at(1).simulate('change');
        })
        .then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['2']);
            boxgroup.unmount();
            done();
        });


    });



    it('click checked', done => {

        const boxgroup = mount(
            <BoxGroup boxModel="radio" defaultValue={['1']}>
                {BoxGroup.createOptions(datasource)}
            </BoxGroup>
        );

        const inputs = boxgroup.find('input');

        inputs.get(0).checked = true;
        inputs.at(0).simulate('change');

        then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['1']);
            inputs.get(1).checked = true;
            inputs.at(1).simulate('change');
        })
        .then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['2']);
            boxgroup.unmount();
            done();
        });

    });

    it('controlled', done => {

        const boxgroup = mount(
            <BoxGroup boxModel="radio" value={['1']}>
                {BoxGroup.createOptions(datasource)}
            </BoxGroup>
        );

        const inputs = boxgroup.find('input');

        inputs.get(3).checked = true;
        inputs.at(3).simulate('change');

        then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['1']);
            inputs.get(1).checked = true;
            inputs.at(1).simulate('change');
        })
        .then(() => {
            expect(boxgroup.instance().getValue()).toEqual(['1']);
            boxgroup.unmount();
            done();
        });

    });

});
