/**
 * @file CalendarItemMixin
 * @author cxtom(cxtom2010@gmail.com)
 */

module.exports = {

    shouldComponentUpdate(nextProps) {

        const {
            disabled,
            selected
        } = this.props;

        return nextProps.disabled !== disabled
            || nextProps.selected !== selected;

    },

    onClick(e) {

        e.preventDefault();

        const {
            disabled,
            onClick,
            date,
            mode
        } = this.props;

        if (disabled) {
            return;
        }

        if (onClick) {

            let e = {
                target: this,
                date
            };

            if (mode) {
                e.mode = mode;
            }

            onClick(e);
        }
    }
};
