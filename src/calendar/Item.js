/**
 * @file CalendarItemMixin
 * @author cxtom(cxtom2010@gmail.com)
 */

import {Component} from 'react';

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    shouldComponentUpdate(nextProps) {

        const {
            disabled,
            selected
        } = this.props;

        return nextProps.disabled !== disabled
            || nextProps.selected !== selected;

    }

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
                date: date
            };

            if (mode) {
                e.mode = mode;
            }

            onClick(e);
        }
    }

}
