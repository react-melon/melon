/**
 * @file Dialog单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import DialogWindow from '../../src/dialog/DialogWindow';
import Dialog from '../../src/Dialog';
import Mask from '../../src/Mask';
import then from '../then';
import Layer from '../../src/Layer';

/* eslint-disable max-nested-callbacks */

describe('Dialog', function () {

    // it('mask will lock scroll', function () {
    //
    //     let wrapper = mount(
    //         <Mask
    //             show={false}
    //             lockScrollingOnShow={true} />
    //     );
    //
    //     expect(document.body.style.overflow).toBe('');
    //
    //     wrapper.setProps({show: true});
    //
    //     expect(document.body.style.overflow).toBe('hidden');
    //
    //     wrapper.unmount();
    //
    // });

    it('dom', done => {

        const dialog = mount(
            <Dialog
                title="test"
                open={false}
                actions={
                    <footer key="1"></footer>
                } />
        );

        expect(dialog.find(Layer).length).toBe(1);
        expect(document.querySelectorAll('.ui-layer').length).toBe(0);

        dialog.setProps({
            open: true
        });

        then(() => {
            // expect(document.querySelectorAll('.ui-layer').length).toBe(1);
            // dialog.unmount();
            done();
        });

    });

    // it('show on create', function (done) {
    //
    //     let dialog = mount(
    //         <Dialog open={true}>Hello</Dialog>
    //     );
    //
    //     then(() => {
    //         expect(dialog.state('open')).toBe(true);
    //         dialog.unmount();
    //         done();
    //     });
    //
    // });
    //
    // it('show/hide on `open` prop change', function (done) {
    //
    //     let dialog = mount(
    //         <Dialog open={false}>
    //             Hello
    //         </Dialog>
    //     );
    //
    //     dialog.setProps({open: true});
    //
    //
    //     expect(dialog.state('open')).toBe(true);
    //     dialog.setProps({open: false});
    //
    //     setTimeout(() => {
    //
    //         expect(dialog.state('open')).toBe(false);
    //         dialog.unmount();
    //         done();
    //
    //     }, 2000);
    //
    //
    // });
    //
    // it('click on mask will hide dialog if `maskClickClose` is true', done => {
    //
    //     let hideSpy = jasmine.createSpy('dialog-hide');
    //
    //     let dialog = mount(
    //         <Dialog
    //             maskClickClose={true}
    //             open={true}
    //             onHide={hideSpy}>
    //             Hello
    //         </Dialog>
    //     );
    //
    //     document.querySelector('.ui-mask').click();
    //
    //     setTimeout(() => {
    //
    //         expect(dialog.state('open')).toBe(false);
    //         expect(hideSpy).toHaveBeenCalled();
    //         dialog.unmount();
    //         done();
    //
    //     }, 2000);
    //
    // });
    //
    // it('click on mask will do nothing if `maskClickClose` is false', done => {
    //
    //     let hideSpy = jasmine.createSpy('dialog-hide');
    //
    //     let dialog = mount(
    //         <Dialog
    //             maskClickClose={false}
    //             open={true}
    //             onHide={hideSpy}>
    //             Hello
    //         </Dialog>
    //     );
    //
    //     document.querySelector('.ui-mask').click();
    //
    //     then(() => {
    //         expect(dialog.state('open')).toBe(true);
    //         expect(hideSpy).not.toHaveBeenCalled();
    //         dialog.unmount();
    //         done();
    //     });
    //
    // });

});

// describe('Dialog:Mask', () => {
//
//     it('dom', function () {
//         const mask = mount(<Mask />);
//         expect(mask.prop('lockScrollingOnShow')).toBe(true);
//         expect(mask.prop('show')).toBe(false);
//         expect(mask.find('div').hasClass('ui-mask')).toBe(true);
//         mask.unmount();
//     });
//
// });
//
// describe('Dialog:Window', () => {
//
//     it('DialogWindow', function () {
//
//         const window = shallow(
//             <DialogWindow footer={<div />} title={<div />}>
//                 Hello
//             </DialogWindow>
//         );
//
//         expect(window.hasClass('ui-dialog-window')).toBe(true);
//
//     });
//
// });
