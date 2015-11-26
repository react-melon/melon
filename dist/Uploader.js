define('melon/Uploader', [
    'require',
    'exports',
    'module',
    'react',
    './Button',
    './Icon',
    './Progress',
    './Link',
    './common/util/cxBuilder',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var Button = require('./Button');
    var Icon = require('./Icon');
    var Progress = require('./Progress');
    var Link = require('./Link');
    var cx = require('./common/util/cxBuilder').create('Uploader');
    var Validity = require('./Validity');
    var Uploader = React.createClass({
        displayName: 'Uploader',
        getInitialState: function () {
            return {
                isUploading: false,
                isUploaded: !!this.props.value
            };
        },
        onSelect: function () {
            this.refs.file.click();
        },
        onFileChange: function (e) {
            var _this = this;
            this.setUploading();
            this.props.upload({
                target: this,
                files: e.target.files
            }).then(function (result) {
                _this.setFile(result);
            }, function (error) {
                _this.clearFile();
            });
        },
        onClearClick: function () {
            this.clearFile();
        },
        setUploading: function () {
            this.setState({ isUploading: true });
        },
        setFile: function (value) {
            var _this2 = this;
            this.setState({
                value: value,
                isUploaded: true,
                isUploading: false
            }, function () {
                _this2.props.onChange({
                    type: 'change',
                    target: _this2,
                    value: value
                });
            });
        },
        clearFile: function () {
            var _this3 = this;
            this.setState({
                rawValue: '',
                isUploaded: false,
                isUploading: false
            }, function () {
                _this3.props.onChange({
                    type: 'change',
                    target: _this3,
                    value: ''
                });
            });
        },
        renderUploadFile: function () {
            var _state = this.state;
            var isUploading = _state.isUploading;
            var isUploaded = _state.isUploaded;
            return isUploading || isUploaded ? null : React.createElement('input', {
                ref: 'file',
                type: 'file',
                className: cx().part('file').build(),
                onChange: this.onFileChange,
                accept: this.props.accept
            });
        },
        renderUploadButton: function () {
            var _state2 = this.state;
            var isUploading = _state2.isUploading;
            var isUploaded = _state2.isUploaded;
            var value = _state2.value;
            var size = this.props.size;
            if (isUploading) {
                return React.createElement(Progress, {
                    size: size,
                    mode: 'indeterminate',
                    shape: 'circle'
                });
            }
            if (isUploaded) {
                return React.createElement('div', { className: cx().part('uploaded').build() }, React.createElement(Icon, {
                    icon: 'done',
                    size: size
                }), ' \u5DF2\u4E0A\u4F20', React.createElement(Link, {
                    size: size,
                    href: value,
                    variants: ['button'],
                    target: '_blank'
                }, '\u67E5\u770B'), React.createElement(Button, {
                    size: size,
                    type: 'button',
                    onClick: this.onClearClick
                }, '\u91CD\u9009'));
            }
            return React.createElement(Button, {
                type: 'button',
                variants: ['raised'],
                onClick: this.onSelect
            }, React.createElement(Icon, { icon: 'file-upload' }), '\u70B9\u51FB\u4E0A\u4F20');
        },
        render: function () {
            var props = this.props;
            var value = props.value;
            var validity = props.validity;
            return React.createElement('div', { className: cx(props).build() }, React.createElement('input', {
                name: props.name,
                type: 'hidden',
                value: value
            }), this.renderUploadFile(), this.renderUploadButton(), React.createElement(Validity, { validity: validity }));
        }
    });
    var PropTypes = React.PropTypes;
    Uploader.propTypes = {
        multiple: PropTypes.bool,
        accept: PropTypes.string,
        files: PropTypes.array,
        upload: PropTypes.func.isRequired
    };
    Uploader.defaultProps = { validateEvents: ['change'] };
    module.exports = require('./createInputComponent').create(Uploader);
});