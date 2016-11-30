/**
 * @file TextBox单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {mount, shallow} from 'enzyme';
import TextBox from '../../src/TextBox';
import TextBoxInput from '../../src/textbox/Input';
import TextBoxFloatingLabel from '../../src/textbox/FloatLabel';
import then from '../then';

/* eslint-disable max-nested-callbacks */

describe('TextBox', function () {

    let textbox;
    let spy;

    beforeEach(() => {

        spy = jasmine.createSpy();

        textbox = mount(
            <TextBox
                floatingLabel="floating"
                defaultValue="haha"
                onFocus={spy}
                onBlur={spy}
                name="haha" />
        );

    });

    afterEach(() => {
        textbox.unmount();
        textbox = null;
    });

    it('init', () => {

        expect(textbox.state()).toEqual({
            isFocus: false,
            value: 'haha'
        });

        expect(textbox.instance().getValue()).toEqual('haha');

    });

    it('focus', done => {

        textbox.find('input').simulate('focus');

        then(() => {

            expect(textbox.state()).toEqual({
                isFocus: true,
                value: 'haha'
            });

            expect(spy).toHaveBeenCalled();

            expect(spy.calls.allArgs()).toEqual([[{
                type: 'focus',
                target: textbox.instance()
            }]]);

            done();
        });

    });


    it('change', done => {

        const input = textbox.find('input');
        input.get(0).value = 'aaa';
        input.simulate('change');

        then(() => {
            expect(textbox.instance().getValue()).toBe('aaa');
            done();
        });

    });


    it('blur', done => {

        textbox.find('input').simulate('blur');

        then(() => {
            expect(textbox.state('value')).toBe('haha');
        })
        .then(() => {

            expect(!!textbox.state.isFocus).toBe(false);

            expect(spy.calls.count()).toEqual(1);
            expect(spy.calls.mostRecent().args[0]).toEqual({
                type: 'blur',
                target: textbox.instance()
            });

            done();
        });

    });

});

describe('TextBox floating-label:', () => {

    it('no-float-label', function () {

        let textbox = shallow(
            <TextBox value="haha" />
        );

        // <div className="ui-text-box ">
        //     <TextBoxInput
        //         ref={() => {}}
        //         isFocus={false}
        //         onBlur={() => {}}
        //         onChange={() => {}}
        //         onFocus={() => {}}
        //         rows={2}
        //         type="text"
        //         value="haha" />
        // </div>

        expect(textbox.hasClass('state-floating')).toBe(false);
        expect(textbox.find(TextBoxFloatingLabel).length).toBe(0);

    });

    it('floating while value\'s length > 0', () => {

        let textbox = shallow(
            <TextBox value="haha" floatingLabel="test" />
        );

        expect(textbox.hasClass('state-floating')).toBe(true);
        expect(textbox.find(TextBoxFloatingLabel).length).toBe(1);

    });

    it('floating while focus without value', done => {

        const textbox = mount(
            <TextBox floatingLabel="floating" name="haha" value="" />
        );

        expect(textbox.state('isFocus')).toBe(false);
        expect(textbox.find(TextBoxFloatingLabel).length).toBe(1);

        const input = textbox.find('input');

        input.simulate('focus');

        then(() => {
            expect(textbox.state('isFocus')).toBe(true);
            expect(
                textbox
                    .find(TextBoxFloatingLabel)
                    .prop('floating')
            ).toBe(true);
            input.simulate('blur');
        })
        .then(() => {

            expect(textbox.state('isFocus')).toBe(false);
            expect(
                textbox
                    .find(TextBoxFloatingLabel)
                    .prop('floating')
            ).toBe(false);

            done();

        });

    });

});

describe('TextBox multiline & controled', () => {

    let textbox;
    let value = '';
    let changeSuffix = 'a';

    beforeEach(() => {
        textbox = mount(
            <TextBox
                value={value}
                multiline={true}
                onChange={e => {
                    textbox.setProps({
                        value: e.value + 'a'
                    });
                }}
            />
        );
    });

    afterEach(() => {
        textbox.unmount();
        textbox = null;
        value = '';
    });

    it('init', () => {
        expect(textbox.state('value')).toBe(value);
        expect(textbox.prop('value')).toBe(value);
    });

    it('change', done => {

        const changeValue = 't';
        const textarea = textbox.find('textarea');
        textarea.get(0).value = changeValue;
        textarea.simulate('change');

        then(() => {
            const expectedValue = `${changeValue}${changeSuffix}`;
            expect(textbox.prop('value')).toBe(expectedValue);
            expect(textbox.prop('value')).toBe(expectedValue);
            done();
        });

    });

    // it('uncontrolled sync height after change', () => {
    //
    //     const text = mount(
    //         <TextBox defaultValue="123" multiline={true} />
    //     );
    //
    //     spyOn(TextBox.prototype, 'syncTextareaHeight').and.callThrough();
    //
    //     const textarea = text.find('textarea');
    //     textarea.get(0).value = '333';
    //     textarea.simulate('change');
    //
    //     then(() => {
    //         expect(TextBox.prototype.syncTextareaHeight).toHaveBeenCalled();
    //     });
    //
    // });

});
