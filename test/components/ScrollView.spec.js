/**
 * @file ScrollBar spec
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ScrollView from '../../src/ScrollView';
import {mount} from 'enzyme';
import '../../src/css/theme/default/index.styl';
import '../../src/css/base.styl';
import '../../src/css/ScrollView.styl';
import then from '../then';

function getMockText() {

    let content = '';

    for (let i = 0; i < 200; i++) {
        content += 'abcdefghijklmn ';
    }

    return content;

}

describe('ScrollView', () => {

    let container;
    let text = getMockText();

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('click on scroll bar', done => {

        let mock = {
            onScroll(e) {
            }
        };

        spyOn(mock, 'onScroll').and.callThrough();

        let wrapper = mount(
            <ScrollView
                width={300}
                height={300}
                onScroll={mock.onScroll}>
                <div style={{workBreak: 'break-all'}}>{text}</div>
            </ScrollView>,
            {
                attachTo: container
            }
        );

        expect(wrapper.find('.ui-scrollview-main').length).toBe(1);

        let main = document.querySelector('.ui-scrollview');

        expect(main.style.width).toBe('300px');
        expect(main.style.height).toBe('300px');

        let bar = document.querySelector('.ui-scrollview-bar');

        let e = document.createEvent('MouseEvents');

        e.initMouseEvent(
            'mousedown', true, true, window,
            0, 300, 100, 300, 100,
            false, false, false, false,
            0, bar
        );

        bar.dispatchEvent(e);

        then(() => {
            expect(mock.onScroll).toHaveBeenCalled();
            wrapper.unmount();
            done();
        });

    });


    it('drag scroll bar\'s thumb', done => {

        let mock = {
            onScroll(e) {
            }
        };

        spyOn(mock, 'onScroll').and.callThrough();

        let wrapper = mount(
            <ScrollView
                width={300}
                height={300}
                onScroll={mock.onScroll}>
                <div style={{workBreak: 'break-all'}}>{text}</div>
            </ScrollView>,
            {
                attachTo: container
            }
        );

        expect(wrapper.find('.ui-scrollview-main').length).toBe(1);

        let main = document.querySelector('.ui-scrollview');

        expect(main.style.width).toBe('300px');
        expect(main.style.height).toBe('300px');

        let thumb = document.querySelector('.ui-scrollview-bar-thumb');

        let e = document.createEvent('MouseEvents');

        e.initMouseEvent(
            'mousedown', true, true, window,
            0, 300, 100, 300, 100,
            false, false, false, false,
            0, thumb
        );

        thumb.dispatchEvent(e);

        then(() => {

            for (let i = 0; i < 5; i++) {
                let moveEvent = document.createEvent('MouseEvents');
                moveEvent.initMouseEvent(
                    'mousemove', true, true, window,
                    0, 300, 200 + i * 5, 300, 200 + i * 5,
                    false, false, false, false,
                    0, thumb
                );
                document.body.dispatchEvent(moveEvent);
            }

        })
        .then(() => {
            expect(mock.onScroll).toHaveBeenCalled();
            let moveEvent = document.createEvent('MouseEvents');
            moveEvent.initMouseEvent(
                'mouseup', true, true, window,
                0, 300, 240, 300, 240,
                false, false, false, false,
                0, thumb
            );
            document.body.dispatchEvent(moveEvent);
        })
        .then(() => {
            wrapper.unmount();
            done();
        });


    });

    it('sroll wheel', done => {

        let mock = {
            onScroll(e) {
            }
        };

        spyOn(mock, 'onScroll').and.callThrough();

        let wrapper = mount(
            <ScrollView
                width={300}
                height={300}
                onScroll={mock.onScroll}>
                <div style={{workBreak: 'break-all'}}>{text}</div>
            </ScrollView>,
            {
                attachTo: container
            }
        );

        wrapper.simulate('wheel', {deltaY: 100});

        then(() => {
            expect(mock.onScroll).toHaveBeenCalled();
            wrapper.unmount();
            done();
        });

    });

});
