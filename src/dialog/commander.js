/**
 * @file 命令式窗口管理
 * @author leon <ludafa@baidu.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';

let container = null;

/**
 * 创建一个对话框构造器
 *
 * @param  {Function}      Dialog      ReactComponent
 * @param  {Array<string>} closeEvents 指定的事件会被包裹成高阶函数，获得一个 close 函数
 * @return {Function} 一个可以实时创建对话框的函数
 */
export default function createDialogCommand(Dialog, closeEvents = []) {

    return function (options) {

        if (!container) {
            container = document.createElement('div');
            container.className = 'melon-seperate-dialog-container';
            document.body.appendChild(container);
        }

        let element = document.createElement('div');
        container.appendChild(element);

        options = closeEvents.reduce(
            (options, event) => {

                return {
                    ...options,
                    [event]: (...args) => options[event](close, ...args)
                };

            },
            options
        );

        ReactDOM.render(
            <Dialog {...options} open={true} />,
            element
        );

        function close() {

            ReactDOM.render(
                <Dialog {...options} open={false} />,
                element
            );

            setTimeout(() => {

                ReactDOM.unmountComponentAtNode(element);
                container.removeChild(element);
                element = null;

            }, 1000);

        }

        return close;

    };

}
