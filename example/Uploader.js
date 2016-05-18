/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Title from '../src/Title';
import Uploader from '../src/Uploader';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
    }

    render() {
        return (
            <div>
                <Title level={3}>文件上传</Title>
                <Title level={4}>待选择</Title>
                <Uploader btnText="图片上传" upload={this.upload}/>
                <Title level={4}>已选择</Title>
                <Uploader label="背景图片上传" upload={this.upload} value="https://www.baidu.com/img/bd_logo1.png" />
            </div>
        );
    }

    upload(files) {

        return new Promise(function (resolve, reject) {

            setTimeout(
                function () {
                    resolve('https://www.baidu.com/img/bd_logo1.png');
                },
                1000
            );

        });

    }

}

module.exports = View;
