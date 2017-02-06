/**
 * @file common/component/ZippyNav
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import Button from 'melon/Button';
import Link from 'melon/Link';
import locator from '../../locator';

const cx = require('melon-core/classname/cxBuilder').create('ZippyNav');
const _ = require('underscore');

const {
    Motion,
    spring
} = require('react-motion');


export default class ZippyNav extends React.Component {

    static displayName = 'ZippyNav';

    constructor(props) {
        super(props);
        this.state = {
            expand: props.expand || true
        };
    }

    render() {

        const {props, state} = this;

        const {
            current = {},
            nav,
            onActive,
            ...others
        } = props;

        const {expand} = state;

        const listHeight = nav.children.length * 35;

        return (
            <div {...others} className={cx(props).build()}>
                <dt>
                    <Button size={'xs'} onClick={() => {
                        this.setState({expand: !expand});
                    }}>
                        {nav.text}
                    </Button>
                </dt>
                <Motion style={{top: spring(expand ? 0 : -listHeight)}}>
                    {({top}) =>
                        <div style={{
                            overflow: 'hidden',
                            display: !expand && top === 0 ? 'none' : null
                        }}>
                            <dd style={{marginTop: Math.round(top)}}>
                                {_.map(nav.children, (item, index) =>
                                    <Link
                                        size={'xs'}
                                        states={{active: current.text === item.text}}
                                        key={index}
                                        onClick={() => onActive()}
                                        href={locator.createHref(item.pathname, item.query || {})}>
                                        {item.text}
                                    </Link>
                                )}
                            </dd>
                        </div>
                    }
                </Motion>
            </div>
        );
    }

}
