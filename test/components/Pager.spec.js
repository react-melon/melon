// /**
//  * @file Pager单测
//  * @author cxtom(cxtom2008@gmail.com)
//  */
//
import React from 'react';
import {shallow, mount} from 'enzyme';
import then from '../then';

import Pager from '../../src/Pager';

describe('Pager', () => {

    it('dom', function () {
        const pager = shallow(
            <Pager total={2} page={1} />
        );
        expect(pager.find('.ui-pager').length).toBe(1);
        expect(pager.find('.ui-pager-item').length).toBe(4);
        expect(pager.find('.state-prev').length).toBe(1);
        expect(pager.find('.state-next').length).toBe(1);
        expect(pager.find('.state-disabled.state-next').length).toBe(1);
    });

    it('not alawys show', () => {
        const pager = mount(
            <Pager total={1} page={0} showAlways={false} />
        );
        expect(pager.find('.ui-pager-item').length).toBe(0);
        pager.unmount();
    });

});

describe('Pager:click', () => {

    let component;
    let items;

    let current;
    let prev;
    let next;

    beforeEach(() => {
        component = mount(<Pager total={10} page={1} />);
        items = component.find('.ui-pager-item');
        current = component.find('.ui-pager-item.state-current');
        prev = component.find('.ui-pager-item.state-prev');
        next = component.find('.ui-pager-item.state-next');
    });

    afterEach(() => {
        component.unmount();
        component = current = prev = next = null;
        items.length = 0;
        items = null;
    });

    it('base', () => {
        expect(items.length).toEqual(9);
        expect(component.prop('page')).toEqual(1);
        expect(component.state('page')).toEqual(1);
    });

    it('click page', done => {
        items.at(5).simulate('click');
        then(() => {
            expect(component.state('page')).toEqual(4);
            done();
        });
    });

    it('click prev', done => {
        prev.simulate('click');
        then(() => {
            expect(component.state('page')).toEqual(0);
            done();
        });
    });

    it('click next', done => {
        next.simulate('click');
        then(() => {
            expect(component.state('page')).toEqual(2);
            done();
        });
    });

});

describe('Pager:controlled', () => {

    it('click', done => {

        class TestComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {page: 0};
            }
            render() {
                return (
                    <Pager
                        total={10}
                        page={this.state.page}
                        onChange={({page, target}) => {
                            expect(page).toEqual(4);
                            expect(target).toBe(pager.instance());
                            this.setState({page});
                        }} />
                );
            }
        }

        const component = mount(<TestComponent />);
        const pager = component.find(Pager);
        const items = component.find('li');

        items.at(5).simulate('click');

        then(() => {
            expect(component.state('page')).toEqual(4);
            component.unmount();
            done();
        });
    });

});
