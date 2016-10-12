/**
 * @file melon/Uploader
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import Button from './Button';
import Icon from './Icon';
import Progress from './Progress';
import Link from './Link';
import Validity from 'melon-core/Validity';
import InputComponent from 'melon-core/InputComponent';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Uploader');

/**
 * melon/Uploader
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class Uploader extends InputComponent {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     * @param  {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            ...this.state,
            isUploading: false,
            isUploaded: !!this.props.value
        };

    }

    /**
     * 文件上传时的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onFileChange(e) {

        this.setUploading();

        const {upload, onSelect} = this.props;

        const event = {
            target: this,
            files: e.target.files
        };

        if (upload) {
            upload(event).then(
                result => this.setFile(result),
                error => this.clearFile()
            );
            return;
        }

        onSelect(event);

    }

    componentWillReceiveProps(nextProps) {

        const value = nextProps.value;

        super.componentWillReceiveProps(nextProps);

        if (value) {
            this.setState({
                isUploaded: true,
                isUploading: false,
                value
            });
        }
        else {
            this.setState({
                isUploaded: false,
                value
            });
        }

    }

    /**
     * 设置正在上传的状态
     *
     * @public
     */
    setUploading() {
        this.setState({
            isUploading: true
        });
    }

    /**
     * 设置上传完毕以后的文件地址
     *
     * @public
     * @param {string} value 文件地址
     */
    setFile(value) {

        this.setState({
            isUploaded: true,
            isUploading: false,
            value
        });


        super.onChange({
            type: 'change',
            target: this,
            value
        });


    }

    /**
     * 重置上传的文件
     *
     * @public
     */
    clearFile() {

        this.setState({
            isUploaded: false,
            isUploading: false,
            value: ''
        });


        super.onChange({
            type: 'change',
            target: this,
            value: ''
        });


    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement?}
     */
    renderUploadFile() {

        const {isUploading, isUploaded} = this.state;

        return isUploading || isUploaded
            ? null
            : (
                <input
                    ref="file"
                    type="file"
                    className={cx().part('file').build()}
                    onChange={e => {
                        this.onFileChange(e);
                    }}
                    accept={this.props.accept} />
            );

    }

    /**
     * 渲染按钮
     *
     * @protected
     * @return {ReactElement}
     */
    renderUploadButton() {

        const {isUploading, isUploaded, value} = this.state;
        const {size, placeholder} = this.props;

        if (isUploading) {
            return (
                <Progress
                    size={size}
                    mode="indeterminate"
                    shape="circle" />
            );
        }

        if (isUploaded) {

            return (
                <div className={cx.getPartClassName('content')}>
                    <image
                        className={cx.getPartClassName('preview')}
                        src={value} />
                    <Link
                        size={size}
                        href={value}
                        title="点击查看"
                        target="_blank">
                        {value}
                    </Link>
                    <Button
                        size={size}
                        type="button"
                        title="重新选择"
                        onClick={() => {
                            this.clearFile();
                        }} >
                        <Icon icon="refresh" />
                    </Button>
                </div>
            );
        }

        return (
            <div
                className={cx.getPartClassName('content')}
                onClick={() => {
                    this.refs.file.click();
                }}>
                <Icon icon="file-upload" />
                <span className={cx.getPartClassName('placeholder')}>
                    {placeholder}
                </span>
            </div>
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;
        const {value, name, style} = props;
        const className = cx(props).addStates(this.getStyleStates()).build();

        return (
            <div
                className={className}
                style={style}>
                <input name={name} type="hidden" value={value} />
                {this.renderUploadFile()}
                {this.renderUploadButton()}
                <Validity validity={this.state.validity} />
            </div>
        );

    }

}

Uploader.displayName = 'Uploader';

Uploader.propTypes = {
    ...InputComponent.propTypes,
    accept: PropTypes.string,
    upload: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

Uploader.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '点击上传'
};

Uploader.childContextTypes = InputComponent.childContextTypes;
Uploader.contextTypes = InputComponent.contextTypes;
