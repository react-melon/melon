/**
 * @file SnackBar单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';

import SnackBar from '../../src/SnackBar';
import Button from '../../src/Button';

expect.extend(expectJSX);

import then from '../then';
import waitFor from '../waitFor';

describe('SnackBar', function () {

    it('dom', function () {
        const renderer = TestUtils.createRenderer();
        renderer.render(
            <SnackBar message={'hello'}/>
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div className={'ui-snack-bar variant-direction-bl'}>
                <span className={'ui-snack-bar-message'}>
                    hello
                </span>
                <Button
                    variants={['snackbar']}
                    className={'ui-snack-bar-action'}
                    onClick={() => {}} >
                    关闭
                </Button>
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    beforeEach(() => {
        waitFor.clear();
    });

    it('show', done => {
        SnackBar.show('test', 0, 'bc');

        then(() => {
            let snackbar = document.querySelector('.ui-snack-bar');
            expect(TestUtils.isDOMComponent(snackbar)).toBe(true);
            expect(snackbar.className).toBe('ui-snack-bar variant-direction-bc state-open');
            let button = document.querySelector('button');
            TestUtils.Simulate.click(button);
        })
        .then(() => {
            let snackbar = document.querySelector('.ui-snack-bar');
            expect(snackbar.className).toBe('ui-snack-bar variant-direction-bc');

            waitFor(
                () => document.querySelector('.ui-snack-bar') == null,
                'SnackBar has not umounted',
                done,
                410
            );
        });
    });

    it('autoHideDuration', done => {
        let component = TestUtils.renderIntoDocument(
            <SnackBar
                message="test"
                autoHideDuration={10}
                openOnMount={true} />
        );

        expect(component.state.open).toBe(true);
        waitFor(
            () => component.state.open === false,
            'SnackBar did not hide after 10ms',
            done
        );
    });

    it('clickAway', done => {
        let showSpy = expect.createSpy();
        let hideSpy = expect.createSpy();
        let component = TestUtils.renderIntoDocument(
            <SnackBar
                message="test"
                direction="lc"
                onShow={showSpy}
                onHide={hideSpy}
                openOnMount={true} />
        );

        expect(component.state.open).toBe(true);
        expect(showSpy).toHaveBeenCalled();

        component.onMouseUp({
            target: document.body
        });

        then(() => {
            expect(component.state.open).toBe(false);
            component.onMouseUp({
                target: document.body
            });
            expect(hideSpy).toHaveBeenCalled();
        })
        .then(() => {
            expect(component.state.open).toBe(false);
            done();
        });
    });

    it('clearTimer', done => {
        let component = (
            <SnackBar
                message="test"
                autoHideDuration={10}
                openOnMount={true} />
        );

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(component, container);

        then(() => {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            container = null;
            done();
        });

    });

});
