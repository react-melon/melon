/**
 * @file Chip单测
 * @author Ma63d(chuck7liu@gmail.com)
 */

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import {mount} from 'enzyme';
import Chip from '../../src/Chip';
import then from '../then';

/* eslint-disable max-nested-callbacks */

describe('Chip', () => {

    it('should have specified dom ', () => {

        const renderer = createRenderer();
        renderer.render(
            <Chip id="chip" avatar={<img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}>
                label
            </Chip>
        );
        let chipWithoutCSSShadow = renderer.getRenderOutput();

        let expectedElement = (
            <div className={'ui-chip'} style={undefined} onClick={() => {}}>
                <div style={{display: 'table'}}>
                    <img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt="" className={'ui-chip-avatar'} />
                    <span className={'ui-chip-label'} style={{}}>label</span>
                </div>
            </div>
        );

        expect(chipWithoutCSSShadow).toEqualJSX(expectedElement);

    });

    it('should have different class when props differentiate', () => {

        // 当元素既没有onClick回调也没有onRemove回调的时候, 其不会具有.state-active, 反之则有
        let chipWithoutCSSShadow = mount(
            <Chip id="chip" avatar={<img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}
                  onClick={() => {}}>
                label
            </Chip>
        );
        expect(chipWithoutCSSShadow.hasClass('state-active')).toBe(true);
        
        let chipWithCSSShadow = mount(
            <Chip id="chip" avatar={<img id="avatar-pic" src="http://www.2cto.com/uploadfile/2014/1205/20141205081759816.jpg" alt=""/>}>
                label
            </Chip>
        );
        expect(chipWithCSSShadow.hasClass('state-active')).toBe(false);

    });

    it('should run specified callbacks when interacting', done => {

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

        done();

    });

});
