/**
 * @file Region/RegionArea
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var Selector = require('./Selector');
var Province = require('./Province');
var City = require('./City');

var helper = require('./helper');
var _ = require('underscore');

var PropTypes = React.PropTypes;

class RegionArea extends Component {

    static displayName = 'RegionArea';

    constructor(props) {

        super(props);

        this.onSelectorChange = this.onSelectorChange.bind(this);

        this.type = 'region-area';
    }

    onSelectorChange(e) {
        var value = e.value;

        var data = this.props.datasource;

        helper[value ? 'selectAll' : 'cancelAll'](data);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: data
        });
    }

    onProvinceChange(index, e) {
        var data = e.data;

        var datasource = this.props.datasource;

        datasource.children[index] = data;

        helper.isAllSelected(datasource);

        let onChange = this.props.onChange;

        onChange && onChange({
            data: datasource
        });
    }

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
    }

    render() {

        var props = this.props;

        var {
            datasource
        } = props;


        return (
            <li className={this.getClassName()}>
                <div className={this.getPartClassName('selector')}>
                    <Selector
                        label={datasource.text}
                        id={datasource.id}
                        checked={datasource.selected}
                        onChange={this.onSelectorChange} />
                </div>
                <div className={this.getPartClassName('content')}>
                    {_.map(datasource.children, this.renderProvince, this)}
                </div>
            </li>
        );
    }

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
    }

    renderCity(pIndex, child, index) {
        return (
            <City
                key={index}
                datasource={child}
                onChange={this.onCityChange.bind(this, pIndex, index)} />
        );
    }

}


RegionArea.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionArea;
