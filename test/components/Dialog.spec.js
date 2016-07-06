/**
 * @file Dialog单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';

import DialogWindow from '../../src/dialog/DialogWindow';
import Dialog from '../../src/Dialog';
import Alert from '../../src/Alert';
import Confirm from '../../src/Confirm';
import Mask from '../../src/Mask';

expect.extend(expectJSX);

/* globals before, after */

describe('Dialog', function () {

    let renderer;

    beforeEach(function () {
        renderer = TestUtils.createRenderer();
    });

    afterEach(function () {
        renderer = null;
    });

    it('Mask', function () {
        renderer.render(<Mask />);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div
                lockScrollingOnShow={true}
                className="ui-mask"
                show={false} />
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('DialogWindow', function () {
        renderer.render(<DialogWindow footer={<div />} title={<div />} top={100}>Hello</DialogWindow>);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div
                className="ui-dialog-window"
                style={{
                    transform: 'translate(0, 100px)',
                    WebkitTransform: 'translate(0, 100px)',
                    msTransform: 'translate(0, 100px)',
                    MozTransform: 'translate(0, 100px)'
                }}>
                <div />
                Hello
                <div />
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    describe('functions', function () {

        let container;

        beforeEach(function () {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(function () {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            container = null;
        });

        it('mask', function (done) {

            let TestComponent = React.createClass({

                getInitialState() {
                    return {
                        show: false
                    };
                },

                componentDidMount() {
                    this.setState({show: true}, () => {
                        const body = document.getElementsByTagName('body')[0];
                        expect(body.style.overflow).toBe('hidden');
                        done();
                    });
                },

                render() {

                    return (
                        <Mask
                            show={this.state.show}
                            lockScrollingOnShow={true} />
                    );

                }
            });

            ReactDOM.render(<TestComponent />, container);
        });

        it('show hide', function (done) {

            let showSpy = expect.createSpy();

            let TestComponent = React.createClass({

                getInitialState() {
                    return {
                        open: false
                    };
                },

                componentDidMount() {
                    this.setState({open: true});
                },

                onShow() {
                    showSpy();
                    let mask = document.querySelector('.ui-mask');
                    TestUtils.Simulate.click(mask);
                },

                onHide() {
                    expect(showSpy).toHaveBeenCalled();
                    this.setState({open: false}, done);
                },

                render() {

                    return (
                        <Dialog
                            ref="dialog"
                            onShow={this.onShow}
                            onHide={this.onHide}
                            open={this.state.open}>
                            Hello
                        </Dialog>
                    );

                }

            });

            ReactDOM.render(<TestComponent />, container);

        });

        it('Alert', function (done) {

            let TestComponent = React.createClass({

                getInitialState() {
                    return {
                        open: true
                    };
                },

                componentDidMount() {
                    let button = document.querySelector('button');
                    TestUtils.Simulate.click(button);

                    let mask = document.querySelector('.ui-mask');
                    TestUtils.Simulate.click(mask);
                },

                onConfirm() {

                    this.setState({open: false}, () => {
                        done();
                    });

                },

                render() {

                    return (
                        <Alert
                            title="hello"
                            onConfirm={this.onConfirm}
                            open={this.state.open}>
                            报警！
                        </Alert>
                    );
                }
            });

            ReactDOM.render(<TestComponent />, container);
        });

        it('Confirm', function (done) {

            let TestComponent = React.createClass({

                getInitialState() {
                    return {
                        open: true
                    };
                },

                componentDidMount() {
                    let button = document.querySelector('.variant-cancel');
                    TestUtils.Simulate.click(button);
                },

                onCancel() {

                    let button = document.querySelector('.variant-confirm');

                    TestUtils.Simulate.click(button);

                    this.setState({open: false}, () => {
                        done();
                    });

                },

                render() {

                    return (
                        <Confirm
                            title="hello"
                            onCancel={this.onCancel}
                            open={this.state.open}>
                            <div style={{height: 2000, width: 100}}></div>
                        </Confirm>
                    );

                }
            });

            ReactDOM.render(<TestComponent />, container);

        });

    });

});
