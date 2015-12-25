/**
 * @file common/comopnent/Alert
 * @author leon(ludafa@outlook.com)
 */

import {Promise} from 'es6-promise';
import Confirm from 'melon/dialog/Confirm';
import React from 'react';
import ReactDOM from 'react-dom';

let guid = 0;

function createDialogWrap() {

    const container = document.createElement('div');

    container.id = ++guid;

    container.className = 'ui-confirm-wrap';

    document.body.appendChild(container);

    return container;

}

function removeDialogWrap(container) {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
}

export function confirm(message) {

    return new Promise((resolve, reject) => {

        let container = createDialogWrap();

        ReactDOM.render(
            (
                <Confirm
                    open={true}
                    onConfirm={({value}) => {
                        removeDialogWrap(container);
                        container = null;
                        value ? resolve() : reject();
                    }}>
                    {message}
                </Confirm>
            ),
            container
        );

    });

}

export default {
    confirm
};
