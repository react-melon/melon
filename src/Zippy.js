/**
 * @file Zippy
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';
import {create} from './common/util/cxBuilder';

import {getPosition} from './common/util/dom';

const cx = create('Zippy');

function getStyle(horizontal, value) {

    return {
        [horizontal ? 'overflowX' : 'overflowY']: 'hidden',
        [horizontal ? 'width' : 'height']: Math.round(value)
    };

}

export default class Zippy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: props.size,
            first: true
        };
        this.main = null;
    }

    componentDidMount() {
        const {isAdaptive, horizontal} = this.props;
        if (isAdaptive && !this.state.size) {
            this.setState({
                size: getPosition(this.main)[horizontal ? 'width' : 'height'],
                first: false
            });
        }
    }

    componentWillUnmount() {
        this.main = null;
    }

    render() {

        const props = this.props;

        const {
            expand,
            horizontal,
            style,
            isAdaptive,
            ...others
        } = props;

        /* eslint-disable fecs-min-vars-per-destructure */

        const {
            size = 0,
            first
        } = this.state;

        const me = this;

        let children = React.Children.only(props.children);
        children = React.cloneElement(children, {
            ref(main) {
                me.main = ReactDOM.findDOMNode(main);
            }
        });

        const className = cx(props).addStates({expand}).build();

        // 刚开始没有动画
        if (isAdaptive && !size && expand && first) {
            return (
                <div
                    {...others}
                    className={className}
                    style={style}>
                    {children}
                </div>
            );
        }

        return (
            <Motion style={{value: spring(expand ? size : 0)}}>
                {({value}) =>
                    <div
                        {...others}
                        className={className}
                        style={{
                            ...style,
                            ...getStyle(horizontal, value)
                        }}>
                        {children}
                    </div>
                }
            </Motion>
        );

    }

}

Zippy.displayName = 'Zippy';

Zippy.propTypes = {
    size: PropTypes.number,
    horizontal: PropTypes.bool,
    expand: PropTypes.bool,
    isAdaptive: PropTypes.bool
};

Zippy.defaultProps = {
    horizontal: false,
    expand: false,
    isAdaptive: false
};
