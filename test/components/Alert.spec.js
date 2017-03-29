/**
 * @file Alert Spec
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {mount} from 'enzyme';
import Alert from '../../src/Alert';

import '../../src/css/theme/default/index.styl';
import '../../src/css/base.styl';
import '../../src/css/Dialog.styl';

describe('Alert', () => {

    it('as a component', done => {

        let spy = jasmine.createSpy('alert-confirm-spy');

        let alert = mount(
            <Alert
                title="hello"
                onConfirm={spy}
                open={true}>
                报警！
            </Alert>
        );

        let dialog = document.querySelectorAll('.ui-dialog');
        let button = document.querySelectorAll('.ui-button');

        expect(button.length).toBe(1);
        expect(dialog.length).toBe(1);

        button[0].click();

        setTimeout(() => {

            expect(spy).toHaveBeenCalled();
            alert.unmount();
            done();

        }, 1000);


    });

    it('as an API', done => {

        expect(typeof Alert.show).toBe('function');

        const destroy = Alert.show({
            children: 'haha'
        });

        expect(typeof destroy === 'function').toBe(true);

        let elements = document.querySelectorAll(
            '.melon-seperate-dialog-container>div'
        );

        expect(elements.length).toBe(1);

        destroy();

        setTimeout(() => {
            elements = document.querySelectorAll(
                '.melon-seperate-dialog-container>div'
            );
            expect(elements.length).toBe(0);
            done();
        }, 1000);


    });

});
