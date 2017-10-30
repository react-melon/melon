/**
 * @file SnackBar单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import SnackBar from '../../src/SnackBar';
import Button from '../../src/Button';

import then from '../then';
import waitFor from '../waitFor';

describe('SnackBar', function () {

    beforeEach(() => {
        waitFor.clear();
    });

    it('dom', function () {

        const wrapper = shallow(
            <SnackBar message={'hello'} />,
            {disableLifecycleMethods: true}
        );

        expect(wrapper.hasClass('ui-snack-bar')).toBe(true);
        expect(wrapper.hasClass('variant-direction-bl')).toBe(true);
        expect(wrapper.children().length).toBe(2);

        let message = wrapper.find('.ui-snack-bar-message');
        expect(message.length).toBe(1);
        expect(message.text()).toBe('hello');

        let button = wrapper.find(Button);
        expect(button.length).toBe(1);
        expect(button.prop('variants')).toEqual(['snackbar']);

    });

    it('show', done => {
        SnackBar.show('test', 0, 'bc');
        then(() => {
            let snackbar = document.querySelector('.ui-snack-bar');
            expect(snackbar.className).toBe('ui-snack-bar variant-direction-bc state-open');
            let button = document.querySelector('button');
            jasmine.clock().install();
            button.click();
            jasmine.clock().tick(1);

            snackbar = document.querySelector('.ui-snack-bar');
            expect(snackbar.className).toBe('ui-snack-bar variant-direction-bc');

            jasmine.clock().tick(410);

            expect(document.querySelector('.ui-snack-bar')).toBeNull();
            jasmine.clock().uninstall();
            done();
        });
    });

    it('autoHideDuration', done => {
        let component = mount(
            <SnackBar
                message="test"
                autoHideDuration={10}
                openOnMount={true} />
        );

        expect(component.state('open')).toBe(true);

        waitFor(
            () => component.state('open') === false,
            'SnackBar did not hide after 10ms',
            () => {
                component.unmount();
                done();
            }
        );

    });

    it('clickAway', done => {
        let showSpy = jasmine.createSpy();
        let hideSpy = jasmine.createSpy();
        let component = mount(
            <SnackBar
                message="test"
                direction="lc"
                onShow={showSpy}
                onHide={hideSpy}
                openOnMount={true} />
        );

        expect(component.state('open')).toBe(true);
        expect(showSpy).toHaveBeenCalled();

        component.instance().onMouseUp({target: document.body});

        then(() => {
            expect(component.state('open')).toBe(false);
            expect(hideSpy).toHaveBeenCalled();
            component.unmount();
            done();
        });

    });

});
