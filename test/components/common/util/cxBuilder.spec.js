/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file cxBuilder Unit Test
* @author leon <ludafa@outlook.com>
*/

import {create} from '../../../../src/common/util/cxBuilder';
import expect from 'expect';

describe('cxBuilder', function () {

    it('type hyphenated', function () {
        const cx = create('TestDemo');
        expect(cx().build()).toEqual('ui-test-demo');
    });

    it('displayName pascalized', function () {
        const cx = create('test');
        expect(cx.getDisplayName()).toEqual('Test');
    });

    it('variants', function () {

        const cx = create('Text');

        expect(
            cx({variants: ['a', false, 'b']}).build()
        ).toEqual('ui-text variant-a variant-b');

        expect(
            cx({variants: ['a', false, 'b']}).addVariants('c').build()
        ).toEqual('ui-text variant-a variant-b variant-c');

    });

    it('states', function () {

        const cx = create('Button');

        expect(
            cx({states: {a: 1, b: 0}}).build()
        ).toEqual('ui-button state-a');

        expect(
            cx({states: {a: 1, b: 0}}).addStates({a: 0, b: 1}).build()
        ).toEqual('ui-button state-b');

    });

    it('embed states', function () {

        const cx = create('Button');

        expect(
            cx({disabled: true, hidden: true, states: {a: 1, b: 0}}).build()
        ).toEqual('ui-button state-a state-hidden state-disabled');

    });

});
