/**
 * @file Region/RegionArea
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const cx = require('../common/util/cxBuilder').create('RegionArea');
const Selector = require('./Selector');
const Province = require('./Province');
const City = require('./City');

const helper = require('./helper');
const _ = require('underscore');

const PropTypes = React.PropTypes;

const RegionArea = React.createClass({

    displayName: 'RegionArea',

    onSelectorChange(e) {
        var value = e.value;

        var data = this.props.datasource;

        helper[value ? 'selectAll' : 'cancelAll'](data);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: data
        });
    },

    onProvinceChange(index, e) {
        var data = e.data;

        var datasource = this.props.datasource;

        datasource.children[index] = data;

        helper.isAllSelected(datasource);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: datasource
        });
    },

    onCityChange(pIndex, cIndex, e) {
        var data = e.data;

        var datasource = this.props.datasource;

        var p = datasource.children[pIndex];
        p.children[cIndex] = data;

        helper.isAllSelected(p);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: datasource
        });
    },

    renderProvince(child, index) {
        return (
            <Province
                key={index}
                datasource={child}
                onChange={this.onProvinceChange.bind(this, index)}>
                {(_.isArray(child.children) && child.children.length > 0)
                    ? _.map(child.children, this.renderCity.bind(this, index))
                    : null
                }
            </Province>
        );
    },

    renderCity(pIndex, child, index) {
        return (
            <City
                key={index}
                datasource={child}
                onChange={this.onCityChange.bind(this, pIndex, index)} />
        );
    },

    render() {

        var props = this.props;

        var {
            datasource
        } = props;

        return (
            <li className={cx(props).build()}>
                <div className={cx().part('selector').build()}>
                    <Selector
                        label={datasource.text}
                        id={datasource.id}
                        checked={datasource.selected}
                        onChange={this.onSelectorChange} />
                </div>
                <div className={cx().part('content').build()}>
                    {_.map(datasource.children, this.renderProvince, this)}
                </div>
            </li>
        );
    }

});


RegionArea.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionArea;
