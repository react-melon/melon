/**
 * @file melon demo button
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Title from '../src/Title';
import Uploader from '../src/Uploader';

/* eslint-disable */
const EXAMPLE_IMG_URL = [
    'https://assets.materialup.com/uploads/878dbfeb-7503-4d63-a4ab-1435ac533296/attachment.png',
    'http://react-melon.github.io/melon/asset/common/img/melon-logo.ffb5dd37.png'
];
/* eslint-enable */

function randomImageURL() {
    const index = Math.floor(EXAMPLE_IMG_URL.length * Math.random());
    return EXAMPLE_IMG_URL[index];
}

class View extends React.Component {

    constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
        this.state = {
            imgURL: randomImageURL()
        };
    }

    render() {
        return (
            <div>
                <Title level={3}>文件上传</Title>
                <Title level={4}>待选择</Title>
                <Uploader
                    placeholder="图片上传"
                    defaultValue=""
                    upload={this.upload}
                    style={{width: 200}} />
                <Uploader
                    variants={['fluid']}
                    placeholder="图片上传"
                    defaultValue=""
                    upload={this.upload} />
                <Title level={4}>已选择</Title>
                <Uploader
                    uploading={this.state.uploading}
                    onFileChange={files => {

                        if (!files) {
                            this.setState({imgURL: ''});
                            return;
                        }

                    }}
                    value={this.state.imgURL} />
            </div>
        );
    }

    upload(files) {

        return new Promise(function (resolve, reject) {

            setTimeout(
                function () {
                    resolve(randomImageURL());
                },
                50000
            );

        });

    }

}

module.exports = View;
