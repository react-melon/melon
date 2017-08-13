/**
 * @file melon/Uploader
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Icon from './Icon';
import Progress from './Progress';
import Link from './Link';
import InputComponent from 'melon-core/InputComponent';
import guid from './common/util/guid';
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

        this.onFileChange = this.onFileChange.bind(this);
        this.onUploadSucceed = this.onUploadSucceed.bind(this);
        this.onUploadFailed = this.onUploadFailed.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onUploadCancel = this.onUploadCancel.bind(this);

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            ...this.state,
            value: props.value == null ? '' : props.value,
            uploading: 'value' in props ? !!props.uploading : false
        };

    }

    getStatus(props) {

        const {
            value,
            uploading
        } = props;

        return uploading
            ? 'uploading'
            : (value ? 'fulfilled' : 'empty');

    }

    componentWillReceiveProps(nextProps) {

        if (
            nextProps.uploading !== this.state.uploading
            && !nextProps.upload
        ) {
            this.setState({
                uploading: nextProps.uploading
            });
        }

        super.componentWillReceiveProps(nextProps);

    }

    componentWillUnmount() {
        this.token = null;
    }

    /**
     * 文件上传时的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onFileChange(e) {

        const {
            upload,
            onFileChange
        } = this.props;

        const files = e.target.files;

        // controlled 模式
        if (onFileChange) {
            onFileChange(files);
            return;
        }

        this.setState({
            uploading: true
        });

        const token = this.token = guid();

        // Uncontrolled 模式
        upload(e.target.files, this.props).then(
            result => {
                if (this.token === token) {
                    this.onUploadSucceed(result);
                }
            },
            error => {
                if (this.token === token) {
                    this.onUploadFailed(error);
                }
            }
        );
    }

    onUploadSucceed(result) {

        const onUploadSucceed = this.props.onUploadSucceed;

        if (onUploadSucceed) {
            onUploadSucceed(result);
        }

        super.onChange({
            type: 'change',
            value: result,
            target: this
        }, () => {
            this.setState({uploading: false});
        });

    }

    onUploadFailed(error) {

        const onUploadFailed = this.props.onUploadFailed;

        if (onUploadFailed) {
            onUploadFailed(error);
        }

        this.setState({uploading: false});
    }

    onUploadCancel() {

        const onUploadCancel = this.props.onUploadCancel;

        if (onUploadCancel && onUploadCancel) {
            onUploadCancel();
        }

        if ('value' in this.props) {
            return;
        }

        this.token = null;

        this.setState({
            uploading: false
        });

    }


    /**
     * 重置上传的文件
     *
     * @public
     */
    onClear() {

        const {
            onFileChange,
            onClear
        } = this.props;

        if (onFileChange) {
            onFileChange(null);
            return;
        }

        if (onClear) {
            onClear();
        }

        this.setState({value: ''});
    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement?}
     */
    renderUploadFile() {

        const status = this.getStatus(this.state);

        return status !== 'empty'
            ? null
            : (
                <input
                    ref="file"
                    type="file"
                    className={cx().part('file').build()}
                    onChange={this.onFileChange}
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

        const status = this.getStatus(this.state);
        const {size, placeholder, fileType} = this.props;
        const value = this.state.value;

        switch (status) {

            case 'fulfilled':
                return (
                    <div className={cx.getPartClassName('content')}>
                        {(fileType === 'image')
                            ? <img
                                className={cx.getPartClassName('preview')}
                                src={value} />
                            : <Icon icon="folder" />
                        }

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
                            onClick={this.onClear} >
                            <Icon icon="refresh" />
                        </Button>
                    </div>
                );
            case 'uploading':
                return (
                    <div className={cx.getPartClassName('uploading')}>
                        <Progress
                            size="xxs"
                            mode="indeterminate"
                            shape="circle" />
                        <span>正在上传...</span>
                        <Button
                            title="取消上传"
                            variants={['icon']}
                            size="xxs"
                            type="button"
                            onClick={this.onUploadCancel}>
                            <Icon icon="clear" />
                        </Button>
                    </div>
                );
            case 'empty':
            default:
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

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {name, style} = this.props;
        const value = this.state.value;
        const className = cx(this.props)
            .addStates(this.getStyleStates())
            .build();

        return (
            <div
                className={className}
                style={style}>
                <input
                    name={name}
                    type="hidden"
                    value={value}
                    readOnly />
                {this.renderUploadFile()}
                {this.renderUploadButton()}
            </div>
        );

    }

}

Uploader.displayName = 'Uploader';

function getCheck(names, mutex) {

    const ISSUE_URL = 'https://github.com/react-melon/melon/issues/53';

    return propTypes => (props, propName, componentName, ...rest) => {

        // 全部存在
        if (names.every(name => (name in props))) {

            // 但是有互斥
            if (mutex.some(name => (name in props))) {
                return new Error(`Cannot set ${mutex.join(', ')} with ${names.join(', ')}. See: ${ISSUE_URL}`);
            }

            // 原来的校验
            return propTypes(props, propName, componentName, ...rest);

        }

        // 部分存在
        if (names.some(name => (name in props))) {
            return new Error(`Please set ${names.join(', ')} at same time. See : ${ISSUE_URL}`);
        }

        // 全部都不存在
        return propTypes(props, propName, componentName, ...rest);

    };

}

const controlledGroup = ['value', 'uploading', 'onFileChange'];
const uncontrolledGroup = ['defaultValue', 'upload'];

const controlledCheck = getCheck(controlledGroup, uncontrolledGroup);
const uncontrolledCheck = getCheck(uncontrolledGroup, controlledGroup);

Uploader.propTypes = {

    ...InputComponent.propTypes,

    accept: PropTypes.string,
    placeholder: PropTypes.string,
    fileType: PropTypes.oneOf(['image', 'all']),

    value: controlledCheck(PropTypes.string),
    uploading: controlledCheck(PropTypes.bool),
    onFileChange: controlledCheck(PropTypes.func),

    defaultValue: uncontrolledCheck(InputComponent.propTypes.defaultValue),
    upload: uncontrolledCheck(PropTypes.func),
    onUploadStart: uncontrolledCheck(PropTypes.func),
    onUploadSucceed: uncontrolledCheck(PropTypes.func),
    onUploadFailed: uncontrolledCheck(PropTypes.func)

};

Uploader.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '点击上传',
    fileType: 'image'
};

Uploader.childContextTypes = InputComponent.childContextTypes;
Uploader.contextTypes = InputComponent.contextTypes;
