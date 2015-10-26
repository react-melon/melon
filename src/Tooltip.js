/**
 * @file melon/Tooltip
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./Component');
var dom = require('./common/util/dom');

class Tooltip extends Component {

    static displayName = 'Tooltip';

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            ...this.state,
            isShown: false
        };
    }

    render() {

        var props = this.props;
        var mode = props.mode;
        var onClick = mode === 'click' ? this.onClick : null;
        var onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
        var onMouseLeave = mode === 'over' ? this.onMouseLeave : null;

        return (
            <div {...props}
                ref="main"
                className={this.getClassName()}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {props.children}
            </div>
        );
    }

    renderPopup(target, content) {

        var styles = this.getPosition();

        content = (
            <div className={this.getPartClassName('popup')} style={styles}>
                {content}
            </div>
        );

        ReactDOM.render(content, target);

    }

    getPosition() {

        if (!this.isShown()) {
            return {
                left: -10000,
                top: 0,
                opacity: 0,
                width: 'auto',
                height: 'auto'
            };
        }

        var props = this.props;
        var direction = props.direction;
        var offsetX = props.offsetX;
        var offsetY = props.offsetY;
        var popup = this.popup.childNodes[0];

        var position = dom.getPosition(this.refs.main);

        var {offsetWidth, offsetHeight} = popup;

        var styles = {
            opacity: 1
        };

        switch (direction) {
            case 'top':
                styles.left = position.left + (position.width - offsetWidth) / 2;
                styles.top = position.top - offsetHeight - offsetY;
                break;
            case 'bottom':
                styles.left = (position.width - offsetWidth) / 2 + position.left;
                styles.top = position.top + position.height + offsetY;
                break;
            case 'left':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left - offsetWidth - offsetY;
                break;
            case 'right':
                styles.top = (position.height - offsetHeight) / 2 + position.top;
                styles.left = position.left + position.width + offsetX;
                break;
        }

        return styles;
    }

    componentDidMount() {
        var popup = this.popup = Tooltip.createPopup();
        this.renderPopup(popup, this.props.content);
    }


    componentWillUnmount() {
        Tooltip.destroyPopup(this.popup);
        this.popup = null;
    }

    componentDidUpdate() {
        this.renderPopup(this.popup, this.props.content);
    }

    getStates(props) {
        var states = super.getStates(props);
        var direction = props.direction;
        states[direction] = true;
        return states;
    }

    onClick(e) {
        this.toggle();
    }

    onMouseEnter(e) {
        this.show();
    }

    onMouseLeave(e) {
        this.hide();
    }

    isShown() {
        return this.state.isShown;
    }

    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    show() {
        this.setState({isShown: true});
    }

    hide() {
        this.setState({isShown: false});
    }

}

var PropTypes = React.PropTypes;

Tooltip.propTypes = {
    arrow: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    mode: PropTypes.oneOf(['over', 'click'])
};

Tooltip.defaultProps = {
    ...Component.defaultProps,
    arrow: true,
    direction: 'bottom',
    mode: 'over',
    offsetX: 14,
    offsetY: 14
};

var container;

Tooltip.createPopup = function () {

    if (!container) {
        container = document.createElement('div');
        container.className = 'ui-tooltip-container';
        document.body.appendChild(container);
    }

    var popup = document.createElement('div');

    container.appendChild(popup);

    return popup;

};

Tooltip.destroyPopup = function (popup) {
    container.removeChild(popup);
};

module.exports = Tooltip;
