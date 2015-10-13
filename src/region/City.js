/**
 * @file Region/RegionCity
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var Selector = require('./Selector');

var PropTypes = React.PropTypes;

class RegionCity extends Component {

    constructor(props) {

        super(props);

        this.onSelectorChange = this.onSelectorChange.bind(this);

        this.type = 'region-city';
    }

    onSelectorChange(e) {
        var value = e.value;

        var {
            datasource
        } = this.props;

        let onChange = this.props.onChange;

        datasource.selected = value;

        onChange && onChange({
            data: datasource
        });
    }

    render() {

        var {
            datasource
        } = this.props;

        return (
            <li className={this.getClassName()}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
            </li>
        );
    }

}


RegionCity.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionCity;
