/**
 * @file Region/RegionCity
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const cx = require('../common/util/cxBuilder').create('RegionCity');
const Selector = require('./Selector');

const PropTypes = React.PropTypes;

const RegionCity = React.createClass({

    displayName: 'RegionCity',

    onSelectorChange({value}) {

        const {
            datasource
        } = this.props;

        let onChange = this.props.onChange;

        datasource.selected = value;

        onChange && onChange({
            data: datasource
        });
    },

    render() {

        const {
            datasource
        } = this.props;

        return (
            <li className={cx(this.props).build()}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
            </li>
        );
    }

});


RegionCity.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionCity;
