/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file classname test unit
* @author leon <ludafa@outlook.com>
*/


import {createClasses} from '../../../src/common/util/classname';
import expect from 'expect';

describe('classname', function () {

    it('object', function () {
        expect(createClasses({a: 1, b: 0})).toEqual(['a']);
        expect(createClasses({a: 1, b: 1})).toEqual(['a', 'b']);
    });

    it('array', function () {
        expect(createClasses(['a', null, 'b'])).toEqual(['a', 'b']);
        expect(createClasses(['a', null, 1])).toEqual(['a', 1]);
    });

    it('null/undefined/0/false', function () {

        expect(createClasses(0)).toEqual([]);
        expect(createClasses(false)).toEqual([]);
        expect(createClasses(true)).toEqual([]);
        expect(createClasses(null)).toEqual([]);
        expect(createClasses(void 0)).toEqual([]);

    });

    it('flexible params', function () {
        expect(createClasses('a', {b: 1}, ['c'])).toEqual(['a', 'b', 'c']);
    });

    it('recursion', function () {
        expect(createClasses([[['1']]])).toEqual(['1']);
    });


});
