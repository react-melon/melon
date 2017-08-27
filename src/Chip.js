/**
 * @file Chip
 * @author Ma63d(chuck7liu@gmail.com)
 */

import React, {PureComponent, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Icon from './Icon';

import {create} from 'melon-core/classname/cxBuilder';
const cx = create('Chip');


export default class Chip extends PureComponent {

    static displayName = 'Chip';

    static defaultProps = {
        removable: false
    };

    static propTypes = {
        removable: PropTypes.bool,
        onRemove: PropTypes.func,
        removeButtonStyle: PropTypes.object
    }

    constructor(...args) {
        super(...args);
        this.state = {
            active: false,
            iconActive: false
        };
        this.setActive = this.setActive.bind(this);
        this.unsetActive = this.unsetActive.bind(this);
        this.setIconActive = this.setIconActive.bind(this);
        this.unsetIconActive = this.unsetIconActive.bind(this);
        this.remove = this.remove.bind(this);
    }

    setIconActive(e) {
        e.stopPropagation();
        this.setState({iconActive: true});
    }
    unsetIconActive(e) {
        e.stopPropagation();
        this.setState({iconActive: false});
    }

    remove(e) {
        e.stopPropagation();
        if (this.props.onRemove) {
            this.props.onRemove();
        }
    }

    setActive() {
        this.setState({active: true});
    }

    unsetActive() {
        this.setState({active: false});
    }

    render() {

        let {
            children,
            removable,
            variants,
            states,
            label,
            /* eslint-disable no-unused-vars */
            onRemove,
            /* eslint-enable no-unused-vars */
            removeButtonStyle,
            ...rest
        } = this.props;

        let hasAvatar = false;
        let {iconActive, active} = this.state;

        let parts = children
            ? Children
            .toArray(children)
            .reduce((parts, child) => {

                if (!child || child.type !== Avatar) {
                    parts.content.push(child);
                }
                else {
                    hasAvatar = true;
                    let {variants = []} = child.props;
                    parts.avatar = cloneElement(
                        child,
                        {
                            variants: [
                                ...variants,
                                'chip'
                            ]
                        }
                    );
                }

                return parts;

            }, {
                content: [],
                removeButton: removable
                    ? <Icon
                        style={removeButtonStyle}
                        icon="clear"
                        states={{active: iconActive}}
                        variants={['chip-remove-button']}
                        onMouseDown={this.setIconActive}
                        onMouseUp={this.unsetIconActive}
                        onMouseLeave={this.unsetIconActive}
                        onClick={this.remove} />
                    : null
            })
            : label;

        let className = cx()
            .addVariants(
                variants,
                hasAvatar ? 'avatar' : null,
                removable ? 'removable' : null
            )
            .addStates({
                ...states,
                active
            })
            .build();

        return (
            <div
                {...rest}
                className={className}
                onMouseDown={this.setActive}
                onMouseUp={this.unsetActive}
                onMouseLeave={this.unsetActive}>
                {parts.avatar}
                <div className={cx.getPartClassName('content')}>
                    {parts.content}
                </div>
                {parts.removeButton}
            </div>
        );
    }

}
