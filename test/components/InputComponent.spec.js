/**
 * @file Input Component Unit Test
 * @author Leon Lu(ludafa@baidu.com)
 */

import React, {Component, PropTypes} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import InputComponent from '../../src/InputComponent';

expect.extend(expectJSX);


describe('InputComponent', function () {

    it('should get value in state from props', function () {

        const renderer = createRenderer();

        class InputComponetTest extends InputComponent {

            render() {
                const {value} = this.state;
                return (<div>{value}</div>);
            }

        }

        renderer.render(
            <InputComponetTest value={1}/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div>1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('defaultValue', function () {

        const renderer = createRenderer();

        class InputComponetTest extends InputComponent {

            render() {
                const {value} = this.state;
                return (<div>{value}</div>);
            }

        }

        renderer.render(
            <InputComponetTest defaultValue={1}/>
        );

        const actualElement = renderer.getRenderOutput();

        const expectedElement = (<div>1</div>);

        expect(actualElement).toEqualJSX(expectedElement);

    });

    it('should try to attach/detach to a form', function () {

        const attachFormSpy = expect.createSpy();
        const detachFormSpy = expect.createSpy();

        class Form extends Component {

            getChildContext() {
                return {
                    attachForm: attachFormSpy,
                    detachForm: detachFormSpy
                };
            }

            render() {
                return this.props.children;
            }

        }

        Form.childContextTypes = {
            attachForm: PropTypes.func,
            detachForm: PropTypes.func
        };


        class InputComponetTest extends InputComponent {

            render() {
                const {value} = this.state;
                return (<div>{value}</div>);
            }

        }

        const container = document.getElementById('app');

        render(
            <Form><InputComponetTest value={1} /></Form>,
            container,
            function () {
                expect(attachFormSpy).toHaveBeenCalled();
                unmountComponentAtNode(container);
                expect(detachFormSpy).toHaveBeenCalled();
            }
        );


    });

});
