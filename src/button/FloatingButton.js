/**
 * @file FloatingButton
 * @author leon <ludafa@outlook.com>
 */

import FlatButton from './FlatButton';

export default function FloatingButton(props) {
    let {variants = []} = props;

    if (variants.indexOf('floating') < 0) {
        props = {...props, variants: [...variants, 'floating']};
    }

    return FlatButton(props);
}

FloatingButton.propTypes = FlatButton.propTypes;

FloatingButton.defaultProps = FlatButton.defaultProps;
