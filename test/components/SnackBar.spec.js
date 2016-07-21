/**
 * @file SnackBar单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SnackBar from '../../src/SnackBar';
import Button from '../../src/Button';

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
            jasmine.clock().install();
            TestUtils.Simulate.click(button);
            jasmine.clock().tick(1);

            snackbar = document.querySelector('.ui-snack-bar');
            expect(snackbar.className).toBe('ui-snack-bar variant-direction-bc');

            jasmine.clock().tick(410);

            expect(document.querySelector('.ui-snack-bar')).toBeNull();
            jasmine.clock().uninstall();
            done();
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

    // it('clickAway', done => {
    //     let showSpy = jasmine.createSpy();
    //     let hideSpy = jasmine.createSpy();
    //     let component = TestUtils.renderIntoDocument(
    //         <SnackBar
    //             message="test"
    //             direction="lc"
    //             onShow={showSpy}
    //             onHide={hideSpy}
    //             openOnMount={true} />
    //     );
    //
    //     expect(component.state.open).toBe(true);
    //     expect(showSpy).toHaveBeenCalled();
    //
    //     component.onMouseUp({target: document.body});
    //
    //     // for IE9
    //     window.event = {target: document.body};
    //
    //     then(() => {
    //         expect(component.state.open).toBe(false);
    //         expect(hideSpy).toHaveBeenCalled();
    //         done();
    //     });
    // });
    //
    // afterAll(() => {
    //     window.event = null;
    // });

});
