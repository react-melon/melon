/**
 * @file melon/boxgroup/Option
 * @author leon(ludafa@outlook.com)
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';
import CenterRipple from '../ripple/CenterRipple';

const cx = create('BoxGroupOption');

function createRippleHandler(instance, action) {
    return () => {
        if (!instance.refs.ripple || instance.props.disabled || instance.props.disabled) {
            return;
        }
        instance.refs.ripple[action]();
    };
}

export default class BoxGroupOption extends PureComponent {

    constructor(props) {
        super(props);
        this.addRipple = createRippleHandler(this, 'addRipple');
        this.removeRipple = createRippleHandler(this, 'removeRipple');
    }

    onClick() {
        this.refs.ripple && this.refs.ripple.animate();
    }

    getIcon(boxModel, isChecked) {
        return BoxGroupOption.Icons[boxModel][isChecked ? 'checked' : 'unchecked'];
    }

    render() {

        const props = this.props;

        const {
            boxModel,
            checked,
            disabled,
            readOnly,
            onChange
        } = props;


        const className = cx(props).addStates({checked}).build();
        const icon = this.getIcon(boxModel, checked);

        return (
            <label
                className={className}
                onMouseDown={this.addRipple}
                onMouseUp={this.removeRipple}
                onMouseLeave={this.removeRipple}>
                <input
                    disabled={disabled}
                    checked={checked}
                    type={props.boxModel}
                    value={props.value}
                    readOnly={readOnly}
                    name={props.name}
                    onChange={readOnly ? null : onChange} />
                <div className={cx.getPartClassName('icon')}>
                    <Icon icon={icon} />
                    {disabled || readOnly ? null : <CenterRipple ref="ripple" />}
                </div>
                <span>{props.label}</span>
            </label>
        );

    }

}

BoxGroupOption.displayName = 'BoxGroupOption';

BoxGroupOption.propTypes = {
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

BoxGroupOption.Icons = {
    radio: {
        checked: 'radio-button-checked',
        unchecked: 'radio-button-unchecked'
    },
    checkbox: {
        checked: 'check-box',
        unchecked: 'check-box-outline-blank'
    }
};
