/**
 * @file melon/Uploader
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var InputComponent = require('./InputComponent');
var Button = require('./Button');
var Icon = require('./Icon');
var Progress = require('./Progress');
var Link = require('./Link');

class Uploader extends InputComponent {

    static displayName = 'Uploader';

    constructor(props) {

        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onClearClick = this.onClearClick.bind(this);

        var state = this.state;

        this.state = {
            ...state,
            isUploading: false,
            isUploaded: !!state.rawValue
        };

    }

    render() {

        var props = this.props;

        return (
            <div className={this.getClassName()}>
                <input name={props.name} type="hidden" value={this.getValue()} />
                {this.renderUploadFile()}
                {this.renderUploadButton()}
                {this.renderValidateMessage()}
            </div>
        );

    }

    renderUploadFile() {

        var {isUploading, isUploaded} = this.state;

        return isUploading || isUploaded
            ? null
            : (
                <input
                    ref="file"
                    type="file"
                    className={this.getPartClassName('file')}
                    onChange={this.onFileChange}
                    accept={this.props.accept} />
            );
    }

    renderUploadButton() {

        var {isUploading, isUploaded} = this.state;

        if (isUploading) {
            return (
                <Progress
                    size={this.props.size}
                    mode="indeterminate"
                    shape="circle" />
            );
        }

        if (isUploaded) {
            return (
                <div className={this.getPartClassName('uploaded')}>
                    <Icon
                        icon="done"
                        size={this.props.size} />
                    已上传
                    <Link
                        size={this.props.size}
                        href={this.getValue()}
                        target="_blank">
                        查看
                    </Link>
                    <Button
                        size={this.props.size}
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
    }

    onSelect() {
        this.refs.file.click();
    }

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
    }

    onClearClick() {
        this.clearFile();
    }

    setUploading() {
        this.setState({
            isUploading: true
        });
    }

    setFile(rawValue) {

        this.setState({
            rawValue: rawValue,
            isUploaded: true,
            isUploading: false
        });

        var e = {
            type: 'change',
            target: this,
            rawValue,
            value: this.stringifyValue(rawValue)
        };

        super.onChange(e);

    }

    clearFile() {

        this.setState({
            rawValue: '',
            isUploaded: false,
            isUploading: false
        });

        var e = {
            type: 'change',
            target: this,
            rawValue: '',
            value: ''
        };

        super.onChange(e);

    }

}

var PropTypes = React.PropTypes;

Uploader.propTypes = {
    ...InputComponent.propTypes,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    files: PropTypes.array,
    upload: PropTypes.func.isRequired
};

Uploader.defaultProps = {
    ...InputComponent.defaultProps,
    validateEvents: ['change']
};

module.exports = Uploader;
