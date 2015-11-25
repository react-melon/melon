define('melon/calendar/ItemMixin', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        shouldComponentUpdate: function (nextProps) {
            var _props = this.props;
            var disabled = _props.disabled;
            var selected = _props.selected;
            return nextProps.disabled !== disabled || nextProps.selected !== selected;
        },
        onClick: function (e) {
            e.preventDefault();
            var _props2 = this.props;
            var disabled = _props2.disabled;
            var onClick = _props2.onClick;
            var date = _props2.date;
            var mode = _props2.mode;
            if (disabled) {
                return;
            }
            if (onClick) {
                var _e = {
                    target: this,
                    date: date
                };
                if (mode) {
                    _e.mode = mode;
                }
                onClick(_e);
            }
        }
    };
});