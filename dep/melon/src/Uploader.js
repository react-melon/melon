/**
 * @file melon/Uploader
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const Button = require('./Button');
const Icon = require('./Icon');
const Progress = require('./Progress');
const Link = require('./Link');
const cx = require('./common/util/cxBuilder').create('Uploader');
const Validity = require('./Validity');

const Uploader = React.createClass({

    displayName: 'Uploader',

    getInitialState() {

        return {
            isUploading: false,
            isUploaded: !!this.props.value
        };

    },

    onSelect() {
        this.refs.file.click();
    },

    onFileChange(e) {

        this.setUploading();

        this
            .props
            .upload({
                target: this,
                files: e.target.files
            })
            .then(
                (result) => {
                    this.setFile(result);
                },
                (error) => {
                    this.clearFile();
                }
            );
    },

    onClearClick() {
        this.clearFile();
    },

    setUploading() {
        this.setState({
            isUploading: true
        });
    },

    setFile(value) {

        this.setState({
            value,
            isUploaded: true,
            isUploading: false
        }, () => {
            this.props.onChange({
                type: 'change',
                target: this,
                value: value
            });
        });

    },

    clearFile() {

        this.setState({
            rawValue: '',
            isUploaded: false,
            isUploading: false
        }, () => {
            this.props.onChange({
                type: 'change',
                target: this,
                value: ''
            });
        });

    },

    renderUploadFile() {

        var {isUploading, isUploaded} = this.state;

        return isUploading || isUploaded
            ? null
            : (
                <input
                    ref="file"
                    type="file"
                    className={cx().part('file').build()}
                    onChange={this.onFileChange}
                    accept={this.props.accept} />
            );

    },

    renderUploadButton() {

        const {isUploading, isUploaded, value} = this.state;
        const {size} = this.props;

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
                <div className={cx().part('uploaded').build()}>
                    <Icon icon="done" size={size} /> 已上传
                    <Link
                        size={size}
                        href={value}
                        variants={['button']}
                        target="_blank">
                        查看
                    </Link>
                    <Button
                        size={size}
                        type="button"
                        onClick={this.onClearClick} >
                        重选
                    </Button>
                </div>
            );
        }

        return (
            <Button
                type="button"
                variants={['raised']}
                onClick={this.onSelect}>
                <Icon icon="file-upload" />
                点击上传
            </Button>
        );
    },

    render() {

        const props = this.props;
        const {value, validity} = props;

        return (
            <div className={cx(props).build()}>
                <input name={props.name} type="hidden" value={value} />
                {this.renderUploadFile()}
                {this.renderUploadButton()}
                <Validity validity={validity} />
            </div>
        );

    }

});

var PropTypes = React.PropTypes;

Uploader.propTypes = {
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    files: PropTypes.array,
    upload: PropTypes.func.isRequired
};

Uploader.defaultProps = {
    validateEvents: ['change']
};

module.exports = require('./createInputComponent').create(Uploader);
