/**
 * @file Button单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import Button from '../../src/Button';
import Icon from '../../src/Icon';
import TouchRipple from '../../src/ripples/TouchRipple';

expect.extend(expectJSX);

describe('Button', function () {

    let renderer;

    beforeEach(function () {
        renderer = createRenderer();
    });

    afterEach(function () {
        renderer = null;
    });

    it('label', function () {
        renderer.render(
            <Button label="Hello" hasRipple={false} disabled={false} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <button className="ui-button" disabled={false}>Hello</button>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('ripple', function () {

        renderer.render(
            <Button label="Hello" disabled={false}>
                Hello
            </Button>
        );

        let actualElement = renderer.getRenderOutput();

        let expectedElement = (
            <button className="ui-button variant-ripple" disabled={false}>
                Hello
                <TouchRipple />
            </button>
        );

        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('icon button', () => {
        renderer.render(
            <Button hasRipple={false}>
                <Icon icon={'haha'} />
            </Button>
        );

        let actualElement = renderer.getRenderOutput();

        let expectedElement = (
            <button className="ui-button variant-icon" disabled={false}>
                <Icon icon={'haha'} />
            </button>
        );

        expect(actualElement).toEqualJSX(expectedElement);
    });

});
