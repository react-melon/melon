/**
 * @file ContextMenu
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import ContextMenu, {Provider, Trigger} from '../src/ContextMenu';

export default class ContextMenuDemo extends Component {

    render() {
        return (
            <Provider>
                <div>
                    <div>
                        <Trigger menu="">
                            <button>ok</button>
                        </Trigger>
                    </div>
                </div>
                <ContextMenu id="test">
                </ContextMenu>
            </Provider>
        );
    }

}
