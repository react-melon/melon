/**
 * @file Zippy单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Zippy from '../../src/Zippy';

describe('Zippy', () => {

    let component;

    it('work', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy><p>test</p></Zippy>
        );

        expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
        expect(ReactDOM.findDOMNode(component).className).toMatch('variant-vertical');
    });

    it('horizontal', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy direction="horizontal">
                <p>test</p>
            </Zippy>
        );

        expect(ReactDOM.findDOMNode(component).className).toMatch('variant-horizontal');
        expect(ReactDOM.findDOMNode(component).className).toMatch('state-close');
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

        component.setState({expand: true});

        then(() => {
            expect(zippy.className).not.toMatch('state-close');
            done();
        });

    });

});
