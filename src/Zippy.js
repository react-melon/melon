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
            size: props.size
        };
        this.main = null;
    }

    componentDidMount() {
        const {isAdaptive, horizontal} = this.props;
        if (isAdaptive && !this.state.size) {
            this.setState({size: getPosition(this.main)[horizontal ? 'width' : 'height']});
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
            ...others
        } = props;

        const size = this.state.size || 0;

        const me = this;

        let children = React.Children.only(props.children);
        children = React.cloneElement(children, {
            ref(main) {
                me.main = ReactDOM.findDOMNode(main);
            }
        });

        const className = cx(props).addStates({expand}).build();

        return (
            <Motion style={{value: spring(expand ? size : 0, {stiffness: 60, damping: 15})}}>
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
