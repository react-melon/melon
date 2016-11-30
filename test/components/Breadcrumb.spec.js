/**
 * @file Breadcrumb单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import Breadcrumb from '../../src/Breadcrumb';

const Item = Breadcrumb.Item;

describe('Breadcrumb', function () {

    it('work', function () {

        const crumb = shallow(
            <Breadcrumb>
                <Item>crumb1</Item>
                <Item>crumb2</Item>
            </Breadcrumb>
        );

        expect(crumb.find(Item).length).toBe(2);

    });


    it('Item', function () {
        const item = shallow(
            <Item href="#" level={1}>crumb1</Item>
        );
        expect(item.hasClass('ui-breadcrumb-item')).toBe(true);
        expect(item.prop('data-level')).toBe(1);
        expect(item.prop('href')).toBe('#');
    });

    it('createCrumbs', function () {

        const crumbs = [{
            href: '#1',
            text: 'crumb1'
        }, {
            href: '#2',
            text: 'crumb2'
        }];

        const crumb = shallow(
            <Breadcrumb>
                {Breadcrumb.createCrumbs(crumbs)}
            </Breadcrumb>
        );

        expect(crumb.find(Item).length).toBe(2);

    });


});
