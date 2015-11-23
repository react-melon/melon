define('melon/Uploader', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './Button',
    './Icon',
    './Progress',
    './Link'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var Button = require('./Button');
    var Icon = require('./Icon');
    var Progress = require('./Progress');
    var Link = require('./Link');
    var Uploader = function (_InputComponent) {
        babelHelpers.inherits(Uploader, _InputComponent);
        babelHelpers.createClass(Uploader, null, [{
                key: 'displayName',
                value: 'Uploader',
                enumerable: true
            }]);
        function Uploader(props) {
            babelHelpers.classCallCheck(this, Uploader);
            _InputComponent.call(this, props);
            this.onSelect = this.onSelect.bind(this);
            this.onFileChange = this.onFileChange.bind(this);
            this.onClearClick = this.onClearClick.bind(this);
            var state = this.state;
            this.state = babelHelpers._extends({}, state, {
                isUploading: false,
                isUploaded: !!state.rawValue
            });
        }
        Uploader.prototype.render = function render() {
            var props = this.props;
            return React.createElement('div', { className: this.getClassName() }, React.createElement('input', {
                name: props.name,
                type: 'hidden',
                value: this.getValue()
            }), this.renderUploadFile(), this.renderUploadButton(), this.renderValidateMessage());
        };
        Uploader.prototype.renderUploadFile = function renderUploadFile() {
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
        };
        Uploader.prototype.renderUploadButton = function renderUploadButton() {
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
                    variants: ['button'],
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
        };
        Uploader.prototype.onSelect = function onSelect() {
            this.refs.file.click();
        };
        Uploader.prototype.onFileChange = function onFileChange(e) {
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
        };
        Uploader.prototype.onClearClick = function onClearClick() {
            this.clearFile();
        };
        Uploader.prototype.setUploading = function setUploading() {
            this.setState({ isUploading: true });
        };
        Uploader.prototype.setFile = function setFile(rawValue) {
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
            _InputComponent.prototype.onChange.call(this, e);
        };
        Uploader.prototype.clearFile = function clearFile() {
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
            _InputComponent.prototype.onChange.call(this, e);
        };
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