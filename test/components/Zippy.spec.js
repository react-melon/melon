/**
 * @file Zippy单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import waitFor from '../waitFor';
import then from '../then';

import Zippy from '../../src/Zippy';

describe('Zippy', () => {

    let component;

    beforeEach(() => {
        waitFor.clear();
    });

    it('work', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy size={100}><p>test</p></Zippy>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);

    });

    it('horizontal', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy size={100} horizontal>
                <p>test</p>
            </Zippy>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(ReactDOM.findDOMNode(component).style.width).toBe('0px');

    });

    it('expand', done => {

        const TestComponent = React.createClass({

            getInitialState() {
                return {
                    expand: false
                };
            },

            render() {

                return (
                    <Zippy expand={this.state.expand} size={10}>
                        <p>test</p>
                    </Zippy>
                );
            }
        });

        component = TestUtils.renderIntoDocument(<TestComponent />);

        const zippy = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-zippy');
        expect(TestUtils.isDOMComponent(zippy)).toBe(true);
        expect(zippy.style.height).toBe('0px');

        component.setState({expand: true});

        then(() => {

            expect(zippy.className).toInclude('state-expand');

            waitFor(
                () => {
                    return zippy.style.height === '10px';
                },
                'the animate faild',
                done,
                1500
            );
        });

    });

});
