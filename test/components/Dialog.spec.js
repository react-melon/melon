/**
 * @file Dialog单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import DialogWindow from '../../src/dialog/DialogWindow';
import Dialog from '../../src/Dialog';
import Alert from '../../src/Alert';
import Confirm from '../../src/Confirm';
import Mask from '../../src/Mask';
import then from '../then';

describe('Dialog', function () {

    it('mask will lock scroll', function (done) {

        let TestComponent = React.createClass({

            getInitialState() {
                return {
                    show: false
                };
            },

            componentDidMount() {
                this.setState({show: true}, () => {
                    const body = document.getElementsByTagName('body')[0];
                    expect(body.style.overflow).toBe('hidden');
                    done();
                });
            },

            render() {

                return (
                    <Mask
                        show={this.state.show}
                        lockScrollingOnShow={true} />
                );

            }
        });

        mount(<TestComponent />);

    });

    it('dom', () => {

        const dialog = mount(
            <Dialog
                title="test"
                actions={
                    <footer></footer>
                } />
        );

        expect(dialog.find('.ui-dialog-title').length).toBe(1);

        const actions = dialog.find('.ui-dialog-actions');

        expect(actions.length).toBe(1);
        expect(actions.contains(<footer />)).toBe(true);


    });

    it('show on create', function (done) {

        // let showSpy = jasmine.createSpy('dialog-show');
        // let hideSpy = jasmine.createSpy('dialog-hide');

        let dialog = mount(
            <Dialog open={true}>Hello</Dialog>
        );

        then(() => {
            expect(dialog.state('open')).toBe(true);
            dialog.unmount();
            done();
        });

    });

    it('show/hide on `open` prop change', function (done) {

        let showSpy = jasmine.createSpy('dialog-show');
        let hideSpy = jasmine.createSpy('dialog-hide');

        let dialog = mount(
            <Dialog
                open={false}
                onShow={showSpy}
                onHide={hideSpy}>
                Hello
            </Dialog>
        );

        dialog.setProps({open: true});

        then(() => {
            expect(dialog.state('open')).toBe(true);
            expect(showSpy).toHaveBeenCalled();
            dialog.setProps({open: false});
        }).then(() => {
            expect(dialog.state('open')).toBe(false);
            expect(hideSpy).toHaveBeenCalled();
            dialog.unmount();
            done();
        });

    });

    it('click on mask will hide dialog if `maskClickClose` is true', done => {

        let hideSpy = jasmine.createSpy('dialog-hide');

        let dialog = mount(
            <Dialog
                maskClickClose={true}
                open={true}
                onHide={hideSpy}>
                Hello
            </Dialog>
        );

        dialog.find('.ui-mask').simulate('click');

        then(() => {
            expect(dialog.state('open')).toBe(false);
            expect(hideSpy).toHaveBeenCalled();
            dialog.unmount();
            done();
        });

    });

    it('click on mask will do nothing if `maskClickClose` is false', done => {

        let hideSpy = jasmine.createSpy('dialog-hide');

        let dialog = mount(
            <Dialog
                maskClickClose={false}
                open={true}
                onHide={hideSpy}>
                Hello
            </Dialog>
        );

        dialog.find('.ui-mask').simulate('click');

        then(() => {
            expect(dialog.state('open')).toBe(true);
            expect(hideSpy).not.toHaveBeenCalled();
            dialog.unmount();
            done();
        });

    });

});

describe('Dialog:Mask', () => {

    it('dom', function () {
        const mask = mount(<Mask />);

        expect(mask.prop('lockScrollingOnShow')).toBe(true);
        expect(mask.prop('show')).toBe(false);
        expect(mask.find('div').hasClass('ui-mask')).toBe(true);

    });

});

describe('Dialog:Window', () => {

    it('DialogWindow', function () {

        const window = shallow(
            <DialogWindow
                footer={<div />}
                title={<div />}
                top={100}>
                Hello
            </DialogWindow>
        );

        // let expectedElement = (
        //     <div
        //         className="ui-dialog-window"
        //         style={{
        //             transform: 'translate(0, 100px)',
        //             WebkitTransform: 'translate(0, 100px)',
        //             msTransform: 'translate(0, 100px)',
        //             MozTransform: 'translate(0, 100px)'
        //         }}>
        //         <div />
        //         Hello
        //         <div />
        //     </div>
        // );

        expect(window.hasClass('ui-dialog-window')).toBe(true);
        expect(window.prop('style')).toEqual({
            transform: 'translate(0, 100px)',
            WebkitTransform: 'translate(0, 100px)',
            msTransform: 'translate(0, 100px)',
            MozTransform: 'translate(0, 100px)'
        });

    });

});


describe('Alert', () => {

    it('work', done => {

        let spy = jasmine.createSpy('alert-confirm-spy');

        let alert = mount(
            <Alert
                title="hello"
                onConfirm={spy}
                open={true}>
                报警！
            </Alert>
        );

        let dialog = alert.find('.ui-dialog');
        let button = alert.find('.ui-button');

        expect(button.length).toBe(1);
        expect(dialog.length).toBe(1);

        button.simulate('click');

        then(() => {

            expect(spy).toHaveBeenCalled();
            alert.unmount();
            done();

        });

    });

    it('Alert.show', () => {

        expect(typeof Alert.show).toBe('function');

        const destroy = Alert.show({
            content: 'haha'
        });

        expect(typeof destroy === 'function').toBe(true);

        let elements = document.querySelectorAll(
            '.melon-seperate-dialog-container>div'
        );

        expect(elements.length).toBe(1);

        destroy();

        elements = document.querySelectorAll(
            '.melon-seperate-dialog-container>div'
        );

        expect(elements.length).toBe(0);

    });

});


describe('Confirm', () => {

    it('work', done => {

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

        let dialog = confirm.find('.ui-dialog');

        let button = confirm.find('.ui-button');

        expect(button.length).toBe(2);

        button.at(0).simulate('click');

        then(() => {
            expect(dialog.hasClass('state-open')).toBe(true);
            expect(cancelSpy).toHaveBeenCalled();
            button.at(1).simulate('click');
        })
        .then(() => {
            expect(dialog.hasClass('state-open')).toBe(true);
            expect(confirmSpy).toHaveBeenCalled();
            confirm.setProps({open: false});
        })
        .then(() => {
            expect(dialog.hasClass('state-open')).toBe(false);
            confirm.unmount();
            done();
        });


    });

    it('Confirm.show', () => {

        expect(typeof Confirm.show).toBe('function');

        const destroy = Confirm.show({
            content: 'haha'
        });

        expect(typeof destroy === 'function').toBe(true);

        let elements = document.querySelectorAll(
            '.melon-seperate-dialog-container>div'
        );

        expect(elements.length).toBe(1);

        destroy();

        elements = document.querySelectorAll(
            '.melon-seperate-dialog-container>div'
        );

        expect(elements.length).toBe(0);

    });

});
