/**
 * @file Pager单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Pager from '../../src/Pager';
import Icon from '../../src/Icon';

/* global before */

describe('Pager', () => {

    it('dom', function () {
        const renderer = TestUtils.createRenderer();
        renderer.render(
            <Pager total={2} page={1} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <ul className="ui-pager" page={1} disabled={false} onClick={function noRefCheck() {}}>
                <li
                    className="ui-pager-item state-prev"
                    data-page={0}
                    data-role="pager-item">
                    <a href="#">
                        <Icon icon="navigate-before" />
                    </a>
                </li>
                <li
                    className={'ui-pager-item'}
                    key={1}
                    data-role="pager-item"
                    data-page={0}>
                    <a href="#">1</a>
                </li>
                <li
                    className={'ui-pager-item state-current'}
                    key={2}
                    data-role="pager-item"
                    data-page={1}>
                    <a href="#">2</a>
                </li>
                <li
                    className="ui-pager-item state-disabled state-next"
                    data-page={1}
                    data-role="pager-item">
                    <a href="#">
                        <Icon icon="navigate-next" />
                    </a>
                </li>
            </ul>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    describe('click', () => {

        let component;
        let spy;
        let items;

        let current;
        let prev;
        let next;

        beforeEach(() => {
            spy = expect.createSpy();
            component = TestUtils.renderIntoDocument(<Pager total={10} page={1} onChange={spy} />);
            items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-pager-item');

            current = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-pager-item state-current');
            prev = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-pager-item state-prev');
            next = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-pager-item state-next');
        });

        afterEach(() => {
            spy = component = current = prev = next = null;
            items.length = 0;
            items = null;
        });

        it('base', () => {
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(TestUtils.isDOMComponent(current)).toBe(true);
            expect(TestUtils.isDOMComponent(prev)).toBe(true);
            expect(TestUtils.isDOMComponent(next)).toBe(true);
            expect(items.length).toBe(9);
            expect(component.props.page).toBe(1);
            expect(component.state.page).toBe(1);
        });

        it('click page', done => {

            TestUtils.Simulate.click(items[5]);

            then(() => {
                expect(component.state.page).toBe(4);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('click prev', done => {

            TestUtils.Simulate.click(prev);

            then(() => {
                expect(component.state.page).toBe(0);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('click next', done => {

            TestUtils.Simulate.click(next);

            then(() => {
                expect(component.state.page).toBe(2);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

    });


});

