/**
 * @file BoxGroup单测
 * @author cxtom(cxtom2010@gmail.com)
 * @author leon(ludafa@outlook.com)
 */

/* globals before */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils, {createRenderer} from 'react-addons-test-utils';


import BoxGroup from '../../src/BoxGroup';
import Icon from '../../src/Icon';
import CenterRipple from '../../src/ripples/CenterRipple';
import BoxGroupOption from '../../src/boxgroup/Option';
import then from '../then';

expect.extend(expectJSX);

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
                <Icon icon={BoxGroupOption.Icons.checkbox.checked} />
                test
                <CenterRipple ref="ripple" />
            </label>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    describe('checkbox', () => {

        let component;
        let boxgroup;
        let options;
        let inputs;

        before(() => {
            component = TestUtils.renderIntoDocument(
                <BoxGroup value={['1']}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            boxgroup = TestUtils.findRenderedComponentWithType(component, BoxGroup);
            options = TestUtils.scryRenderedDOMComponentsWithTag(component, 'label');
            inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
        });


        it('init', () => {

            expect(TestUtils.isCompositeComponent(boxgroup)).toBe(true);
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(options.length).toBe(5);
            expect(TestUtils.isDOMComponent(options[0])).toBe(true);

            expect(options[0].className).toInclude('state-checked');

            expect(boxgroup.getValue()).toEqual(['1']);

        });

        it('click', done => {

            inputs[2].checked = true;
            TestUtils.Simulate.change(inputs[2]);

            then(() => {
                expect(options[2].className).toInclude('state-checked');
                expect(boxgroup.getValue()).toEqual(['1', '3']);
                done();
            });

        });


        it('click checked', done => {

            inputs[0].checked = false;
            TestUtils.Simulate.change(inputs[0]);

            then(() => {
                expect(options[0].className).toExclude('state-checked');
                expect(boxgroup.getValue()).toEqual(['3']);
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

            const component = TestUtils.renderIntoDocument(
                <BoxGroup disabled value={value}>
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            const boxgroup = TestUtils.findRenderedComponentWithType(component, BoxGroup);

            expect(boxgroup.getValue()).toEqual(['1', '2']);

        });

    });


    describe('radio', () => {

        let component;
        let boxgroup;
        let options;
        let inputs;

        before(() => {
            component = TestUtils.renderIntoDocument(
                <BoxGroup boxModel="radio">
                    {BoxGroup.createOptions(datasource)}
                </BoxGroup>
            );

            boxgroup = TestUtils.findRenderedComponentWithType(component, BoxGroup);
            options = TestUtils.scryRenderedDOMComponentsWithTag(component, 'label');
            inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
        });

        it('init', () => {

            expect(TestUtils.isCompositeComponent(boxgroup)).toBe(true);
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(options.length).toBe(5);
            expect(TestUtils.isDOMComponent(options[0])).toBe(true);
            expect(boxgroup.getValue()).toEqual([]);

        });

        it('click', done => {

            TestUtils.Simulate.change(inputs[2]);
            TestUtils.Simulate.click(options[2]);

            then(() => {
                expect(options[2].className).toInclude('state-checked');
                expect(boxgroup.getValue()).toEqual(['3']);

                TestUtils.Simulate.change(inputs[0]);
            })
            .then(() => {
                expect(options[2].className).toExclude('state-checked');
                expect(options[0].className).toInclude('state-checked');
                expect(boxgroup.getValue()).toEqual(['1']);

                done();
            });

        });

        it('click checked', done => {

            TestUtils.Simulate.change(inputs[0]);

            then(() => {
                expect(options[0].className).toInclude('state-checked');
                expect(boxgroup.getValue()).toEqual(['1']);

                done();
            });

        });


    });


});
