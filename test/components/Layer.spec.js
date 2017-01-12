/**
 * @file Layer Spec
 * @author leon <ludafa@outlook.com>
 */

import Layer from '../../src/Layer';
import {mount} from 'enzyme';
import React from 'react';

describe('Layer', () => {

    it('work', () => {

        let mock = {
            render() {
                return <div>aaa</div>;
            },
            onClickAway() {
            }
        };

        spyOn(mock, 'render').and.callThrough();
        spyOn(mock, 'onClickAway').and.callThrough();

        let wrapper = mount(
            <Layer
                open={false}
                render={mock.render}
                onClickAway={mock.onClickAway} />
        );

        let instance = wrapper.instance();

        expect(mock.render).not.toHaveBeenCalled();
        expect(instance.getLayer() == null).toBe(true);

        wrapper.setProps({open: true});

        expect(mock.render).toHaveBeenCalled();

        let layer = instance.getLayer();

        expect(layer.nodeType).toBe(1);
        expect(layer.parentNode).toBe(document.body);
        expect(mock.onClickAway).not.toHaveBeenCalled();

        layer.childNodes[0].click();
        expect(mock.onClickAway).not.toHaveBeenCalled();

        layer.click();
        expect(mock.onClickAway).toHaveBeenCalled();

        wrapper.unmount();

        expect(instance.getLayer() == null).toBe(true);

    });

});
