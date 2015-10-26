/**
 * @file esui-react/Tabs
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
var Component = require('./Component');

var Tab = require('./tabs/Tab');
var TabPanel = require('./tabs/Panel');

class Tabs extends Component {

    static displayName = 'Tabs';

    constructor(props) {
        super(props);

        let {selectedIndex} = this.props;

        this.state = {
            selectedIndex: selectedIndex
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }

    }


    getTabCount() {
        return React.Children.count(this.props.children);
    }

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    }

    handleTabClick(index, e) {

        if (index === this.state.selectedIndex) {
            return;
        }

        var onBeforeChange = this.props.onBeforeChange;

        if (onBeforeChange) {
            var cancel = onBeforeChange(index, e);
            if (cancel === false) {
                return;
            }
        }

        this.setState({selectedIndex: index}, function () {
            this.props.onChange && this.props.onChange({
                target: this,
                selectedIndex: index
            });
        });

    }

    render() {

        var props = this.props;
        var percent = 1 / this.getTabCount() * 100 + '%';
        var tabIndex = 0;
        var tabContent = [];

        var tabs = React.Children.map(props.children, function (tab, index) {

            var selected = this.getSelected(tab, index);
            var {
                disabled,
                children
            } = tab.props;

            if (selected) {
                tabIndex = index;
            }

            if (children) {
                tabContent.push(
                    <TabPanel
                        key={index}
                        active={selected} >
                        {children}
                    </TabPanel>
                );
            }

            return React.cloneElement(tab, {
                key: index,
                selected: selected,
                disabled: disabled,
                tabIndex: index,
                style: {width: percent},
                onClick: disabled ? null : this.handleTabClick.bind(this, index),
                className: this.getPartClassName('item')
            });

        }, this);

        var InkBarStyles = {
            width: percent,
            left: 'calc(' + percent + '*' + tabIndex + ')'
        };

        return (
            <div {...props} className={this.getClassName()}>
                <ul>
                    {tabs}
                    <li className={this.getPartClassName('inkbar')} style={InkBarStyles}></li>
                </ul>
                {tabContent}
            </div>
        );

    }

}

Tabs.propTypes = {
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func
};

Tabs.defaultProps = {
    selectedIndex: 0
};

Tabs.Tab = Tab;

module.exports = Tabs;
