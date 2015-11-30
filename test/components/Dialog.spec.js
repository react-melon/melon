/**
 * @file Dialog单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import jsdom from 'mocha-jsdom';
import TestUtils from 'react-addons-test-utils';

import DialogWindow from '../../src/dialog/DialogWindow';
import Dialog from '../../src/Dialog';
import Alert from '../../src/dialog/Alert';
import Confirm from '../../src/dialog/Confirm';
import Mask from '../../src/Mask';
import {Motion, spring} from 'react-motion';

expect.extend(expectJSX);

/* globals before, after */

describe('Dialog Component', function () {

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
        let expectedElement = (<div autoLockScrolling={true} className="ui-mask" />);
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

    it('Dialog', function () {
        renderer.render(<Dialog />);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div maskClickClose={true} open={false} className="ui-dialog">
                <Motion style={{y: spring(-80)}} />
                <Mask
                    autoLockScrolling={false}
                    show={false}
                    onClick={function noRefCheck() {}} />
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});

describe('Dialog functions', function () {

    jsdom();

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
                    var body = document.getElementsByTagName('body')[0];
                    expect(body.style.overflow).toBe('hidden');
                    done();
                });
            },

            render() {

                return (
                    <Mask show={this.state.show} autoLockScrolling={true} />
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
                expect(this.refs.dialog.state.open).toBe(false);
                this.setState({open: true});
            },

            onShow() {
                expect(this.refs.dialog.state.open).toBe(true);
                showSpy();

                let mask = document.querySelector('.ui-mask');
                TestUtils.Simulate.click(mask);
            },

            onHide() {
                expect(this.refs.dialog.state.open).toBe(false);
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
                let alert = ReactDOM.findDOMNode(this.refs.alert);
                expect(alert.className).toInclude('state-open');
                let button = document.querySelector('button');
                TestUtils.Simulate.click(button);
            },

            onConfirm() {

                this.setState({open: false}, () => {
                    let alert = ReactDOM.findDOMNode(this.refs.alert);
                    expect(alert.className).toExclude('state-open');
                    done();
                });
            },

            render() {

                return (
                    <Alert ref="alert" title="hello" onConfirm={this.onConfirm} open={this.state.open}>
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
                let alert = ReactDOM.findDOMNode(this.refs.alert);
                expect(alert.className).toInclude('state-open');
                let button = document.querySelector('.variant-cancel');
                TestUtils.Simulate.click(button);
            },

            onCancel() {
                let button = document.querySelector('.variant-confirm');
                TestUtils.Simulate.click(button);

                this.setState({open: false}, () => {
                    let alert = ReactDOM.findDOMNode(this.refs.alert);
                    expect(alert.className).toExclude('state-open');
                    done();
                });
            },

            render() {

                return (
                    <Confirm
                        ref="alert"
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

