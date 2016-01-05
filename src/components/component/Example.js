/**
 * @file Example
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes} from 'react';

import ExampleCard from './ExampleCard';

const Example = React.createClass({

    propTypes: {
        ...ExampleCard.propTypes,
        brief: PropTypes.string
    },

    render() {

        const {
            brief,
            ...rest
        } = this.props;

        return (
            <div className="melon-row">
                <div className="melon-column melon-column-3">
                    {brief}
                </div>
                <div className="melon-column melon-column-9">
                    <ExampleCard {...rest} />
                </div>
            </div>
        );
    }

});

export default Example;
