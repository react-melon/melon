/**
 * @file Zippy
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const {
    Motion,
    spring
} = require('react-motion');

const cx = require('./common/util/cxBuilder').create('Zippy');

const {PropTypes} = React;

const Zippy = React.createClass({

    displayName: 'Zippy',

    propTypes: {
        size: PropTypes.number.isRequired,
        horizontal: PropTypes.bool,
        expand: PropTypes.bool
    },

    getDefaultProps() {
        return {
            horizontal: false,
            expand: false
        };
    },

    getStyle(value) {

        const {
            horizontal,
            style
        } = this.props;

        return {
            ...style,
            [horizontal ? 'overflowX' : 'overflowY']: 'hidden',
            [horizontal ? 'width' : 'height']: Math.round(value)
        };

    },

    render() {

        const props = this.props;

        const {
            expand,
            size,
            children,
            ...others
        } = props;

        const className = cx(props).addStates({expand}).build();

        return (
            <Motion style={{value: spring(expand ? size : 0, [60, 15])}}>
                {({value}) =>
                    <div {...others} className={className} style={this.getStyle(value)}>
                        {children}
                    </div>
                }
            </Motion>
        );

    }

});

module.exports = Zippy;
