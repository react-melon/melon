/**
 * @file Calendar/CalendarSelectorItem
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './Item';
import * as DateTime from '../common/util/date';

const cx = create('CalendarSelectorItem');

export default class CalendarSelectorItem extends Item {

    render() {

        const props = this.props;

        const {
            date,
            mode,
            disabled,
            selected,
            ...others
        } = props;


        return (
            <li
                {...others}
                data-mode={mode}
                data-value={date}
                onClick={disabled ? null : this.onClick}
                className={cx(props).addStates({selected}).build()} >
                <span>
                    {mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)}
                </span>
            </li>
        );

    }

}

CalendarSelectorItem.displayName = 'CalendarSelectorItem';

CalendarSelectorItem.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    mode: PropTypes.oneOf(['month', 'year'])
};

