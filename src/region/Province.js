/**
 * @file Region/RegionProvince
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var Selector = require('./Selector');

var helper = require('./helper');

var PropTypes = React.PropTypes;

class RegionProvince extends Component {

    constructor(props) {

        super(props);

        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.state = {
            expand: false
        };

        this.type = 'region-province';
    }

    getStates(props) {
        var states = super.getStates(props);
        states.expand = this.state.expand;

        return states;
    }

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
    }

    onMouseEnter(e) {
        this.setState({expand: true});
    }

    onMouseLeave(e) {
        this.setState({expand: false});
    }

    render() {

        var {
            datasource,
            children
        } = this.props;

        return (
            <div className={this.getClassName()}
                onMouseEnter={children ? this.onMouseEnter : null}
                onMouseLeave={children ? this.onMouseLeave : null}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
                {children ? (
                    <div className={this.getPartClassName('popup')}>
                        <ul>
                            {children}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }

}


RegionProvince.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};

module.exports = RegionProvince;
