/**
 * @file UnitCalendar
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let InputComponent = require('./InputComponent');
let BoxGroup = require('./BoxGroup');
let date = require('./common/util/date');

class UnitCalendar extends InputComponent {

    static displayName = 'UnitCalendar';

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    render() {

        let {begin, end, unit, ...rest} = this.props;
        let {onChange} = this;

        let rawValue = this
            .getRawValue()
            .map((fragment) => {
                return date.format(UnitCalendar.normalize(fragment, unit), 'yyyy-mm-dd');
            })
            .sort();

        return (
            <div className={this.getClassName()}>
                <BoxGroup
                    {...rest}
                    boxModel="checkbox"
                    onChange={onChange}
                    rawValue={rawValue}>
                    {UnitCalendar.getContinuousFragments(begin, end, unit).map((fragment) => {
                        let begin = this.format(fragment);
                        let end = UnitCalendar.getNextTime(fragment, unit);
                        end.setDate(end.getDate() - 1);
                        end = this.format(end);
                        return (
                            <option
                                key={begin}
                                value={begin}
                                label={`${begin} ~ ${end}`} />
                        );
                    })}
                </BoxGroup>
            </div>
        );

    }

    onChange({rawValue}) {

        let current = this.getRawValue();
        let {continuous} = this.props;

        // 如果是连续的，这里需要算一下，不是连续的就以新值为主
        rawValue = continuous
            ? this.calculate(current, rawValue).map(this.parse)
            : rawValue;

        if (this.isControlled()) {
            this.props.onChange({
                target: this,
                rawValue,
                value: this.stringifyValue(rawValue)
            });
            return;
        }

        this.setState({
            rawValue
        });

    }

    calculate(current, next) {

        current = current.map(this.format).sort();

        next = next.sort();

        let cLength = current.length;
        let nLength = next.length;
        let {unit} = this.props;

        if (cLength === nLength) {
            return current;
        }

        if (!cLength || !nLength) {
            return next;
        }

        // fill
        if (cLength < nLength) {

            let firtNext = new Date(next[0]);
            let firstCurrent = new Date(current[0]);

            if (firtNext < firstCurrent) {
                return UnitCalendar.getContinuousFragments(firtNext, firstCurrent, unit)
                    .map(this.format)
                    .concat(current);
            }

            let lastNext = new Date(next[nLength - 1]);
            lastNext.setDate(lastNext.getDate() + 1);
            let lastCurrent = new Date(current[cLength - 1]);

            return current.concat(
                UnitCalendar
                    .getContinuousFragments(lastCurrent, lastNext, unit)
                    .slice(1)
                    .map(this.format)
            );

        }

        // cut
        for (var i = 0; i < nLength; ++i) {
            if (current[i] < next[i]) {
                if (i === 0) {
                    return current.slice(1);
                }
                return current.slice(0, i);
            }
        }

        return current.slice(0, -1);

    }

    parse(time) {
        return new Date(time);
    }

    format(time) {
        return date.format(time, 'yyyy-mm-dd');
    }

    stringifyValue(rawValue) {
        return rawValue
            .map((term) => {
                return this.format(term);
            })
            .join(',');
    }

}

let {PropTypes} = React;

UnitCalendar.propTypes = {
    ...InputComponent.propTypes,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['week', 'month', 'year']).isRequired,
    rawValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    continuous: PropTypes.bool.isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string)
};

UnitCalendar.defaultProps = {
    ...InputComponent.defaultProps,
    continuous: true,
    rawValue: [],
    defaultValue: []
};

UnitCalendar.normalize = function (time, unit) {
    time = new Date(time);
    // 得到周一
    if (unit === 'week') {
        time.setDate(time.getDate() - time.getDay() + 1);
    }
    // 得到1日
    else if (unit === 'month') {
        time.setDate(1);
    }
    // 得到1月1日
    else {
        time.setMonth(0);
        time.setDate(1);
    }
    return time;
};

UnitCalendar.getNextTime = function (time, unit) {
    time = UnitCalendar.normalize(time, unit);
    if (unit === 'week') {
        time.setDate(time.getDate() + 7);
    }
    else if (unit === 'month') {
        time.setMonth(time.getMonth() + 1);
    }
    else {
        time.setFullYear(time.getFullYear() + 1);
    }
    return time;
};

UnitCalendar.getContinuousFragments = function (begin, end, unit) {

    begin = UnitCalendar.normalize(begin, unit);

    let result = [];

    while (begin < end) {
        result.push(new Date(begin));
        if (unit === 'week') {
            begin.setDate(begin.getDate() + 7);
        }
        else if (unit === 'month') {
            begin.setMonth(begin.getMonth() + 1);
        }
        else {
            begin.setFullYear(begin.getFullYear() + 1);
        }
    }

    return result;

};

module.exports = UnitCalendar;
