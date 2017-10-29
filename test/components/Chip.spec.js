/**
 * @file Chip单测
 * @author Ma63d(chuck7liu@gmail.com)
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import Chip from '../../src/Chip';
import then from '../then';

/* eslint-disable max-nested-callbacks */

describe('Chip', () => {

    it('should have specified dom ', () => {

        const IMAGE_URL = 'http://some.com/a.jpg';

        const wrapper = shallow(
            <Chip
                id="chip"
                avatar={
                    <img
                        id="avatar-pic"
                        src={IMAGE_URL}
                        alt=""
                    />
                }>
                label
            </Chip>
        );

        expect(wrapper.hasClass('ui-chip')).toBe(true);
        expect(wrapper.find('img').prop('src')).toBe(IMAGE_URL);
        expect(wrapper.find('span').hasClass('ui-chip-label')).toBe(true);

        // let chipWithoutCSSShadow = renderer.getRenderOutput();
        //
        // let expectedElement = (
        //     <div className={'ui-chip'} style={undefined} onClick={() => {}}>
        //         <div style={{display: 'table'}}>
        //             <img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt="" className={'ui-chip-avatar'} />
        //             <span className={'ui-chip-label'} style={{}}>label</span>
        //         </div>
        //     </div>
        // );
        //
        // expect(chipWithoutCSSShadow).toEqualJSX(expectedElement);

    });

    it('should have different class when props differentiate', () => {

        // 当元素既没有onClick回调也没有onRemove回调的时候, 其不会具有.state-active, 反之则有
        let wrapper = shallow(
            <Chip
                avatar={
                    <img
                        src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg"
                    />
                }
                onClick={() => {}}
            >
                label
            </Chip>
        );

        expect(wrapper.hasClass('state-active')).toBe(true);

        wrapper.setProps({onClick: null, onRemove: () => {}});
        expect(wrapper.hasClass('state-active')).toBe(true);

        wrapper.setProps({onClick: null, onRemove: null});
        expect(wrapper.hasClass('state-active')).toBe(false);

    });

    it('should run specified callbacks when interacting', () => {

        let clickSpy = jasmine.createSpy('chip-click-spy');
        let removeSpy = jasmine.createSpy('chip-remove-spy');

        let chip = mount(
            <Chip avatar={<img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}
                  onClick={clickSpy}
                  onRemove={removeSpy}>
                <span id="label">label</span>
            </Chip>
        );

        chip.find('#label').simulate('click');
        expect(clickSpy).toHaveBeenCalled();

        let removeIcon = chip.find('.ui-icon');
        removeIcon.simulate('click');
        expect(removeSpy).toHaveBeenCalled();
        chip.unmount();

    });

});
