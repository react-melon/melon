/**
 * @file Button单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import Button from '../../src/Button';
import Icon from '../../src/Icon';
import TouchRipple from '../../src/ripples/TouchRipple';

describe('Button', function () {


    it('label', function () {
        let wrapper = shallow(
            <Button label="Hello" hasRipple={false} disabled={false} />
        );
        expect(wrapper.hasClass('ui-button')).toBe(true);
        expect(wrapper.prop('disabled')).toBe(false);
        expect(wrapper.text()).toBe('Hello');
        // let actualElement = renderer.getRenderOutput();
        // let expectedElement = (
        //     <button className="ui-button" disabled={false}>Hello</button>
        // );
        // expect(actualElement).toEqualJSX(expectedElement);
    });

    it('ripple', function () {

        let wrapper = shallow(
            <Button label="Hello" disabled={false}>
                Hello
            </Button>
        );

        expect(wrapper.hasClass('variant-ripple')).toBe(true);
        expect(wrapper.find(TouchRipple).length).toBe(1);

        // let actualElement = renderer.getRenderOutput();
        //
        // let expectedElement = (
        //     <button className="ui-button variant-ripple" disabled={false}>
        //         Hello
        //         <TouchRipple />
        //     </button>
        // );
        //
        // expect(actualElement).toEqualJSX(expectedElement);
    });

    it('icon button', () => {
        let wrapper = shallow(
            <Button hasRipple={false}>
                <Icon icon={'haha'} />
            </Button>
        );
        expect(wrapper.hasClass('variant-icon')).toBe(true);
        expect(wrapper.find(Icon).length).toBe(1);

        // let actualElement = renderer.getRenderOutput();
        //
        // let expectedElement = (
        //     <button className="ui-button variant-icon" disabled={false}>
        //         <Icon icon={'haha'} />
        //     </button>
        // );
        //
        // expect(actualElement).toEqualJSX(expectedElement);
    });

});
