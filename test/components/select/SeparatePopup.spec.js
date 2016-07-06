/**
 * @file SelectSeparatePopup 单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SelectSeparatePopup from '../../../src/select/SeparatePopup';
import then from '../../then';
import waitFor from '../../waitFor';


describe('SelectSeparatePopup', function () {

    let node;
    let target;
    let spy;

    beforeEach(() => {
        node = document.createElement('div');
        target = document.createElement('div');
        document.body.appendChild(target);
        document.body.appendChild(node);
        spy = expect.createSpy();
    });

    afterEach(() => {
        document.body.removeChild(target);
        ReactDOM.unmountComponentAtNode(node);
        document.body.removeChild(node);
        spy = target = node = null;
    });

    it('work', done => {

        let component = ReactDOM.render(
            <SelectSeparatePopup
                open={false}
                target={target}
                onHide={spy} />,
                node
        );
        let content;

        then(() => {

            expect(component.state).toEqual({
                styles: {
                    top: 0,
                    left: -5000,
                    height: 0,
                    opacity: 0,
                    width: 0
                }
            });

            content = component.main;
            expect(TestUtils.isDOMComponent(content)).toBe(true);

            component = ReactDOM.render(
                <SelectSeparatePopup
                    open={true}
                    target={target}
                    onHide={spy} />,
                    node
            );

        });

        waitFor(
            () => content.style.opacity === '1',
            'Animate failed!',
            done,
            1500
        );

    });

    it('click hide', () => {
        let component = ReactDOM.render(
            <SelectSeparatePopup
                open={true}
                target={target}
                onHide={spy} />,
                node
        );
        component.onClick({target});
        expect(spy.calls.length).toBe(1);
        component.onClick({target: component.main});
        expect(spy.calls.length).toBe(1);
    });

    it('resize', done => {

        let component = ReactDOM.render(
            <SelectSeparatePopup
                open={true}
                target={target}
                onHide={spy} />,
                node
        );

        const setStateSpy = expect.spyOn(component, 'setState');
        component.onWindowResize();

        waitFor(
            () => setStateSpy.calls.length === 1,
            'onWindowResize has not been called',
            done,
            1500
        );

    });

});
