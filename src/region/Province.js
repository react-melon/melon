/**
 * @file Region/RegionProvince
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const cx = require('../common/util/cxBuilder').create('RegionProvince');
const Selector = require('./Selector');

const helper = require('./helper');

const PropTypes = React.PropTypes;

const RegionProvince = React.createClass({

    displayName: 'RegionProvince',

    getInitialState() {
        return {
            expand: false
        };
    },

    onSelectorChange(e) {
        var value = e.value;

        var {
            datasource
        } = this.props;

        helper[value ? 'selectAll' : 'cancelAll'](datasource);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: datasource
        });
    },

    onMouseEnter(e) {
        this.setState({expand: true});
    },

    onMouseLeave(e) {
        this.setState({expand: false});
    },

    renderSelectedInfo() {
        var {
            datasource
        } = this.props;

        var total = datasource.children && datasource.children.length;
        if (!total) {
            return;
        }

        var num = datasource.children.reduce(function (result, child, index) {
            if (child.selected) {
                result++;
            }
            return result;
        }, 0);

        return (num === total || num === 0)
            ? null : (
                <span className={cx().part('info').build()}>
                    {'(' + num + '/' + total + ')'}
                </span>
            );
    },

    render() {

        var {
            datasource,
            children
        } = this.props;

        return (
            <div className={cx(this.props).addStates({expand: this.state.expand}).build()}
                onMouseEnter={children ? this.onMouseEnter : null}
                onMouseLeave={children ? this.onMouseLeave : null}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
                {this.renderSelectedInfo()}
                {children ? (
                    <div className={cx().part('popup').build()}>
                        <ul>
                            {children}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }

});


RegionProvince.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionProvince;
