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
 * @param  {Function} Dialog ReactComponent
 * @return {Function}        一个可以实时创建对话框的函数
 */
export default function createDialogCommand(Dialog) {

    return function (options) {

        if (!container) {
            container = document.createElement('div');
            container.className = 'melon-seperate-dialog-container';
            document.body.appendChild(container);
        }

        let element = document.createElement('div');
        container.appendChild(element);

        ReactDOM.render(
            <Dialog {...options} open={true} />,
            element,
        );

        return function () {
            ReactDOM.unmountComponentAtNode(element);
            container.removeChild(element);
            element = null;
        };

    };

}
