/**
 * @file Confirm
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {mount} from 'enzyme';
import Confirm from '../../src/Confirm';
import then from '../then';

/* eslint-disable max-nested-callbacks */

describe('Confirm', () => {

    it('as a component', done => {

        let confirmSpy = jasmine.createSpy('confirm-confirm-spy');
        let cancelSpy = jasmine.createSpy('confirm-cancel-spy');

        let confirm = mount(
            <Confirm
                title="hello"
                onConfirm={confirmSpy}
                onCancel={cancelSpy}
                open={true}>
                报警！
            </Confirm>
        );

        let dialog = document.querySelectorAll('.ui-dialog');
        let buttons = document.querySelectorAll('.ui-button');

        expect(dialog.length).toBe(1);
        expect(buttons.length).toBe(2);

        buttons[1].click();

        then(() => {
            expect(dialog[0].classList.contains('state-open')).toBe(true);
            expect(cancelSpy).toHaveBeenCalled();
            buttons[0].click();
        })
        .then(() => {
            expect(dialog[0].classList.contains('state-open')).toBe(true);
            expect(confirmSpy).toHaveBeenCalled();
            confirm.setProps({open: false});

            setTimeout(() => {
                expect(dialog[0].parentNode == null).toBe(true);
                confirm.unmount();
                done();
            }, 1100);

        });

    });

    it('as an API', done => {

        expect(typeof Confirm.show).toBe('function');

        const destroy = Confirm.show({
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
