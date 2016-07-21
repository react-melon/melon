/**
 * @file SelectSeparatePopup 单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SelectSeparatePopup from '../../../src/select/SeparatePopup';

describe('SelectSeparatePopup', function () {

    let node;
    let target;
    let spy;

    beforeEach(() => {
        node = document.createElement('div');
        target = document.createElement('div');
        document.body.appendChild(target);
        document.body.appendChild(node);
        spy = jasmine.createSpy();
        jasmine.clock().install();
    });

    afterEach(() => {
        document.body.removeChild(target);
        ReactDOM.unmountComponentAtNode(node);
        document.body.removeChild(node);
        spy = target = node = null;
        jasmine.clock().uninstall();
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
        expect(TestUtils.isDOMComponent(content)).toBeTruthy();

        component = ReactDOM.render(
            <SelectSeparatePopup
                open={true}
                target={target}
                onHide={spy} />,
            node,
            () => {
                expect(component.state.styles.opacity).toBe(1);
                done();
            }
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
        expect(spy).toHaveBeenCalled();
        component.onClick({target: component.main});
        expect(spy.calls.count()).toBe(1);
    });

    it('resize', () => {

        let component = ReactDOM.render(
            <SelectSeparatePopup
                open={true}
                target={target}
                onHide={spy} />,
                node
        );

        const setStateSpy = spyOn(component, 'setState');
        component.onWindowResize();

        jasmine.clock().tick(1500);

        expect(setStateSpy.calls.count()).toBe(1);

    });

});
