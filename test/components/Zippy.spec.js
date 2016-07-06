/**
 * @file Zippy单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Zippy from '../../src/Zippy';

describe('Zippy', () => {

    let component;

    it('work', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy><p>test</p></Zippy>
        );

        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(ReactDOM.findDOMNode(component).className).toContain('variant-vertical');
    });

    it('horizontal', () => {

        component = TestUtils.renderIntoDocument(
            <Zippy horizontal>
                <p>test</p>
            </Zippy>
        );

        expect(ReactDOM.findDOMNode(component).className).toInclude('variant-horizontal');
        expect(ReactDOM.findDOMNode(component).className).toInclude('state-close');
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
            expect(zippy.className).toExclude('state-close');
            done();
        });

    });

});
