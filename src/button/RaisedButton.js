/**
 * @file RaisedButton
 * @author leon <ludafa@outlook.com>
 */

import FlatButton from './FlatButton';

export default function RaisedButton(props) {
    let {variants = []} = props;

    if (variants.indexOf('raised') < 0) {
        props = {...props, variants: [...variants, 'raised']};
    }

    return FlatButton(props);
}

RaisedButton.propTypes = FlatButton.propTypes;

RaisedButton.defaultProps = FlatButton.defaultProps;
