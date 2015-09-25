define('melon/Uploader', [
    'exports',
    './babelHelpers',
    'react',
    './InputComponent',
    './Button',
    './Icon',
    './uploader/File',
    './Progress',
    './Link'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var Button = require('./Button');
    var Icon = require('./Icon');
    var File = require('./uploader/File');
    var Progress = require('./Progress');
    var Link = require('./Link');
    var Uploader = function (_InputComponent) {
        babelHelpers.inherits(Uploader, _InputComponent);
        function Uploader(props) {
            babelHelpers.classCallCheck(this, Uploader);
            babelHelpers.get(Object.getPrototypeOf(Uploader.prototype), 'constructor', this).call(this, props);
            this.onSelect = this.onSelect.bind(this);
            this.onFileChange = this.onFileChange.bind(this);
            this.onClearClick = this.onClearClick.bind(this);
            var state = this.state;
            this.state = babelHelpers._extends({}, state, {
                isUploading: false,
                isUploaded: !!state.rawValue
            });
        }
        babelHelpers.createClass(Uploader, [
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('div', { className: this.getClassName() }, React.createElement('input', {
                        name: props.name,
                        type: 'hidden',
                        value: this.getValue()
                    }), this.renderUploadFile(), this.renderUploadButton(), this.renderValidateMessage());
                }
            },
            {
                key: 'renderUploadFile',
                value: function renderUploadFile() {
                    var _state = this.state;
                    var isUploading = _state.isUploading;
                    var isUploaded = _state.isUploaded;
                    return isUploading || isUploaded ? null : React.createElement('input', {
                        ref: 'file',
                        type: 'file',
                        className: this.getPartClassName('file'),
                        onChange: this.onFileChange,
                        accept: this.props.accept
                    });
                }
            },
            {
                key: 'renderUploadButton',
                value: function renderUploadButton() {
                    var _state2 = this.state;
                    var isUploading = _state2.isUploading;
                    var isUploaded = _state2.isUploaded;
                    if (isUploading) {
                        return React.createElement(Progress, {
                            size: this.props.size,
                            mode: 'indeterminate',
                            shape: 'circle'
                        });
                    }
                    if (isUploaded) {
                        return React.createElement('div', { className: this.getPartClassName('uploaded') }, React.createElement(Icon, {
                            icon: 'done',
                            size: this.props.size
                        }), '\u5DF2\u4E0A\u4F20', React.createElement(Link, {
                            size: this.props.size,
                            href: this.getValue(),
                            target: '_blank'
                        }, '\u67E5\u770B'), React.createElement(Button, {
                            size: this.props.size,
                            type: 'button',
                            onClick: this.onClearClick
                        }, '\u91CD\u9009'));
                    }
                    return React.createElement(Button, {
                        type: 'button',
                        variants: ['raised'],
                        onClick: this.onSelect
                    }, React.createElement(Icon, { icon: 'file-upload' }), '\u70B9\u51FB\u4E0A\u4F20');
                }
            },
            {
                key: 'onSelect',
                value: function onSelect() {
                    this.refs.file.click();
                }
            },
            {
                key: 'onFileChange',
                value: function onFileChange(e) {
                    var _this = this;
                    this.setUploading();
                    this.props.upload(e.files).then(function (result) {
                        _this.setFile(result);
                    }, function (error) {
                        _this.clearFile();
                    });
                }
            },
            {
                key: 'onClearClick',
                value: function onClearClick() {
                    this.clearFile();
                }
            },
            {
                key: 'setUploading',
                value: function setUploading() {
                    this.setState({ isUploading: true });
                }
            },
            {
                key: 'setFile',
                value: function setFile(rawValue) {
                    this.setState({
                        rawValue: rawValue,
                        isUploaded: true,
                        isUploading: false
                    });
                    var e = {
                        type: 'change',
                        target: this,
                        rawValue: rawValue,
                        value: this.stringifyValue(rawValue)
                    };
                    babelHelpers.get(Object.getPrototypeOf(Uploader.prototype), 'onChange', this).call(this, e);
                }
            },
            {
                key: 'clearFile',
                value: function clearFile() {
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
                    babelHelpers.get(Object.getPrototypeOf(Uploader.prototype), 'onChange', this).call(this, e);
                }
            }
        ]);
        return Uploader;
    }(InputComponent);
    var PropTypes = React.PropTypes;
    Uploader.propTypes = babelHelpers._extends({}, InputComponent.propTypes, {
        multiple: PropTypes.bool,
        accept: PropTypes.string,
        files: PropTypes.array,
        upload: PropTypes.func.isRequired
    });
    Uploader.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, { validateEvents: ['change'] });
    module.exports = Uploader;
});