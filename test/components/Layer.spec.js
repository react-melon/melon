/**
 * @file Layer Spec
 * @author leon <ludafa@outlook.com>
 */

import Layer from '../../src/Layer';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import then from '../then';

describe('Layer', () => {

    it('use layer with a mask', done => {

        let mock = {
            onClickAway() {
            }
        };

        spyOn(mock, 'onClickAway').and.callThrough();

        let container = document.createElement('div');
        document.body.appendChild(container);

        let wrapper = render(
            <Layer
                open={false}
                onClickAway={mock.onClickAway}>
                <div>aaa</div>
            </Layer>,
            container
        );

        expect(wrapper.getLayer() == null).toBe(true);

        wrapper = render(
            <Layer
                open={true}
                onClickAway={mock.onClickAway}>
                <div>aaa</div>
            </Layer>,
            container
        );

        let layer = wrapper.getLayer();

        expect(layer.nodeType).toBe(1);
        expect(layer.classList.contains('ui-layer-mask')).toBe(true);
        expect(mock.onClickAway).not.toHaveBeenCalled();

        layer.childNodes[0].click();
        expect(mock.onClickAway).not.toHaveBeenCalled();

        layer.click();

        then(() => {
            expect(mock.onClickAway).toHaveBeenCalled();
            wrapper = render(
                <Layer
                    open={false}
                    onClickAway={mock.onClickAway}>
                    <div>aaa</div>
                </Layer>,
                container
            );
            expect(wrapper.getLayer() == null).toBe(true);
            unmountComponentAtNode(container);
            expect(wrapper.container == null).toBe(true);
            container.parentNode.removeChild(container);
            container = null;
            done()
        });

    });

    it('instant open', () => {
        let container = document.createElement('div');
        document.body.appendChild(container);
        let text = (+(Math.random() + '').substr(2, 10)).toString(36);
        let wrapper = render(
            <Layer
                open={true}
                onClickAway={() => {}}>
                {text}
            </Layer>,
            container
        );

        let layer = wrapper.getLayer();

        expect(layer != null).toBe(true);
        expect(layer.innerHTML).toBe(text);
        unmountComponentAtNode(container);
        expect(wrapper.container == null).toBe(true);
        container.parentNode.removeChild(container);
        container = null;
    });

    it('use layer without a mask', done => {

        let mock = {
            onClickAway() {
            }
        };

        spyOn(mock, 'onClickAway').and.callThrough();

        let container = document.createElement('div');
        document.body.appendChild(container);

        let wrapper = render(
            <Layer
                open={false}
                useLayerMask={false}
                onClickAway={mock.onClickAway}>
                <div>aaa</div>
            </Layer>,
            container
        );

        expect(wrapper.getLayer() == null).toBe(true);

        wrapper = render(
            <Layer
                open={true}
                useLayerMask={false}
                onClickAway={mock.onClickAway}>
                <div>aaa</div>
            </Layer>,
            container
        );

        let layer = wrapper.getLayer();

        expect(layer.nodeType).toBe(1);
        expect(layer.classList.contains('ui-layer-mask')).toBe(false);
        expect(mock.onClickAway).not.toHaveBeenCalled();

        layer.childNodes[0].click();
        expect(mock.onClickAway).not.toHaveBeenCalled();

        wrapper.onClickAway({target: document.body});

        then(() => {
            expect(mock.onClickAway).toHaveBeenCalled();
            unmountComponentAtNode(container);
            expect(wrapper.getLayer() == null).toBe(true);
            container.parentNode.removeChild(container);
            container = null;
            done()
        });

    });


});
